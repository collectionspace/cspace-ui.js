# Getting Started

Follow these instructions to set up your development environment.

## Prerequisites

The following software must be installed on your development system.

- Git. The cspace-ui source code is version controlled using Git. You must have a git client [installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

- Node.js and npm. [Node.js](https://nodejs.org/) is used to run the development tools. [npm](https://www.npmjs.com/) is used to install and manage the JavaScript libraries required by cspace-ui. On Mac and Windows, download the Node.js installer from [nodejs.org](https://nodejs.org/). This will install npm as well. On Linux, use your package manager to [install the necessary packages](https://nodejs.org/en/download/package-manager/).

- Chrome or Firefox. cspace-ui is a JavaScript application for web browsers, so a web browser is required to run and test it during development. The automated test runner will attempt to use [Chrome](https://www.google.com/chrome/browser/desktop/index.html) by default. If you prefer to use [Firefox](https://www.mozilla.org/en-US/firefox/new/), set the environment variable `KARMA_BROWSERS` to `Firefox` in the shell in which you run tests.

- A text editor for editing code and markup.

## Installation

To install the cspace-ui source code on your development system:

- [Clone this repository](https://help.github.com/articles/cloning-a-repository/) from GitHub by running `git clone`.
  ```
  $ git clone https://github.com/collectionspace/cspace-ui.js.git
  ```

- Download JavaScript dependencies by running `npm install` in the local repository.
  ```
  $ cd cspace-ui.js.git
  $ npm install
  ```

- Run tests. This will start a web browser, execute the tests, close the browser, and report the results in your terminal.
  ```
  $ npm test
  ```
  If the tests succeed, your development environment is ready.

## Running the Application

To run the cspace-ui application, use the command:
```
$ npm run devserver
```
This starts a local web server, listening on port 8080. In a browser window, open the URL `http://localhost:8080`. You should see the CollectionSpace UI. This UI is configured (in the top level `index.html` file) to connect to the REST API on the nightly build server, so you should be able to log in and see records from that server.

As you edit files, your changes are automatically built and deployed to the dev server. Reload the page in your browser to see your changes. To stop the dev server, type control-c in the shell in which the devserver was started. 

## Running Tests

The `npm test` command runs tests a single time, but during development you usually want to run the tests continuously, as files are edited. To do this, use the command:
```
$ npm start
```
This starts a local web server, listening on port 9876, as well as a browser. The browser will automatically connect to the test web server, execute the tests, and report results to your terminal. As you edit files, the tests will be rerun automatically. To stop running tests, type control-c in the shell in which they were started. This will stop the server, and close the browser window in which the tests are running.

The test server and the dev server may be run simultaneously. During development you'll typically have two terminal windows/tabs and two browser windows open off to the side. In one terminal, `npm run devserver` will be running. In the other, `npm start` will be running. One browser window will be the one you started, and that is viewing `http://localhost:8080`. You'll reload that window periodically to see and interact with your latest changes. The other browser window will be the one that `npm start` opened, in which unit and integration tests are automatically being rerun. You can ignore that window, since it is completely managed by the test runner. It just needs to be open to run the tests. Results will be reported in the terminal window, so keep an eye on that window for failures.

## Further Reading

- The [Overview of Languages, Tools, and Libraries](https://wiki.collectionspace.org/display/~rhlee@berkeley.edu/Overview+of+Languages%2C+Tools%2C+and+Libraries) on the CollectionSpace Wiki gives an overview of many of the development tools used in CollectionSpace JS projects (of which cspace-ui is one).
- The Architectural Overview of cspace-ui describes the high-level structure of the application. (Coming soon)
- The Plugin Guide describes how to write plugins to extend the UI. (Coming soon)
- The [Overview of Projects](https://wiki.collectionspace.org/display/~rhlee@berkeley.edu/Overview+of+Projects) on the CollectionSpace Wiki describes how cspace-ui fits into the larger suite of CollectionSpace JS projects.