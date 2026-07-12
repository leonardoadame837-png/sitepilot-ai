const SAMPLE_DATA_PATH = "../data/sample-project.json";

const fallbackProject = {
  project: {
    id: "SP-DEMO-001",
    name: "Harbor Point Medical Office",
    client: "Harbor Point Development",
    location: "San Diego, California",
    startDate: "2026-03-02",
    targetFinishDate: "2027-01-29",
    lastUpdated: "2026-07-11T16:30:00-07:00",
    health: "At risk",
    plannedProgress: 42,
    actualProgress: 34
  },
  risks: [],
  actions: [],
  activities: [],
  dailyBriefing: "Sample data could not be loaded. Run this prototype through a local web server to load data/sample-project.json."
};

let projectData = fallbackProject;

const elements = {
  projectClient: document.querySelector("#projectClient"),
  projectName: document.querySelector("#projectName"),
  projectMeta: document.querySelector("#projectMeta"),
  projectHealth: document.querySelector("#projectHealth"),
  plannedProgress: document.querySelector("#plannedProgress"),
  actualProgress: document.querySelector("#actualProgress"),
  scheduleVariance: document.querySelector("#scheduleVariance"),
  openRisks: document.querySelector("#openRisks"),
  plannedBar: document.querySelector("#plannedBar"),
  actualBar: document.querySelector("#actualBar"),
  plannedBarLabel: document.querySelector("#plannedBarLabel"),
  actualBarLabel: document.querySelector("#actualBarLabel"),
  lastUpdated: document.querySelector("#lastUpdated"),
  riskList: document.querySelector("#riskList"),
  actionList: document.querySelector("#actionList"),
  activityTable: document.querySelector("#activityTable"),
  dailyBriefing: document.querySelector("#dailyBriefing"),
  riskFilter: document.querySelector("#riskFilter"),
  refreshButton: document.querySelector("#refreshButton"),
  statusMessage: document.querySelector("#statusMessage")
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeClass(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(value, includeTime = false) {
  if (!value) return "Not provided";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(includeTime ? { hour: "numeric", minute: "2-digit" } : {})
  }).format(date);
}

function formatPercent(value) {
  const number = Number(value);
  return Number.isFinite(number) ? `${Math.round(number)}%` : "—";
}

function getVariance(project) {
  return Number(project.actualProgress || 0) - Number(project.plannedProgress || 0);
}

function renderProjectSummary(data) {
  const project = data.project;
  const variance = getVariance(project);
  const openRisks = data.risks.filter((risk) => risk.status !== "closed").length;

  elements.projectClient.textContent = project.client;
  elements.projectName.textContent = project.name;
  elements.projectMeta.textContent = `${project.location} • ${formatDate(project.startDate)}–${formatDate(project.targetFinishDate)}`;
  elements.projectHealth.textContent = project.health;
  elements.plannedProgress.textContent = formatPercent(project.plannedProgress);
  elements.actualProgress.textContent = formatPercent(project.actualProgress);
  elements.scheduleVariance.textContent = `${variance > 0 ? "+" : ""}${variance} pts`;
  elements.openRisks.textContent = String(openRisks);
  elements.lastUpdated.textContent = `Updated ${formatDate(project.lastUpdated, true)}`;

  elements.plannedBar.style.width = `${Math.min(100, Math.max(0, project.plannedProgress))}%`;
  elements.actualBar.style.width = `${Math.min(100, Math.max(0, project.actualProgress))}%`;
  elements.plannedBarLabel.textContent = formatPercent(project.plannedProgress);
  elements.actualBarLabel.textContent = formatPercent(project.actualProgress);
}

function renderRisks(data, filter = "all") {
  const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
  const risks = data.risks
    .filter((risk) => risk.status !== "closed")
    .filter((risk) => filter === "all" || risk.severity === filter)
    .sort((a, b) => (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0));

  if (!risks.length) {
    elements.riskList.innerHTML = '<div class="empty-state">No active risks match this filter.</div>';
    return;
  }

  elements.riskList.innerHTML = risks.map((risk) => `
    <article class="risk-card">
      <span class="badge ${normalizeClass(risk.severity)}">${escapeHtml(risk.severity)}</span>
      <h3>${escapeHtml(risk.title)}</h3>
      <p>${escapeHtml(risk.explanation)}</p>
      <div class="meta-line">
        <span><strong>Area:</strong> ${escapeHtml(risk.area)}</span>
        <span><strong>Trade:</strong> ${escapeHtml(risk.trade)}</span>
        <span><strong>Impact:</strong> ${escapeHtml(risk.scheduleImpact)}</span>
        <span><strong>Confidence:</strong> ${formatPercent(risk.confidence)}</span>
      </div>
    </article>
  `).join("");
}

function renderActions(data) {
  const actions = data.actions.filter((action) => action.status !== "complete");

  if (!actions.length) {
    elements.actionList.innerHTML = '<div class="empty-state">No open recommended actions.</div>';
    return;
  }

  elements.actionList.innerHTML = actions.map((action) => `
    <article class="action-card">
      <span class="badge ${normalizeClass(action.priority)}">${escapeHtml(action.priority)}</span>
      <h3>${escapeHtml(action.action)}</h3>
      <p>${escapeHtml(action.reason)}</p>
      <div class="meta-line">
        <span><strong>Owner:</strong> ${escapeHtml(action.owner)}</span>
        <span><strong>Due:</strong> ${formatDate(action.dueDate)}</span>
      </div>
    </article>
  `).join("");
}

function renderActivities(data) {
  if (!data.activities.length) {
    elements.activityTable.innerHTML = '<tr><td colspan="7">No activities available.</td></tr>';
    return;
  }

  elements.activityTable.innerHTML = data.activities.map((activity) => `
    <tr>
      <td><strong>${escapeHtml(activity.name)}</strong><br><span class="muted">${escapeHtml(activity.id)}</span></td>
      <td>${escapeHtml(activity.area)}</td>
      <td>${escapeHtml(activity.trade)}</td>
      <td>${formatDate(activity.startDate)}</td>
      <td>${formatPercent(activity.plannedProgress)}</td>
      <td>${formatPercent(activity.actualProgress)}</td>
      <td><span class="badge ${normalizeClass(activity.status)}">${escapeHtml(activity.status)}</span></td>
    </tr>
  `).join("");
}

function renderDashboard(data) {
  renderProjectSummary(data);
  renderRisks(data, elements.riskFilter.value);
  renderActions(data);
  renderActivities(data);
  elements.dailyBriefing.textContent = data.dailyBriefing;
}

async function loadProjectData() {
  elements.statusMessage.textContent = "Loading project data…";
  elements.refreshButton.disabled = true;

  try {
    const response = await fetch(SAMPLE_DATA_PATH, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Data request failed with status ${response.status}`);
    }

    projectData = await response.json();
    renderDashboard(projectData);
    elements.statusMessage.textContent = "Sample project data loaded.";
  } catch (error) {
    projectData = fallbackProject;
    renderDashboard(projectData);
    elements.statusMessage.textContent = "The dashboard loaded in fallback mode. Use a local web server to load the JSON sample data.";
    console.error(error);
  } finally {
    elements.refreshButton.disabled = false;
  }
}

elements.riskFilter.addEventListener("change", () => {
  renderRisks(projectData, elements.riskFilter.value);
});

elements.refreshButton.addEventListener("click", loadProjectData);

document.addEventListener("DOMContentLoaded", loadProjectData);