const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);

if (!scriptMatch) {
  throw new Error("Inline JavaScript was not found.");
}

new Function(scriptMatch[1]);

function extractFunction(name) {
  const match = scriptMatch[1].match(new RegExp(`    function ${name}\\([\\s\\S]*?\\n    \\}`));
  if (!match) throw new Error(`Could not extract ${name} for behavior checks.`);
  return match[0];
}

const helperNames = ["normalizeChoices", "normalizeSnippetValue", "snippetToken", "selectedSnippetValue", "expandSnippetFields"];
const helperSource = helperNames.map(extractFunction).join("\n");
const testState = { snippetValues: { timingId: { selected: [0, 1], comments: { 1: "Focus on the key points." } } } };
const helpers = new Function("state", `${helperSource}\nreturn { ${helperNames.join(", ")} };`)(testState);
const timingSnippet = { id: "timingId", keyword: "Timing", text: "Review timing.", choices: [
  { label: "Too Fast", text: "Slow down." },
  { label: "Too Slow", text: "Increase pace." }
] };
const expandedTiming = helpers.expandSnippetFields("1. {timing}", [timingSnippet]);

const checks = {
  "Version metadata is consistent": html.includes('<meta name="application-version" content="2.6.0">') && html.includes('const appVersion = "2.6.0"') && html.includes("v2.6.0 · 15 July 2026"),
  "Build date metadata is consistent": html.includes('<meta name="build-date" content="2026-07-15">') && html.includes('const appBuildDate = "2026-07-15"'),
  "Purpose filter exists once": (html.match(/id="purposeFilter"/g) || []).length === 1,
  "Result list uses list semantics": html.includes('role="list"') && html.includes('role="listitem"'),
  "Legacy listbox semantics are absent": !html.includes('role="listbox"') && !html.includes('role="option"'),
  "aria-activedescendant is absent": !html.includes("aria-activedescendant"),
  "State schema version is exported": html.includes("schemaVersion: stateSchemaVersion"),
  "Schema 5 stores Unit categories and report work": html.includes("const stateSchemaVersion = 5") && html.includes("customCategories: []") && html.includes('reportTemplate: ""') && html.includes("snippetValues: {}"),
  "Snippet choices use a checkbox-style option editor": (html.match(/id="choiceEditorList"/g) || []).length === 1 && (html.match(/id="addChoiceBtn"/g) || []).length === 1 && html.includes('<input type="checkbox" checked disabled aria-hidden="true">') && html.includes("readChoiceEditor"),
  "Snippet Unit and Category are synchronized dropdowns": html.includes('<select id="snippetUnitInput" required>') && html.includes('<select id="categoryInput">') && html.includes("function renderSnippetUnitInput") && html.includes("Create new category…"),
  "Unit selection drives relevant snippets": html.includes("function currentUnit") && html.includes(".filter(snippet => !snippet.unit || snippet.unit === unit)") && html.includes("Choose a Unit in Report Details to load its categories and snippets."),
  "Categories can be added and renamed per Unit": html.includes('id="categoryAddBtn"') && html.includes("function addCategory") && html.includes("function renameCategory") && html.includes("item.unit === unit"),
  "Snippet editor is hidden and opened on demand": html.includes('id="snippetEditorPanel" class="panel config-floating snippet-editor-floating hidden"') && html.includes('els.newSnippetBtn.addEventListener("click", openNewSnippetEditor)') && html.includes("revealSnippetEditor();"),
  "Snippet editor floats, expands, and closes": html.includes('id="expandSnippetEditorBtn"') && html.includes('id="closeSnippetEditorBtn"') && html.includes("function setSnippetEditorExpanded") && html.includes("function closeSnippetEditor"),
  "Configuration menu owns both management panels": html.includes('id="configMenuBtn"') && html.includes('data-open-config="collections"') && html.includes('data-open-config="storedDetails"') && !html.includes('class="sidebar-rail"'),
  "Configuration panels float, expand, and close": (html.match(/class="panel config-floating hidden"/g) || []).length === 2 && (html.match(/data-expand-config=/g) || []).length === 2 && (html.match(/data-close-config=/g) || []).length === 2 && html.includes("function openConfigPanel") && html.includes("function closeConfigPanel"),
  "Stored report details populate report dropdowns": html.includes('<select id="subjectInput">') && html.includes('<select id="assessmentInput">') && html.includes('<select id="teacherInput">') && html.includes("function renderReportDetailSelects"),
  "Selected snippets expose feedback controls": (html.match(/id="snippetFieldControls"/g) || []).length === 1 && html.includes("renderSnippetFields"),
  "Report templates expand snippet fields": (html.match(/id="reportTemplateInput"/g) || []).length === 1 && html.includes("expandSnippetFields(template, selected)"),
  "Feedback uses checkboxes and optional comments": html.includes('type="checkbox" data-snippet-choice=') && html.includes('placeholder="Comment (optional)"'),
  "Multiple checked feedback values expand with comments": expandedTiming === "1. Slow down. Increase pace. Focus on the key points.",
  "Add to Report inserts a snippet field": html.includes('toggleSnippet(id, true)') && html.includes('insertWhenAdding && !els.reportTemplateInput.value.includes(field)'),
  "Report work fields clear on page load": html.includes('state.reportTemplate = "";') && html.includes('state.reportText = "";'),
  "Clear Report is destructive only after confirmation": html.includes('id="clearReportBtn" class="danger-fill"') && html.includes('if (!confirm("Clear all Report Details') && html.includes('els.reportTemplateInput.value = ""') && html.includes('els.reportText.innerHTML = ""'),
  "Cleared template does not display sample placeholder text": html.includes('<textarea id="reportTemplateInput" class="template-input" rows="10" aria-label="Report template"></textarea>'),
  "Print preview opens outside the main layout": html.includes("function openPrintPreview") && html.includes('window.open("", "jiminy-snippet-preview"') && !html.includes('id="printPreview"'),
  "Snippet edits preserve existing metadata": html.includes("{ ...state.snippets[existingIndex], ...snippet }"),
  "Category counts use one-pass aggregation": html.includes("const categoryCounts = unitSnippets.reduce"),
  "Search rendering does not rebuild navigation": !/function renderSnippets\(\) \{\s*renderCategoryFilter/.test(html)
};

const failures = Object.entries(checks).filter(([, passed]) => !passed);

Object.entries(checks).forEach(([name, passed]) => {
  console.log(`${passed ? "PASS" : "FAIL"}: ${name}`);
});

if (failures.length) {
  process.exitCode = 1;
} else {
  console.log("PASS: Inline JavaScript syntax");
}
