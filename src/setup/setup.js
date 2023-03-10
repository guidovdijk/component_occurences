import fs from 'fs';
import path from 'path';

import { baseOptions, PROJECT_PATH, FILE_NAME } from '../utils/constants'

const optionsFilePath = `${PROJECT_PATH}/${FILE_NAME}`

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

const setRegexFromString = (options) => {
  for (const [key, value] of Object.entries(options.regexComponentDefinition)) {
    if(!value){
      continue
    }

    const regex = new RegExp(value)
    options.regexComponentDefinition[key] = regex
  }

  return options
}

const setPaths = (options) => {
  options.folderPathIgnore.map(p => {
    return `${PROJECT_PATH}/p`
  });
  options.componentFolder.map(p => {
    return `${PROJECT_PATH}/p`
  });
  options.occurrenceFolder.map(p => {
    return `${PROJECT_PATH}/p`
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
    newOptions = setRegexFromString(newOptions)
    newOptions = setPaths(newOptions)
  
    return newOptions
  } catch(err) {
    console.log(err)
    return null
  }
}

export const options = options ? options : setOptions()
