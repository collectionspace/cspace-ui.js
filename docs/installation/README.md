# Installation

This document is intended for web developers and system administrators who wish to install the CollectionSpace UI for production or evaluation.

Install the CollectionSpace UI by creating an HTML page, as in the following example:

```HTML
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <main></main>
    <script src="http://unpkg.com/cspace-ui@0.9.1/dist/cspaceUI.min.js"></script>
    <script>
      cspaceUI();
    </script>
  </body>
</html>
```

Publish the page to a web server. Visit the page in a browser to run the application.

## Defining the Container Element

The HTML page must define an element into which the CollectionSpace UI will be rendered -- in this example, `main`. By default, the UI is rendered into the first `main` element found on the page, but it may be directed to use another element by setting the `container` configuration option to an appropriate CSS selector.

The container element should be empty, as its contents will be overwritten when the UI is rendered. The UI may also modify the contents of the `head` element, in order to change the title and load additional scripts and stylesheets. No other elements on the page are affected.

## Loading the Application

The CollectionSpace UI is distributed as a JavaScript bundle that is loaded onto the page using a `script` tag with its `src` attribute set to the location of the JS file.

This example loads the minified production bundle (cspaceUI.min.js) from the [UNPKG](https://unpkg.com) CDN. That CDN is not meant for production use. For production, the file may be copied to a suitable server, and loaded from there. An unminified bundle (cspaceUI.js) is also available for development use. UNPKG hosts multiple versions of the application. This example loads a specific version (0.9.1) by specifying it in the URL. To see a list of all available versions, visit https://unpkg.com/cspace-ui/, and open the dropdown menu in the upper-right corner. If a version number is not specified, the latest version is loaded.

## Initializing and Rendering

Once loaded, the JS bundle exports the global variable `cspaceUI`. This is a function, which must be called to initialize and render the UI.

The `cspaceUI` function accepts a single argument: a configuration object. For example:

```JavaScript
cspaceUI({
  basename: '/mymuseum',
  container: 'div.cspaceUI',
  serverUrl: 'http://nightly.collectionspace.org:8180',
  prettyUrls: false,
  messages: {
    'about.title': 'Welcome to My Museum CollectionSpace',
  },
});
```

The [configuration](../configuration) documentation describes the configuration options that may be supplied.
