import { filterByOccurrenceCount } from './utils/helpers';

export const getAllOccurrences = (componentObjects, allFiles, COMPONENT_OCCURRENCE_REGEX) => {
  const occurrences = [];

  componentObjects.forEach(component => {
    component.filteredComponentNames.forEach(name => {
      const regex = COMPONENT_OCCURRENCE_REGEX(name)
  
      let value = 0
      allFiles.forEach(file => {
        const matches = file.content.match(regex);
  
        if(matches !== null){
          value += matches.length
        }
      });

      occurrences.push({ 
        name, value, 
        basename: component.basename, 
        path: component.path, 
        content: component.content
      })
    })
  })

  const result = filterByOccurrenceCount(occurrences)
  
  return result
}
