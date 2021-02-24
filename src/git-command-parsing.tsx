import { snakeToCamel } from './utils'
import { AvailableFlagsArray, Flag, GitDefinition, ParsedArguments, SpecialTokens } from './types'
import Definition from './components/Definition'

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
  const matchingFlags = parsedArguments.flags.flatMap((inputFlag) => {
    // Filters out the boolean flags based on :
    // If the flag exists
    // If it's not _ (minimist prefix to store everything that's not a flag)
    // If the flag is either stored as its full name or the alias (only checks for aliases if the property exists)
    // TODO: add a check for duplicate
    return availableFlags.filter((availableFlag) => availableFlag.name === inputFlag.name)
  })

  return matchingFlags
}

// Parse the flags descriptions if needed
// TODO: So far if a command has two times the same string value, it just joins them with a space. Needs to be improved for specific flags such as -m writing the message on two paragraphs.
function getParsedFlagsDescriptions(flagsDescriptions: Flag[], commandArguments: ParsedArguments) {
  return flagsDescriptions.map((flag) => {
    if (flag.isString) {
      // Gets the matching string value for the current flag
      let stringFlagValue = commandArguments.flags.find((inputFlag) => inputFlag.name === flag.name)
        ?.value
      if (Array.isArray(stringFlagValue)) {
        stringFlagValue = stringFlagValue.join(' ')
      }

      if (typeof stringFlagValue === 'string') {
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
  const updatedArguments = parsedArguments._.slice(2).map((argument) => {
    return (
      Object.entries(specialTokens).find(([tokenKey]) => tokenKey === argument)?.[1] ?? argument
    )
  })

  return { ...parsedArguments, _: updatedArguments }
}

function parseDescriptionWithGitDefinitions(text: string, definition: GitDefinition) {
  const updatedDescription = text.split(definition.regex).map((str) => {
    if (definition.regex.test(str)) {
      return <Definition definition={definition} />
    }
    return str
  })
  return updatedDescription
}

export {
  getAvailableFlagsAsArray,
  getMatchingFlags,
  getParsedFlagsDescriptions,
  getAliasesAsObject,
  replaceSpecialTokens,
  parseDescriptionWithGitDefinitions,
}
