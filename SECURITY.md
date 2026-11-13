# Security Policy

## Supported deployment posture

SitePilot AI is currently a development prototype. It is not approved for production use or for storing confidential customer, project, personnel, safety, financial, or contractual information.

The local server binds to `127.0.0.1` by default. Setting `HOST=0.0.0.0` exposes it on network interfaces and should only be done in a controlled development environment.

The prototype does not implement authentication, authorization, tenant isolation, persistent storage, secure uploads, or production-grade audit logging.

## Reporting a vulnerability

Do not publish exploit details or sensitive project data in a public issue. Contact the repository owner privately through GitHub's available private vulnerability reporting channel, if enabled. Include affected commit, reproduction steps, impact, and suggested mitigation.

Do not include credentials, personal data, or customer information in a report.

## Security expectations for future production work

Before handling real customer data, the project must implement and verify:

- Authentication and secure session lifecycle.
- Server-side authorization and organization/project tenant isolation.
- Validated uploads, malware scanning, private object storage, and expiring download URLs.
- Managed secrets and encryption in transit and at rest.
- Audit events for sensitive changes and approvals.
- Dependency, secret, and static security scanning.
- Backups, restore testing, monitoring, and incident response procedures.

AI-generated observations must remain advisory until reviewed and confirmed by an authorized human.
