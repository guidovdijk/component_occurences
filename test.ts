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
    const t = JSON.parse('["test_folder/components/**/!(Icons|Illucons)/*!(.story|.test).tsx"]');
    const t2 = JSON.parse('["test_folder/**/!(Icons|Illucons)/*!(.story|.test).tsx"]');

    const { componentFolder, occurrenceFolder } = createCwdPaths(t, t2)

    const componentNameIgnore = ["Container"];
    const activeRegex = 'react';
    
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
    console.log(componentPositions)

    // console.log("NOT_USED_COMPONENTS: ", JSON.stringify(NOT_USED_PACKAGES, null, 2));
  } catch (error) {
    console.log(error);
  }
}

run()