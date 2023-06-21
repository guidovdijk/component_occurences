import { IFileContentProps, filterByComponentName } from './utils/helpers';

export interface IComponentNameProps extends IFileContentProps {
  filteredComponentNames: string[]
}

export const getAllComponentNames = (
  componentFiles: IFileContentProps[], 
  EXPORT_REGEX: RegExp, 
  componentNameIgnore: string[]
): IComponentNameProps[] => {
  const matches: (IComponentNameProps | null)[] = componentFiles.map((file: IFileContentProps) => {
    const names = file.content.match(EXPORT_REGEX);

    if(!names){
      return null
    }

    const filteredComponentNames = filterByComponentName(names, componentNameIgnore)

    if(filteredComponentNames){
      const res: IComponentNameProps = { 
        ...file,
        filteredComponentNames,
      }

      return res
    }

    return null
  }).flat(1)


  if(!matches){
    throw new Error("No Matches found");
  }

  const res: IComponentNameProps[] = matches.filter(item => item !== null) as IComponentNameProps[];
  return res
}
