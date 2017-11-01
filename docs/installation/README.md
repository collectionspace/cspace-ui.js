# Installation

This document is intended for CollectionSpace system administrators who wish to install and configure the CollectionSpace UI for evaluation or production use.

## Example

Create an HTML file, starting with this snippet:

```HTML
<html>
  <head>
    <meta charset="UTF-8">
    <script src="http://unpkg.com/cspace-ui@0.11.6/dist/cspaceUI.min.js"></script>
  </head>
  <body>
    <div id="cspace"></div>
    <script>
      cspaceUI();
    </script>
  </body>
</html>
```

Publish the file to a web server. Visit the page in a browser to view the application.

## Description

The HTML file performs the following functions:

### Define the Container Element

The HTML file must define an element into which the CollectionSpace UI will be rendered -- in this example, `<div id="cspace">`. By default, the UI is rendered into the first element on the page whose id is `cspace`, but it may be directed to use another element by setting the `container` configuration option to an appropriate CSS selector.

The container element should be empty, as its contents will be overwritten when the UI is rendered. The UI may also modify the contents of the `head` element, in order to change the title and load additional scripts and stylesheets. No other elements on the page are affected.

### Load the Application

The CollectionSpace UI is distributed as a JavaScript file that is loaded onto the page using a `script` tag with its `src` attribute set to the location of the file.

The above example loads the minified production bundle (cspaceUI.min.js) from the [UNPKG](https://unpkg.com) CDN. That CDN is not meant for production use. For production, the JavaScript file may be copied to a suitable server, and loaded from there. An unminified bundle (cspaceUI.js) is also available for development use. UNPKG hosts multiple versions of the application. This example loads a specific version by specifying the version number in the URL, following the `@` symbol. To see a list of available versions, visit https://unpkg.com/cspace-ui/, and open the dropdown menu in the upper-right corner.

### Initialize and Render the Application

Once loaded, the cspace-ui JavaScript file exports the global variable `cspaceUI`. This is a function, which must be called to initialize and render the UI.

The `cspaceUI` function accepts a single argument: a configuration object. For example:

```JavaScript
cspaceUI({
  basename: '/mymuseum',
  container: 'div.cspaceUI',
  serverUrl: 'http://nightly.collectionspace.org:8180',
  messages: {
    'about.title': 'Welcome to My Museum CollectionSpace',
  },
});
```

See the [configuration](../configuration) documentation for detailed descriptions of the configuration options that may be supplied.
