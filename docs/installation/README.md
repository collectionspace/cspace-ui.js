# Installation

The CollectionSpace UI is installed by creating an HTML page and publishing it to a web server, as in the following example:

```HTML
<html>
<head>
  <meta charset="UTF-8">
  <title>CollectionSpace</title>
</head>
<body>
  <main></main>
  <script src="http://unpkg.com/cspace-ui@0.2.1/dist/cspaceUI.min.js"></script>
  <script>
    cspaceUI();
  </script>
</body>
</html>
```

First, some JavaScript is loaded into the page. This is the minified production bundle of the CollectionSpace UI, which is available via the [UNPKG](https://unpkg.com) CDN. That CDN is not meant for production use; in production, you should download the bundle to your own server, and load it from there. An unminified bundle named cspaceUI.js is also available for development use. The example loads version 0.2.1 of the UI. To load a different version, replace `@0.2.1` with the desired version number.  To see a list of all the versions, visit this page https://unpkg.com/cspace-ui/ and look in the upper-right corner.

Once loaded, the JS bundle exports the global variable `cspaceUI`. This is a function, which may be called to initialize and render the UI. By default, the UI will be rendered into the `main` tag on the page.

The `cspaceUI` function accepts a configuration object as an argument. For example:

```JavaScript
cspaceUI({
  cspaceUrl: 'http://nightly.collectionspace.org:8180',
  prettyUrls: true,
  messages: {
    'about.title': 'Welcome to CollectionSpace',
  },
});
```

See the [configuration](../configuration) documentation for details on the properties that may be supplied in the configuation object.
