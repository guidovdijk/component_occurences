const fs = require('fs');
const path = require('path');
const util = require('util')

const startPath = '../instantly/src';
const exportPath = '../instantly/src/components';
const getExports = /((?<=export default function )|(?<=export default React.memo\()|(?<=export const )|(?<=export default (?!function|React)))(\w+)/g
const fileExtension = 'tsx';

const allComponentNames = []

function getAllExports(startPath, regex, fileExtension = null) {
  const files = fs.readdirSync(startPath);

  files.forEach((file) => {
    const filePath = path.join(startPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllExports(filePath, regex, fileExtension);
    } else {
      if (fileExtension && path.extname(file) !== `.${fileExtension}`) {
        return;
      }

      if(filePath.includes('.story') || filePath.includes('.test') || filePath.includes('Icons') || filePath.includes('Illucons')){
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

  return allComponentNames;
}


function searchWordInFiles(startPath, regex, fileExtension = null) {
  let count = 0;
  const files = fs.readdirSync(startPath);

  files.forEach((file) => {
    const filePath = path.join(startPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      count += searchWordInFiles(filePath, regex, fileExtension);
    } else {
      if (fileExtension && path.extname(file) !== `.${fileExtension}`) {
        return;
      }

      if(filePath.includes('.story') || filePath.includes('.test')){
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



// [ { Key, Value }]
// let data = [{foo: "1", bar: "2"}, "columns": ['foo', 'bar']]


// ((?<=export default function )|(?<=export default React.memo\()|(?<=export default (?!function|React)))(\w+)

// /(?:export default function|export default React\.memo\()\s*(\w+)/g
// ((?<=export default function )|(?<=export default React.memo\())(\w+)
// (?:export default function)\s*(\w+)
// (?:export default React\.memo\()\s*(\w+)
// (?:export default)\s*(\w+)

const allComponentExports = getAllExports(exportPath, getExports, fileExtension);

console.log(`Amount of components: ${allComponentExports.length}\n| Component Names: ${allComponentExports}`);

const occurrences = []

allComponentExports.forEach(e => {
  var wordToSearch = new RegExp(`<${e}(?!\w+)`, "gm");
  const occurrence = searchWordInFiles(startPath, wordToSearch, fileExtension);

  occurrences.push({ name: e, value: occurrence })
})

occurrences.sort(function(b, a) {
  return a.value - b.value;
});

// Removed container styled components, because it skews the results, due to multiple definitions with the same name
const removeZeroOccurrences = occurrences.filter(o => o.value > 0).filter(o => o.name !== 'Container').filter(o => o.name !== 'Wrapper')


// console.log(util.inspect(removeZeroOccurrences, {showHidden: false, depth: null, colors: true}))
console.log(JSON.stringify(removeZeroOccurrences, null, 4));
// console.log(`The word "${wordToSearch}" was found ${occurrences} times.`);
// output('./testimage', d3nBar({data: data}, { xAxis: 'Foo', yAxis: 'Bar' }));
