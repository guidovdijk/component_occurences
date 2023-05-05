export const getComponentPosition = (components, POSITION_REGEX) => {
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
      path: component.path,
      startLine: startLine + 1,
      startColumn
    };
  });

  return result;
}