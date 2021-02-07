function getAvailableFlagsAsArray(availableFlagsObject) {
  const booleanFlagsArray = availableFlagsObject
    .filter((flag) => !flag.isString)
    .reduce(
      (acc, flag) =>
        flag.hasOwnProperty("aliases")
          ? acc.concat(flag.name, flag.aliases)
          : acc.concat(flag.name),
      []
    );
  const stringFlagsArray = availableFlagsObject
    .filter((flag) => flag.isString)
    .reduce(
      (acc, flag) =>
        flag.hasOwnProperty("aliases")
          ? acc.concat(flag.name, flag.aliases)
          : acc.concat(flag.name),
      []
    );

  return { booleanFlagsArray, stringFlagsArray };
}

export { getAvailableFlagsAsArray };
