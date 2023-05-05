import { filterByComponentName } from './utils/helpers';

export const getAllComponentNames = (componentFiles, EXPORT_REGEX, componentNameIgnore) => {
  const matches = componentFiles.map(file => {
    const names = file.content.match(EXPORT_REGEX);
    const filteredComponentNames = filterByComponentName(names, componentNameIgnore)

    if(filteredComponentNames){
      return { 
        filteredComponentNames,
        ...file
      }
    }
  }).flat(1)

  // Return array of names and positions of the names
  return matches
}
