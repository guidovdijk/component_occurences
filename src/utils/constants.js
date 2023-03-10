export const REACT_EXPORT_REGEX = new RegExp(`((?<=export default function )|(?<=export const )|(?<=export default React.memo\\()|(?<=export default (?!function|React)))(\\w+)`, "gm");
export const REACT_COMPONENT_DEFINITION_REGEX = (word) => new RegExp(`<${word}(\\W|$)`, "gm");
export const REACT_FILE_EXTENSION = "tsx"