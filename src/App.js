import { useState } from "react";
import "./App.css";
import gitCommands from "./git-commands";
const parseArgs = require("minimist");

// Gets the matching git command from the git-commands.js file, and formats the description using the arguments if needed.
//TODO: Get the list of boolean flags from the commands file, and make it command specific.
//TODO: Also add a description of the flags.
function getGitCommand(inputCommand) {
  const parsedArgs = parseArgs(inputCommand.split(" "), { boolean: ["v"] });
  const inputCommandName = parsedArgs._[1];
  const matchingCommand = gitCommands.commands.find(
    (command) => command.name === inputCommandName
  );
  if (!matchingCommand) {
    return null;
  }
  const updatedMatchingCommand = {
    ...matchingCommand,
    description: matchingCommand.description.replace(
      "%s",
      parsedArgs._.slice(2).join(", ")
    ),
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
