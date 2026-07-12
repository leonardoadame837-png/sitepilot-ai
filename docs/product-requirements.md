# SitePilot AI Product Requirements

## 1. Product summary

SitePilot AI is a construction project intelligence platform that helps field and office teams understand actual progress, detect schedule risk, and decide what action to take next.

The first product release focuses on an **AI Progress Tracker and Delay Predictor**. It will combine schedule data, field photos, daily reports, and user-confirmed progress to produce an evidence-backed project dashboard and prioritized action list.

## 2. Problem

Construction teams often manage project information across disconnected schedules, photos, drawings, reports, RFIs, spreadsheets, and project-management systems. Progress is frequently estimated manually, reported late, or described differently by each person. This makes it difficult to identify handoff conflicts, incomplete prerequisite work, inspection delays, and schedule slippage before they become expensive.

## 3. Target users

### Primary users

- Superintendent
- Project manager
- Project engineer

### Secondary users

- Owner or developer
- Scheduler
- Trade partner
- Quality manager
- Safety manager

## 4. Primary user outcome

Within one minute, a project leader should be able to answer:

- What is the current project status?
- Which activities are behind or at risk?
- What evidence supports each alert?
- What should the team do today?
- Who owns each action and when is it due?

## 5. MVP goals

- Create a clear project health dashboard.
- Compare planned progress with confirmed actual progress.
- Identify delayed, blocked, and high-risk activities.
- Show evidence supporting each progress estimate and alert.
- Generate practical action recommendations.
- Reduce the time required to prepare weekly progress reports.
- Work well on mobile devices used in the field.

## 6. Non-goals for the first release

- Fully autonomous schedule changes.
- Automatic approval of AI-generated progress.
- Real-time drone or live-camera processing.
- Complete BIM coordination.
- Payroll, accounting, estimating, or payment processing.
- Replacement of Procore, Autodesk Construction Cloud, Primavera P6, or Microsoft Project.
- Safety enforcement or legally binding compliance decisions.

## 7. Core workflow

1. An authorized user creates a project.
2. The user uploads or imports a schedule.
3. The team defines project areas and trades.
4. Field users upload photos and daily notes.
5. SitePilot AI suggests the related area, trade, and schedule activity.
6. SitePilot AI proposes an actual progress estimate and confidence level.
7. An authorized user confirms or edits the estimate.
8. The system compares planned and confirmed actual progress.
9. The system generates risk alerts and recommended actions.
10. Users assign, track, and close actions.
11. The system produces a daily briefing and weekly report.

## 8. Functional requirements

### FR-1: Project management

- Create, edit, archive, and view projects.
- Store project name, location, dates, client, project type, status, and timezone.
- Assign users to project roles.

### FR-2: Role-based access

- Support at minimum administrator, project manager, superintendent, contributor, and viewer roles.
- Restrict uploads, approvals, assignments, exports, and administration by role.
- Record important user actions in an audit log.

### FR-3: Schedule import

- Accept CSV schedule files in the MVP.
- Store activity ID, name, start, finish, duration, status, percent complete, predecessor, area, trade, and milestone status where available.
- Validate required fields and display import errors clearly.
- Preserve the original uploaded file.

### FR-4: Field evidence

- Upload photos and written field notes.
- Capture upload date, observation date, uploader, area, trade, activity, and description.
- Allow users to correct AI-suggested tags.
- Link multiple evidence items to one activity.

### FR-5: Progress tracking

- Display planned, reported, AI-suggested, and confirmed progress separately.
- Require authorized confirmation before an AI estimate becomes official.
- Store confidence, supporting evidence, confirming user, and confirmation timestamp.
- Show progress by project, area, trade, and activity.

### FR-6: Risk detection

- Detect overdue activities.
- Detect activities with actual progress below planned progress.
- Detect upcoming activities whose prerequisites are incomplete.
- Detect unresolved inspection, material, access, or trade handoff blockers when that data is available.
- Assign each alert a severity, likelihood, impact, urgency, confidence, and explanation.

### FR-7: Recommended actions

- Generate a recommended action for each material risk.
- Identify the suggested responsible role and target completion date.
- Allow a user to accept, edit, assign, dismiss, or complete the action.
- Record the reason when an alert or recommendation is dismissed.

### FR-8: Dashboard

- Show project health, overall planned progress, confirmed actual progress, variance, open risks, overdue actions, and upcoming milestones.
- Rank alerts by severity and urgency.
- Provide filters for area, trade, status, and risk level.
- Link dashboard cards to underlying activities and evidence.

### FR-9: Reporting

- Generate a daily field briefing.
- Generate a weekly project summary.
- Include progress, variance, completed work, upcoming work, top risks, actions, and evidence references.
- Export reports to PDF and project data to CSV in a later MVP iteration.

### FR-10: Feedback and learning

- Capture acceptance, edits, dismissals, and outcomes for AI recommendations.
- Store model or ruleset version with each AI output.
- Make feedback available for evaluation without exposing one customer’s private data to another.

## 9. Data requirements

The MVP should support these primary entities:

- Company
- User
- Project
- Project membership
- Area or zone
- Trade
- Schedule activity
- Schedule dependency
- Evidence item
- Progress observation
- Progress confirmation
- Risk alert
- Recommended action
- Report
- Audit event

## 10. AI output requirements

Every AI-generated estimate, alert, or recommendation must include:

- A plain-language explanation.
- A confidence level.
- References to supporting project evidence.
- The generation timestamp.
- The model or ruleset version.
- A visible indication that the result is AI-generated until confirmed.

The system must not invent project facts when evidence is missing. It should state that more information is required.

## 11. Non-functional requirements

### Usability

- Mobile-first responsive design.
- Large touch targets and readable text.
- Important actions available within three taps from the dashboard.
- Plain construction language instead of technical AI terminology.

### Performance

- Dashboard initial load target under three seconds on a typical mobile connection after authentication.
- User actions should show feedback immediately.
- Long-running analysis should display clear processing status.

### Security and privacy

- Encrypt data in transit and at rest.
- Use least-privilege access.
- Separate customer data by tenant and project.
- Validate uploads and restrict file types and sizes.
- Protect signed file links with expiration.
- Maintain audit logs for sensitive actions.
- Support deletion and retention policies.
- Never use private customer data for model training without explicit agreement.

### Reliability

- Preserve original uploaded files.
- Make AI processing retryable and idempotent.
- Back up critical project data.
- Clearly identify stale or incomplete project information.

### Accessibility

- Use semantic HTML and keyboard-accessible controls.
- Do not rely on color alone to communicate status.
- Target WCAG 2.1 AA for the production interface.

## 12. MVP acceptance criteria

The MVP is ready for a controlled pilot when:

- A project can be created with users and roles.
- A valid CSV schedule can be imported.
- Photos and notes can be linked to project activities.
- Planned and confirmed actual progress can be compared.
- At-risk activities appear in a prioritized dashboard.
- Each alert links to evidence and has an explanation.
- A user can assign and close recommended actions.
- A weekly project summary can be generated.
- The main workflow works on a phone.
- Permission and audit-log tests pass.

## 13. Success metrics

### Product metrics

- Weekly active users per project.
- Percentage of activities with current evidence.
- Time from field observation to confirmed progress update.
- Alert review rate.
- Recommendation acceptance rate.
- Report generation and export usage.

### Outcome metrics

- Weekly reporting hours saved.
- Delay risks identified before impact.
- Avoided or reduced delay days confirmed by users.
- Rework risks identified before installation cover-up.
- Improvement in planned-versus-actual reporting accuracy.

## 14. Open decisions

- First project segment: commercial, residential, civil, concrete, or another specialty.
- First paid customer profile.
- Pilot pricing model.
- Required CSV schedule format.
- Whether the first AI version uses rules, a multimodal model, or a hybrid approach.
- Minimum evidence and confidence required before suggesting progress.
- Data retention period for photos and generated results.