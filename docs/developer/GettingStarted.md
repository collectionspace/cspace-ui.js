# Getting Started

Follow these steps to set up your environment for cspace-ui development.

## Prerequisites

The following software must be installed on your development system. Development is supported on Mac, Windows, and Linux.

- [Git](https://git-scm.com/). The cspace-ui source code is version-controlled using Git. You'll need to have a Git client [installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/). Node.js is used to run development tools, all of which are JavaScript programs. npm is used to manage the JavaScript libraries required by cspace-ui and the development tools. On Mac and Windows, download and run the Node.js installer from [nodejs.org](https://nodejs.org/). This will install npm as well. On Linux, [install the necessary packages](https://nodejs.org/en/download/package-manager/) using your package manager. Version 6 of Node.js is recommended.

- Chrome or Firefox. cspace-ui is a JavaScript application for web browsers, so a web browser is required to run and test it during development. The test runner ([Karma](https://karma-runner.github.io/)) will attempt to use [Chrome](https://www.google.com/chrome/browser/desktop/index.html) by default. If you prefer to use [Firefox](https://www.mozilla.org/en-US/firefox/new/), set the environment variable `KARMA_BROWSERS` to `Firefox` in the shell in which you run the tests.

- A text editor/IDE for editing code and markup. It is helpful to have syntax support for JavaScript ES2015 (ES6) and JSX.

## Installation

To install the cspace-ui source code on your development system:

- [Clone this repository](https://help.github.com/articles/cloning-a-repository/) from GitHub using the `git clone` command.
  ```
  git clone https://github.com/collectionspace/cspace-ui.js.git
  ```

- Install the required JavaScript dependencies by running `npm install` in the local repository.
  ```
  cd cspace-ui.js
  npm install
  ```
  This will create a node_modules directory containing the downloaded dependencies.

- Run tests. This will start a web browser, execute the tests, close the browser, and report the results in your terminal.
  ```
  npm test
  ```

If the tests succeed, your environment is ready.

## Running the Application

To run the cspace-ui application, use the command:
```
npm run devserver
```
This starts a local web server, listening on port 8080. In a browser, open the URL `http://localhost:8080`. You should see the CollectionSpace UI. This UI is configured to connect to the REST API on the nightly build server (https://nightly.collectionspace.org), so you should be able to log in and see records from that server.

As you edit files, changes are automatically detected and deployed into the dev server, and the browser automatically reloads the page. You should always be looking at your latest code, without doing anything.

To stop the dev server, type control-c in the shell in which it was started.

## Running Tests

The `npm test` command runs tests once and exits, but during development you usually want to run the tests continuously, as files are edited. To do this, use the command:
```
npm start
```
This starts a local web server, listening on port 9876, and opens a browser window. The browser will connect to the web server, execute the tests, and report results to your terminal. As you edit files, the tests will rerun automatically. To stop, type control-c in the shell in which the test server was started. This will also close the associated browser window.

Pass the `file` parameter in order to run only the tests in a single test file. This is the most common usage, since it takes longer to run all the tests, and often you're primarily working on just one component.
```
npm start -- --file=test/specs/actions/login.spec.js
```

The dev server and the test server may be run simultaneously, since they're listening on different ports. During development you'll often keep two terminal windows/tabs and two browser windows open. In one terminal, `npm run devserver` will be running. In the other, `npm start` will be running. One browser window will be the one you started, viewing `http://localhost:8080`. You'll use that window to interact with your latest code. The other browser window will be the one that `npm start` opened, in which tests are continuously running. You can ignore that window, since it is completely managed by the test runner. It just needs to remain open to run the tests. Results will be reported in the terminal window, so keep an eye on that window for failures.
