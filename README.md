# What The Git

## Introduction

What The Git is a web application that makes it easy to find what a git comman does by just typing it into the search bar.

It is written with Javascript using React, works only using front-end using parsing of command-line arguments and a simple .json file containing all the descriptions of the commands and their flags. It is also easy to self-host since it doesn't contain a server.

## Features

What The Git only contains really basic git commands and flags so far, but the list will grow with time. I expect to support at least git add, git commit and git push as the final version. Feel free to contribute to fix issues that you found in the app or to add more git commands to it ! As this is a personal project, I would really appreciate it.

## Upcoming features
* Small articles about certain terms and git jargon, such as staging area, commit etc. as hyperlinks in the command description
* More verbose errors (telling you where the command went wrong and why instead of just showing a generic error message)

Feel free to submit an issue if you have feature requests, I'll gladly take them.

## Supported commands
So far, only git add, git commit and git push are supported, with a small number of flags.

## Contribute

As I stated above, pull requests, bug reports and feature requests are very much appreciated. This is a big project for me, and any help would be truly appreciated! I setup a couple of templates in the issues section if you want to contribute. I don't feel like adding a code of conduct, I only expect contributers to be respectful to each other.

## Development

### Run the app on a local machine

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
