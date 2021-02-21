import parser from 'yargs-parser'
import { useState } from 'react'
import './App.css'
import { gitCommands, specialTokens } from './git-commands'
import {
  getAvailableFlagsAsArray,
  getMatchingFlags,
  getParsedFlagsDescriptions,
  getAliasesAsObject,
  replaceSpecialTokens,
} from './git-command-parsing'
import { joinWithFinalAnd } from './utils'
import { GitCommand, InputFlag } from './types'

// Gets the matching git command from the git-commands.js file, and formats the description using the arguments if needed.
function getGitCommand(inputCommand: string): GitCommand | null {
  // Get the command name and check if it exists
  const inputCommandName = inputCommand.split(' ')[1]
  const matchingCommand = gitCommands.commands.find((command) => command.name === inputCommandName)
  if (!(inputCommand.split(' ')[0] === 'git') || !matchingCommand) {
    return null
  }

  // Get all the available flags
  const availableFlags = gitCommands.commands.find((command) => command.name === inputCommandName)
    ?.flags

  // These arrays exist so they can be used with yargs-parser
  let availableFlagsAsArrays
  let aliasesObject

  if (availableFlags) {
    availableFlagsAsArrays = getAvailableFlagsAsArray(availableFlags)
    aliasesObject = getAliasesAsObject(availableFlags)
  }

  // Parse the arguments
  const parsedArgs = parser(inputCommand, {
    boolean: availableFlagsAsArrays?.booleanFlagsArray,
    string: availableFlagsAsArrays?.stringFlagsArray,
    alias: aliasesObject,
  })

  // Restructure the arguments to be easier to work with
  // Instead of the flags being as keys value pairs in the object, put them in their own property called flags with a name and a value
  const parsedArguments = Object.entries(parsedArgs).reduce(
    (acc, [argumentKey, argumentValue]) => {
      if (argumentKey === '_') {
        return { ...acc, _: argumentValue }
      }
      if (argumentValue) {
        acc.flags.push({ name: argumentKey, value: argumentValue })
      }
      return acc
    },
    { _: [] as string[], flags: [] as InputFlag[] }
  )

  let matchingFlags
  if (availableFlags) {
    matchingFlags = getMatchingFlags(availableFlags, parsedArguments)
  }

  // Check if the arguments contain special tokens and replace them by the description to be displayed in the description
  const updatedParsedArguments = replaceSpecialTokens(parsedArguments, specialTokens)

  // Replace string tokens with arguments and add a list of flags descriptions if needed
  const updatedMatchingCommand = {
    ...matchingCommand,
    description: matchingCommand.description.replace(
      '%s',
      joinWithFinalAnd(updatedParsedArguments._)
    ),
    flagsDescriptions: getParsedFlagsDescriptions(matchingFlags || [], parsedArguments),
  }

  return updatedMatchingCommand
}

function renderCommandDescription(command: GitCommand) {
  let flagsDescriptions
  if (command.flagsDescriptions) {
    flagsDescriptions = command.flagsDescriptions.map((flag) => {
      return (
        <div>
          <h3>
            --{flag.name}
            {flag.aliases ? ` (${flag.aliases.map((alias) => `-${alias}`).join(' / ')})` : ''}
          </h3>
          <p>{flag.description}</p>
        </div>
      )
    })
  }

  return (
    <div>
      <h3>git {command.name}</h3>
      <p>{command.description}</p>
      {flagsDescriptions && <h2>Flags</h2>}
      {flagsDescriptions && flagsDescriptions}
    </div>
  )
}

function App() {
  const [matchingCommand, setMatchingCommand] = useState({} as GitCommand)
  const [inputCommand, setInputCommand] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  const handleGetCommandClick = (inputCommand: string) => {
    const gitCommand = getGitCommand(inputCommand.toLowerCase())
    if (!gitCommand) {
      setIsInvalid(true)
      setMatchingCommand({} as GitCommand)
    } else {
      setIsInvalid(false)
      setMatchingCommand(gitCommand)
    }
  }

  return (
    <div className='App'>
      <div className='App-container'>
        <header className='App-header'>
          <h1>
            &gt;what the <span className='git'>git</span>
          </h1>
          <h2>enter a git command and have it explained to you</h2>
        </header>
        <div className='get-command-section'>
          <input
            type='text'
            className='input-command'
            placeholder='git commit -m "Add example command"'
            autoComplete='off'
            autoCapitalize='off'
            onChange={(e) => setInputCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                handleGetCommandClick(inputCommand)
              }
            }}
          />
          <button
            className='get-command-button'
            onClick={() => handleGetCommandClick(inputCommand)}
          >
            git it
          </button>
          {isInvalid && (
            <h2 className='invalid-command-error'>error: the command is not a valid git command</h2>
          )}
          {Object.entries(matchingCommand).length > 0 && renderCommandDescription(matchingCommand)}
        </div>
      </div>
    </div>
  )
}

export default App
