import { snakeToCamel } from './utils'
import { AvailableFlagsArray, Flag, ParsedArguments, SpecialTokens } from './types'

function getAvailableFlagsAsArray(availableFlagsObject: Flag[]): AvailableFlagsArray {
  const booleanFlagsArray = availableFlagsObject.reduce((acc, flag) => {
    if (!flag.isString) {
      if (flag.aliases) {
        return [...acc, flag.name, ...flag.aliases]
      }

      return [...acc, flag.name]
    }

    return acc
  }, [] as string[])

  const stringFlagsArray = availableFlagsObject.reduce((acc, flag) => {
    if (flag.isString) {
      if (flag.aliases) {
        return [...acc, flag.name, ...flag.aliases]
      }

      return [...acc, flag.name]
    }

    return acc
  }, [] as string[])

  return { booleanFlagsArray, stringFlagsArray }
}

function getMatchingFlags(availableFlags: Flag[], parsedArguments: ParsedArguments) {
  const matchingFlags = Object.entries(parsedArguments).flatMap(([argumentKey, argumentValue]) => {
    // Filters out the boolean flags based on :
    // If the flag exists
    // If it's not _ (minimist prefix to store everything that's not a flag)
    // If the flag is either stored as its full name or the alias (only checks for aliases if the property exists)
    // TODO: add a check for duplicate
    return availableFlags.filter(
      (flag) => argumentValue && argumentKey !== '_' && flag.name === argumentKey
    )
  })

  return matchingFlags
}

// Parse the flags descriptions if needed
function getParsedFlagsDescriptions(flagsDescriptions: Flag[], commandArguments: ParsedArguments) {
  return flagsDescriptions.map((flag) => {
    if (flag.isString) {
      // Gets the matching string value for the current flag
      const stringFlagValue = Object.entries(commandArguments).find(
        ([argumentKey]) => argumentKey === flag.name || flag.aliases?.includes(argumentKey)
      )?.[1]
      if (stringFlagValue) {
        return {
          ...flag,
          description: flag.description.replace('%s', stringFlagValue),
        }
      }
    }
    return flag
  })
}

function getAliasesAsObject(availableFlags: Flag[]) {
  return availableFlags.reduce((flagsList, flag) => {
    if (flag.aliases) {
      flagsList[snakeToCamel(flag.name)] = flag.aliases
    }
    return flagsList
  }, {} as any)
}

function replaceSpecialTokens(parsedArguments: ParsedArguments, specialTokens: SpecialTokens) {
  return parsedArguments._.slice(2).map((argument) => {
    if (Object.keys(specialTokens).includes(argument)) {
      return Object.entries(specialTokens).find(([tokenKey]) => tokenKey === argument)?.[1]
    } else return argument
  })
}

export {
  getAvailableFlagsAsArray,
  getMatchingFlags,
  getParsedFlagsDescriptions,
  getAliasesAsObject,
  replaceSpecialTokens,
}
