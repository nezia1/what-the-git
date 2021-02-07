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

// Parse the flags descriptions if needed
// TODO: Fix arguments between double quotes not working
function getParsedFlagsDescriptions(flagsDescriptions, commandArguments) {
  console.log(commandArguments);
  return flagsDescriptions.map((flag) => {
    if (flag.isString) {
      // Gets the matching string value for the current flag
      const stringFlagValue = Object.entries(commandArguments).find(
        ([argumentKey]) => {
          if (flag.hasOwnProperty("aliases")) {
            return (
              argumentKey === flag.name || flag.aliases.includes(argumentKey)
            );
          }
          return argumentKey === flag.name;
        }
      )[1];
      return {
        ...flag,
        description: flag.description.replace("%s", stringFlagValue),
      };
    }
    return flag;
  });
}

export {
  getAvailableFlagsAsArray,
  getMatchingFlags,
  getParsedFlagsDescriptions,
};
