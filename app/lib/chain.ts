/**
 * Chain reads for the verify page.
 *
 * BNS resolution is real today: `/v1/names/{name}` on Hiro answers for any
 * registered name, so the identity-root half of the product works against
 * mainnet right now. The credential half only answers once bil-registry is
 * deployed and NEXT_PUBLIC_CONTRACT_ADDRESS is set.
 */
const IS_MAINNET = process.env.NEXT_PUBLIC_NETWORK !== 'testnet';

export const NETWORK_NAME = IS_MAINNET ? 'mainnet' : 'testnet';
export const API_BASE = IS_MAINNET ? 'https://api.hiro.so' : 'https://api.testnet.hiro.so';
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';
export const REGISTRY = 'bil-registry';
export const VERIFIER = 'bil-verifier';
export const IS_CONFIGURED = CONTRACT_ADDRESS.length > 0;

/** name.namespace, both lowercase, as BNS stores them. */
export const BNS_NAME = /^[a-z0-9\-_]{1,37}\.[a-z0-9\-_]{1,19}$/;

export interface BnsRecord {
  name: string;
  address: string;
  expireBlock: number | null;
  zonefileHash: string | null;
  status: string | null;
}

export async function resolveBns(name: string): Promise<BnsRecord | null> {
  const res = await fetch(`${API_BASE}/v1/names/${encodeURIComponent(name)}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Hiro /v1/names returned ${res.status}`);
  const data = await res.json();
  return {
    name,
    address: data.address ?? '',
    expireBlock: data.expire_block ?? null,
    zonefileHash: data.zonefile_hash ?? null,
    status: data.status ?? null,
  };
}

export interface Credential {
  issuer: string;
  hash: string;
  expiresAt: number;
  issuedAt: number;
  revoked: boolean;
}

/** Clarity string-ascii as a hex-serialised call argument: 0x0d + len + bytes. */
function asciiArg(value: string): string {
  const bytes = Array.from(new TextEncoder().encode(value));
  const len = bytes.length.toString(16).padStart(8, '0');
  return `0x0d${len}${bytes.map((b) => b.toString(16).padStart(2, '0')).join('')}`;
}

async function readOnly(contract: string, fn: string, args: string[]) {
  if (!IS_CONFIGURED) throw new Error('NEXT_PUBLIC_CONTRACT_ADDRESS is not set');
  const res = await fetch(
    `${API_BASE}/v2/contracts/call-read/${CONTRACT_ADDRESS}/${contract}/${fn}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: CONTRACT_ADDRESS, arguments: args }),
      cache: 'no-store',
    },
  );
  if (!res.ok) throw new Error(`Hiro call-read returned ${res.status}`);
  return res.json();
}

/** Hiro returns `result` as hex; `true` is 0x03 and `false` is 0x04. */
export async function verifyCredential(name: string, credType: string): Promise<boolean> {
  const out = await readOnly(VERIFIER, 'verify', [asciiArg(name), asciiArg(credType)]);
  if (out.okay === false) throw new Error(out.cause ?? 'contract call failed');
  return String(out.result ?? '').replace(/^0x/, '') === '03';
}

export const CREDENTIAL_TYPES = ['kyc-basic', 'accredited', 'age-over-18', 'residency'] as const;

export function truncate(p: string, chars = 8): string {
  if (!p) return '';
  return `${p.slice(0, chars)}…${p.slice(-4)}`;
}

export const explorerAddressUrl = (address: string) =>
  IS_MAINNET
    ? `https://explorer.hiro.so/address/${address}`
    : `https://explorer.hiro.so/address/${address}?chain=testnet`;
