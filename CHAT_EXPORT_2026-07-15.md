# Text Expander review and implementation chat

Exported: 15 July 2026 (Australia/Brisbane)

This transcript records the substantive user requests and completed review. Short progress updates and tool output are omitted.

## User request: upstream improvements to review

> For my Text Expander GPT project, review the following updates to the tool I am mimicking. Review for potential features to integrate or adjust.
>
> Improvements
>
> Inline Search: pressing Enter on a recent item now expands it instead of opening the main window, Shift-Tab behaves correctly, and Inline Search remembers its window size.
>
> Rich to plain text: switching a snippet to plain text now warns you with an Undo link before formatting is dropped.
>
> Date/Time Math: the macro dialog now flags an empty required field instead of silently doing nothing.
>
> Other: snippet groups default to "(Untitled)" when you clear the name, group-settings labels and button tooltips are clearer, and account menu items that open a page now show a loading spinner.
>
> Accessibility and security improvements
>
> Bug fixes
>
> Fixed expansion and inline search failing in webview apps like Zoom Workplace Chat, the LinkedIn app, PowerPoint, and EMR tools.
>
> Improved focus handling in Microsoft apps (PowerPoint, Outlook, and Word) so snippets expand reliably.
>
> Fixed link-only ("smart link") snippets showing the abbreviation as a hyperlink instead of expanding the URL.
>
> Restored the Enter key for expanding a snippet from a fill-in pop-up menu.
>
> Fixed a crash that could occur when opening a link from within the app.
>
> Fixed Quick Search shortcut keys not working when navigating to Recents.
>
> Other: corrected the window title when a snippet has no label or abbreviation, and fixed the Repeat feature dropping a fill-in entry that contained email-formatted text.

## Assistant review

The most valuable updates to adopt were identified as keyboard-first search, explicit validation for unresolved fields, safer rich-text handling, and accessibility/security hardening. External application-expansion fixes were judged not directly applicable because Jiminy Snippet generates and copies reports rather than injecting abbreviations into other applications.

Priority recommendations:

1. Harden imported IDs and rich-text links.
2. Clarify or implement the misleading Content Type field.
3. Add keyboard-driven Quick Search and Recents.
4. Validate required dynamic fields before generation.
5. Replace inaccessible controls and add keyboard reordering.
6. Add date/time formatting and arithmetic with explicit required-field errors.
7. Defer Smart Link, fill-in, Repeat, account-menu, and cross-application injection work until those execution models exist in this app.

Specific findings included unescaped imported IDs in generated data attributes, unrestricted link protocols in sanitised HTML, nested interactive collection controls, drag-only ordering, missing keyboard navigation in search results, and dynamic macros silently resolving to empty values.

## User implementation request

> Export this chat about the Text Expander to the Text Expander workspace and then implement your suggestions. Can I ask, when I start a new chat with you, how do I ensure that it occurs in the correct workspace so as not to pollute project threads?

## Implementation outcome

The implementation adds keyboard search and Recents behavior, required-field and unknown-macro validation, a validated date/time arithmetic dialog, safe import normalization, stricter rich-text link sanitisation, accessible collection controls, keyboard snippet reordering, clearer snippet-purpose wording, safe empty-category fallback, formatting-button state, and copy progress/error feedback.

The README now explains how to start future Codex tasks from the correct Text Expander workspace.
