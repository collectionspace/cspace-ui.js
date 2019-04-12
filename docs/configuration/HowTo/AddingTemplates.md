# Adding form templates

Some record types have multiple user-selectable form templates, which show different field layouts for various use cases. For example, object records have an inventory template and photograph template, in addition to the standard template. Additional templates may be configured for any record type.

Adding a template is similar to modifying a template, as described in the [Reordering Fields How-To](./ReorderingFields.md). Follow the instructions for [preparing the configuration](./ReorderingFields.md#preparing-the-configuration). Select an existing form template on which to base your new form template. Follow the instructions for [finding the current form](./ReorderingFields.md#finding-the-current-form), [modifying the form template](./ReorderingFields.md#modifying-the-form-template), and [compiling the template](./ReorderingFields.md#compiling-the-template). Once you have a compiled template, follow the instructions for [setting the template](./ReorderingFields.md#setting-the-template), but instead of overriding the existing form template, choose a new form name. For example, to add a form named `custom1` to the group record:

```
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="cspace"></div>
    <script src="http://unpkg.com/cspace-ui@1.0.0/dist/cspaceUI.min.js"></script>
    <script>
      cspaceUI((configContext) => {
        const {
          React,
        } = configContext.lib;

        const {
          Col,
          Cols,
          Panel,
          Row,
        } = configContext.layoutComponents;

        const {
          Field,
          InputTable,
        } = configContext.recordComponents;

        return {
          // Configuration properties
          recordTypes: {
            group: {
              forms: {
                custom1: {
                  template: // Modified template
                },
              },
            },
          },
        };
      });
    </script>
  </body>
</html>
```

Add a label for the new form by specifying a `name` message. By convention, the name message's id should follow the pattern  `form.{record type}.{form name}.name`. For example:

```
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="cspace"></div>
    <script src="http://unpkg.com/cspace-ui@1.0.0/dist/cspaceUI.min.js"></script>
    <script>
      cspaceUI((configContext) => {
        const {
          React,
        } = configContext.lib;

        const {
          Col,
          Cols,
          Panel,
          Row,
        } = configContext.layoutComponents;

        const {
          Field,
          InputTable,
        } = configContext.recordComponents;

        return {
          // Configuration properties
          recordTypes: {
            group: {
              forms: {
                custom1: {
                  template: // Modified template
                  messages: {
                    name: {
                      id: 'form.group.custom1.name',
                      defaultMessage: 'Custom Template',
                    },
                  },
                },
              },
            },
          },
        };
      });
    </script>
  </body>
</html>
```
