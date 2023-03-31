import express from "express";
import process from 'process';

import {
  PROJECT_NAME,
  PORT,
  GLOB_SETTINGS
} from "./utils/constants";

import { options, currentActiveFilter } from './setup/setup'

import { getFileContent } from './utils/helpers'

import { createChartTemplate } from "./templates/chartTemplate";

import { getAllComponentNames } from "./getAllComponentNames";
import { getAllOccurrences } from "./getAllOccurrences";

const app = express();

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
} = currentActiveFilter



const filteredOccurrences = async() => {
  const componentFiles = await getFileContent(options.componentFolder, GLOB_SETTINGS)
  const allFiles = await getFileContent(options.occurrenceFolder, GLOB_SETTINGS)
  const componentNames = getAllComponentNames(componentFiles, EXPORT_REGEX, options)

  const occurrences = getAllOccurrences(componentNames, allFiles, COMPONENT_OCCURRENCE_REGEX, options)

  return occurrences
};


app.get("/", async (req, res) => {
  const results = await filteredOccurrences()
  const chart = createChartTemplate(results, options.title)

  res.send(chart);
});
