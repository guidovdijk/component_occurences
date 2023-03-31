import { filterByComponentName } from './utils/helpers';

export const getAllComponentNames = (componentFiles, EXPORT_REGEX, options) => {
  const matches = componentFiles.map(file => {
    const names = file.match(EXPORT_REGEX);
    const filteredComponentNames = filterByComponentName(names, options.componentNameIgnore)

    if(filteredComponentNames){
      return filteredComponentNames
    }
  }).flat(1)

  return matches
}
