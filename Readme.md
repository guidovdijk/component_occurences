# Unused Component Checker

A GitHub action to check if your project contains any unused components

## Inputs

### `COMPONENT_FOLDER`

**Required: ** a list of Glob paths to located the components

### `OCCURRENCE_FOLDER`

**Required: ** a list of Glob paths to define which folders should be searched for the components

### `COMPONENT_NAME_IGNORE`

**Required: ** a list of strings to define which component names should be ignored

### `ACTIVE_REGEX`

**Optional: ** a string to use the default Regex for specific projects
**Default:** React

## Example Usage

```
- uses: actions/checkout@v1
- name: packages check
  uses: guidovdijk/component_occurences/tree/github-action@v1
  with:
    COMPONENT_FOLDER:  '["src/components/**/!(Icons|Illucons)/*!(.story|.test).tsx"]'
    OCCURRENCE_FOLDER:  '["/src/**/!(Icons|Illucons)/*!(.story|.test).tsx"]'
    COMPONENT_NAME_IGNORE:  '["Container"]'
```
