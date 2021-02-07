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

function getMatchingFlags(availableFlags, parsedArguments) {
  const matchingFlags = Object.entries(parsedArguments).flatMap(
    ([argumentKey, argumentValue]) => {
      // Filters out the boolean flags based on :
      // If the flag exists
      // If it's not _ (minimist prefix to store everything that's not a flag)
      // If the flag is either stored as its full name or the alias (only checks for aliases if the property exists)
      // TODO: add a check for duplicate
      return availableFlags.filter(
        (flag) =>
          argumentValue &&
          argumentKey !== "_" &&
          ((flag.hasOwnProperty("aliases")
            ? flag.aliases.includes(argumentKey)
            : false) ||
            flag.name === argumentKey)
      );
    }
  );

  return matchingFlags;
}

export { getAvailableFlagsAsArray, getMatchingFlags };
