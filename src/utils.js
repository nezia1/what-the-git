function snakeToCamel(str) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );
}

function joinWithFinalAnd(arrayToJoin) {
  return arrayToJoin.slice(0, -1).join(", ") + " and " + arrayToJoin.slice(-1);
}

export { snakeToCamel, joinWithFinalAnd };
