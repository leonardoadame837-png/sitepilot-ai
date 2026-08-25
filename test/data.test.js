import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../data/sample-project.json", import.meta.url), "utf8"));

test("sample project contains the required dashboard sections", () => {
  assert.ok(data.project);
  assert.ok(Array.isArray(data.activities));
  assert.ok(Array.isArray(data.evidence));
  assert.ok(Array.isArray(data.risks));
  assert.ok(Array.isArray(data.actions));
  assert.equal(typeof data.dailyBriefing, "string");
});

test("progress values are valid percentages", () => {
  assert.ok(data.project.plannedProgress >= 0 && data.project.plannedProgress <= 100);
  assert.ok(data.project.actualProgress >= 0 && data.project.actualProgress <= 100);

  for (const activity of data.activities) {
    assert.ok(activity.plannedProgress >= 0 && activity.plannedProgress <= 100);
    assert.ok(activity.actualProgress >= 0 && activity.actualProgress <= 100);
  }
});

test("risk evidence references resolve to known evidence", () => {
  const evidenceIds = new Set(data.evidence.map((item) => item.id));
  for (const risk of data.risks) {
    for (const evidenceId of risk.evidenceIds || []) {
      assert.ok(evidenceIds.has(evidenceId), `${risk.id} references missing ${evidenceId}`);
    }
  }
});

test("risk actions reference known risks", () => {
  const riskIds = new Set(data.risks.map((risk) => risk.id));
  for (const action of data.actions) {
    assert.ok(riskIds.has(action.riskId), `${action.id} references missing ${action.riskId}`);
  }
});
