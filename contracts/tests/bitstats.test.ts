import { describe, it, expect, beforeEach } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const owner = accounts.get("deployer")!;
const issuer = accounts.get("wallet_1")!;
const otherIssuer = accounts.get("wallet_2")!;
const stranger = accounts.get("wallet_3")!;

const REGISTRY = "bil-registry";
const VERIFIER = "bil-verifier";

const ERR_NOT_AUTHORIZED = 100;
const ERR_NOT_FOUND = 101;
const ERR_ALREADY_EXISTS = 102;
const ERR_BAD_EXPIRY = 104;
const ERR_REVOKED = 105;
const ERR_V_NOT_FOUND = 200;
const ERR_V_HASH_MISMATCH = 201;

const NAME = "satoshi.btc";
const KYC = "kyc-basic";
const ACCREDITED = "accredited";
const HASH = Cl.bufferFromHex("aa".repeat(32));
const OTHER_HASH = Cl.bufferFromHex("bb".repeat(32));

const NEVER = 0;
const soon = () => simnet.burnBlockHeight + 50;

const addIssuer = (who = issuer, label = "Acme KYC") =>
  simnet.callPublicFn(REGISTRY, "add-issuer", [Cl.principal(who), Cl.stringAscii(label)], owner);

const issue = (
  who = issuer, name = NAME, type = KYC, hash = HASH, expires = NEVER,
) => simnet.callPublicFn(REGISTRY, "issue",
  [Cl.stringAscii(name), Cl.stringAscii(type), hash, Cl.uint(expires)], who);

const isValid = (name = NAME, type = KYC) =>
  simnet.callReadOnlyFn(REGISTRY, "is-valid", [Cl.stringAscii(name), Cl.stringAscii(type)], stranger).result;

const verify = (name = NAME, type = KYC) =>
  simnet.callReadOnlyFn(VERIFIER, "verify", [Cl.stringAscii(name), Cl.stringAscii(type)], stranger).result;

const credField = (field: string, name = NAME, type = KYC) => {
  const { result } = simnet.callReadOnlyFn(REGISTRY, "get-credential",
    [Cl.stringAscii(name), Cl.stringAscii(type)], stranger);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (result as any).value.value[field];
};

describe("bil-registry: issuers", () => {
  it("only the owner can allow-list an issuer", () => {
    expect(addIssuer(issuer).result).toBeOk(Cl.bool(true));
    expect(simnet.callPublicFn(REGISTRY, "add-issuer",
      [Cl.principal(otherIssuer), Cl.stringAscii("Rogue")], stranger).result)
      .toBeErr(Cl.uint(ERR_NOT_AUTHORIZED));
  });

  it("refuses to add the same issuer twice", () => {
    addIssuer();
    expect(addIssuer().result).toBeErr(Cl.uint(ERR_ALREADY_EXISTS));
  });

  it("refuses issuance from a principal that is not allow-listed", () => {
    expect(issue(stranger).result).toBeErr(Cl.uint(ERR_NOT_AUTHORIZED));
  });
});

describe("bil-registry: issuance", () => {
  beforeEach(() => { addIssuer(); });

  it("issues a credential and counts it", () => {
    expect(issue().result).toBeOk(Cl.bool(true));
    expect(simnet.callReadOnlyFn(REGISTRY, "get-total-credentials", [], stranger).result).toBeUint(1);
    expect(credField("revoked")).toBeBool(false);
    expect(credField("issuer")).toBePrincipal(issuer);
  });

  it("stores only the hash, never any data", () => {
    issue();
    expect(credField("hash")).toBeBuff(Uint8Array.from(Array(32).fill(0xaa)));
  });

  it("refuses a duplicate credential for the same name and type", () => {
    issue();
    expect(issue().result).toBeErr(Cl.uint(ERR_ALREADY_EXISTS));
  });

  it("allows the same name to hold different credential types", () => {
    issue();
    expect(issue(issuer, NAME, ACCREDITED, OTHER_HASH).result).toBeOk(Cl.bool(true));
    expect(isValid(NAME, ACCREDITED)).toBeBool(true);
  });

  it("refuses an expiry in the past", () => {
    simnet.mineEmptyBurnBlocks(5);
    expect(issue(issuer, NAME, KYC, HASH, 1).result).toBeErr(Cl.uint(ERR_BAD_EXPIRY));
  });
});

describe("bil-registry: validity", () => {
  beforeEach(() => { addIssuer(); });

  it("an unknown name is simply not valid, never an error", () => {
    expect(isValid("nobody.btc")).toBeBool(false);
  });

  it("a live credential is valid", () => {
    issue();
    expect(isValid()).toBeBool(true);
  });

  it("expiry is measured against the Bitcoin clock", () => {
    issue(issuer, NAME, KYC, HASH, soon());
    expect(isValid()).toBeBool(true);
    simnet.mineEmptyBurnBlocks(60);
    expect(isValid()).toBeBool(false);
  });

  it("expiry of 0 means it never expires", () => {
    issue(issuer, NAME, KYC, HASH, NEVER);
    simnet.mineEmptyBurnBlocks(500);
    expect(isValid()).toBeBool(true);
  });

  it("revocation takes effect immediately", () => {
    issue();
    expect(simnet.callPublicFn(REGISTRY, "revoke",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC)], issuer).result).toBeOk(Cl.bool(true));
    expect(isValid()).toBeBool(false);
  });

  it("only the issuer or the owner can revoke", () => {
    issue();
    expect(simnet.callPublicFn(REGISTRY, "revoke",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC)], stranger).result).toBeErr(Cl.uint(ERR_NOT_AUTHORIZED));
    expect(simnet.callPublicFn(REGISTRY, "revoke",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC)], owner).result).toBeOk(Cl.bool(true));
  });

  it("cannot revoke twice", () => {
    issue();
    simnet.callPublicFn(REGISTRY, "revoke", [Cl.stringAscii(NAME), Cl.stringAscii(KYC)], issuer);
    expect(simnet.callPublicFn(REGISTRY, "revoke",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC)], issuer).result).toBeErr(Cl.uint(ERR_REVOKED));
  });

  it("deactivating an issuer invalidates everything it signed", () => {
    issue();
    expect(isValid()).toBeBool(true);
    simnet.callPublicFn(REGISTRY, "set-issuer-active", [Cl.principal(issuer), Cl.bool(false)], owner);
    expect(isValid()).toBeBool(false);
  });

  it("re-issuing clears a revocation and only the original issuer may do it", () => {
    addIssuer(otherIssuer, "Other");
    issue();
    simnet.callPublicFn(REGISTRY, "revoke", [Cl.stringAscii(NAME), Cl.stringAscii(KYC)], issuer);

    expect(simnet.callPublicFn(REGISTRY, "reissue",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC), OTHER_HASH, Cl.uint(NEVER)], otherIssuer).result)
      .toBeErr(Cl.uint(ERR_NOT_AUTHORIZED));

    expect(simnet.callPublicFn(REGISTRY, "reissue",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC), OTHER_HASH, Cl.uint(NEVER)], issuer).result)
      .toBeOk(Cl.bool(true));
    expect(isValid()).toBeBool(true);
  });

  it("matches-hash only accepts the exact commitment", () => {
    issue();
    const call = (h: typeof HASH) => simnet.callReadOnlyFn(REGISTRY, "matches-hash",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC), h], stranger).result;
    expect(call(HASH)).toBeBool(true);
    expect(call(OTHER_HASH)).toBeBool(false);
  });
});

describe("bil-verifier: the integration surface", () => {
  beforeEach(() => { addIssuer(); });

  it("verify mirrors the registry", () => {
    expect(verify()).toBeBool(false);
    issue();
    expect(verify()).toBeBool(true);
  });

  it("verify-both requires both credentials", () => {
    issue();
    const both = () => simnet.callReadOnlyFn(VERIFIER, "verify-both",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC), Cl.stringAscii(ACCREDITED)], stranger).result;
    expect(both()).toBeBool(false);
    issue(issuer, NAME, ACCREDITED, OTHER_HASH);
    expect(both()).toBeBool(true);
  });

  it("verify-with-hash needs the credential live and the preimage to match", () => {
    issue();
    const withHash = (h: typeof HASH) => simnet.callReadOnlyFn(VERIFIER, "verify-with-hash",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC), h], stranger).result;
    expect(withHash(HASH)).toBeBool(true);
    expect(withHash(OTHER_HASH)).toBeBool(false);
  });

  it("describe returns the whole record for a UI", () => {
    issue();
    const { result } = simnet.callReadOnlyFn(VERIFIER, "describe",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC)], stranger);
    expect(result.type).toBe("some");
  });

  it("assert-valid gives a calling contract something to try!", () => {
    expect(simnet.callPublicFn(VERIFIER, "assert-valid",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC)], stranger).result).toBeErr(Cl.uint(ERR_V_NOT_FOUND));
    issue();
    expect(simnet.callPublicFn(VERIFIER, "assert-valid",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC)], stranger).result).toBeOk(Cl.bool(true));
  });

  it("assert-valid-with-hash separates a missing credential from a wrong one", () => {
    issue();
    expect(simnet.callPublicFn(VERIFIER, "assert-valid-with-hash",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC), OTHER_HASH], stranger).result)
      .toBeErr(Cl.uint(ERR_V_HASH_MISMATCH));
    expect(simnet.callPublicFn(VERIFIER, "assert-valid-with-hash",
      [Cl.stringAscii(NAME), Cl.stringAscii(KYC), HASH], stranger).result).toBeOk(Cl.bool(true));
  });
});
