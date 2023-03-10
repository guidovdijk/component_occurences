import process from 'process';

export const PROJECT_PATH = process.cwd()
export const PROJECT_NAME = PROJECT_PATH.split("/").pop()
export const FILE_NAME = "occurrence.json"
export const PORT = process.env.PORT || 5000

export const REACT_EXPORT_REGEX = new RegExp(`((?<=export default function )|(?<=export const )|(?<=export default React.memo\\()|(?<=export default (?!function|React)))(\\w+)`, "gm");
export const REACT_COMPONENT_DEFINITION_REGEX = (word) => new RegExp(`<${word}(\\W|$)`, "gm");
export const REACT_FILE_EXTENSION = "tsx"


export const baseOptions = {
  chartTitle: `${PROJECT_NAME} Component Occurrence`,
  componentNameIgnore: ["Container", "Wrapper"],
  fileIgnore: [".test", ".story."],
  folderPathIgnore: ["Icons", "node_modules"],
  componentFolder: ["src/components", "chl/components"],
  occurrenceFolder: ["src", "chl"],
  cutoffThreshold: 1,
  activeRegex: ["react"],
  regexComponentDefinition: {
    react: "((?<=export default function )|(?<=export const )|(?<=export default React.memo\\()|(?<=export default (?!function|React)))(\\w+)",
    vue: "test",
    angular: "the_regex_to_test_goes_here",
    custom: null
  },
  regexComponentOccurrences: {
    react: "1",
    vue: "2",
    angular: "3",
    custom: null
  }
}