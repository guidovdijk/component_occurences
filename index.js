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
    const baseComponentFolder = core.getInput('COMPONENT_FOLDER')
    const baseOccurrenceFolder = core.getInput('OCCURRENCE_FOLDER')
    const componentNameIgnore = core.getInput('COMPONENT_NAME_IGNORE');
    const activeRegex = core.getInput('ACTIVE_REGEX');

    if(!baseComponentFolder || !baseOccurrenceFolder){
      throw new Error("Please make sure the COMPONENT_FOLDER and OCCURRENCE_FOLDER are filled in")
    }

    const { componentFolder, occurrenceFolder } = createCwdPaths(JSON.parse(baseComponentFolder), JSON.parse(baseOccurrenceFolder))

    const {
      EXPORT_REGEX, 
      COMPONENT_OCCURRENCE_REGEX, 
    } = getCurrentActiveFilter(activeRegex)

    const componentFiles = await getFileContent(componentFolder, GLOB_SETTINGS)
    const allFiles = await getFileContent(occurrenceFolder, GLOB_SETTINGS)
    const componentNames = await getAllComponentNames(componentFiles, EXPORT_REGEX, componentNameIgnore)

    const NOT_USED_PACKAGES = await getAllOccurrences(componentNames, allFiles, COMPONENT_OCCURRENCE_REGEX)

    core.setOutput("NOT_USED_COMPONENTS", JSON.stringify(NOT_USED_PACKAGES));
    
    if(NOT_USED_PACKAGES && NOT_USED_PACKAGES.length > 0){
      core.warning("Unused components are found")
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()