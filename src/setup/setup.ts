const path = require('path')

import { 
  ACTIVE_FILTER, IActiveFilterProps
} from '../utils/constants'


export type filterType = 'react' | 'vue' | 'angular' | 'custom'

export const getCurrentActiveFilter = (activeRegex: filterType): IActiveFilterProps => {
  if(!['react', 'vue', 'angular', 'custom'].includes(activeRegex)){
    throw new Error("Please make sure the 'activeRegex' value is set to 'react', 'vue', 'angular', or 'custom'")
  }

  const filter = ACTIVE_FILTER[activeRegex]

  return filter
}

export const createCwdPaths = (componentFolderOld: string[], occurrenceFolderOld: string[]) => {
  const repoFullPath = process.cwd()
  
  const componentFolder = componentFolderOld.map((folder: string) => {
    return `${repoFullPath}${path.sep}${folder}`.replace(/\\/g, '/')
  })  
  const occurrenceFolder = occurrenceFolderOld.map((folder: string) => {
    return `${repoFullPath}${path.sep}${folder}`.replace(/\\/g, '/')
  })

  return { componentFolder, occurrenceFolder }
}