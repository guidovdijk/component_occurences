const core = require('@actions/core');

import {
  GLOB_SETTINGS
} from "./src/utils/constants";

import { getCurrentActiveFilter } from './src/setup/setup'

import { getFileContent } from './src/utils/helpers'

import { getAllComponentNames } from "./src/getAllComponentNames";
import { getAllOccurrences } from "./src/getAllOccurrences";

const run = async() => {
  try {
    const componentFolder = ["./test_folder/components/**/!(Icons|Illucons)/*!(.story|.test).tsx"];
    const occurrenceFolder = ["./test_folder/**/!(Icons|Illucons)/*!(.story|.test).tsx"];
    const componentNameIgnore = ["Container"];
    const activeRegex = 'react';
    
    const {
      EXPORT_REGEX, 
      COMPONENT_OCCURRENCE_REGEX, 
    } = getCurrentActiveFilter(activeRegex)

    const componentFiles = await getFileContent(componentFolder, GLOB_SETTINGS)
    const allFiles = await getFileContent(occurrenceFolder, GLOB_SETTINGS)
    const componentNames = await getAllComponentNames(componentFiles, EXPORT_REGEX, componentNameIgnore)
    console.log("componentFiles: ", componentFiles)
    console.log("allFiles: ", allFiles)

    const NOT_USED_PACKAGES = getAllOccurrences(componentNames, allFiles, COMPONENT_OCCURRENCE_REGEX)

    console.log("NOT_USED_COMPONENTS: ", JSON.stringify(NOT_USED_PACKAGES));
  } catch (error) {
    console.log(error);
  }
}

run()