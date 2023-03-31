import { filterByOccurrenceCount } from './utils/helpers';

export const getAllOccurrences = (componentNames, allFiles, COMPONENT_OCCURRENCE_REGEX, options) => {
  const occurrences = componentNames.map(name => {
    const regex = COMPONENT_OCCURRENCE_REGEX(name)

    let value = 0
    allFiles.forEach(file => {
      const matches = file.match(regex);

      if(matches !== null){
        value += matches.length
      }
    });

    return { name, value }
  })

  const result = filterByOccurrenceCount(occurrences, options.cutoffThreshold)
  
  return result.sort((a, b) => b.value - a.value)
}
