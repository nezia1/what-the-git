<h1 align="center">
  ![What The Git Logo](public/logo.webp)
</h1>

<h4 align="center">A web application that makes it easy to find what a git command does by just typing it into the search bar. </h4>

<!-- <p align="center">
  <a href="https://badge.fury.io/js/electron-markdownify">
    <img src="https://badge.fury.io/js/electron-markdownify.svg"
         alt="Gitter">
  </a>
  <a href="https://gitter.im/amitmerchant1990/electron-markdownify"><img src="https://badges.gitter.im/amitmerchant1990/electron-markdownify.svg"></a>
  <a href="https://saythanks.io/to/amitmerchant1990">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
  <a href="https://www.paypal.me/AmitMerchant">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p> -->

<p align="center">
  <a href="#features">Features</a> •
  <a href="#upcoming-features">Upcoming Features</a> •
  <a href="#supported-commands">Supported Commands</a> •
  <a href="#contribute">Contribute</a>  
</p>

<!-- ![screenshot](https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.gif) -->
<!-- # What The Git

![What The Git Logo](public/logo.webp) -->


## Introduction
This project is written with Typescript using React. It works only with a front-end, using parsing of command-line arguments and a simple .json file containing all the descriptions of the commands and their flags. It is also easy to self-host since it doesn't contain a server.

## Features
What The Git only contains really basic git commands and flags so far, but the list will grow with time. I expect to support at least git add, git commit and git push as the final version. Feel free to contribute to fix issues that you found in the app or to add more git commands to it ! As this is a personal project, I would really appreciate it.


## Upcoming features
* Small articles about certain terms and git jargon, such as staging area, commit etc. as hyperlinks in the command description
* More verbose errors (telling you where the command went wrong and why instead of just showing a generic error message)

Feel free to submit an issue if you have feature requests, I'll gladly take them.

## Supported commands
So far, only a few commands are supported, with a small number of flags:

* git
  * add
  * commit
  * push


## Contribute
As I stated above, pull requests, bug reports and feature requests are very much appreciated. This is a big project for me, and any help would be truly appreciated! I setup a couple of templates in the issues section if you want to contribute. I don't feel like adding a code of conduct, I only expect contributers to be respectful to each other.

## Development

### Run the app on a local machine
In the project directory, you can run:

### `npm install`
Runs npm and downloads the related packages and it's dependencies for this project

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
