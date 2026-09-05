# BitStats — Bitcoin identity layer

A BNS name as a permanent identity root, credentials as on-chain commitments, and
verification as a single boolean. No personal data is ever stored on chain.

```
app/         Next.js 16 site + /verify tool
contracts/   bil-registry · bil-verifier   (Clarity)
```

## What is actually working

- **BNS resolution is live.** `/verify` resolves any registered name against
  mainnet BNS through Hiro, so the identity-root half works today.
- **The contracts exist and are tested.** `bil-registry` and `bil-verifier` are in
  `contracts/`, with 24 tests. The site referenced `bil-verifier.clar` before it
  had been written; it now exists.
- **They are not deployed yet.** Until `NEXT_PUBLIC_CONTRACT_ADDRESS` is set,
  `/verify` resolves the name and says plainly that the credential registry is
  absent, rather than implying a check happened.

The landing page previously advertised "50K+ credentials issued" and three named
testimonials for a product with no deployed contract. Both are gone. The hero now
states properties of the design — 32 bytes stored per credential, zero bytes of
personal data on chain, one call to verify — and the integration section shows the
actual contract call.

## Contracts

```bash
cd contracts
clarinet check
npm install && npm test   # 24 tests
```

`bil-registry` stores, per `(bns-name, credential-type)`: the issuer, a 32-byte
hash, an expiry and a revocation flag. Decisions worth knowing:

- **Only a commitment is stored.** `issue` takes `sha256(credential)`. The document
  stays with the holder; `matches-hash` lets them prove they hold the preimage.
- **Expiry is measured against `burn-block-height`**, the Bitcoin clock, so it
  cannot be nudged by Stacks block cadence. `u0` means never expires.
- **Deactivating an issuer invalidates everything it signed**, immediately, without
  touching each credential. Covered by a test.
- **Re-issuing is restricted to the original issuer**, so a second allow-listed
  issuer cannot overwrite someone else's attestation.

`bil-verifier` is the integration surface — deliberately tiny, so dapps depend on
something stable while the registry's storage can change behind it:

```clarity
(contract-call? .bil-verifier verify "satoshi.btc" "kyc-basic")          ;; => bool
(contract-call? .bil-verifier verify-both "satoshi.btc" "kyc" "adult")   ;; => bool
(try! (contract-call? .bil-verifier assert-valid "satoshi.btc" "kyc"))   ;; aborts on failure
```

## Site

```bash
npm install
cp .env.example .env.local
npm run dev     # http://localhost:3000
```

## Still to do

- Deploy `bil-registry` and `bil-verifier`, then set `NEXT_PUBLIC_CONTRACT_ADDRESS`
- An issuer console for allow-listing, issuing and revoking — the contracts support it, the UI does not yet
- The ZK claims on the marketing pages describe an intended design, not shipped code. There is no Groth16 circuit in this repo.

## License

MIT © greyw0rks
