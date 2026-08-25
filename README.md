# SitePilot AI

**SitePilot AI** is an AI-powered construction command center for project progress tracking, delay prediction, safety monitoring, quality control, procurement risk, and digital twin project intelligence.

> Help construction teams understand what is happening on-site, what is going wrong, and what action to take next.

## Current status

**Stage:** Functional dashboard prototype / MVP foundation

The repository now includes a lightweight Node.js development server, a health endpoint, sample project data, and automated data-integrity tests. The current UI is still a frontend prototype; authentication, persistent storage, real AI inference, and production integrations are next.

## Run locally or in GitHub Codespaces

Requirements: Node.js 20+

```bash
npm test
npm start
```

The server listens on port `8001` by default. In GitHub Codespaces, forward port `8001` and open the forwarded URL.

Health check:

```text
/health
```

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
- Local/Codespaces HTTP server
- Automated data validation tests

## Product vision

SitePilot AI is designed to become a unified AI platform for construction project intelligence. It combines:

- AI progress tracking
- Schedule-risk prediction
- Drawing and BIM analysis
- Site photo and video analysis
- Safety monitoring
- Quality-control checks
- Procurement risk alerts
- Contract and document intelligence
- Automated project reporting
- Digital twin project dashboards

## MVP: AI Progress + Delay Predictor

The first production-oriented version will let project teams upload a construction schedule, drawings, and site photos. The system will compare planned work against actual site progress and generate evidence-backed delay-risk alerts.

### MVP features

- User authentication and role-based access control
- Organization and project management
- Schedule upload and activity mapping
- Drawing/PDF and site-photo upload
- Evidence linked to project areas and activities
- Planned-versus-actual progress tracking
- Delay-risk scoring with confidence and evidence
- Daily action recommendations
- Weekly owner reporting
- Audit trail for important AI-generated decisions

## Architecture direction

### Frontend

The current prototype uses HTML, CSS, and vanilla JavaScript. The next UI milestone is a component-based frontend with clear separation between project data, dashboard components, and API services.

### Backend

The current local server is intentionally dependency-free and exists for development. The next backend milestone is a real API with authentication, RBAC, project persistence, file metadata, audit logging, and AI job orchestration.

Recommended production foundation:

- Node.js or Python/FastAPI API
- PostgreSQL
- Object storage for project files
- Redis or a managed queue for asynchronous AI jobs
- REST or GraphQL API

### AI layer

- Computer vision for site-photo analysis
- LLMs for project-document understanding
- Predictive analytics for schedule and cost risk
- OCR for drawings and scanned documents
- Retrieval-augmented generation for project-document search

## Data model direction

The demo data already establishes the core relationship between:

`Project → Activity → Evidence → Risk → Recommended Action`

This relationship should remain central as the backend is introduced because it provides an explainability path from an AI recommendation back to project evidence.

## Roadmap

### Phase 1 — MVP foundation — in progress

- Dashboard prototype
- Sample project dataset
- Local/Codespaces server
- Health endpoint
- Data-integrity tests
- Clean repository structure

### Phase 2 — Real project platform

- Authentication
- RBAC
- Organizations and projects
- PostgreSQL persistence
- Secure file uploads
- Project activity/audit history
- API contracts

### Phase 3 — AI progress intelligence

- Photo ingestion
- Computer-vision analysis
- Area/trade classification
- Planned-versus-actual visual comparison
- Progress estimation
- Evidence-backed risk generation

### Phase 4 — Schedule intelligence

- Primavera P6 import
- Microsoft Project import
- CSV schedule import
- Critical-path analysis
- Delay prediction
- Recovery/resequencing recommendations

### Phase 5 — Drawings and BIM

- PDF drawing viewer
- IFC/BIM integration
- Photo-to-location linking
- Model-element tracking
- Quantity tracking

### Phase 6 — Safety and quality

- PPE/hazard detection
- Quality tagging
- Punch-list generation
- Trend dashboards
- Risk reporting

### Phase 7 — Procurement and cost risk

- Delivery tracking
- Long-lead item monitoring
- Material/schedule dependency mapping
- Cost-impact alerts

### Phase 8 — Contract and document intelligence

- Contracts
- RFIs
- Submittals
- Meeting notes
- Specifications
- Notice/deadline detection
- Change-order risk analysis

### Phase 9 — Digital twin command center

- Real-time project health
- Schedule/cost/safety/quality views
- Zone-based intelligence
- Executive reporting
- Owner portal

## Security and trust principles

SitePilot AI should treat AI output as decision support, not as an autonomous authority over construction, safety, contractual, or financial decisions.

The production system should therefore provide:

- Evidence links for AI findings
- Confidence scores
- Human review states
- Immutable audit events for critical actions
- Tenant isolation
- Least-privilege RBAC
- Secure file handling
- Secret management outside source control

## Key metrics

- Schedule accuracy
- Progress-reporting speed
- Delay-prediction precision/recall
- Rework reduction
- Safety-risk detection performance
- Quality-issue detection performance
- RFI response time
- Change-order visibility
- Owner-reporting time
- Project-cost predictability

## Competitive advantage

Most construction tools solve one problem at a time. SitePilot AI is designed as a decision layer above existing construction software, connecting field evidence to schedule, risk, actions, and executive reporting.

## Long-term vision

The long-term goal is an AI project manager assistant that can answer:

- Is this project on schedule?
- What work is behind?
- Which activities are creating delay risk?
- What materials need to be ordered now?
- What safety or quality issues need immediate attention?
- What change-order risks are developing?
- What should the superintendent focus on tomorrow?
- What should the owner know this week?

## License

To be decided.

## Contact

**Project owner:** Leonardo Adame
