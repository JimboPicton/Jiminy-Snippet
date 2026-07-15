# Jiminy Snippet

Jiminy Snippet is a self-contained HTML/JSON text-snippet and student-report composition tool. It supports reusable snippet collections, keyboard search, dynamic report fields, rich-text editing, printing, and portable JSON backups.

Current release: **v2.4.0 — 15 July 2026**

## Canonical workspace

This Git repository is the canonical project workspace:

`C:\Users\jimbo\Documents\GitUnity\Jiminy Snippet`

Open that folder before starting a Codex task and confirm it appears as the task workspace. The earlier OneDrive `Text Expander` folder should be treated as an archive rather than edited independently.

Suggested first prompt:

> Work only in the Jiminy Snippet workspace. Read README.md and inspect the current files before making changes.

## Run the app

Open `index.html` in a modern desktop browser. No build command or server is required.

The working library is stored in browser local storage under `student-report-text-expander-v1`. Storage is specific to the browser and local file location, so use **Backup Data** before moving the app, changing browsers, resetting data, or replacing a build.

## Current capabilities

- Snippet collections, text search, Purpose filtering, Recents ordering, and keyboard selection
- Collection dropdowns in the snippet editor, with a Create New Collection option
- A Configuration menu with floating, expandable Collections and Stored Report Details panels
- General Text and Student Report Comment snippet purposes
- Report templates with student, unit, assessment, teaching-staff, date, time, and date-math fields
- Snippet-specific checkbox feedback, optional comments, and insertable fields such as `{timing}`
- Stored Unit, Assessment, and Teaching Staff dropdowns in Report Details
- Missing-field and unknown-macro validation before report generation
- Rich report editing, rich/plain clipboard copying, HTML export, and text export
- Bounded JSON backup/import with regenerated internal IDs
- Mouse and keyboard reordering of selected snippets
- Accessible collection controls, result lists, validation messages, and formatting state
- Confirmed full report clearing and a separate popup print-preview window

## Report and snippet fields

Report-level fields are inserted into the Report Template:

- `{name}` — first name
- `{fullname}` or `{student}` — full student name
- `{unit}` or `{subject}` — unit name or code
- `{assessment}` — assessment task
- `{teachingStaff}` or `{teacher}` — staff member

Date/time fields:

- `{date}`, `{time}`, `{datetime}` — current local date and/or time
- `{date:7:days}` — seven days from today
- `{date:-2:weeks}` — two weeks before today
- `{datetime:90:minutes}` — 90 minutes from now

The Date/Time dialog builds supported expressions. Units are `minutes`, `hours`, `days`, `weeks`, `months`, and `years`.

Each snippet also defines its own field from its abbreviation. A snippet named `timing` provides `{timing}`. Use **Add Option** in the snippet editor to create checkbox-style options such as “Too Fast” and “Too Slow.”

Selecting **Add to Report** inserts `{timing}` at the template cursor automatically. Tick every applicable feedback option and optionally add a report-specific comment beside it. Generating the report replaces both report-level and snippet-level fields. Snippets without options use their Default Feedback and remain compatible with the earlier workflow.

## Backup format

Backups are UTF-8 JSON and include the application version, build date, report template, snippet options, selected feedback values/comments, and state schema version. The current state schema is version `4`. Imports are limited to 2 MB and 5,000 snippets. Imported strings and rich HTML are bounded and sanitised, and internal snippet IDs are regenerated.

Report templates, generated output, selected snippets, and feedback selections start blank on each page load. The reusable snippet library and stored report details remain saved.

Keep a recent backup outside the project folder if the snippet library contains important working data.

## Project files

- `index.html` — complete application, styles, and JavaScript
- `verify-build.js` — dependency-free syntax and structural build checks
- `USER_GUIDE.md` — end-user workflow and feature guide
- `CHAT_EXPORT_2026-07-15.md` — review and implementation history for the July feature update

## Release checklist

1. Run `node verify-build.js`.
2. Open the app in a clean browser profile and confirm the starter library loads.
3. Import a current backup and earlier schema-1/schema-2 backups.
4. Test search with Arrow keys, Enter, Escape, Collection, and Purpose filters.
5. Confirm editing a recently used snippet preserves its Recents position.
6. Define a snippet with multiple feedback options, add it to a report, tick multiple values, and enter optional comments.
7. Validate required and unknown fields, including an empty Date/Time offset.
8. Generate, edit, copy, save as HTML/text, print, and restore a report.
9. Check keyboard reordering and a narrow/mobile-width layout.
10. Confirm Clear Report wipes the active report after prompting and Print Preview opens a separate window.
