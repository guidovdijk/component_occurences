import process from 'process';
import path from 'path'

export const PROJECT_PATH = process.cwd()
export const PROJECT_NAME = PROJECT_PATH.split(path.sep).pop()
export const FILE_NAME = "occurrence.json"
export const PORT = process.env.PORT || 5000

export const ACTIVE_FILTER = {
  "react": {
    EXPORT_REGEX: new RegExp(`((?<=export default function )|(?<=export const )|(?<=export default React.memo\\()|(?<=export default (?!function|React)))(\\w+)`, "gm"),
    COMPONENT_OCCURRENCE_REGEX: (word) => new RegExp(`<${word}(\\W|$)`, "gm"),
    FILE_EXTENSIONS: [".tsx", ".jsx", '.js', '.ts']
  }
}

/**
 * Also a good idea to check for component names if they are import with an alias
 * `SomethingNew` will not be added to the occurrence count of button:
 *  import Button as SomethingNew from '...'
 * 
 */
export const baseOptions = {
  title: `${PROJECT_NAME} Component Occurrence`,
  componentNameIgnore: ["Container", "Wrapper"],
  fileIgnore: [".test", ".story."],
  folderPathIgnore: ["Icons", "node_modules"],
  componentFolder: ["src/components", "chl/components"],
  occurrenceFolder: ["src", "chl"],
  cutoffThreshold: 1,
  activeRegex: "react",
  customRegex: {
    componentDefinition: '',
    componentOccurrences: '',
    fileExtensions: []
  }
}