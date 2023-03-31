import { glob } from 'glob'
import { promises as fsPromises } from 'fs'


export const filterByOccurrenceCount = (arr, countThreshold) => {
  return arr.filter(o => o.value > countThreshold)
}

export const filterByComponentName = (arr, ignoreComponentArr) => {
  if(!arr){
    return []
  }
  return arr.filter(item => !ignoreComponentArr.includes(item));
}

export const getFileContent = async(path, settings) => {
  const paths = await glob(path, settings)

  const files = paths.map(async file => {
    try {
      const content = await fsPromises.readFile(file);
      
      return content.toString();
    } catch (err) {
      console.log(err);
    }
  })

  const result = Promise.all(files).then(file => {
    return file
  })
  return result
}


export const setRegexFromString = (text) => {
  if(!text){
    throw new Error("Please provide a valid Regex for the componentDefinition")
  }
  
  return new RegExp(text)
}

export const createRegexFunctionFromString = (text) => {
  if(!text.contains("placeholder")){
    throw new Error("Please provide a placeholder value called 'placeholder' in the componentOccurrences")
  }

  return (word) => new RegExp(text.replace('placeholder', word), "gm")
}