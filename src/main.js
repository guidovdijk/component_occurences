import express from "express";
import process from 'process';

import {
  PROJECT_NAME,
  PORT
} from "./utils/constants";

import { options, currentActiveFilter } from './setup/setup'

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

console.log(`Current project: ${PROJECT_NAME}`);


const {
  EXPORT_REGEX, 
  COMPONENT_OCCURRENCE_REGEX, 
  FILE_EXTENSIONS
} = currentActiveFilter

const allComponentExports = options.componentFolder.map(folder => {
  return getAllComponentNames(folder, EXPORT_REGEX, FILE_EXTENSIONS, options.folderPathIgnore)
}).flat(1);


const filteredComponentNames = filterByComponentName(allComponentExports, options.componentNameIgnore)

// * styled-components with the same name exist and skew the results
filteredComponentNames.forEach(word => {
  let value = 0
  
  options.occurrenceFolder.forEach(folder => {
    value += getAllOccurrences(folder, COMPONENT_OCCURRENCE_REGEX(word), FILE_EXTENSIONS);
  }); 

  occurrences.push({ name: word, value })
})


const filteredOccurrences = filterByOccurrenceCount(occurrences, options.cutoffThreshold)
filteredOccurrences.sort((b, a) => a.value - b.value)

console.log(filteredOccurrences)

app.get("/", (req, res) => {
  const chart = createChartTemplate(filteredOccurrences, options.title)

  res.send(chart);
});
