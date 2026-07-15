# Jiminy Snippet User Guide

Jiminy Snippet helps you build student assessment reports from reusable snippets. You create short abbreviations, attach them to report comments, select the comments you need, and generate a formatted report. General-purpose text snippets can also be stored alongside student report comments.

## 1. Open The App

Open `index.html` in your web browser.

The current version number and build date appear in the green header, making it easy to confirm which build is open.

The app saves your reusable snippets and stored report details in the browser on this computer. Report templates and generated output start blank whenever the page is opened. Use **Backup Data** regularly if you want a portable copy.

## 2. Understand The Main Areas

The app has two main working areas and a Configuration menu:

- **My Snippets**: Reusable feedback fields. Each snippet has an abbreviation, default feedback, and optional feedback choices.
- **Report Details and Template**: Report-level details, the report template, selected snippet feedback fields, generated rich text, preview, print, and save options.
- **Configuration**: Opens floating panels for Collections and Stored Report Details. Each panel can be expanded, restored, or closed.

## 3. Add Report Details

In **Report Details and Template**, enter:

- **Student**: The student name.
- **Unit**: The unit name or code.
- **Assessment**: The assessment task name.
- **Teaching Staff**: The staff member name.

Student remains a free-text field. Unit, Assessment, and Teaching Staff are dropdowns populated from **Stored Report Details**.

These are report-level fields. Insert them into the **Report Template** using the buttons directly beneath the details.

Student names are cleaned up when snippets are generated. For example, `john smith` becomes `John Smith`.

You can also maintain reusable lists for **Unit**, **Assessment**, and **Teaching Staff** by selecting **Configuration > Stored Report Details** in the top menu.

To save a reusable value:

1. Type the Unit, Assessment, or Teaching Staff value into the add box.
2. Select **Add**, or press **Enter**.
3. The saved value appears as a chip and becomes available in the dropdown.

To use a saved value, choose it from the matching dropdown. To remove a saved value, select the `x` on its chip.

Use **Expand** to enlarge the floating panel, **Restore** to return it to its normal size, or **Close** when finished.

## 4. Create A New Snippet

1. Select **New** in the **My Snippets** panel.
2. Enter an **Abbreviation**.
   Example: `timing`
3. Choose a **Collection** from the dropdown. Select **Create new collection…** when a new collection is required.
4. Choose a **Snippet Purpose**.
   For most assessment reports, use **Student Report Comment**. Use **General Text** for reusable text that is not specifically a student report comment. The Purpose filter can show either type in the library.
5. Add **Default Feedback**. This is the fallback when the snippet has no choices.
6. Optionally select **Add Option** under **Feedback Options**. Each option appears as a checkbox-style row; enter a label such as **Too Fast** or **Too Slow**. Add as many options as the snippet requires.

   Default Feedback is optional when at least one feedback option is provided.
7. Select **Save Snippet**.

After saving, Jiminy Snippet switches to the selected collection so you can confirm the snippet moved there.

To delete a collection, open **Configuration > Collections** and select the `x` beside the collection name. Snippets in that collection are kept and moved to `General`.

## 5. Build A Report Template

The Report Template contains the general wording and structure of the report. Fields are replaced when you select **Generate Report**.

Report-level fields include:

- `{name}`
- `{fullname}`
- `{unit}`
- `{assessment}`
- `{teachingStaff}`
- `{date}`
- `{time}`
- `{datetime}`

`{name}` uses the first part of the Student field. For example, `john smith` becomes `John`.

`{fullname}` uses the full Student field in title case. For example, `john smith` becomes `John Smith`.

Example template:

```text
Hello {name}

Well done on delivering a good submission for {assessment}.

Areas to work on include:
1. {timing}

I look forward to your next submission.

All the best,
Jim
```

Here `{timing}` is a snippet field. It becomes available after selecting the Timing snippet.

```text
Hello John

Well done on delivering a good submission for Assignment 1.

Areas to work on include:
1. The delivery was too fast. Slow down and give each point more space.
```

Use the **Insert Report Field** buttons above the template for general fields. Use **Date/Time…** for date and time fields with optional offsets such as `{date:7:days}`, `{date:-2:weeks}`, and `{datetime:90:minutes}`.

Before a report is generated, Jiminy Snippet identifies unknown fields and any report information required by the selected snippets. Correct the highlighted fields, then generate again.

## 6. Select Snippets For A Report

1. Browse **My Snippets**, or use Search, Collection, and Purpose filters. With an empty search, the most recently used snippets appear first.
2. In Search, use **Up** and **Down** to browse results, **Enter** to select the active result, and **Escape** to clear the query.
3. Use the Collection dropdown above **My Snippets**, or open **Configuration > Collections** to filter by collection.
4. Place the cursor where the feedback belongs in the Report Template, then select **Add to Report** on the snippet. Its field is inserted immediately.
5. Selected snippets appear under **Selected Snippet Fields** and **Snippet Feedback Fields**.
6. Tick every applicable feedback value, such as **Too Fast** or **Too Slow**.
7. Add an optional report-specific comment beside any checked value. Use **Insert Again** if the same snippet field is needed more than once.
8. Drag selected abbreviations left or right to change fallback report order, or focus one and use **Alt+Left** or **Alt+Right**.
9. Select the `x` on a selected abbreviation to remove it.

## 7. Generate A Report

After adding report information, writing the template, and selecting snippets:

1. Select **Generate Report**.
2. Report-level fields are replaced with Student, Unit, Assessment, Teaching Staff, and Date/Time values.
3. Snippet fields such as `{timing}` are replaced with all checked feedback options and their optional comments.
4. The generated report appears in the rich text editor. Select **Print Preview** in the header to open a separate preview window.

If the Report Template is blank, Jiminy Snippet retains the older behavior and joins the selected snippets in the order shown under **Selected Snippet Fields**.

## 8. Edit The Report With Rich Text

Use the rich text toolbar above the report editor to format the report.

Available tools:

- **B**: Bold
- **I**: Italic
- **U**: Underline
- **List**: Bulleted list
- **Left**: Align left
- **Centre**: Centre align
- **Undo**: Undo the previous edit
- **Redo**: Redo the previous edit

You can also click directly in the report and type changes manually.

Rich text formatting is applied to the report editor content after the report has been generated. It appears in the print preview, is kept in **Save HTML**, and is included when copying to apps that accept rich clipboard content. **Save Text** removes formatting because plain text files cannot store bold, underline, alignment, or lists.

## 9. Copy, Save, Or Print A Report

Use these buttons:

- **Copy Report**: Copies the full report to the clipboard.
- **Save HTML**: Downloads a permanent `.html` report file with formatting preserved.
- **Save Text**: Downloads a plain `.txt` report file.
- **Print Preview**: Opens the formatted report in a separate window with its own Print button.
- **Clear Report**: After confirmation, clears Student, Unit, Assessment, Teaching Staff, the template, selected snippets, feedback selections, and generated report. Stored reusable values are retained.

For permanent storage, **Save HTML** keeps the student metadata and rich text formatting. Use **Save Text** when you need a simple plain text copy.

## 10. Backup And Restore Snippets

Use these options in the top toolbar:

- **Backup Data**: Downloads a JSON backup of snippets, selected snippets, report information, and current report text.
- **Import Data**: Restores a previous JSON backup.
- **Reset**: Restores the starter snippet library. This replaces your current snippets.

Backups also include saved Units, Assessment items, and Teaching Staff. Keep backup files somewhere safe if you plan to use Jiminy Snippet across different computers or browsers.

The current backup state schema is version 4. Backups include the Report Template, snippet options, and selected feedback values/comments. Imports are limited to 2 MB and 5,000 snippets. Jiminy Snippet sanitises imported rich text and regenerates internal snippet IDs.

## 11. Suggested Workflow

1. Add or review your snippet library.
2. Enter Student, Unit, Assessment, and Teaching Staff.
3. Write or reuse a Report Template.
4. Select the snippets that apply to the student.
5. Add each snippet to the report, tick the applicable feedback, and enter any optional comments.
6. Generate the report.
7. Edit the generated text with the rich text editor.
8. Save the report as `.html` for formatted storage or `.txt` for plain text storage.
9. Print or save as PDF if required.

## 12. Tips

- Use short, memorable abbreviations such as `timing`, `evidence`, `proofread`, or `next-steps`.
- Use collections to organise snippets by feedback type.
- Use `{name}` for a warmer personal tone, and `{fullname}` when the full student name is needed.
- Use report-level fields for student, unit, assessment, teaching staff, and date information.
- Use snippet fields for specific feedback points such as timing, evidence, or structure.
- Backup your data before resetting the snippet library.
