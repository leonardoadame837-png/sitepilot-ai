# SitePilot AI

**SitePilot AI** is an AI-powered construction command center for project progress tracking, delay prediction, safety monitoring, quality control, procurement risk, and digital twin project intelligence.

> Help construction teams understand what is happening on-site, what is going wrong, and what action to take next.

## Current status

**Stage:** Functional dashboard prototype / security-foundation work

The repository includes a lightweight Node.js development server, sample project data, data-integrity tests, HTTP security regression tests, and GitHub Actions CI. The current UI remains a frontend prototype. Authentication, persistent storage, tenant isolation, secure uploads, and production integrations are not implemented.

**Do not use this prototype to store confidential customer or construction project information.** See [SECURITY.md](SECURITY.md) and [the security baseline](docs/security-baseline.md).

## Run locally or in GitHub Codespaces

Requirements: Node.js 20+

```bash
npm ci
npm test
npm start
```

The server listens on port `8001` by default and binds to `127.0.0.1` (local machine only). In a controlled Codespaces environment, configure the host and forward port `8001` if remote access is required.

Health check: `/health`

The dashboard is served from `src/`, while demo data is exposed through `/data/`.

## What works today

- Project health summary
- Planned vs. actual progress
- Schedule variance
- Open-risk count
- Risk severity filtering
- Recommended actions
- Three-week activity view
- Daily superintendent briefing
- Sample evidence/risk/action relationships
- Safe DOM rendering and basic accessibility attributes
- Refreshable project data
- Local development HTTP server
- Data-integrity and HTTP security regression tests
- GitHub Actions test matrix for Node.js 20 and 22

## Product vision

SitePilot AI is designed to become a unified construction project intelligence platform. The longer-term product may include progress tracking, schedule-risk analysis, drawing/BIM analysis, field evidence, safety and quality workflows, procurement risk, document intelligence, reporting, and digital twin views.

These are roadmap goals, not capabilities currently implemented in this prototype.

## MVP: Progress and delay-risk workflow

The first production-oriented release should allow project teams to manage a schedule, connect field evidence to activities, confirm actual progress, and review explainable schedule risks.

### Required production capabilities

- Authentication and role-based access control
- Organization and project management
- Tenant isolation
- Schedule import and activity mapping
- Private evidence storage and secure uploads
- Evidence-linked progress observations
- Human-confirmed progress
- Explainable risk calculations
- Audit trail for important changes and approvals
- Backup, monitoring, and recovery procedures

## Architecture direction

The current prototype uses HTML, CSS, vanilla JavaScript, and a dependency-free Node.js local server. The production architecture is documented in [docs/architecture.md](docs/architecture.md).

The recommended direction is a component-based frontend, a typed application API, PostgreSQL, private object storage, and background job processing. The exact hosting and identity-provider choices should be made before production implementation.

## Core data relationship

`Project → Activity → Evidence → Risk → Recommended Action`

This relationship must remain central because it provides traceability from an operational recommendation back to the project information supporting it.

## Security and trust principles

- Treat AI output as decision support, not autonomous authority.
- Require human confirmation before generated progress becomes official.
- Enforce tenant isolation and least-privilege authorization server-side.
- Preserve original evidence and version derived artifacts.
- Store secrets outside source control.
- Keep customer files private and use short-lived authorized access.
- Record provenance, confidence, model/ruleset version, and review status.
- Test backups and restoration.

## Development sequence

1. Stabilize the existing prototype and CI.
2. Implement identity, organization membership, and authorization.
3. Add PostgreSQL persistence and migrations.
4. Implement private evidence storage and audit events.
5. Add schedule import and human-confirmed progress workflows.
6. Introduce transparent rules-based schedule risk calculations.
7. Add AI-assisted evidence analysis only after the data and review controls are established.

## License

To be decided.

## Contact

**Project owner:** Leonardo Adame
