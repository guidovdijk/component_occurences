export const GLOB_SETTINGS = { 
  withFileTypes: false,
  noDir: true
};

export const ACTIVE_FILTER = {
  "react": {
    EXPORT_REGEX: new RegExp(`((?<=export default function )|(?<=export const )|(?<=export default React.memo\\()|(?<=export default (?!function|React)))(\\w+)`, "gm"),
    POSITION_REGEX: (word) => new RegExp(`((?<=export default function )|(?<=export const )|(?<=export default React.memo\\()|(?<=export default (?!function|React)))(${word})\\b`, "gm"),
    COMPONENT_OCCURRENCE_REGEX: (word) => new RegExp(`<${word}(\\W|$)`, "gm"),
    FILE_EXTENSIONS: [".tsx", ".jsx", '.js', '.ts']
  }
}
