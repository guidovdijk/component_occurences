import express from "express";

import {
  REACT_EXPORT_REGEX, 
  REACT_FILE_EXTENSION, 
  REACT_COMPONENT_DEFINITION_REGEX
} from "./utils/constants";

import { createChartTemplate } from "./templates/chartTemplate";
import { getAllComponentNames } from "./getAllComponentNames";
import { getAllOccurrences } from "./getAllOccurrences";

const app = express();
const startPath = '../instantly/src';
const exportPath = '../instantly/src/components';
const occurrences = []

app.listen(5000, () => {
  console.log(`Server is up and running on 5000 ...`);
});


const allComponentExports = getAllComponentNames(exportPath, REACT_EXPORT_REGEX, REACT_FILE_EXTENSION)

allComponentExports.forEach(word => {
  const occurrenceCount = getAllOccurrences(startPath, REACT_COMPONENT_DEFINITION_REGEX(word), REACT_FILE_EXTENSION);

  occurrences.push({ name: word, value: occurrenceCount })
})


// Removed container styled components, because it skews the results, due to multiple definitions with the same name
const filteredOccurrences = occurrences
  .filter(o => o.value > 1 && o.name !== 'Container' && o.name !== 'Wrapper')
  .sort((b, a) => a.value - b.value)


app.get("/", (req, res) => {
  const chart = createChartTemplate(filteredOccurrences, "Instantly Component occurrences")

  res.send(chart);
});
