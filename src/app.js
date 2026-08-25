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

// Elements will be populated during init() to avoid running querySelector before the DOM is ready
const elements = {
  projectClient: null,
  projectName: null,
  projectMeta: null,
  projectHealth: null,
  plannedProgress: null,
  actualProgress: null,
  scheduleVariance: null,
  openRisks: null,
  plannedBar: null,
  actualBar: null,
  plannedBarLabel: null,
  actualBarLabel: null,
  lastUpdated: null,
  riskList: null,
  actionList: null,
  activityTable: null,
  dailyBriefing: null,
  riskFilter: null,
  refreshButton: null,
  statusMessage: null
};

// Small safe helpers so rendering tolerates missing DOM nodes
function safeSetText(el, text) {
  if (!el) return;
  el.textContent = text;
}

function safeSetHTML(el, html) {
  if (!el) return;
  el.innerHTML = html;
}

function safeSetWidth(el, width) {
  if (!el) return;
  el.style.width = width;
}

function safeAddEvent(el, event, handler) {
  if (!el) return;
  el.addEventListener(event, handler);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

  safeSetText(elements.projectClient, project.client);
  safeSetText(elements.projectName, project.name);
  safeSetText(elements.projectMeta, `${project.location} • ${formatDate(project.startDate)}–${formatDate(project.targetFinishDate)}`);
  safeSetText(elements.projectHealth, project.health);
  safeSetText(elements.plannedProgress, formatPercent(project.plannedProgress));
  safeSetText(elements.actualProgress, formatPercent(project.actualProgress));
  safeSetText(elements.scheduleVariance, `${variance > 0 ? "+" : ""}${variance} pts`);
  safeSetText(elements.openRisks, String(openRisks));
  safeSetText(elements.lastUpdated, `Updated ${formatDate(project.lastUpdated, true)}`);

  const plannedWidth = `${Math.min(100, Math.max(0, project.plannedProgress))}%`;
  const actualWidth = `${Math.min(100, Math.max(0, project.actualProgress))}%`;

  safeSetWidth(elements.plannedBar, plannedWidth);
  safeSetWidth(elements.actualBar, actualWidth);
  safeSetText(elements.plannedBarLabel, formatPercent(project.plannedProgress));
  safeSetText(elements.actualBarLabel, formatPercent(project.actualProgress));

  // Add ARIA attributes for accessibility
  if (elements.plannedBar) {
    elements.plannedBar.setAttribute("role", "progressbar");
    elements.plannedBar.setAttribute("aria-valuemin", "0");
    elements.plannedBar.setAttribute("aria-valuemax", "100");
    elements.plannedBar.setAttribute("aria-valuenow", String(Math.round(Number(project.plannedProgress) || 0)));
  }

  if (elements.actualBar) {
    elements.actualBar.setAttribute("role", "progressbar");
    elements.actualBar.setAttribute("aria-valuemin", "0");
    elements.actualBar.setAttribute("aria-valuemax", "100");
    elements.actualBar.setAttribute("aria-valuenow", String(Math.round(Number(project.actualProgress) || 0)));
  }
}

function renderRisks(data, filter = "all") {
  const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
  const risks = data.risks
    .filter((risk) => risk.status !== "closed")
    .filter((risk) => filter === "all" || risk.severity === filter)
    .sort((a, b) => (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0));

  if (!risks.length) {
    safeSetHTML(elements.riskList, '<div class="empty-state">No active risks match this filter.</div>');
    return;
  }

  // Use DocumentFragment to avoid large innerHTML usage while preserving escaping
  if (!elements.riskList) return;
  const frag = document.createDocumentFragment();

  risks.forEach((risk) => {
    const article = document.createElement('article');
    article.className = 'risk-card';

    const badge = document.createElement('span');
    badge.className = `badge ${normalizeClass(risk.severity)}`;
    badge.textContent = risk.severity;
    article.appendChild(badge);

    const h3 = document.createElement('h3');
    h3.textContent = risk.title;
    article.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = risk.explanation;
    article.appendChild(p);

    const meta = document.createElement('div');
    meta.className = 'meta-line';
    meta.innerHTML = `
      <span><strong>Area:</strong> ${escapeHtml(risk.area)}</span>
      <span><strong>Trade:</strong> ${escapeHtml(risk.trade)}</span>
      <span><strong>Impact:</strong> ${escapeHtml(risk.scheduleImpact)}</span>
      <span><strong>Confidence:</strong> ${formatPercent(risk.confidence)}</span>
    `;
    article.appendChild(meta);

    frag.appendChild(article);
  });

  // Clear and append
  elements.riskList.innerHTML = '';
  elements.riskList.appendChild(frag);
}

function renderActions(data) {
  const actions = data.actions.filter((action) => action.status !== "complete");

  if (!actions.length) {
    safeSetHTML(elements.actionList, '<div class="empty-state">No open recommended actions.</div>');
    return;
  }

  if (!elements.actionList) return;
  const frag = document.createDocumentFragment();

  actions.forEach((action) => {
    const article = document.createElement('article');
    article.className = 'action-card';

    const badge = document.createElement('span');
    badge.className = `badge ${normalizeClass(action.priority)}`;
    badge.textContent = action.priority;
    article.appendChild(badge);

    const h3 = document.createElement('h3');
    h3.textContent = action.action;
    article.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = action.reason;
    article.appendChild(p);

    const meta = document.createElement('div');
    meta.className = 'meta-line';
    meta.innerHTML = `
      <span><strong>Owner:</strong> ${escapeHtml(action.owner)}</span>
      <span><strong>Due:</strong> ${formatDate(action.dueDate)}</span>
    `;
    article.appendChild(meta);

    frag.appendChild(article);
  });

  elements.actionList.innerHTML = '';
  elements.actionList.appendChild(frag);
}

function renderActivities(data) {
  if (!data.activities.length) {
    if (elements.activityTable) elements.activityTable.innerHTML = '<tr><td colspan="7">No activities available.</td></tr>';
    return;
  }

  if (!elements.activityTable) return;
  const frag = document.createDocumentFragment();

  data.activities.forEach((activity) => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerHTML = `<strong>${escapeHtml(activity.name)}</strong><br><span class="muted">${escapeHtml(activity.id)}</span>`;
    tr.appendChild(td1);

    const td2 = document.createElement('td');
    td2.textContent = activity.area || '';
    tr.appendChild(td2);

    const td3 = document.createElement('td');
    td3.textContent = activity.trade || '';
    tr.appendChild(td3);

    const td4 = document.createElement('td');
    td4.textContent = formatDate(activity.startDate);
    tr.appendChild(td4);

    const td5 = document.createElement('td');
    td5.textContent = formatPercent(activity.plannedProgress);
    tr.appendChild(td5);

    const td6 = document.createElement('td');
    td6.textContent = formatPercent(activity.actualProgress);
    tr.appendChild(td6);

    const td7 = document.createElement('td');
    const statusBadge = document.createElement('span');
    statusBadge.className = `badge ${normalizeClass(activity.status)}`;
    statusBadge.textContent = activity.status;
    td7.appendChild(statusBadge);
    tr.appendChild(td7);

    frag.appendChild(tr);
  });

  elements.activityTable.innerHTML = '';
  elements.activityTable.appendChild(frag);
}

function renderDashboard(data) {
  renderProjectSummary(data);
  renderRisks(data, elements.riskFilter ? elements.riskFilter.value : 'all');
  renderActions(data);
  renderActivities(data);
  safeSetText(elements.dailyBriefing, data.dailyBriefing);
}

async function loadProjectData() {
  safeSetText(elements.statusMessage, "Loading project data…");
  if (elements.refreshButton) elements.refreshButton.disabled = true;

  try {
    const response = await fetch(SAMPLE_DATA_PATH, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Data request failed with status ${response.status}`);
    }

    projectData = await response.json();
    renderDashboard(projectData);
    safeSetText(elements.statusMessage, "Sample project data loaded.");
  } catch (error) {
    projectData = fallbackProject;
    renderDashboard(projectData);
    safeSetText(elements.statusMessage, "The dashboard loaded in fallback mode. Use a local web server to load the JSON sample data.");
    // Keep the console.error for developer debugging but avoid leaking internal details to users
    console.error(error);
  } finally {
    if (elements.refreshButton) elements.refreshButton.disabled = false;
  }
}

function init() {
  // Populate element references now that DOM is ready
  elements.projectClient = document.querySelector("#projectClient");
  elements.projectName = document.querySelector("#projectName");
  elements.projectMeta = document.querySelector("#projectMeta");
  elements.projectHealth = document.querySelector("#projectHealth");
  elements.plannedProgress = document.querySelector("#plannedProgress");
  elements.actualProgress = document.querySelector("#actualProgress");
  elements.scheduleVariance = document.querySelector("#scheduleVariance");
  elements.openRisks = document.querySelector("#openRisks");
  elements.plannedBar = document.querySelector("#plannedBar");
  elements.actualBar = document.querySelector("#actualBar");
  elements.plannedBarLabel = document.querySelector("#plannedBarLabel");
  elements.actualBarLabel = document.querySelector("#actualBarLabel");
  elements.lastUpdated = document.querySelector("#lastUpdated");
  elements.riskList = document.querySelector("#riskList");
  elements.actionList = document.querySelector("#actionList");
  elements.activityTable = document.querySelector("#activityTable");
  elements.dailyBriefing = document.querySelector("#dailyBriefing");
  elements.riskFilter = document.querySelector("#riskFilter");
  elements.refreshButton = document.querySelector("#refreshButton");
  elements.statusMessage = document.querySelector("#statusMessage");

  // Wire lightweight event handlers only if elements exist
  safeAddEvent(elements.riskFilter, 'change', () => {
    renderRisks(projectData, elements.riskFilter ? elements.riskFilter.value : 'all');
  });

  safeAddEvent(elements.refreshButton, 'click', loadProjectData);

  // Initial load
  loadProjectData();
}

// Defer initialization until DOM ready to avoid null querySelector results
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
