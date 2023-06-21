import core from '@actions/core';

import {
  GLOB_SETTINGS
} from "./utils/constants";

import { getCurrentActiveFilter, createCwdPaths, filterType } from './setup/setup'

import { getFileContent } from './utils/helpers'

import { getAllComponentNames } from "./getAllComponentNames";
import { getAllOccurrences } from "./getAllOccurrences";
import { getComponentPosition } from "./getComponentPosition";

const run = async() => {
  try {
    const baseComponentFolder = JSON.parse(core.getInput('COMPONENT_FOLDER', { required: true }))
    const baseOccurrenceFolder = JSON.parse(core.getInput('OCCURRENCE_FOLDER', { required: true }))
    const componentNameIgnore = JSON.parse(core.getInput('COMPONENT_NAME_IGNORE', { required: true }))
    const activeRegex = core.getInput('ACTIVE_REGEX') as filterType;

    if(!baseComponentFolder || !baseOccurrenceFolder){
      throw new Error("Please make sure the COMPONENT_FOLDER and OCCURRENCE_FOLDER are filled in")
    }

    const { 
      componentFolder, 
      occurrenceFolder 
    } = createCwdPaths(JSON.parse(baseComponentFolder), JSON.parse(baseOccurrenceFolder))

    const {
      EXPORT_REGEX, 
      COMPONENT_OCCURRENCE_REGEX,
      POSITION_REGEX
    } = getCurrentActiveFilter(activeRegex)

    const componentFiles = await getFileContent(componentFolder, GLOB_SETTINGS)
    const allFiles = await getFileContent(occurrenceFolder, GLOB_SETTINGS)

    const componentObjects = await getAllComponentNames(componentFiles, EXPORT_REGEX, componentNameIgnore)
    const unusedComponents = getAllOccurrences(componentObjects, allFiles, COMPONENT_OCCURRENCE_REGEX)
    const componentPositions = getComponentPosition(unusedComponents, POSITION_REGEX)
    
    componentPositions.forEach((component: { basename: any; startLine: any; name: any; }) => {
      const url = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/blob/${process.env.GITHUB_SHA}${component.basename}#L${component.startLine}`;

      core.warning(
        new Error(`Unused component "${component.name}" found: ${url}`),
        {
          title: `Component "${component.name}" is not used in the project`
        }
      )
    });
  } catch (error) {
    if(error instanceof Error){
      core.setFailed(error.message);
    }
  }
}

run()