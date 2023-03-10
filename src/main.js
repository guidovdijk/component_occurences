import express from "express";
import process from 'process';

import {
  REACT_EXPORT_REGEX, 
  REACT_FILE_EXTENSION, 
  REACT_COMPONENT_DEFINITION_REGEX,
  PORT
} from "./utils/constants";

import { options } from './setup/setup'

import { filterByComponentName, filterByOccurrenceCount } from './utils/helpers'

import { createChartTemplate } from "./templates/chartTemplate";

import { getAllComponentNames } from "./getAllComponentNames";
import { getAllOccurrences } from "./getAllOccurrences";


const app = express();
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
const filteredComponentNames = filterByComponentName(allComponentExports, options.componentNameIgnore)

filteredComponentNames.forEach(word => {
  const occurrenceCount = getAllOccurrences(options.occurrenceFolder[0], REACT_COMPONENT_DEFINITION_REGEX(word), REACT_FILE_EXTENSION);

  occurrences.push({ name: word, value: occurrenceCount })
})


const filteredOccurrences = filterByOccurrenceCount(occurrences, options.cutoffThreshold)
filteredOccurrences.sort((b, a) => a.value - b.value)


app.get("/", (req, res) => {
  const chart = createChartTemplate(filteredOccurrences, options.chartTitle)

  res.send(chart);
});
