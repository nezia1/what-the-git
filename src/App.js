import parser from "yargs-parser";
import { useState } from "react";
import "./App.css";
import { gitCommands, specialTokens } from "./git-commands";
import {
  getAvailableFlagsAsArray,
  getMatchingFlags,
  getParsedFlagsDescriptions,
  getAliasesAsObject,
  replaceSpecialTokens,
} from "./git-command-parsing";

// Gets the matching git command from the git-commands.js file, and formats the description using the arguments if needed.

function getGitCommand(inputCommand) {
  // Get the command name and check if it exists
  const inputCommandName = inputCommand.split(" ")[1];
  const matchingCommand = gitCommands.commands.find(
    (command) => command.name === inputCommandName
  );
  if (!matchingCommand) {
    return null;
  }

  // Get all the available flags
  const availableFlags = gitCommands.commands.find(
    (command) => command.name === inputCommandName
  ).flags;

  // These arrays exist so they can be used with yargs-parser
  const availableFlagsAsArrays = getAvailableFlagsAsArray(availableFlags);
  const aliasesObject = getAliasesAsObject(availableFlags);

  // Parse the arguments
  const parsedArgs = parser(inputCommand, {
    boolean: availableFlagsAsArrays.booleanFlagsArray,
    string: availableFlagsAsArrays.stringFlagsArray,
    alias: aliasesObject,
  });
  const matchingFlags = getMatchingFlags(availableFlags, parsedArgs);

  // Check if the arguments contain special tokens and replace them by the description to be displayed in the description
  const updatedParsedArgs = replaceSpecialTokens(parsedArgs, specialTokens);

  // Replace string tokens with arguments and add a list of flags descriptions if needed
  const updatedMatchingCommand = {
    ...matchingCommand,
    description: matchingCommand.description.replace(
      "%s",
      updatedParsedArgs.join(", ")
    ),
    flagsDescriptions: getParsedFlagsDescriptions(matchingFlags, parsedArgs),
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
            --{flag.name}
            {flag.hasOwnProperty("aliases")
              ? ` (${flag.aliases.map((alias) => `-${alias}`).join(" / ")})`
              : ""}
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
