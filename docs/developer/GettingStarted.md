# Getting Started

Follow these steps to set up your environment for cspace-ui development.

## Prerequisites

The following software must be installed on your development system. Development is supported on MacOS, Windows, and Linux.

- [Git](https://git-scm.com/). The cspace-ui source code is version-controlled using Git. A Git client must be [installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

- [Node.js](https://nodejs.org/) (version 8 and or above) and [npm](https://www.npmjs.com/) (version 5 or above). Node.js is used to run the development tools, which are JavaScript programs. npm is used to install and manage the JavaScript libraries required by cspace-ui and the development tools. On Mac and Windows, download and run the Node.js installer from [nodejs.org](https://nodejs.org/). This will install npm as well. On Linux, [install the necessary packages](https://nodejs.org/en/download/package-manager/) using the package manager.

- Chrome or Firefox. cspace-ui is a JavaScript application for web browsers, so a web browser is required to run and test it during development. The test runner ([Karma](https://karma-runner.github.io/)) will attempt to use [Chrome](https://www.google.com/chrome/browser/desktop/index.html) by default. To use [Firefox](https://www.mozilla.org/en-US/firefox/new/), set the environment variable `KARMA_BROWSERS` to `Firefox` in the shell in which tests are executed.

- A text editor/IDE for editing code and markup. It is helpful to have syntax support for JavaScript ES2015+ and JSX.

## Installation

To install the cspace-ui source code on your development system:

- [Clone this repository](https://help.github.com/articles/cloning-a-repository/) from GitHub using the `git clone` command.
  ```
  git clone https://github.com/collectionspace/cspace-ui.js.git
  ```

- Install the required JavaScript libraries by running `npm install` in the local repository.
  ```
  cd cspace-ui.js
  npm install
  ```
  This will create a node_modules directory containing the downloaded dependencies.

- Run tests. This will start a web browser, execute the tests, close the browser, and report the results in the terminal.
  ```
  npm test
  ```

If the tests succeed, the environment is ready.

## Running the Application

To run the cspace-ui application, use the command:
```
npm run devserver
```
This starts a local web server, listening on port 8080. In a web browser, open the URL `http://localhost:8080`. The CollectionSpace UI should appear. This UI is configured to connect to the REST API on the nightly build server (https://nightly.collectionspace.org), so it should be possible to log in and see records from that server.

As source code files are edited, changes are automatically detected and deployed into the dev server, and the browser is automatically notified to reload the page. The latest code should always be running in the browser without any intervention.

To stop the dev server, type control-c in the shell in which it was started.

## Running Tests

The `npm test` command runs tests once and exits, but during development it may be desirable to run the tests continuously, as files are edited. To do this, use the command:
```
npm start
```
This starts a local web server, listening on port 9876, and opens a browser window. The browser will connect to the web server, execute the tests, and report results to the terminal. As files are edited, the tests will rerun automatically. To stop, type control-c in the shell in which the test server was started. This will also close the associated browser window.

Use the `file` parameter in order to run only the tests in a single test file. This is the most common usage, since it takes longer to run all the tests; typically one file is the one that is primarily being modified, and only that one needs to be tested in real time.
```
npm start -- --file=test/specs/actions/login.spec.js
```

The dev server and the test server may be run simultaneously, since they're listening on different ports. During development it's common to keep two terminal windows and two browser windows open. In one terminal, `npm run devserver` will be running. In the other, `npm start` will be running. One browser window will be viewing `http://localhost:8080`, and will be used  to interact with the latest code. The other browser window will be the one that `npm start` opened, in which tests are continuously running. That browser window can be ignored, since it is completely managed by the test runner. It just needs to remain open to run the tests. Results will be reported in the terminal window, so keep an eye on that window for failures.

## Checking for Code Quality

Checking for code quality consists of three steps:

1. Linting
2. Running tests
3. Verifying full test coverage

The `npm run check` command does the code quality check.
```
npm run check
```
Run this locally before pushing code to master, or sending a pull request to master. When a pull request to master is made on GitHub, the check is automatically run on the pull request, on the continuous integration server. If the check fails, the pull request will not be accepted.

The linter may be run on its own using the command `npm run lint`.

A code coverage report may be generated on its own using the command `npm run coverage`. This will report on the results of the most recent test run, from either `npm test` or `npm start`.