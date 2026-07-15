# Jiminy Snippet User Guide

Jiminy Snippet helps you build student assessment reports from reusable snippets. You create short abbreviations, attach them to report comments, select the comments you need, and generate a formatted report. General-purpose text snippets can also be stored alongside student report comments.

## 1. Open The App

Open `index.html` in your web browser.

The current version number and build date appear in the green header, making it easy to confirm which build is open.

The app saves your snippets and current report information in the browser on this computer. Use **Backup Data** regularly if you want a portable copy.

## 2. Understand The Main Areas

The app has three main working areas:

- **Collections**: Groups of snippets, such as Work Habits, Writing, Analysis, or Achievement.
- **Stored Report Details**: Saved Units, Assessment items, and Teaching Staff values.
- **My Snippets**: Reusable feedback fields. Each snippet has an abbreviation, default feedback, and optional feedback choices.
- **Report Details and Template**: Report-level details, the report template, selected snippet feedback fields, generated rich text, preview, print, and save options.

## 3. Add Report Details

In **Report Details and Template**, enter:

- **Student**: The student name.
- **Unit**: The unit name or code.
- **Assessment**: The assessment task name.
- **Teaching Staff**: The staff member name.

These are report-level fields. Insert them into the **Report Template** using the buttons directly beneath the details.

Student names are cleaned up when snippets are generated. For example, `john smith` becomes `John Smith`.

You can also maintain reusable lists for **Unit**, **Assessment**, and **Teaching Staff** in **Stored Report Details** on the left side of the page under **Collections**.

To save a reusable value:

1. Type the Unit, Assessment, or Teaching Staff value into the add box.
2. Select **Add**, or press **Enter**.
3. The saved value appears as a chip and becomes available in the dropdown.

To use a saved value, choose it from the matching dropdown. To remove a saved value, select the `x` on its chip.

Use the menu button in the **Collections** or **Stored Report Details** header to minimise or expand that box.

## 4. Create A New Snippet

1. Select **New** in the **My Snippets** panel.
2. Enter an **Abbreviation**.
   Example: `timing`
3. Enter a **Collection**.
   Example: `Work Habits`
4. Choose a **Snippet Purpose**.
   For most assessment reports, use **Student Report Comment**. Use **General Text** for reusable text that is not specifically a student report comment. The Purpose filter can show either type in the library.
5. Add **Default Feedback**. This is the fallback when the snippet has no choices.
6. Optionally add **Feedback Choices**, one per line in `Label | expanded feedback` format.

   ```text
   Too Fast | The delivery was too fast. Slow down and give each point more space.
   Too Slow | The delivery was too slow. Increase the pace and prioritise key points.
   ```

   A line without `|` uses the label itself as the inserted feedback. Default Feedback is optional when at least one choice is provided.
7. Select **Save Snippet**.

If you type a new collection name while editing or creating a snippet, that collection is created automatically. After saving, Jiminy Snippet switches to that collection so you can confirm the snippet moved there.

To delete a collection, select the `x` beside the collection name in the **Collections** panel. Snippets in that collection are kept and moved to `General`.

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
3. Use the **Collections** panel to filter by collection.
4. Select **Select** on each snippet you want to include.
5. Selected snippets appear under **Selected Snippet Fields** and **Snippet Feedback Fields**.
6. Choose the applicable feedback value, such as **Too Fast** or **Too Slow**.
7. Select **Insert `{field}`** to place the snippet field at the cursor in the Report Template.
8. Drag selected abbreviations left or right to change fallback report order, or focus one and use **Alt+Left** or **Alt+Right**.
9. Select the `x` on a selected abbreviation to remove it.

## 7. Generate A Report

After adding report information, writing the template, and selecting snippets:

1. Select **Generate Report**.
2. Report-level fields are replaced with Student, Unit, Assessment, Teaching Staff, and Date/Time values.
3. Snippet fields such as `{timing}` are replaced with the selected feedback choice.
4. The generated report appears in the rich text editor and print preview.

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
- **Print**: Opens the browser print dialog. You can print to paper or save as PDF.
- **Clear Report**: Clears the current report text.

For permanent storage, **Save HTML** keeps the student metadata and rich text formatting. Use **Save Text** when you need a simple plain text copy.

## 10. Backup And Restore Snippets

Use these options in the top toolbar:

- **Backup Data**: Downloads a JSON backup of snippets, selected snippets, report information, and current report text.
- **Import Data**: Restores a previous JSON backup.
- **Reset**: Restores the starter snippet library. This replaces your current snippets.

Backups also include saved Units, Assessment items, and Teaching Staff. Keep backup files somewhere safe if you plan to use Jiminy Snippet across different computers or browsers.

The current backup state schema is version 3. Backups include the Report Template, snippet choices, and selected feedback values. Imports are limited to 2 MB and 5,000 snippets. Jiminy Snippet sanitises imported rich text and regenerates internal snippet IDs.

## 11. Suggested Workflow

1. Add or review your snippet library.
2. Enter Student, Unit, Assessment, and Teaching Staff.
3. Write or reuse a Report Template.
4. Select the snippets that apply to the student.
5. Choose each snippet's feedback and insert its field into the template.
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
