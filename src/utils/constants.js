export const GLOB_SETTINGS = { 
  withFileTypes: false,
  noDir: true,
  ignore: {
    ignored: (p) => p.name.includes("story") || p.name.includes("test")
  }
};

export const ACTIVE_FILTER = {
  "react": {
    EXPORT_REGEX: new RegExp(`((?<=export default function )|(?<=export const )|(?<=export default React.memo\\()|(?<=export default (?!function|React)))(\\w+)`, "gm"),
    COMPONENT_OCCURRENCE_REGEX: (word) => new RegExp(`<${word}(\\W|$)`, "gm"),
    FILE_EXTENSIONS: [".tsx", ".jsx", '.js', '.ts']
  }
}
