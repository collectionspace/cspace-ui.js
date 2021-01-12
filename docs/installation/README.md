# CollectionSpace UI Installation

This document is intended for CollectionSpace system administrators who wish to install and configure the CollectionSpace UI application on a web server, so that it is available to CollectionSpace end-users.

ℹ️ Starting with CollectionSpace release 5.0, installing a CollectionSpace server according to the [installation instructions](https://wiki.collectionspace.org/display/UNRELEASED/Installing+CollectionSpace) automatically installs an instance of the UI application in CollectionSpace's Tomcat server. For example, in a standard installation using the core profile, the HTML page for the UI is located in the file `webapps/cspace#core/index.html` under the tomcat installation directory (typically, `/usr/local/share/apache-tomcat-8.5.51`).

## Creating an HTML Page

Installing the UI requires creating an HTML page on a web server, so that it may be accessed by a web browser. The HTML page loads and configures the cspace-ui JavaScript application.

Below is an example HTML file:

```HTML
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <!-- Define a container element -->
    <div id="cspace"></div>

    <!-- Load the CollectionSpace UI -->
    <script src="http://unpkg.com/cspace-ui@1.0.0/dist/cspaceUI.min.js"></script>

    <!-- Initialize and configure the CollectionSpace UI -->
    <script>
      cspaceUI({
        // Configuration properties...
      });
    </script>
  </body>
</html>
```

Publish the file to a web server, and visit the page in a browser to view the application.

ℹ️ A standard CollectionSpace server installation comes configured with a tenant for each community-of-practice profile. For each tenant, the UI is located in Tomcat's `webapps` directory, in the subdirectory named `cspace#{tenant name}`. Each tenant has an `index.html` file that resembles the above example. This makes a UI for each tenant available at the path `/cspace/{tenant name}/` on the server.

The HTML page performs the following functions:

## 1. Define the Container Element

The HTML page must define an element into which the CollectionSpace UI will be rendered -- in this example, `<div id="cspace">`. By default, the UI is rendered into the first element on the page whose id is `cspace`, but it may be directed to use another element by setting the [`container` configuration property](../configuration#container) to a different CSS selector.

The container element should be empty, as its contents will be overwritten when the UI is rendered. The UI may also modify the contents of the `head` element, in order to change the title and load additional scripts and stylesheets. No other elements on the page are affected.

## 2. Load the Application

The CollectionSpace UI is distributed as a JavaScript file that is loaded onto the page using a `script` tag with its `src` attribute set to the location of the file.

The above example loads the minified production bundle (cspaceUI.min.js) from the [UNPKG](https://unpkg.com) CDN. That CDN is not meant for production use. For production, the JavaScript file may be copied to a suitable server, and loaded from there. An unminified bundle (cspaceUI.js) is also available for development use. UNPKG hosts multiple versions of the application. This example loads a specific version by specifying the version number in the URL, following the `@` symbol. To see a list of available versions, visit https://unpkg.com/cspace-ui/, and open the dropdown menu in the upper-right corner.

ℹ️ A standard CollectionSpace server installation will download a compatible version of the UI JavaScript bundle into the `webapps/cspace-ui` directory under Tomcat. This makes the bundle available at the (`/cspace-ui`) path on the server.

## 3. Initialize and Render the Application

Once loaded, the cspace-ui JavaScript file exports the global variable `cspaceUI`. This is a function, which must be called to initialize and render the UI.

The `cspaceUI` function accepts a single argument: a configuration object. For example:

```JavaScript
cspaceUI({
  basename: '/mymuseum',
  container: 'div.cspaceUI',
  serverUrl: 'https://nightly.collectionspace.org',
  messages: {
    'about.title': 'Welcome to My Museum CollectionSpace',
  },
});
```

See the [configuration](../configuration) documentation for descriptions of the configuration properties that may be supplied.
