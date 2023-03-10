import express from "express";
import process from 'process';

import {
  REACT_EXPORT_REGEX, 
  REACT_FILE_EXTENSION, 
  REACT_COMPONENT_DEFINITION_REGEX,
  PORT
} from "./utils/constants";

import { createChartTemplate } from "./templates/chartTemplate";
import { getAllComponentNames } from "./getAllComponentNames";
import { getAllOccurrences } from "./getAllOccurrences";

import { options } from './setup/setup'

const app = express();
const startPath = '../instantly/src';
const exportPath = '../instantly/src/components';
const occurrences = []

if(!options){
  process.exit()
}

console.log(options);

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

console.log("Current working directory: ", process.cwd());


const allComponentExports = getAllComponentNames(options.componentFolder[0], REACT_EXPORT_REGEX, REACT_FILE_EXTENSION)

allComponentExports.forEach(word => {
  const occurrenceCount = getAllOccurrences(options.occurrenceFolder[0], REACT_COMPONENT_DEFINITION_REGEX(word), REACT_FILE_EXTENSION);

  occurrences.push({ name: word, value: occurrenceCount })
})


// Removed Container/Wrapper styled components, because it skews the results, due to multiple definitions with the same name
const filteredOccurrences = occurrences
  .filter(o => o.value > 1 && o.name !== 'Container' && o.name !== 'Wrapper')
  .sort((b, a) => a.value - b.value)


app.get("/", (req, res) => {
  const chart = createChartTemplate(filteredOccurrences, options.chartTitle)

  res.send(chart);
});
