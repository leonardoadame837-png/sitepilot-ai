# Security and Reliability Baseline

## Current milestone

This milestone hardens the existing local prototype and establishes repeatable CI. It does not make the product production-ready.

## Implemented in this branch

- Localhost-only bind by default.
- GET and HEAD only; other methods return 405.
- Static/data path containment using resolved path boundaries.
- Malformed URL-encoding rejection in the path resolver.
- Baseline browser security headers.
- No-store response policy.
- Generic client error responses without stack traces or filesystem paths.
- Automated HTTP and path traversal regression tests.
- GitHub Actions test matrix on Node.js 20 and 22.

## Required before any production customer data

### Identity and authorization
- Use a managed identity provider or a reviewed authentication implementation.
- Enforce server-side role and resource authorization on every request.
- Scope every project-owned record and object-storage key to an organization.
- Deny access by default; test cross-tenant access explicitly.
- Use secure, HttpOnly, SameSite cookies if cookie sessions are selected; implement CSRF protection for state-changing browser requests.

### Data protection
- Use PostgreSQL with migrations, least-privilege database roles, and tested backups.
- Encrypt transport with TLS and use managed encryption at rest.
- Store secrets in a managed secret store; never commit real credentials.
- Keep uploaded files private, validate content rather than trusting file extensions, limit size, scan for malware, and issue short-lived authorized download URLs.
- Define retention, deletion, export, and incident-response procedures.

### Auditability and AI trust
- Record actor, tenant, resource, action, timestamp, and correlation ID for sensitive operations.
- Preserve original evidence and version derived artifacts.
- Record provenance, confidence, ruleset/model version, and human review state for generated findings.
- Do not allow generated progress or recommendations to become official without an authorized human confirmation.

### Reliability and operations
- Add structured logs, request IDs, health/readiness checks, metrics, and alerting.
- Make background jobs retryable and idempotent.
- Separate development, staging, and production.
- Verify restore procedures, not merely backup creation.

## CI requirements

Pull requests must pass the Node.js test matrix. Add dependency review, secret scanning, and static analysis before production deployment. Protect the default branch with required reviews and required status checks in repository settings.

## Release gate

No production deployment or real customer data until authentication, authorization, tenant isolation, file security, database backup/restore, auditability, and operational monitoring have been independently tested.
