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
name: main

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    name: testing component checker
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: components check
        id: components
        uses: ./
        with:
          COMPONENT_FOLDER: '["test_folder/components/**/!(Icons|Illucons)/*!(.story|.test).tsx"]'
          OCCURRENCE_FOLDER: '["test_folder/**/!(Icons|Illucons)/*!(.story|.test).tsx"]'
          COMPONENT_NAME_IGNORE: '["Container"]'
      - name: Get the components
        run: echo "components ${{steps.components.outputs.NOT_USED_COMPONENTS}}"
```
