import { GlobOptions } from "glob";

export const GLOB_SETTINGS: GlobOptions = { 
  withFileTypes: false,
  nodir: true
}

export interface IActiveFilterProps {
  EXPORT_REGEX: RegExp,
  POSITION_REGEX: (word:string) => RegExp,
  COMPONENT_OCCURRENCE_REGEX: (word: string) => RegExp,
  FILE_EXTENSIONS: string[]
}
 
const react: IActiveFilterProps = {
  EXPORT_REGEX: new RegExp(`((?<=export default function )|(?<=export const )|(?<=export default React.memo\\()|(?<=export default (?!function|React)))(\\w+)`, "gm"),
  POSITION_REGEX: (word: string) => new RegExp(`((?<=export default function )|(?<=export const )|(?<=export default React.memo\\()|(?<=export default (?!function|React)))(${word})\\b`, "gm"),
  COMPONENT_OCCURRENCE_REGEX: (word: string) => new RegExp(`<${word}(\\W|$)`, "gm"),
  FILE_EXTENSIONS: [".tsx", ".jsx", '.js', '.ts']
}

export const ACTIVE_FILTER: {[key: string]: IActiveFilterProps} = {
  'react': react
}
