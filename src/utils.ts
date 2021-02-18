function snakeToCamel(str: string) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  )
}

function joinWithFinalAnd(arrayToJoin: string[]) {
  if (arrayToJoin.length === 1) {
    return arrayToJoin
  }
  return arrayToJoin.slice(0, -1).join(', ') + ' and ' + arrayToJoin.slice(-1)
}

export { snakeToCamel, joinWithFinalAnd }
