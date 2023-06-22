import { IOccurrencesProps } from "./utils/helpers"

export interface IComponentProps {
  name: string
  basename: string
  path: string
  startLine: number
  startColumn: number
}

export const getComponentPosition = (
  components: IOccurrencesProps[], 
  POSITION_REGEX: (word: string) => RegExp
): IComponentProps[] => {
  const result = components.map(component => {      
    let startLine = -1;
    let startColumn = 0;
    let allLines = component.content.split("\n");

    for (let i = 0; i < allLines.length; i++) {
        if (allLines[i].match(POSITION_REGEX(component.name))) {
          startLine = i;
          startColumn = allLines[i].indexOf(component.name)
        }
    }

    return {
      name: component.name,
      basename: component.basename,
      path: component.path,
      startLine: startLine + 1,
      startColumn
    };
  });

  return result;
}