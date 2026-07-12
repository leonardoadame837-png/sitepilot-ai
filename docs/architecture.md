# SitePilot AI Architecture

## Decision

The first version will be a mobile-first web application focused on three outcomes:

1. Show planned versus actual progress.
2. Identify the most urgent schedule risks.
3. Tell the project team what action to take next.

The MVP will not begin with BIM, live camera feeds, safety detection, procurement automation, or complex enterprise integrations. Those features should be added only after the core progress-and-delay workflow is validated with real construction teams.

## Prototype architecture

The current prototype is intentionally simple and runs in a browser:

```text
src/index.html
src/style.css
src/app.js
        |
        v
data/sample-project.json
```

The prototype has no login, database, uploads, or production AI. Its purpose is to test the dashboard experience and product workflow before building expensive infrastructure.

## Production architecture

```text
Mobile or desktop browser
          |
          v
Responsive web application
          |
          v
Application API
          |
   +------+------+----------------+
   |             |                |
   v             v                v
Project      File service     Reporting service
service          |                |
   |             v                |
   |        Object storage        |
   |    photos, schedules, files  |
   |                              |
   +--------------+---------------+
                  |
                  v
             PostgreSQL
                  |
                  v
              Job queue
                  |
                  v
         AI processing workers
         - classify evidence
         - estimate progress
         - calculate risk
         - draft actions
                  |
                  v
          Human review workflow
```

## Recommended stack

### Frontend

- Next.js with TypeScript
- Responsive Progressive Web App
- Accessible components with large touch targets
- Offline-friendly caching for weak jobsite connections

### Backend

- Python and FastAPI
- PostgreSQL
- S3-compatible object storage
- Redis or a managed queue for background jobs
- REST API for the first production version

### Hosting

Use managed services at the beginning so the project does not require a full operations team. Keep development, staging, and production separate.

## Core services

### Identity and access

Handles companies, users, projects, roles, permissions, and sessions.

Initial roles:

- Company administrator
- Project manager
- Superintendent
- Contributor
- Viewer

### Project service

Stores projects, areas, trades, activities, milestones, dependencies, confirmed progress, risks, and actions.

### File service

Stores schedules, photos, daily reports, and generated reports. Original uploads must be preserved. File access should use short-lived signed links.

### AI processing service

Runs background analysis and returns structured results. Every output must include an explanation, confidence level, supporting evidence, model or ruleset version, timestamp, and review status.

### Reporting service

Creates daily field briefings and weekly owner reports from confirmed project information.

### Integration service

Added after the MVP. It will connect external systems to a normalized SitePilot data model. Start with CSV schedule import, then add Primavera P6, Microsoft Project, Procore, and Autodesk Construction Cloud.

## Core data model

- `Company`
- `User`
- `Project`
- `ProjectMembership`
- `Area`
- `Trade`
- `ScheduleActivity`
- `ScheduleDependency`
- `EvidenceItem`
- `ProgressObservation`
- `ProgressConfirmation`
- `RiskAlert`
- `RecommendedAction`
- `Report`
- `AuditEvent`

Every project-owned record should include `company_id` and `project_id` where appropriate so tenant separation is explicit.

## Progress decision flow

```text
Field photo or note uploaded
          |
          v
Area, trade, and activity suggested
          |
          v
Progress estimate generated
          |
          v
Authorized user confirms or edits
          |
          v
Planned versus actual recalculated
          |
          v
Risk and action recommendations updated
```

AI-generated progress must never become official without human confirmation during the MVP.

## Initial risk engine

Begin with a transparent rules-based engine before building a complex predictive model.

Example rules:

- Activity finish date passed and progress is below 100%.
- Actual progress is more than 10 percentage points behind planned progress.
- An activity starts within three days but a predecessor is incomplete.
- Required inspection is unresolved before follow-on work.
- Material delivery is later than the required-on-site date.

Each risk receives severity, likelihood, schedule impact, urgency, confidence, explanation, and evidence references.

A predictive model can be introduced later when enough verified project history exists.

## Security decisions

- Encrypt data in transit and at rest.
- Enforce least-privilege access.
- Separate tenant data in every query and storage path.
- Validate file types, sizes, and content.
- Scan uploads before processing.
- Use expiring file links.
- Log sensitive actions and AI approvals.
- Never train on private customer data without explicit permission.
- Keep secrets outside the source code.

## Reliability decisions

- Background jobs must be retryable and idempotent.
- Preserve original files and generated-result versions.
- Show users when data is stale, missing, or still processing.
- Back up database and object storage.
- Track processing failures and alert administrators.

## API examples

```text
POST   /projects
POST   /projects/{id}/schedule-imports
POST   /projects/{id}/evidence
GET    /projects/{id}/dashboard
GET    /projects/{id}/activities
POST   /progress-observations/{id}/confirm
GET    /projects/{id}/risks
POST   /risks/{id}/actions
PATCH  /actions/{id}
GET    /projects/{id}/reports/weekly
```

## Build order

1. Static dashboard prototype.
2. Authentication and project permissions.
3. CSV schedule import.
4. Photo and field-note uploads.
5. Manual progress confirmation.
6. Rules-based risk engine.
7. Daily and weekly reports.
8. AI-assisted evidence tagging and progress estimation.
9. External integrations.
10. Advanced prediction using verified historical data.