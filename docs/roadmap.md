# SitePilot AI Roadmap

This roadmap turns the SitePilot AI vision into a focused, testable product. The first release concentrates on one job: compare planned construction work with actual field progress and surface delay risks early enough for the project team to act.

## Product principles

1. **Field-first:** The product must be fast and simple enough for a superintendent to use from a phone.
2. **Evidence before prediction:** Every alert should point to the schedule activity, project area, photo, report, or document that supports it.
3. **Human approval:** SitePilot AI recommends actions; authorized project staff make final decisions.
4. **Integrate before replacing:** The platform should connect with existing construction systems instead of forcing teams to abandon them.
5. **Measure financial impact:** Track avoided delay days, reduced reporting time, prevented rework, and improved schedule reliability.

## Phase 0 — Product validation

**Goal:** Confirm that progress visibility and delay prediction solve an urgent, expensive problem.

### Work

- Interview 10–15 superintendents, project managers, project engineers, and owners.
- Collect anonymized examples of schedules, daily reports, progress photos, RFIs, and weekly reports.
- Document the current progress-reporting workflow and time spent.
- Identify the first trade, project type, and customer profile to target.
- Create low-fidelity mobile and desktop wireframes.

### Exit criteria

- At least five professionals confirm they would test the MVP.
- At least three provide sample project data or agree to a pilot.
- One measurable outcome is selected for the pilot, such as reporting hours saved or delay risks identified earlier.

## Phase 1 — Clickable dashboard prototype

**Goal:** Demonstrate the complete user workflow without requiring production AI.

### Work

- Build the project dashboard in `src/`.
- Load a sample project from `data/sample-project.json`.
- Display schedule health, overall progress, critical alerts, upcoming activities, and recommended actions.
- Add filters for project area, trade, and risk level.
- Test the interface on a phone with field users.

### Exit criteria

- A user can understand project status in under one minute.
- A superintendent can identify the top three actions without training.
- The dashboard works on common phone and desktop screen sizes.

## Phase 2 — MVP foundation

**Goal:** Replace sample data with secure project data and basic collaboration.

### Work

- User authentication and role-based access.
- Company, project, team, and permission management.
- Schedule upload using CSV as the first supported format.
- Photo and daily-report upload.
- Project areas, trades, activities, and milestones.
- Manual progress updates with evidence links.
- Audit log for changes and approvals.

### Exit criteria

- A pilot project can be created and managed securely.
- Users can upload a schedule and connect field evidence to activities.
- All important actions are permission-controlled and auditable.

## Phase 3 — Progress intelligence

**Goal:** Help teams convert field evidence into consistent progress estimates.

### Work

- Classify uploaded photos by project, date, area, and trade.
- Suggest which schedule activity each photo supports.
- Generate progress summaries from photos and field notes.
- Show planned versus actual progress by area and activity.
- Require user confirmation before AI-generated progress becomes official.
- Track confidence and the evidence used for each estimate.

### Exit criteria

- Pilot users confirm that summaries are useful and traceable.
- Confirmed progress estimates meet an agreed accuracy threshold.
- Weekly reporting time is reduced from the pilot baseline.

## Phase 4 — Delay-risk engine

**Goal:** Detect schedule problems early and recommend practical responses.

### Work

- Calculate variance between planned and confirmed actual progress.
- Identify overdue activities, blocked work, inspection dependencies, and near-term handoff conflicts.
- Score delay risk by likelihood, impact, urgency, and confidence.
- Generate recommended actions with a responsible role and due date.
- Add a three-week lookahead risk view.
- Capture whether users accept, reject, or modify each recommendation.

### Exit criteria

- Alerts are explainable and link to supporting evidence.
- Pilot teams agree that alerts arrive early enough to influence decisions.
- False-positive and dismissed-alert rates are measured and improving.

## Phase 5 — Pilot reporting and ROI

**Goal:** Prove operational and financial value on active projects.

### Work

- Automated daily briefing for field leaders.
- Weekly owner-ready report.
- Risk and action history.
- Baseline-versus-pilot comparison.
- ROI dashboard for time saved, risks addressed, and potential delay exposure.
- Export to PDF and CSV.

### Exit criteria

- At least one completed pilot with documented results.
- A repeatable onboarding process.
- A clear paid plan based on project size, active users, or monitored project value.

## Later expansion

After the MVP is validated, expand in this order:

1. Primavera P6 and Microsoft Project imports.
2. Procore and Autodesk Construction Cloud connectors.
3. Drawing and BIM linking.
4. Quality and punch-list intelligence.
5. Safety observations and trend analysis.
6. Procurement and long-lead material risk.
7. Contract, RFI, submittal, and change-order intelligence.
8. Digital twin and owner command center.
9. Operations and maintenance handover.

## MVP success metrics

- Weekly reporting time saved per project.
- Percentage of schedule activities with current progress evidence.
- Delay risks identified before the affected activity start date.
- Recommendation acceptance rate.
- False-positive alert rate.
- Avoided or reduced delay days documented by the project team.
- User retention during the pilot.
- Number of active projects converted to paid use.

## Immediate next milestone

Build and test the static dashboard prototype using the files in `src/` and `data/`, then interview field users with the prototype open on a phone.