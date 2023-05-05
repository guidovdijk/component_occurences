const core = require('@actions/core');

import {
  GLOB_SETTINGS
} from "./src/utils/constants";

import { getCurrentActiveFilter, createCwdPaths } from './src/setup/setup'

import { getFileContent } from './src/utils/helpers'

import { getAllComponentNames } from "./src/getAllComponentNames";
import { getAllOccurrences } from "./src/getAllOccurrences";
import { getComponentPosition } from "./src/getComponentPosition";

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
      POSITION_REGEX
    } = getCurrentActiveFilter(activeRegex)

    const componentFiles = await getFileContent(componentFolder, GLOB_SETTINGS)
    const allFiles = await getFileContent(occurrenceFolder, GLOB_SETTINGS)

    const componentObjects = await getAllComponentNames(componentFiles, EXPORT_REGEX, componentNameIgnore)

    const unusedComponents = getAllOccurrences(componentObjects, allFiles, COMPONENT_OCCURRENCE_REGEX)

    const componentPositions = getComponentPosition(unusedComponents, POSITION_REGEX)

    const fileLink = `[Test2](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/blob/${process.env.GITHUB_SHA}/test_folder/components/Avatar/test_2.tsx)`;


    componentPositions.forEach(component => {
      core.warning(new Error(`Unused component found "${fileLink}"`))
      // core.warning(
      //   new Error('Unused component found'),
      //   {
      //     title: `component "${component.name}" is not used in the project`,
      //     file: 'test_folder/components/Avatar/test_2.tsx',
      //     startLine: component.startLine,
      //     startColumn: component.startColumn
      //   }
      // )
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()