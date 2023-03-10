const fs = require('fs');
const path = require('path');
const util = require('util')
const express = require("express");
  
const app = express();
  
app.listen(5000, () => {
  console.log(`Server is up and running on 5000 ...`);
});



const startPath = '../instantly/src';
const exportPath = '../instantly/src/components';

// The Regex pattern for styled-components: (?<=export const )|
const getExports = new RegExp(`((?<=export default function )|(?<=export const )|(?<=export default React.memo\\()|(?<=export default (?!function|React)))(\\w+)`, "gm")
const fileExtension = 'tsx';

const allComponentNames = []

/**
 * 
 * Problem with code. Because we also check for styled components the occurrences are not fully trustworthy
 * Due to multiple styled-components having the same name, like Container or Title.
 * 
 * Fix:
 * Exclude the path of the styled components, because they are only used in the corresponding parent file
 * 
 * Problem 2:
 * In instantly project are 30 components, but this code only finds 27
*/

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
        // console.log("regex: ", regex, "matches: ", matches, "length: ", matches.length)
        count += matches.length;
      }
    }
  });

  return count;
}


const allComponentExports = getAllExports(exportPath, getExports, fileExtension);

console.log(`Amount of components: ${allComponentExports.length}\n| Component Names: ${allComponentExports}`);

const occurrences = []

allComponentExports.forEach(word => {
  //  <${word}(\s|>|$)
  var wordRegex = new RegExp(`<${word}(\\W|$)`, "gm");
  const occurrence = searchWordInFiles(startPath, wordRegex, fileExtension);

  occurrences.push({ name: word, value: occurrence })
})

occurrences.sort(function(b, a) {
  return a.value - b.value;
});

// Removed container styled components, because it skews the results, due to multiple definitions with the same name
const removeZeroOccurrences = occurrences.filter(o => o.value > 1).filter(o => o.name !== 'Container').filter(o => o.name !== 'Wrapper')


app.get("/", (req, res) => {
  const chart = `
  <style> .anychart-credits { display: none; } </style>
  <script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-base.min.js" type="text/javascript"></script>
  
  <div id="container" style="width: 100%; height: ${50 * removeZeroOccurrences.length}px;"></div>
  
  <script>
    anychart.onDocumentReady(function() {
      var data = {
        header: ["Component name", "Occurrences"],
        rows: ${JSON.stringify(removeZeroOccurrences)}
      }
      // create the chart
      var chart = anychart.bar();
    
      // add data
      chart.data(data);
      chart.labels(true);
    
    
      // set the chart title
      chart.title("Instantly Component occurences");
    
      // draw
      chart.container("container");
      chart.draw();
    });
  </script>`


  res.send(chart);
});

// console.log(util.inspect(removeZeroOccurrences, {showHidden: false, depth: null, colors: true}))
console.log(JSON.stringify(removeZeroOccurrences, null, 4));
// console.log(`The word "${wordToSearch}" was found ${occurrences} times.`);
// output('./testimage', d3nBar({data: data}, { xAxis: 'Foo', yAxis: 'Bar' }));
