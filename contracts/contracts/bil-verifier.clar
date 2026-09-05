;; bil-verifier.clar
;;
;; The contract a dapp actually calls. It answers one question -- does this BNS
;; name hold a live credential of this type -- and returns a boolean. No raw
;; credential data is transmitted, because none of it is on chain to begin with.
;;
;; Kept separate from bil-registry so integrating dapps depend on a tiny, stable
;; surface while the registry's storage can evolve behind it.

(define-constant ERR-NOT-FOUND (err u200))
(define-constant ERR-HASH-MISMATCH (err u201))

;; --- Read-only: the integration surface ---

(define-read-only (verify (name (string-ascii 48)) (cred-type (string-ascii 32)))
  (contract-call? .bil-registry is-valid name cred-type))

;; Two credentials at once, so a dapp needing "kyc AND accredited" makes one call.
(define-read-only (verify-both
    (name (string-ascii 48))
    (type-a (string-ascii 32))
    (type-b (string-ascii 32)))
  (and (contract-call? .bil-registry is-valid name type-a)
       (contract-call? .bil-registry is-valid name type-b)))

;; Stronger check: the credential is live AND the caller holds the exact document
;; behind the commitment. Used when the holder presents the preimage themselves.
(define-read-only (verify-with-hash
    (name (string-ascii 48))
    (cred-type (string-ascii 32))
    (candidate (buff 32)))
  (and (contract-call? .bil-registry is-valid name cred-type)
       (contract-call? .bil-registry matches-hash name cred-type candidate)))

;; Full record, for a UI that wants to show issuer and expiry rather than a bool.
(define-read-only (describe (name (string-ascii 48)) (cred-type (string-ascii 32)))
  (contract-call? .bil-registry get-credential name cred-type))

;; --- Public: for contract-to-contract use ---

;; Same check as `verify`, but as a response so a calling contract can `try!` it
;; and abort its own transaction on failure.
(define-public (assert-valid (name (string-ascii 48)) (cred-type (string-ascii 32)))
  (if (contract-call? .bil-registry is-valid name cred-type)
    (ok true)
    ERR-NOT-FOUND))

(define-public (assert-valid-with-hash
    (name (string-ascii 48))
    (cred-type (string-ascii 32))
    (candidate (buff 32)))
  (begin
    (asserts! (contract-call? .bil-registry is-valid name cred-type) ERR-NOT-FOUND)
    (asserts! (contract-call? .bil-registry matches-hash name cred-type candidate) ERR-HASH-MISMATCH)
    (ok true)))
