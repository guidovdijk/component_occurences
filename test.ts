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
    const componentsString = JSON.parse('["test_folder/components/**/!(Icons|Illucons)/*!(.story|.test).tsx"]');
    const occurrenceString = JSON.parse('["test_folder/**/!(Icons|Illucons)/*!(.story|.test).tsx"]');
    const componentNameIgnore = JSON.parse('["Test20"]');

    const { componentFolder, occurrenceFolder } = createCwdPaths(componentsString, occurrenceString)

    const activeRegex = 'react';
    
    const {
      EXPORT_REGEX, 
      COMPONENT_OCCURRENCE_REGEX,
      POSITION_REGEX
    } = getCurrentActiveFilter(activeRegex)


    const componentFiles = await getFileContent(componentFolder, GLOB_SETTINGS)
    const allFiles = await getFileContent(occurrenceFolder, GLOB_SETTINGS)

    const componentObjects = getAllComponentNames(componentFiles, EXPORT_REGEX, componentNameIgnore)
    const unusedComponents = getAllOccurrences(componentObjects, allFiles, COMPONENT_OCCURRENCE_REGEX)
    const componentPositions = getComponentPosition(unusedComponents, POSITION_REGEX)
    
    console.log(componentPositions)
  } catch (error) {
    console.log(error);
  }
}

run()