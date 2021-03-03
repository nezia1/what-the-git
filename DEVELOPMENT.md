# Developer manual

This readme intends to help you understand the project better by explaining its structure.

## Project structure

The project is a classic React application, created with create-react-app. It works by parsing a single .json file, which is located in [src/git-commands.ts](src/git-commands.ts). As the user enters an input in the bar and confirms, a single function is called (`getGitCommand`). The function works this way:

- Gets the command from the user input
- Find all the available flags for the command
- Create arrays of flags to be used with the parsing librairies (separate flags that can have a string value and strictly boolean ones)
- Parse the arguments using yargs-parser
- Restructure the arguments in another object because yargs-parser has an awkward object structure to work with
- Check for special tokens such as . and replace them by the corresponding description
- Replace string tokens (%s) with their corresponding argument values
- Return the final object with a parsed description using the parseDescription function, embedding articles of matching git jargon keywords as spans in the description

The command is then rendered using renderCommandDescription.

## git-commands.ts structure

The structure of the git-commands.ts is really simple. It's a json file with the following structure:

- An array of commands
- Command
  - A name property with the name of the git command
  - The description for the command
  - An array of flags
- Flag
  - The name of the flag
  - A description of the flag
  - An array of valid aliases for the flag
  - A boolean that states if the flag is a string flag or not
