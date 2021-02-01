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
  const availableBooleanFlags = gitCommands.commands.find(
    (command) => command.name === inputCommandName
  ).flags;

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
  const flagsDescriptions = Object.entries(parsedArgs).flatMap(
    ([argumentKey, argumentValue]) => {
      // Filters out the boolean flags based on :
      // If the flag exists
      // If it's not _ (minimist prefix to store everything that's not a flag)
      // If the flag is either stored as its full name or the alias
      // TODO: add a check for duplicate
      return availableBooleanFlags.filter(
        (flag) =>
          argumentValue === true &&
          argumentKey !== "_" &&
          (flag.aliases.includes(argumentKey) || flag.name === argumentKey)
      );
    }
  );

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

function renderCommandDescription(command) {
  let flagsDescriptions;
  if (command.flagsDescriptions) {
    flagsDescriptions = command.flagsDescriptions.map((flag) => {
      return (
        <div>
          <h3>
            --{flag.name} (
            {flag.aliases.map((alias) => `-${alias}`).join(" / ")})
          </h3>
          <p>{flag.description}</p>
        </div>
      );
    });
  }

  return (
    <div>
      <h3>git {command.name}</h3>
      <p>{command.description}</p>
      {Object.keys(flagsDescriptions).length > 0 && <h2>Flags</h2>}
      {Object.keys(flagsDescriptions).length > 0 && flagsDescriptions}
    </div>
  );
}

function App() {
  const [matchingCommand, setMatchingCommand] = useState();
  const [inputCommand, setInputCommand] = useState("");
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
        {matchingCommand && renderCommandDescription(matchingCommand)}
      </div>
    </div>
  );
}

export default App;
