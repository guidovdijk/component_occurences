const fs = require('fs');
const path = require('path');

const allComponentNames = []

export const getAllComponentNames = (startPath, regex, fileExtensions = null) => {
  const files = fs.readdirSync(startPath);

  files.forEach((file) => {
    const filePath = path.join(startPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllComponentNames(filePath, regex, fileExtensions);
    } else {
      const fileExt = path.extname(file)

      if (fileExtensions && !fileExtensions.includes(fileExt)) {
        return;
      }

      if(
        filePath.includes('.story') ||
        filePath.includes('.test') || 
        filePath.includes('Icons') ||
        filePath.includes('Illucons')
      ){
        return;
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const matches = fileContent.match(regex);
      
      if (matches !== null) {
        matches.forEach(match => {
          allComponentNames.push(match)
        })
      }
    }
  });

  return allComponentNames
}
