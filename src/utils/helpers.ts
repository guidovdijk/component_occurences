import { GlobOptions, glob } from 'glob'
import { promises as fsPromises } from 'fs'
const fs = require('fs').promises;

export interface IFileContentProps {
  path: string
  basename: string
  content: string
}

export interface IOccurrencesProps extends IFileContentProps {
  name: string
  value: number
}

export const filterByOccurrenceCount = (arr: IOccurrencesProps[]) => {
  return arr.filter(o => o.value == 0)
}

export const filterByComponentName = (arr: RegExpMatchArray | null, ignoreComponentArr: string[]): string[] => {
  if(!arr){
    return []
  }
  return arr.filter(item => !ignoreComponentArr.includes(item));
}

export const getFileContent = async(path: string | string[], settings: GlobOptions): Promise<IFileContentProps[]> => {
  const paths = await glob(path, settings)
  
  const files = paths.map(async file => {
    try {
      const stat = await fs.lstat(file);
      if(stat.isFile()) {
        const content = await fsPromises.readFile(file.toString());
  
        return {
          path: file,
          basename: file.toString().split(process.cwd())[1].replace(/\\/g, '/'),
          content: content.toString()
        }
      }
    } catch (err) {
      console.log(err);
      return null
    }
  })
  
  const result = await Promise.all(files).then((fileArray) => {
    return fileArray.filter((file) => file !== null) as IFileContentProps[]; // Filter out null values and cast the type
  });

  return result
}

