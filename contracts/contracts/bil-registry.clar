;; bil-registry.clar
;;
;; Credential registry for the BitStats identity layer.
;;
;; A credential is a commitment, never the data: an issuer publishes
;; sha256(credential) against a BNS name and a type. Anyone can then check that a
;; name holds a live credential of some type without the underlying data ever
;; being on chain or leaving the holder's device.
;;
;; Names are stored as the full "name.namespace" string. This contract does not
;; resolve BNS itself -- callers resolve the name to a principal off chain, which
;; keeps the registry independent of BNS contract versions.

(define-constant CONTRACT-OWNER tx-sender)

(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-NOT-FOUND (err u101))
(define-constant ERR-ALREADY-EXISTS (err u102))
(define-constant ERR-EXPIRED (err u103))
(define-constant ERR-BAD-EXPIRY (err u104))
(define-constant ERR-REVOKED (err u105))

;; Issuers are allow-listed by the owner. Anyone may read; only a trusted issuer
;; may write, which is the whole trust model of the layer.
(define-map issuers principal { label: (string-ascii 64), active: bool, issued: uint })

(define-map credentials
  { name: (string-ascii 48), cred-type: (string-ascii 32) }
  {
    issuer: principal,
    hash: (buff 32),
    ;; Burn block after which the credential no longer counts. u0 = no expiry.
    expires-at: uint,
    issued-at: uint,
    revoked: bool
  })

(define-data-var total-credentials uint u0)
(define-data-var total-issuers uint u0)

;; --- Issuer administration ---

(define-public (add-issuer (issuer principal) (label (string-ascii 64)))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (asserts! (is-none (map-get? issuers issuer)) ERR-ALREADY-EXISTS)
    (map-set issuers issuer { label: label, active: true, issued: u0 })
    (var-set total-issuers (+ (var-get total-issuers) u1))
    (ok true)))

(define-public (set-issuer-active (issuer principal) (active bool))
  (let ((record (unwrap! (map-get? issuers issuer) ERR-NOT-FOUND)))
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (map-set issuers issuer (merge record { active: active }))
    (ok true)))

;; --- Issuance ---

(define-public (issue
    (name (string-ascii 48))
    (cred-type (string-ascii 32))
    (hash (buff 32))
    (expires-at uint))
  (let ((issuer-record (unwrap! (map-get? issuers tx-sender) ERR-NOT-AUTHORIZED)))
    (asserts! (get active issuer-record) ERR-NOT-AUTHORIZED)
    ;; u0 means "never expires"; any other value must be in the future.
    (asserts! (or (is-eq expires-at u0) (> expires-at burn-block-height)) ERR-BAD-EXPIRY)
    (asserts! (is-none (map-get? credentials { name: name, cred-type: cred-type })) ERR-ALREADY-EXISTS)
    (map-set credentials { name: name, cred-type: cred-type }
      {
        issuer: tx-sender,
        hash: hash,
        expires-at: expires-at,
        issued-at: burn-block-height,
        revoked: false
      })
    (map-set issuers tx-sender (merge issuer-record { issued: (+ (get issued issuer-record) u1) }))
    (var-set total-credentials (+ (var-get total-credentials) u1))
    (ok true)))

;; Re-issue replaces a credential in place. Only the original issuer may do it,
;; so a second issuer cannot overwrite someone else's attestation.
(define-public (reissue
    (name (string-ascii 48))
    (cred-type (string-ascii 32))
    (hash (buff 32))
    (expires-at uint))
  (let (
    (existing (unwrap! (map-get? credentials { name: name, cred-type: cred-type }) ERR-NOT-FOUND))
    (issuer-record (unwrap! (map-get? issuers tx-sender) ERR-NOT-AUTHORIZED))
  )
    (asserts! (get active issuer-record) ERR-NOT-AUTHORIZED)
    (asserts! (is-eq tx-sender (get issuer existing)) ERR-NOT-AUTHORIZED)
    (asserts! (or (is-eq expires-at u0) (> expires-at burn-block-height)) ERR-BAD-EXPIRY)
    (map-set credentials { name: name, cred-type: cred-type }
      (merge existing { hash: hash, expires-at: expires-at, issued-at: burn-block-height, revoked: false }))
    (ok true)))

(define-public (revoke (name (string-ascii 48)) (cred-type (string-ascii 32)))
  (let ((existing (unwrap! (map-get? credentials { name: name, cred-type: cred-type }) ERR-NOT-FOUND)))
    (asserts! (or (is-eq tx-sender (get issuer existing)) (is-eq tx-sender CONTRACT-OWNER)) ERR-NOT-AUTHORIZED)
    (asserts! (not (get revoked existing)) ERR-REVOKED)
    (map-set credentials { name: name, cred-type: cred-type } (merge existing { revoked: true }))
    (ok true)))

;; --- Read-only ---

(define-read-only (get-credential (name (string-ascii 48)) (cred-type (string-ascii 32)))
  (map-get? credentials { name: name, cred-type: cred-type }))

(define-read-only (get-issuer (issuer principal))
  (map-get? issuers issuer))

;; The single question a verifying dapp asks. Expiry is measured against the
;; Bitcoin clock, so it cannot be gamed by Stacks block cadence.
(define-read-only (is-valid (name (string-ascii 48)) (cred-type (string-ascii 32)))
  (match (map-get? credentials { name: name, cred-type: cred-type })
    cred (and
           (not (get revoked cred))
           (or (is-eq (get expires-at cred) u0) (> (get expires-at cred) burn-block-height))
           (match (map-get? issuers (get issuer cred))
             issuer-record (get active issuer-record)
             false))
    false))

;; Confirms the caller holds the exact document behind the commitment.
(define-read-only (matches-hash (name (string-ascii 48)) (cred-type (string-ascii 32)) (candidate (buff 32)))
  (match (map-get? credentials { name: name, cred-type: cred-type })
    cred (is-eq (get hash cred) candidate)
    false))

(define-read-only (get-total-credentials) (var-get total-credentials))
(define-read-only (get-total-issuers) (var-get total-issuers))
(define-read-only (get-owner) CONTRACT-OWNER)
