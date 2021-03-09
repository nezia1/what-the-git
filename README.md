<p align="center">
  <img src="https://i.ibb.co/GQF1Mxm/logo.webp" alt="What The Git"/>
</p>


<h4 align="center">A web application that makes it easy to find what a git command does by just typing it into the search bar. </h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#upcoming-features">Upcoming Features</a> •
  <a href="#supported-commands">Supported Commands</a> •
  <a href="#contribute">Contribute</a>  
</p>


## Introduction
This project is written with Typescript using React. It works only with a front-end, using parsing of command-line arguments and a simple .json file containing all the descriptions of the commands and their flags. It is also easy to self-host since it doesn't contain a server.

## Features
What The Git only contains really basic git commands and flags so far, but the list will grow with time. I expect to support at least git add, git commit and git push. Feel free to contribute to fix issues that you found in the app or to add more git commands to it ! As this is a personal project, I would really appreciate it.

It also features a system that embeds descriptions of git jargon such as staging area, commit etc. as hyperlinks in the command description. You can either hover them to see a short description, or click the "read article" button to be redirected on the full article.

## Upcoming features
* More verbose errors (telling you where the command went wrong and why instead of just showing a generic error message)

Feel free to submit an issue if you have feature requests, I'll gladly take them.

## Supported commands
So far, only a few commands are supported, with a few flags:

* git
  * add
  * commit
  * push
  * rebase
  * diff


## Contribute
As I stated above, pull requests, bug reports and feature requests are very much appreciated. This is a big project for me, and any help would be truly appreciated! I setup a couple of templates in the issues section if you want to contribute. I don't feel like adding a code of conduct, I only expect contributors to be respectful to each other.

It is advised to read the [developer manual](DEVELOPMENT.md) before intending to contribute on the code. It's here to help you understand the structure of the project!
## Development

### Run the app on a local machine
In the project directory, you can run:

### `npm install`
Runs npm and downloads the related packages, and it's dependencies for this project

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!
