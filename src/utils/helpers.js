export const filterByOccurrenceCount = (arr, countThreshold) => {
  return arr.filter(o => o.value > countThreshold)
}

export const filterByComponentName = (arr, ignoreComponentArr) => {
  return arr.filter(item => !ignoreComponentArr.includes(item));
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