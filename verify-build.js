const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);

if (!scriptMatch) {
  throw new Error("Inline JavaScript was not found.");
}

new Function(scriptMatch[1]);

const checks = {
  "Purpose filter exists once": (html.match(/id="purposeFilter"/g) || []).length === 1,
  "Result list uses list semantics": html.includes('role="list"') && html.includes('role="listitem"'),
  "Legacy listbox semantics are absent": !html.includes('role="listbox"') && !html.includes('role="option"'),
  "aria-activedescendant is absent": !html.includes("aria-activedescendant"),
  "State schema version is exported": html.includes("schemaVersion: stateSchemaVersion"),
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
