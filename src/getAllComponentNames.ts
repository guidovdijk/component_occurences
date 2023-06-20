import { IFileContentProps, filterByComponentName } from './utils/helpers';

export interface IComponentNameProps extends IFileContentProps {
  filteredComponentNames: string[]
}

export const getAllComponentNames = (
  componentFiles: IFileContentProps[], 
  EXPORT_REGEX: RegExp, 
  componentNameIgnore: string[]
): IComponentNameProps[] => {
  const matches = componentFiles.map((file: IFileContentProps) => {
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
  return matches.filter(item => item !== null);

}
