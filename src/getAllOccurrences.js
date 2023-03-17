import { filterByFileExtensions } from './utils/helpers';

const fs = require('fs');
const path = require('path');

export const getAllOccurrences = (startPath, regex, fileExtensions, fileIgnoreArr) => {
  let count = 0;
  const files = fs.readdirSync(startPath);

  files.forEach((file) => {
    const filePath = path.join(startPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      count += getAllOccurrences(filePath, regex, fileExtensions, fileIgnoreArr);
    } else {
      const fileExt = path.extname(file)
      const isIncorrectFileExtension = !fileExtensions && !fileExtensions.includes(fileExt)
      const isIgnoredFileExtension = filterByFileExtensions(fileIgnoreArr, filePath)

      if (isIncorrectFileExtension || isIgnoredFileExtension) {
        return;
      }

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const matches = fileContent.match(regex);
      
      if (matches !== null) {
        count += matches.length;
      }
    }
  });

  return count;
}