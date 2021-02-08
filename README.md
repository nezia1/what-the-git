# What The Git
## Introduction

What The Git is a web application that makes it easy to find what a git comman does by just typing it into the search bar. 

It is written with Javascript using React, works only using front-end using parsing of command-line arguments and a simple .json file containing all the descriptions of the commands and their flags. It is also easy to self-host since it doesn't contain a server.

## Features

What The Git only contains really basic git commands and flags so far, but the list will grow with time. I expect to support at least git add, git commit and git push as the final version. Feel free to contribute to fix issues that you found in the app or to add more git commands to it ! As this is a personal project, I would really appreciate it.

## Development
### Run the app on a local machine
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
