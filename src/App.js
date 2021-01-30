import { useState } from "react";
import "./App.css";
import gitCommands from "./git-commands";
const parseArgs = require("minimist");

// Gets the matching git command from the git-commands.js file, and formats the description using the arguments if needed.
//TODO: Get the list of boolean flags from the commands file, and make it command specific.
//TODO: Also add a description of the flags.

function getGitCommand(inputCommand) {
  // Get the command name and check if it exists
  const inputCommandName = inputCommand.split(" ")[1];
  const matchingCommand = gitCommands.commands.find(
    (command) => command.name === inputCommandName
  );
  if (!matchingCommand) {
    return null;
  }
  // Get all the available boolean flags
  const availableBooleanFlags = gitCommands.flags.filter((flag) =>
    flag.commands.includes(inputCommandName)
  );

  // This array exists so it can be used with minimist (it takes the commands and their aliases to treat them as boolean flags when parsing)
  const availableBooleanFlagsArray = availableBooleanFlags.reduce(
    (acc, flag) => [...acc, flag.name, ...flag.aliases],
    []
  );

  // Parse the arguments
  const parsedArgs = parseArgs(inputCommand.split(" "), {
    boolean: availableBooleanFlagsArray,
  });

  // Generate a list of flags with their corresponding descriptions
  const flagsDescriptions = Object.entries(parsedArgs).flatMap((argument) => {
    const argumentKey = argument[0];
    const argumentValue = argument[1];
    // Filters out the boolean flags based on :
    // If the flag exists
    // If it's not _ (minimist prefix to store everything that's not a flag)
    // If the flag is either stored as its full name or the alias
    // TODO: add a check for duplicate
    return availableBooleanFlags.filter(
      (flag) =>
        argumentValue === true &&
        argumentKey !== "_" &&
        (flag.aliases.includes(argument[0]) || flag.name === argumentKey)
    );
  });

  // Generate a description based on the command and add a list of flags descriptions if needed
  const updatedMatchingCommand = {
    ...matchingCommand,
    description: matchingCommand.description.replace(
      "%s",
      parsedArgs._.slice(2).join(", ")
    ),
    flagsDescriptions,
  };
  return updatedMatchingCommand;
}

function App() {
  const [matchingCommand, setMatchingCommand] = useState();
  const [inputCommand, setInputCommand] = useState();
  return (
    <div className="App">
      <header className="App-header">
        <h1>What the git</h1>
        <h2>Enter a git command and have it explained to you</h2>
        <input
          type="text"
          className="input-command"
          onChange={(e) => setInputCommand(e.target.value)}
        />
      </header>
      <div className="get-command-section">
        <button
          className="get-command-button"
          onClick={() => setMatchingCommand(getGitCommand(inputCommand))}
        >
          Git it
        </button>
        {matchingCommand && <p>{matchingCommand.description}</p>}
      </div>
    </div>
  );
}

export default App;
