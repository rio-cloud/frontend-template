---
metadata:
  version: "0.12.0"
name: i18n
description: Use when building, translating, or reviewing a client frontend configured with i18n-flow; applies catalog-supported UI component messages and runs the deterministic translation and validation workflow.
---

# Client i18n

Use `.i18nrc.json` as the source of truth for locale files, key prefixes, the external language catalog, project context,
and AI execution. Let `i18n-flow` load catalog guidance, terminology, protected terms, writing rules, and approved
corrections.

Use `.i18n/context/project.md` for durable project-specific product and audience context, form of address, tone,
terminology, preferred wording, and terms that must not be translated. Project context extends the shared catalog and
takes precedence when project and catalog guidance conflict. It does not override the workflow's mandatory output and
integrity policy.

When `catalog.url` is configured, let `i18n-flow` manage its ignored local cache. Do not require developers to clone the
catalog separately or store Git credentials in the project. Use `I18N_CATALOG_PATH` only when intentionally working with
a local catalog checkout.

## UI component workflow

When adding, editing, or reviewing UI components:

1. Inspect the frontend's existing i18n access pattern and `.i18nrc.json`.
2. Run `i18n-flow migrate-to-catalog-keys --dry-run` when the project may still contain Phrase-era or other
   catalog-declared
   legacy keys. Apply the migration before editing usages; it updates both source references and locale entries.
3. Run `i18n-flow inspect-ui-components --json`.
   Use `i18n-flow inspect-ui-components --fix` to copy available catalog messages and normalize component prop
   expressions that contain exactly one replaceable message key. Preview with `--fix --dry-run` when needed.
4. For every reported component usage, use only the returned `expectedKey` and catalog messages. `expectedKey` already
   contains the configured project prefix; do not prepend it again.
   For a prop with catalog variants, use the selected `variant` and `expectedKey`. If its status is
   `ambiguous-variant`, inspect the usage semantics and choose only from the returned `variants`; do not invent another
   key or add the variant names as component props.
5. Replace hard-coded localized props and add missing localized props required by the component contract.
6. Follow the existing translation hook or message-component pattern. Do not introduce another i18n framework.
   With React Intl, prefer declarative `<FormattedMessage>` components over imperative `intl.formatMessage()` calls.
   Use `intl.formatMessage()` only when an API requires a primitive string or the message is needed outside renderable
   JSX.
7. Add missing catalog messages to the configured source and target locale files under `expectedKey`. Copy catalog values
   exactly; do not translate them with AI or invent alternative keys.
8. Do not overwrite unrelated messages or change UI behavior.
9. Run `i18n-flow inspect-ui-components` again and then `i18n-flow validate`.

Treat `catalog-key` as aligned. Inspect `hard-coded`, `missing`, `custom-expression`, and `ambiguous-variant` findings. A
custom expression may already resolve the correct key indirectly, so trace it before editing. Resolve an ambiguous
variant from the component's purpose and surrounding behavior, using only a candidate returned by the inspection. If a
required locale is missing from the catalog, report it instead of creating a project-local translation.

## Translation workflow

Shared catalog messages are discovered through exact key references in JavaScript and TypeScript source files.
`i18n-flow translate` automatically syncs every used shared source message and any available reviewed target
translations into the configured locale files before planning AI work. Use `i18n-flow sync-shared-messages` when the
catalog values should be applied without an AI translation, or add `--dry-run` to preview the changes.

Always reuse a known shared catalog key instead of creating a project-specific substitute. In particular, use
`tree.group.ungrouped` (with the configured project prefix) for the ungrouped Tree fallback. Catalog-declared
`legacyKeys` are migration inputs, not valid keys for new code. Run `i18n-flow migrate-to-catalog-keys --dry-run` and
then the write-mode command to replace legacy source references and locale entries together.

Use the matching command:

- `i18n-flow translate` fills missing translations without changing existing ones.
- `i18n-flow improve --keys <keys> --locale <locale>` conservatively corrects selected existing translations. Use
  `--mode revise` only when wording, clarity, consistency, and style should be actively revised.
- `i18n-flow retranslate --keys <keys> --locale <locale>` updates selected translations after source changes.
- `i18n-flow validate` checks existing translations without calling AI or changing files.

Use `--dry-run` when only an auditable job manifest is wanted. Let the CLI perform AI calls, enforce placeholder and
ICU integrity, apply catalog context, validate protected terms, and write locale files. Do not translate directly in chat
when that would bypass the configured workflow.

Keep generated job manifests as the audit trail. Do not move or rename configured files unless the user requests it.
