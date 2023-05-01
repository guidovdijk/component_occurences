const path = require('path')

import { 
  ACTIVE_FILTER
} from '../utils/constants'

export const getCurrentActiveFilter = (activeRegex) => {
  if(!['react', 'vue', 'angular', 'custom'].includes(activeRegex)){
    throw new Error("Please make sure the 'activeRegex' value is set to 'react', 'vue', 'angular', or 'custom'")
  }

  const filter = ACTIVE_FILTER[activeRegex]

  return filter
}

export const createCwdPaths = (componentFolderOld, occurrenceFolderOld) => {
  const repoFullPath = process.cwd()
  
  const componentFolder = componentFolderOld.map(folder => {
    return `${repoFullPath}${path.sep}${folder}`.replace(/\\/g, '/')
  })  
  const occurrenceFolder = occurrenceFolderOld.map(folder => {
    return `${repoFullPath}${path.sep}${folder}`.replace(/\\/g, '/')
  })

  return { componentFolder, occurrenceFolder }
}