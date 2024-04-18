# cspace-ui

[![npm package](https://img.shields.io/npm/v/cspace-ui.svg)](https://www.npmjs.com/package/cspace-ui)
[![continuous integration](https://github.com/collectionspace/cspace-ui.js/actions/workflows/ci-js.yml/badge.svg?branch=master&event=push)](https://github.com/collectionspace/cspace-ui.js/actions/workflows/ci-js.yml)
[![codecov](https://codecov.io/gh/collectionspace/cspace-ui.js/branch/master/graph/badge.svg?token=rQ8jLRZlXs)](https://app.codecov.io/gh/collectionspace/cspace-ui.js)

The CollectionSpace user interface for web browsers.

Release 5.0 or later of the CollectionSpace server is required. This application is not compatible with releases 4.5 and earlier.

Release 8.0 or later of the CollectionSpace server is recommended. See the [release notes](https://github.com/collectionspace/cspace-ui.js/tree/master/RELEASE_NOTES.md) to use this application with earlier releases.

## Installation

### For CollectionSpace Administrators

The CollectionSpace UI is a JavaScript application that runs in a web browser. See the [installation instructions](https://github.com/collectionspace/cspace-ui.js/tree/master/docs/installation) to make the application available to your CollectionSpace users.

### For CollectionSpace Developers

[Node.js](https://nodejs.org/) 20 and npm 10 are recommended to build the application. A minimum of Node.js 18 and npm 10 are required.

To download and install the source code of the application for development:

```
$ git clone https://github.com/collectionspace/cspace-ui.js.git
$ cd cspace-ui.js
$ npm install
```

To run the application in development at http://localhost:8080, using a remote back-end CollectionSpace server:

```
$ npm run devserver --back-end=https://core.dev.collectionspace.org
```

See the [developer documentation](https://github.com/collectionspace/cspace-ui.js/tree/master/docs/developer) for instructions on building, testing, and running the source code.

## About CollectionSpace

[CollectionSpace](http://www.collectionspace.org/) is a community-supported collections management application for museums, historical societies, natural science collections, and more.
