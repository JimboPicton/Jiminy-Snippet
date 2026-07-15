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

const helperNames = ["normalizeChoices", "parseChoiceLines", "snippetToken", "selectedSnippetValue", "expandSnippetFields"];
const helperSource = helperNames.map(extractFunction).join("\n");
const testState = { snippetValues: { timingId: 1 } };
const helpers = new Function("state", `${helperSource}\nreturn { ${helperNames.join(", ")} };`)(testState);
const parsedChoices = helpers.parseChoiceLines("Too Fast | Slow down.\nToo Slow | Increase pace.\nConcise");
const timingSnippet = { id: "timingId", keyword: "Timing", text: "Review timing.", choices: parsedChoices };
const expandedTiming = helpers.expandSnippetFields("1. {timing}", [timingSnippet]);

const checks = {
  "Version metadata is consistent": html.includes('<meta name="application-version" content="2.1.0">') && html.includes('const appVersion = "2.1.0"') && html.includes("v2.1.0 · 15 July 2026"),
  "Build date metadata is consistent": html.includes('<meta name="build-date" content="2026-07-15">') && html.includes('const appBuildDate = "2026-07-15"'),
  "Purpose filter exists once": (html.match(/id="purposeFilter"/g) || []).length === 1,
  "Result list uses list semantics": html.includes('role="list"') && html.includes('role="listitem"'),
  "Legacy listbox semantics are absent": !html.includes('role="listbox"') && !html.includes('role="option"'),
  "aria-activedescendant is absent": !html.includes("aria-activedescendant"),
  "State schema version is exported": html.includes("schemaVersion: stateSchemaVersion"),
  "Schema 3 stores report templates and snippet values": html.includes("const stateSchemaVersion = 3") && html.includes('reportTemplate: ""') && html.includes("snippetValues: {}"),
  "Snippet choices are editable": (html.match(/id="choicesInput"/g) || []).length === 1 && html.includes("parseChoiceLines"),
  "Selected snippets expose feedback controls": (html.match(/id="snippetFieldControls"/g) || []).length === 1 && html.includes("renderSnippetFields"),
  "Report templates expand snippet fields": (html.match(/id="reportTemplateInput"/g) || []).length === 1 && html.includes("expandSnippetFields(template, selected)"),
  "Feedback choice syntax behaves correctly": parsedChoices.length === 3 && parsedChoices[0].label === "Too Fast" && parsedChoices[2].text === "Concise",
  "Selected feedback expands its snippet field": expandedTiming === "1. Increase pace.",
  "Snippet edits preserve existing metadata": html.includes("{ ...state.snippets[existingIndex], ...snippet }"),
  "Collection counts use one-pass aggregation": html.includes("const categoryCounts = state.snippets.reduce"),
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
