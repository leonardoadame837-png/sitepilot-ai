# SitePilot AI

**SitePilot AI** is an AI-powered construction command center for project progress tracking, delay prediction, safety monitoring, quality control, procurement risk, and digital twin project intelligence.

> Help construction teams understand what is happening on-site, what is going wrong, and what action to take next.

## Overview

Construction projects often suffer from schedule delays, cost overruns, safety risks, rework, poor documentation, and disconnected communication between office and field teams.

Most project data already exists, but it is spread across drawings, schedules, RFIs, submittals, daily reports, field photos, contracts, and project-management platforms. SitePilot AI brings that information together and turns it into useful project decisions.

## Product Vision

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

The first version will let project teams upload a construction schedule, drawings, and site photos. The system will compare planned work against actual site progress and generate delay-risk alerts.

### MVP Features

- Upload project schedules
- Upload drawings or BIM files
- Upload site photos
- Track completed work by area, trade, or activity
- Compare planned progress with actual progress
- Predict activities likely to delay the project
- Generate daily action recommendations
- Create automatic weekly owner reports

### Example

A superintendent walks the jobsite and uploads photos. SitePilot AI analyzes the images and reports:

> Level 3 electrical rough-in appears 80% complete. Drywall is scheduled to start tomorrow, but firestopping inspection is not complete. This creates a high rework risk. Recommended action: delay drywall in Zone B, notify the electrical subcontractor, and update the 3-week lookahead schedule.

## Target Users

- General contractors
- Owners and developers
- Project managers
- Superintendents
- Project engineers
- Estimators
- Safety managers
- Quality-control teams
- Subcontractors
- Construction consultants

## Core Modules

### 1. AI Progress Tracker

Tracks progress using photos, videos, drones, 360° cameras, or site scans. It will compare field images with drawings or BIM, identify completed or missing work, track progress by location and trade, and create visual timelines.

### 2. Schedule Risk Predictor

Identifies delayed activities and critical-path risks, compares planned with actual progress, recommends resequencing, and generates schedule-impact warnings.

### 3. AI Estimator

Extracts quantities from drawings, estimates material needs, compares estimates with historical data, flags unclear scope, and supports bid preparation.

### 4. Safety AI

Uses computer vision and field reports to detect missing PPE, unsafe worker-equipment proximity, fall hazards, restricted-zone entry, and safety trends.

### 5. Quality Inspector

Detects visible defects and incomplete work, compares installations with drawings, identifies rework risks, and tracks punch-list items.

### 6. Procurement Brain

Predicts shortages, monitors delivery risks, matches material needs to the schedule, tracks long-lead items, and recommends order dates.

### 7. Contract Copilot

Summarizes contracts, reviews RFIs and submittals, identifies change-order risks, highlights notice deadlines, and enables natural-language document search.

### 8. Digital Twin Dashboard

Connects schedule, cost, quality, safety, procurement, and progress data through project health scores, risk dashboards, zone maps, trade insights, and owner-ready summaries.

## Roadmap

### Phase 1 — Research and Product Definition

Interview construction professionals, validate the highest-value pain point, define personas and data needs, study competitors, gather sample project files, and create wireframes.

**Deliverables:** Product requirements document, MVP scope, user stories, competitor analysis, and initial UI wireframes.

### Phase 2 — MVP Prototype

Build authentication, project creation, schedule/drawing/photo uploads, a basic dashboard, manual area tagging, AI progress summaries, delay alerts, and weekly reporting.

**Deliverables:** Clickable web prototype, backend API, file storage, progress-summary engine, and reporting dashboard.

### Phase 3 — Computer Vision Progress Tracking

Add area/trade photo classification, planned-versus-actual visual comparison, progress estimation, zone tracking, image history, and basic defect detection.

### Phase 4 — Schedule Intelligence

Import Primavera P6, Microsoft Project, and CSV schedules; map activities to zones; calculate planned-versus-actual performance; predict delays; identify critical-path risks; and recommend recovery actions.

### Phase 5 — BIM and Drawing Integration

Add IFC/BIM and PDF viewers, link photos to model locations and elements, identify incomplete scope, and support quantity tracking.

### Phase 6 — Safety and Quality AI

Add PPE and hazard detection, quality tagging, punch-list generation, trend dashboards, and risk reports.

### Phase 7 — Procurement and Cost Risk

Track deliveries and long-lead items, predict shortages, connect delivery delays to schedule impact, estimate delay costs, and alert users to budget risk.

### Phase 8 — Contract and Document Intelligence

Search and summarize contracts, RFIs, submittals, meeting notes, and specifications; identify deadlines and change-order risks; and generate RFI and meeting-summary drafts.

### Phase 9 — Digital Twin Command Center

Build real-time project health, schedule, cost, safety, and quality views; zone-based intelligence; executive reporting; and an owner portal.

### Phase 10 — Operations and Maintenance Handover

Extend the platform to asset records, equipment history, warranties, maintenance schedules, predictive maintenance, and facility-management integrations.

## Suggested Tech Stack

### Frontend

- React and Next.js
- Tailwind CSS
- Map or floor-plan visualization
- Three.js or IFC.js for BIM viewing

### Backend

- Node.js or Python with FastAPI
- PostgreSQL
- Redis
- Object storage for photos, drawings, and BIM files
- REST or GraphQL API

### AI and Machine Learning

- Computer vision for photo analysis
- Large language models for document understanding
- Predictive analytics for schedule and cost risk
- OCR for drawings and scanned documents
- Retrieval-augmented generation for project-document search

### Integrations

- Procore
- Autodesk Construction Cloud
- Primavera P6
- Microsoft Project
- Bluebeam
- SharePoint
- Google Drive
- Drone and 360° camera platforms
- BIM/IFC model viewers

## Key Metrics

- Schedule accuracy
- Progress-reporting speed
- Delay-prediction accuracy
- Rework reduction
- Safety-risk detection
- Quality-issue detection
- RFI response time
- Change-order visibility
- Owner-reporting time
- Project-cost predictability

## Competitive Advantage

Most construction tools solve one problem at a time. SitePilot AI combines progress tracking, schedule intelligence, safety monitoring, quality control, procurement risk, document intelligence, and digital twin dashboards.

The platform is designed to become the decision-making layer above existing construction software.

## Long-Term Vision

The long-term goal is an AI project manager assistant that can answer:

- Is this project on schedule?
- What work is behind?
- Which subcontractor is creating delay risk?
- What materials need to be ordered now?
- What safety or quality issues need immediate attention?
- What change-order risks are developing?
- What should the superintendent focus on tomorrow?
- What should the owner know this week?

## Current Status

**Stage:** Concept / Pre-MVP

**Next milestone:** Validate the MVP with construction professionals and build the first prototype.

## Research Foundation

This product direction is supported by construction technology trends involving AI-enabled BIM, digital twins, automated progress monitoring, schedule-risk prediction, computer vision, predictive project controls, safety and quality analytics, and lifecycle asset management.

## License

To be decided.

## Contact

**Project owner:** Leonardo Adame
