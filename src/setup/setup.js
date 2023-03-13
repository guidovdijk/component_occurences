import fs from 'fs';
import path from 'path';

import { 
  baseOptions, 
  PROJECT_PATH, 
  FILE_NAME,
  ACTIVE_FILTER
} from '../utils/constants'

import { 
  createRegexFunctionFromString,
  setRegexFromString 
} from '../utils/helpers';

const optionsFilePath = `${PROJECT_PATH}${path.sep}${FILE_NAME}`

/**
 * Only set custom values if the key exist and a value is present.
 * Otherwise use the values located in the `options` variable in the constant.js 
 */
const overrideToCustomOptions = (obj, newValues) => {
  for (const [key, value] of Object.entries(newValues)) {
    if (value !== undefined) {
      if (typeof value === "object" && !Array.isArray(value)) {
        obj[key] = overrideToCustomOptions(obj[key] || {}, value);
      } else if (obj.hasOwnProperty(key) && value) {
        obj[key] = value;
      }
    }
  }
  return obj;
}


const setPaths = (options) => {
  options.folderPathIgnore.map(p => {
    return `${PROJECT_PATH}${path.sep}${p}`
  });
  options.componentFolder.map(p => {
    return `${PROJECT_PATH}${path.sep}${p}`
  });
  options.occurrenceFolder.map(p => {
    return `${PROJECT_PATH}${path.sep}${p}`
  });

  return options
}

const setOptions = () => {
  try {
    if(!fs.existsSync(optionsFilePath)){
      throw new Error(`${FILE_NAME} file does not exist in the root of the working directory`)
    }

    const optionsFileContent = JSON.parse(fs.readFileSync(optionsFilePath, 'utf8'))

    let newOptions = overrideToCustomOptions(baseOptions, optionsFileContent)
    // newOptions = setRegexFromString(newOptions)
    newOptions = setPaths(newOptions)
  
    return newOptions
  } catch(err) {
    console.log(err)
    return null
  }
}

const getCurrentActiveFilter = (options) => {
  if(!['react', 'vue', 'angular', 'custom'].includes(options.activeRegex)){
    throw new Error("Please make the 'activeRegex' value is set to 'react', 'vue', 'angular', or 'custom'")
  }

  const filter = ACTIVE_FILTER[options.activeRegex]

  console.log(filter)

  if(options.activeRegex === 'custom'){
    const custom = options.customRegex

    if(!custom){
      throw new Error("Please make sure a 'customRegex' object is set in the occurrence.json")
    }

    if(!custom.componentDefinition){
      throw new Error("Please make sure a 'customRegex.componentDefinition' Regex is set in the occurrence.json")
    }

    if(!custom.componentOccurrences){
      throw new Error("Please make sure a 'customRegex.componentOccurrences' Regex is set in the occurrence.json")
    }

    if(!custom.fileExtensions || custom.fileExtensions.length === 0){
      throw new Error("Please make sure a 'customRegex.fileExtensions' Array is set with file extensions as a string (e.g. \".jsx\") in the occurrence.json")
    }

    return {
      EXPORT_REGEX: setRegexFromString(custom.componentDefinition),
      COMPONENT_OCCURRENCE_REGEX: createRegexFunctionFromString(custom.componentOccurrences),
      FILE_EXTENSIONS: custom.fileExtensions
    }
  } else {
    return filter
  }
}

export const options = options ? options : setOptions()
export const currentActiveFilter = currentActiveFilter ? currentActiveFilter : getCurrentActiveFilter(options)
