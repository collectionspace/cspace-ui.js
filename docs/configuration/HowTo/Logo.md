# Changing the logo

To change the logo displayed in the upper left corner of each page, set the [`logo`](../README.md#logo) configuration property.

## Using an image on the web

Provide an `http` or `https` URL.

```
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="cspace"></div>
    <script src="http://unpkg.com/cspace-ui@1.0.0/dist/cspaceUI.min.js"></script>
    <script>
      cspaceUI({
        logo: 'http://www.collectionspace.org/wp-content/uploads/2016/12/CollectionSpace.png',
      });
    </script>
  </body>
</html>
```
