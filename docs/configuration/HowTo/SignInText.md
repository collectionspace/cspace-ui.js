# Modifying sign in screen text

To modify the text of the sign in screen, provide message overrides using the [`messages`](../README.md#messages) configuration property.

## Modifying the title

Set the `about.title` message.

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
        messages: {
          'about.title': 'Hello CollectionSpace',
        },
      });
    </script>
  </body>
</html>
```

## Modifing the content

Set the `about.contentHTML` message. This message will be interpreted as HTML, so it can contain markup that will be rendered on-screen. HTML rules apply; for example, whitespace is ignored, and the `<`, `>`, and `&` characters must be replaced with HTML character entities. It may be helpful to enclose the message in backticks (`) instead of single or double quotes, so that long text may be broken into multiple lines for readability.

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
        messages: {
          'about.contentHTML': `
            <p>This is a paragraph of text.</p>
            <p>Look, another paragraph.</p>
          `,
        },
      });
    </script>
  </body>
</html>
```
