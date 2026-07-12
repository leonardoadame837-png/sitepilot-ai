# SitePilot AI User Stories

## MVP scope

The first release focuses on progress tracking, schedule risk, and daily actions. BIM coordination, safety computer vision, procurement automation, estimating, and contract intelligence are deferred until the core workflow is validated.

## Personas

- **Superintendent:** Needs a fast field view of completed work, blockers, and today’s priorities.
- **Project manager:** Needs trustworthy progress, early schedule warnings, accountable actions, and owner-ready reporting.
- **Project engineer:** Needs to organize evidence and connect it to activities, inspections, RFIs, and handoffs.
- **Owner or executive:** Needs a concise project-health summary and the few decisions that require attention.
- **Company administrator:** Needs to control users, roles, projects, and private project information.

## Epic 1 — Project setup

### US-001: Create a project

**As a** project administrator, **I want** to create a project with its basic details **so that** the team can begin tracking it.

**Acceptance criteria**

- The user can enter project name, location, client, start date, target finish date, project type, and timezone.
- Required fields are identified and validated.
- The creator receives project-administrator access.
- The project appears in the user’s project list.

### US-002: Invite project members

**As a** project administrator, **I want** to invite team members and assign roles **so that** each person has the right access.

**Acceptance criteria**

- Available roles include administrator, project manager, superintendent, contributor, and viewer.
- A user cannot perform actions outside the permissions of the assigned role.
- Role changes are recorded in the audit log.

### US-003: Define areas and trades

**As a** project engineer, **I want** to define project areas and trades **so that** schedule activities and evidence can be organized consistently.

**Acceptance criteria**

- Users can create, edit, and archive areas and trades.
- Activities and evidence can be assigned to an area and trade.
- Archived values remain visible on historical records.

## Epic 2 — Schedule import

### US-004: Import a CSV schedule

**As a** project manager, **I want** to upload a CSV schedule **so that** SitePilot can compare planned work with actual progress.

**Acceptance criteria**

- The system accepts a documented CSV format.
- Activity ID, name, start, finish, status, and percent complete are imported.
- Invalid rows are identified with useful error messages.
- The original file is preserved.

### US-005: Review imported activities

**As a** project engineer, **I want** to review and correct imported activities **so that** the project data is reliable.

**Acceptance criteria**

- Activities can be filtered by area, trade, date, status, and risk.
- Authorized users can correct mappings without changing the original source file.
- Changes are audited.

## Epic 3 — Field evidence

### US-006: Upload field photos

**As a** superintendent, **I want** to upload photos from my phone **so that** the team has current evidence of site conditions.

**Acceptance criteria**

- The upload control works on a mobile device.
- The user can add observation date, area, trade, activity, and a note.
- The system stores uploader and upload time.
- Upload progress and failures are clearly displayed.

### US-007: Add a field note

**As a** superintendent, **I want** to record a short field note **so that** blockers and completed work are not lost.

**Acceptance criteria**

- A note can be linked to an area, trade, and activity.
- The user can mark the note as progress, blocker, inspection, delivery, quality, or general information.
- Notes are visible in the activity history.

### US-008: Review AI-suggested tags

**As a** project engineer, **I want** to approve or correct suggested tags **so that** the system learns from verified project information.

**Acceptance criteria**

- AI suggestions are visibly marked as unconfirmed.
- The user can accept or edit area, trade, and activity.
- The final values and reviewer are saved.

## Epic 4 — Progress tracking

### US-009: View planned versus actual progress

**As a** project manager, **I want** to compare planned and confirmed progress **so that** I can identify slippage quickly.

**Acceptance criteria**

- Planned, reported, AI-suggested, and confirmed progress are distinguishable.
- Variance is displayed by project, area, trade, and activity.
- The dashboard identifies stale or missing updates.

### US-010: Confirm a progress estimate

**As an** authorized project leader, **I want** to confirm or edit an AI progress estimate **so that** official progress remains under human control.

**Acceptance criteria**

- The estimate shows confidence and supporting evidence.
- The user can confirm, edit, or reject it.
- The official value changes only after confirmation.
- The decision is recorded with user and timestamp.

### US-011: Review evidence behind progress

**As a** project manager, **I want** to open the evidence supporting a progress value **so that** I can trust and verify it.

**Acceptance criteria**

- Every confirmed value links to its evidence.
- The evidence view shows observation date, location, uploader, and related activity.
- Missing evidence is clearly identified.

## Epic 5 — Delay risks

### US-012: See prioritized risks

**As a** superintendent, **I want** to see the highest-priority risks first **so that** I can focus the team on what matters today.

**Acceptance criteria**

- Risks are ranked by severity, urgency, impact, and confidence.
- Each risk includes a plain-language explanation.
- Each risk links to the affected activity and evidence.
- Users can filter by area, trade, severity, and status.

### US-013: Detect an incomplete predecessor

**As a** project manager, **I want** an alert when upcoming work depends on incomplete work **so that** I can prevent a trade handoff delay.

**Acceptance criteria**

- The system identifies an upcoming activity with an incomplete predecessor.
- The alert states both activities and relevant dates.
- The alert explains the potential impact.

### US-014: Dismiss an incorrect risk

**As a** project manager, **I want** to dismiss an incorrect alert with a reason **so that** the project view stays useful and the system can be evaluated.

**Acceptance criteria**

- Authorized users can dismiss an alert.
- A reason is required.
- The alert remains in history but leaves the active list.

## Epic 6 — Recommended actions

### US-015: Receive a recommended action

**As a** superintendent, **I want** each important risk to include a practical next action **so that** I know how to respond.

**Acceptance criteria**

- The recommendation includes action, suggested owner, due date, and supporting reason.
- The user can accept, edit, assign, or dismiss it.
- AI recommendations are clearly labeled.

### US-016: Track action ownership

**As a** project manager, **I want** to assign and track actions **so that** risks have accountable owners.

**Acceptance criteria**

- An action has owner, due date, priority, status, and notes.
- Overdue actions are highlighted.
- Completion time and completing user are recorded.

## Epic 7 — Dashboard and reporting

### US-017: Open a mobile project dashboard

**As a** superintendent, **I want** a dashboard that works on my phone **so that** I can understand the project while walking the site.

**Acceptance criteria**

- The main status is understandable within one minute.
- Touch targets are large and readable.
- The top risks and actions appear without deep navigation.
- Status is not communicated by color alone.

### US-018: Generate a daily briefing

**As a** superintendent, **I want** a daily briefing **so that** I can prepare the crew and subcontractors.

**Acceptance criteria**

- The briefing includes yesterday’s progress, today’s work, blockers, inspections, deliveries, and top actions.
- It uses confirmed data where available.
- Unconfirmed information is labeled.

### US-019: Generate a weekly owner report

**As a** project manager, **I want** an owner-ready weekly report **so that** I can communicate status without rebuilding it manually.

**Acceptance criteria**

- The report includes progress, variance, milestones, major risks, actions, and evidence references.
- The user can review and edit the report before sharing.
- The report records when it was generated and the data period used.

## Epic 8 — Trust, security, and feedback

### US-020: Understand an AI result

**As a** user, **I want** to know why SitePilot produced an estimate or alert **so that** I can decide whether to trust it.

**Acceptance criteria**

- The output includes an explanation, evidence, confidence, timestamp, and model or ruleset version.
- The system states when evidence is insufficient.
- The system does not present an unconfirmed result as fact.

### US-021: Protect project privacy

**As a** company administrator, **I want** project information isolated from other customers **so that** confidential data remains private.

**Acceptance criteria**

- Users see only authorized companies and projects.
- File links expire and require authorization.
- Sensitive actions are audited.
- Private customer data is not used for model training without explicit agreement.

### US-022: Provide feedback on recommendations

**As a** project leader, **I want** to accept, edit, or reject recommendations **so that** SitePilot can be measured against real outcomes.

**Acceptance criteria**

- Feedback is stored with the original recommendation.
- The user can record the reason and observed outcome.
- Product metrics can distinguish accepted, modified, dismissed, and completed recommendations.

## First prototype test

The static prototype is successful when a construction professional can open it on a phone and correctly identify:

1. Whether the project is ahead or behind.
2. The three most urgent risks.
3. The actions that should happen today.
4. The evidence or explanation behind each risk.