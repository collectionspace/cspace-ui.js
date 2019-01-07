# Changing the logo

To change the logo displayed in the upper left corner of each page, set the [`logo`](../README.md#logo) configuration property.

## Using an image on the web

Set the `logo` property to an `http` or `https` URL.

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

## Using an image on the CollectionSpace server

Upload the image to your CollectionSpace server, and place it in the tenant's subdirectory under the tomcat `webapps` directory. For example, if you're changing the logo for the core tenant, and the new logo is in a file called `mylogo.png`, the file should be located at `/usr/local/share/apache-tomcat-7.0.64/webapps/cspace#core/mylogo.png`.

Set the `logo` property to the path to the image from the `webapps` directory. Replace the `#` in the tenant's subdirectory name with `/`. The path should start with `/`.

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
        logo: '/cspace/core/mylogo.png',
      });
    </script>
  </body>
</html>
```
