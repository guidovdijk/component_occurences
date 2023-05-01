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
