export const filterByOccurrenceCount = (arr, countThreshold) => {
  return arr.filter(o => o.value > countThreshold)
}

export const filterByComponentName = (arr, ignoreComponentArr) => {
  return arr.filter(item => !ignoreComponentArr.includes(item));
}