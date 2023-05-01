const core = require('@actions/core');

import {
  GLOB_SETTINGS
} from "./src/utils/constants";

import { getCurrentActiveFilter, createCwdPaths } from './src/setup/setup'

import { getFileContent } from './src/utils/helpers'

import { getAllComponentNames } from "./src/getAllComponentNames";
import { getAllOccurrences } from "./src/getAllOccurrences";

const run = async() => {
  try {
    const { componentFolder, occurrenceFolder } = createCwdPaths(core.getInput('COMPONENT_FOLDER'), core.getInput('OCCURRENCE_FOLDER'))
    const componentNameIgnore = core.getInput('COMPONENT_NAME_IGNORE');
    const activeRegex = core.getInput('ACTIVE_REGEX');

    console.log({
      repoFullPath,
      componentFolder,
      occurrenceFolder,
      componentNameIgnore,
      activeRegex
    })

    const {
      EXPORT_REGEX, 
      COMPONENT_OCCURRENCE_REGEX, 
    } = getCurrentActiveFilter(activeRegex)


    const componentFiles = await getFileContent(componentFolder, GLOB_SETTINGS)
    const allFiles = await getFileContent(occurrenceFolder, GLOB_SETTINGS)
    const componentNames = await getAllComponentNames(componentFiles, EXPORT_REGEX, componentNameIgnore)

    const NOT_USED_PACKAGES = await getAllOccurrences(componentNames, allFiles, COMPONENT_OCCURRENCE_REGEX)

    console.log({
      componentFiles,
      allFiles,
      componentNames,
      NOT_USED_PACKAGES
    })

    core.info(`NOT_USED_COMPONENTS: ${JSON.stringify(NOT_USED_PACKAGES)}`);
    core.setOutput("NOT_USED_COMPONENTS", JSON.stringify(NOT_USED_PACKAGES));
    core.setOutput("TEST", "test value");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()