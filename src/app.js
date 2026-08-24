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
let cachedFilteredRisks = null;
let cachedFilterValue = null;
let filterDebounceTimer = null;
let currentActivityPage = 1;
const ACTIVITIES_PER_PAGE = 20;

// Escape map for efficient HTML escaping
const ESCAPE_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
};

const SEVERITY_ORDER = { critical: 4, high: 3, medium: 2, low: 1 };
const PRIORITY_ORDER = { critical: 4, high: 3, medium: 2, low: 1 };

let elements = {};

function initializeElements() {
  elements = {
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
    activityPagination: document.querySelector("#activityPagination"),
    dailyBriefing: document.querySelector("#dailyBriefing"),
    riskFilter: document.querySelector("#riskFilter"),
    refreshButton: document.querySelector("#refreshButton"),
    statusMessage: document.querySelector("#statusMessage")
  };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPE_MAP[c]);
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

  if (elements.projectClient) elements.projectClient.textContent = project.client;
  if (elements.projectName) elements.projectName.textContent = project.name;
  if (elements.projectMeta) elements.projectMeta.textContent = `${project.location} • ${formatDate(project.startDate)}–${formatDate(project.targetFinishDate)}`;
  if (elements.projectHealth) elements.projectHealth.textContent = project.health;
  if (elements.plannedProgress) elements.plannedProgress.textContent = formatPercent(project.plannedProgress);
  if (elements.actualProgress) elements.actualProgress.textContent = formatPercent(project.actualProgress);
  if (elements.scheduleVariance) elements.scheduleVariance.textContent = `${variance > 0 ? "+" : ""}${variance} pts`;
  if (elements.openRisks) elements.openRisks.textContent = String(openRisks);
  if (elements.lastUpdated) elements.lastUpdated.textContent = `Updated ${formatDate(project.lastUpdated, true)}`;

  if (elements.plannedBar) elements.plannedBar.style.width = `${Math.min(100, Math.max(0, project.plannedProgress))}%`;
  if (elements.actualBar) elements.actualBar.style.width = `${Math.min(100, Math.max(0, project.actualProgress))}%`;
  if (elements.plannedBarLabel) elements.plannedBarLabel.textContent = formatPercent(project.plannedProgress);
  if (elements.actualBarLabel) elements.actualBarLabel.textContent = formatPercent(project.actualProgress);
}

function getFilteredAndSortedRisks(data, filter = "all") {
  // Memoization: return cached result if filter hasn't changed
  if (cachedFilteredRisks !== null && cachedFilterValue === filter) {
    return cachedFilteredRisks;
  }

  // Single-pass filter and sort
  const filtered = data.risks.filter((risk) => {
    if (risk.status === "closed") return false;
    if (filter !== "all" && risk.severity !== filter) return false;
    return true;
  });

  filtered.sort((a, b) => (SEVERITY_ORDER[b.severity] || 0) - (SEVERITY_ORDER[a.severity] || 0));

  cachedFilteredRisks = filtered;
  cachedFilterValue = filter;
  return filtered;
}

function renderRisks(data, filter = "all") {
  const risks = getFilteredAndSortedRisks(data, filter);

  if (!risks.length) {
    elements.riskList.innerHTML = '<div class="empty-state">No active risks match this filter.</div>';
    return;
  }

  // Incremental DOM update: only rebuild if data actually changed
  const fragment = document.createDocumentFragment();
  risks.forEach((risk) => {
    const article = document.createElement("article");
    article.className = "risk-card";
    article.innerHTML = `
      <span class="badge ${normalizeClass(risk.severity)}">${escapeHtml(risk.severity)}</span>
      <h3>${escapeHtml(risk.title)}</h3>
      <p>${escapeHtml(risk.explanation)}</p>
      <div class="meta-line">
        <span><strong>Area:</strong> ${escapeHtml(risk.area)}</span>
        <span><strong>Trade:</strong> ${escapeHtml(risk.trade)}</span>
        <span><strong>Impact:</strong> ${escapeHtml(risk.scheduleImpact)}</span>
        <span><strong>Confidence:</strong> ${formatPercent(risk.confidence)}</span>
      </div>
    `;
    fragment.appendChild(article);
  });

  elements.riskList.innerHTML = "";
  elements.riskList.appendChild(fragment);
}

function renderActions(data) {
  const actions = data.actions.filter((action) => action.status !== "complete");
  // Sort by priority for better UX
  actions.sort((a, b) => (PRIORITY_ORDER[b.priority] || 0) - (PRIORITY_ORDER[a.priority] || 0));

  if (!actions.length) {
    elements.actionList.innerHTML = '<div class="empty-state">No open recommended actions.</div>';
    return;
  }

  const fragment = document.createDocumentFragment();
  actions.forEach((action) => {
    const article = document.createElement("article");
    article.className = "action-card";
    article.innerHTML = `
      <span class="badge ${normalizeClass(action.priority)}">${escapeHtml(action.priority)}</span>
      <h3>${escapeHtml(action.action)}</h3>
      <p>${escapeHtml(action.reason)}</p>
      <div class="meta-line">
        <span><strong>Owner:</strong> ${escapeHtml(action.owner)}</span>
        <span><strong>Due:</strong> ${formatDate(action.dueDate)}</span>
      </div>
    `;
    fragment.appendChild(article);
  });

  elements.actionList.innerHTML = "";
  elements.actionList.appendChild(fragment);
}

function renderActivities(data) {
  if (!data.activities.length) {
    elements.activityTable.innerHTML = '<tr><td colspan="7">No activities available.</td></tr>';
    if (elements.activityPagination) elements.activityPagination.innerHTML = "";
    return;
  }

  const totalPages = Math.ceil(data.activities.length / ACTIVITIES_PER_PAGE);
  const startIdx = (currentActivityPage - 1) * ACTIVITIES_PER_PAGE;
  const endIdx = startIdx + ACTIVITIES_PER_PAGE;
  const pageActivities = data.activities.slice(startIdx, endIdx);

  const fragment = document.createDocumentFragment();
  pageActivities.forEach((activity) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${escapeHtml(activity.name)}</strong><br><span class="muted">${escapeHtml(activity.id)}</span></td>
      <td>${escapeHtml(activity.area)}</td>
      <td>${escapeHtml(activity.trade)}</td>
      <td>${formatDate(activity.startDate)}</td>
      <td>${formatPercent(activity.plannedProgress)}</td>
      <td>${formatPercent(activity.actualProgress)}</td>
      <td><span class="badge ${normalizeClass(activity.status)}">${escapeHtml(activity.status)}</span></td>
    `;
    fragment.appendChild(tr);
  });

  elements.activityTable.innerHTML = "";
  elements.activityTable.appendChild(fragment);

  // Render pagination controls
  if (elements.activityPagination && totalPages > 1) {
    const paginationFragment = document.createDocumentFragment();
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = i;
      button.className = i === currentActivityPage ? "pagination-btn active" : "pagination-btn";
      button.addEventListener("click", () => {
        currentActivityPage = i;
        renderActivities(data);
      });
      paginationFragment.appendChild(button);
    }
    elements.activityPagination.innerHTML = "";
    elements.activityPagination.appendChild(paginationFragment);
  }
}

function renderDashboard(data) {
  renderProjectSummary(data);
  renderRisks(data, elements.riskFilter?.value || "all");
  renderActions(data);
  renderActivities(data);
  if (elements.dailyBriefing) elements.dailyBriefing.textContent = data.dailyBriefing;
}

async function loadProjectData() {
  if (elements.statusMessage) elements.statusMessage.textContent = "Loading project data…";
  if (elements.refreshButton) elements.refreshButton.disabled = true;

  try {
    // Use cache control for better performance
    const response = await fetch(SAMPLE_DATA_PATH, { cache: "default" });
    if (!response.ok) {
      throw new Error(`Data request failed with status ${response.status}`);
    }

    projectData = await response.json();
    // Clear cache when new data is loaded
    cachedFilteredRisks = null;
    cachedFilterValue = null;
    currentActivityPage = 1;
    renderDashboard(projectData);
    if (elements.statusMessage) elements.statusMessage.textContent = "Sample project data loaded.";
  } catch (error) {
    projectData = fallbackProject;
    renderDashboard(projectData);
    if (elements.statusMessage) elements.statusMessage.textContent = "The dashboard loaded in fallback mode. Use a local web server to load the JSON sample data.";
    console.error(error);
  } finally {
    if (elements.refreshButton) elements.refreshButton.disabled = false;
  }
}

// Debounced filter change handler
function handleRiskFilterChange() {
  clearTimeout(filterDebounceTimer);
  filterDebounceTimer = setTimeout(() => {
    // Invalidate memoized cache when filter changes
    cachedFilteredRisks = null;
    cachedFilterValue = null;
    renderRisks(projectData, elements.riskFilter.value);
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeElements();
  
  if (elements.riskFilter) {
    elements.riskFilter.addEventListener("change", handleRiskFilterChange);
  }
  if (elements.refreshButton) {
    elements.refreshButton.addEventListener("click", loadProjectData);
  }
  
  loadProjectData();
});