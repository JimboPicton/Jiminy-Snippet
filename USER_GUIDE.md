# Jiminy Snippet User Guide

Jiminy Snippet helps you build student assessment reports from reusable snippets. You create short abbreviations, attach them to report comments, select the comments you need, and generate a formatted report.

## 1. Open The App

Open `index.html` in your web browser.

The app saves your snippets and current report information in the browser on this computer. Use **Backup Data** regularly if you want a portable copy.

## 2. Understand The Main Areas

The app has three main working areas:

- **Collections**: Groups of snippets, such as Work Habits, Writing, Analysis, or Achievement.
- **My Snippets**: The list of reusable comments. Each snippet has an abbreviation and a comment.
- **Report Information and Report Editor**: Student details, selected snippets, generated report text, rich text editing, preview, print, and save options.

## 3. Add Report Information

In **Report Information**, enter:

- **Student**: The student name.
- **Unit**: The unit name or code.
- **Assessment**: The assessment task name.
- **Teaching Staff**: The staff member name.

These fields can automatically populate snippets that use dynamic fields.

Student names are cleaned up when snippets are generated. For example, `john smith` becomes `John Smith`.

## 4. Create A New Snippet

1. Select **New** in the **My Snippets** panel.
2. Enter an **Abbreviation**.
   Example: `timing`
3. Enter a **Collection**.
   Example: `Work Habits`
4. Choose a **Content Type**.
   For most assessment reports, use **Student Report Comment**.
5. Write the expanded comment.
   Example: `Please look at your timing and aim to pace your responses more evenly.`
6. Select **Save Snippet**.

## 5. Use Dynamic Fields In Snippets

Dynamic fields are placeholders that are replaced with report information when you generate the report.

Available fields:

- `{name}`
- `{fullname}`
- `{unit}`
- `{assessment}`
- `{teachingStaff}`
- `{date}`

`{name}` uses the first part of the Student field. For example, `john smith` becomes `John`.

`{fullname}` uses the full Student field in title case. For example, `john smith` becomes `John Smith`.

Example snippet:

```text
{name} demonstrated excellent effort in {unit} and should continue applying feedback before submitting {assessment}.
```

When generated, this might become:

```text
John demonstrated excellent effort in ENG101 and should continue applying feedback before submitting Essay 1.
```

Use the **Insert Field** buttons to add fields into a snippet without typing them manually.

## 6. Select Snippets For A Report

1. Browse **My Snippets**, or use search.
2. Use the **Collections** panel to filter by collection.
3. Select **Select** on each snippet you want to include.
4. Selected snippets appear under **Selected Abbreviations**.
5. Drag selected abbreviations left or right to change the report sequence.
6. Select the `x` on a selected abbreviation to remove it.

## 7. Generate A Report

After adding report information and selecting snippets:

1. Select **Generate Report**.
2. Jiminy Snippet creates a report from the selected snippets in the order shown under **Selected Abbreviations**.
3. Dynamic fields are replaced with the Student, Unit, Assessment, Teaching Staff, and Date values.
4. The generated report appears in the rich text editor and the print preview.

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

Keep backup files somewhere safe if you plan to use Jiminy Snippet across different computers or browsers.

## 11. Suggested Workflow

1. Add or review your snippet library.
2. Enter Student, Unit, Assessment, and Teaching Staff.
3. Select the snippets that apply to the student.
4. Generate the report.
5. Edit the generated text with the rich text editor.
6. Save the report as `.html` for formatted storage or `.txt` for plain text storage.
7. Print or save as PDF if required.

## 12. Tips

- Use short, memorable abbreviations such as `timing`, `evidence`, `proofread`, or `next-steps`.
- Use collections to organise snippets by feedback type.
- Use `{name}` for a warmer personal tone, and `{fullname}` when the full student name is needed.
- Use dynamic fields when a comment should include the student, unit, assessment, teaching staff, or date.
- Backup your data before resetting the snippet library.
