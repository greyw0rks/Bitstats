'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  BNS_NAME, CREDENTIAL_TYPES, IS_CONFIGURED, NETWORK_NAME,
  explorerAddressUrl, resolveBns, truncate, verifyCredential,
  type BnsRecord,
} from '../lib/chain';

type CredState = 'unknown' | 'checking' | 'valid' | 'invalid' | 'error';

export default function VerifyPage() {
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [record, setRecord] = useState<BnsRecord | null | undefined>(undefined);
  const [creds, setCreds] = useState<Record<string, CredState>>({});

  const valid = BNS_NAME.test(name.trim().toLowerCase());

  async function lookup() {
    const target = name.trim().toLowerCase();
    setError('');
    setRecord(undefined);
    setCreds({});
    setBusy(true);
    try {
      const found = await resolveBns(target);
      setRecord(found);

      // The identity root resolves against live BNS whether or not the
      // credential registry is deployed; only the second half needs it.
      if (found && IS_CONFIGURED) {
        setCreds(Object.fromEntries(CREDENTIAL_TYPES.map((t) => [t, 'checking' as CredState])));
        await Promise.all(CREDENTIAL_TYPES.map(async (t) => {
          try {
            const ok = await verifyCredential(target, t);
            setCreds((c) => ({ ...c, [t]: ok ? 'valid' : 'invalid' }));
          } catch {
            setCreds((c) => ({ ...c, [t]: 'error' }));
          }
        }));
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section className="section">
          <div className="container" style={{ maxWidth: 720 }}>
            <p className="section-kicker">Verify</p>
            <h1 className="section-title" style={{ marginBottom: 12 }}>Check a BNS identity</h1>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-2)', marginBottom: 32 }}>
              Names resolve against live BNS on {NETWORK_NAME}, so the identity root works today.
              Credential checks call <code>bil-verifier.verify</code> and return a boolean — the
              underlying documents are never on chain, only a 32-byte commitment.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && valid && !busy) lookup(); }}
                placeholder="satoshi.btc"
                aria-label="BNS name"
                style={{
                  flex: '1 1 260px', minWidth: 0, padding: '12px 16px', fontSize: 15,
                  fontFamily: 'ui-monospace, monospace',
                  border: '1px solid var(--border-dark)', borderRadius: 10,
                  background: 'white', color: 'var(--text)',
                }}
              />
              <button type="button" className="btn btn-primary" disabled={!valid || busy} onClick={lookup}>
                {busy ? 'Looking up…' : 'Look up'}
              </button>
            </div>
            {name && !valid && (
              <p style={{ fontSize: 13, color: '#C4322B', marginBottom: 24 }}>
                Expected a name like <code>satoshi.btc</code> — lowercase, one dot.
              </p>
            )}

            {error && (
              <div style={{
                background: '#FDECEA', border: '1px solid #F3C0BB', borderRadius: 12,
                padding: '12px 16px', color: '#8F211B', fontSize: 14, margin: '24px 0',
              }}>
                {error}
              </div>
            )}

            {record === null && (
              <div style={{
                background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16,
                padding: 28, marginTop: 24,
              }}>
                <p style={{ fontWeight: 700, marginBottom: 6 }}>Not registered</p>
                <p style={{ fontSize: 14, color: 'var(--text-3)' }}>
                  BNS has no record for that name on {NETWORK_NAME}, so it has no identity root yet.
                </p>
              </div>
            )}

            {record && (
              <div style={{ marginTop: 24 }}>
                <div style={{
                  background: 'white', border: '1px solid var(--border)', borderRadius: 16,
                  padding: 28, boxShadow: 'var(--shadow-sm)', marginBottom: 24,
                }}>
                  <p className="section-kicker" style={{ marginBottom: 12 }}>Identity root</p>
                  <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>{record.name}</p>

                  {([
                    ['Owner', (
                      <a href={explorerAddressUrl(record.address)} target="_blank" rel="noreferrer"
                        style={{ color: 'var(--blue)', fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>
                        {truncate(record.address)} ↗
                      </a>
                    )],
                    ['Status', record.status ?? 'registered'],
                    ['Renews at block', record.expireBlock?.toLocaleString() ?? 'n/a'],
                    ['Zonefile', record.zonefileHash ? truncate(record.zonefileHash, 10) : 'none'],
                  ] as const).map(([label, value]) => (
                    <div key={label} style={{
                      display: 'flex', justifyContent: 'space-between', gap: 16,
                      padding: '8px 0', borderTop: '1px solid var(--border)', fontSize: 14,
                    }}>
                      <span style={{ color: 'var(--text-3)' }}>{label}</span>
                      <span style={{ fontFamily: typeof value === 'string' ? 'ui-monospace, monospace' : undefined, fontSize: 13 }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: 'white', border: '1px solid var(--border)', borderRadius: 16,
                  padding: 28, boxShadow: 'var(--shadow-sm)',
                }}>
                  <p className="section-kicker" style={{ marginBottom: 16 }}>Credentials</p>

                  {!IS_CONFIGURED ? (
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-3)' }}>
                      The registry is not deployed on {NETWORK_NAME} yet, so there is nothing to
                      check against. Set <code>NEXT_PUBLIC_CONTRACT_ADDRESS</code> once{' '}
                      <code>bil-registry</code> and <code>bil-verifier</code> are published and this
                      section starts answering. The contracts and their tests are in{' '}
                      <code>contracts/</code>.
                    </p>
                  ) : (
                    <div>
                      {CREDENTIAL_TYPES.map((t) => {
                        const state = creds[t] ?? 'unknown';
                        const tone =
                          state === 'valid' ? { bg: 'var(--green-light)', fg: '#00795A', border: 'var(--green-mid)', text: 'held' }
                          : state === 'invalid' ? { bg: 'var(--bg3)', fg: 'var(--text-3)', border: 'var(--border)', text: 'not held' }
                          : state === 'error' ? { bg: '#FDECEA', fg: '#8F211B', border: '#F3C0BB', text: 'read failed' }
                          : { bg: 'var(--bg2)', fg: 'var(--text-4)', border: 'var(--border)', text: 'checking…' };
                        return (
                          <div key={t} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            gap: 16, padding: '10px 0', borderTop: '1px solid var(--border)',
                          }}>
                            <code style={{ fontSize: 13 }}>{t}</code>
                            <span style={{
                              background: tone.bg, color: tone.fg, border: `1px solid ${tone.border}`,
                              borderRadius: 999, padding: '3px 12px', fontSize: 12, fontWeight: 600,
                            }}>
                              {tone.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            <p style={{ fontSize: 13, color: 'var(--text-4)', marginTop: 32 }}>
              Want to issue credentials? See <Link href="/credentials" style={{ color: 'var(--blue)' }}>Credentials</Link>{' '}
              for the issuer flow.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
