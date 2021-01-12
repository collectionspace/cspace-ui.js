# Customizing option lists

## Adding or removing options

To add or remove options in a controlled option list, find the name of the list, and override the `values` property of its configuration.

### Finding the option list name

The easiest way to find the name of an option list is to search the source code for one of the values in the list. For example, to find the name of the option list associated with the Responsible Department field on the Group record, note that one of the values in the list is "Architecture and Design". Searching for "Architecture and Design" in this source code repository finds the configuration for the option list named `departments`: https://github.com/collectionspace/cspace-ui.js/blob/e9e9a754a12521dc097496259875e780fc646c14/src/plugins/optionLists/shared.js#L77-L133

To ensure that you've found the right list, check that all of the `values` defined in the list correspond to the values you see in the dropdown in the browser. For each value, the `messages` property may define the label that is displayed in the browser.

⚠️ If you are unable to find the configuration for an option list in this repository, there are two possibilities:
1. The list you're looking at may be a dynamic option list, whose values are stored in the database, instead of in configuration. These lists may be edited in the browser, in the Tools/Term Lists tab.
1. The list may be defined in a plugin to the cspace-ui application, which is a separate project in git. [Search the collectionspace organization in GitHub for projects starting with "cspace-ui-plugin"](https://github.com/collectionspace?q=cspace-ui-plugin&type=&language=) to see the standard plugins. If your CollectionSpace tenant is based on a community-of-practice profile, start with the plugin for that profile.

### Changing list values

To change the values in an option list, supply an override for the `values` property in the configuration for the list. For example, to remove `herpetology`, and add `history` to the `departments` list:

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
        optionLists: {
          departments: {
            values: [
              'antiquities',
              'architecture-design',
              'decorative-arts',
              'ethnography',
              'history',
              'media-performance-art',
              'paintings-sculpture',
              'paleobotany',
              'photographs',
              'prints-drawings',
            ],
          },
        },
      });
    </script>
  </body>
</html>
```

ℹ️ Values are displayed in dropdowns in the order in which they are specified in the `values` list.

### Specifying a label

It is highly recommended to choose option list values that are human readable, and appropriate for display to end users in the browser, including upper/lower casing. This simplifies configuration, and makes values understandable when they are pulled directly from the database, for example, in reports. (Many built-in option lists in CollectionSpace that were defined early in the project's history don't follow this recommendation, but this is the current best-practice.)

If you follow the above recommendation, there is no need to define a message for the value.

However, if you would like an option to be displayed in the browser with a label that differs from the value stored in the database, specify a message for the value under the `messages` property. For example, to display the newly added `history` value as "I ❤️ History" in the browser:

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
        optionLists: {
          departments: {
            values: [
              'antiquities',
              'architecture-design',
              'decorative-arts',
              'ethnography',
              'history',
              'media-performance-art',
              'paintings-sculpture',
              'paleobotany',
              'photographs',
              'prints-drawings',
            ],
            messages: {
              history: {
                id: 'option.departments.history',
                defaultMessage: 'I ❤️ History',
              },
            },
          },
        },
      });
    </script>
  </body>
</html>
```

ℹ️ The message `id` is an arbitrary string, but it must be unique among all message IDs in the application. The following convention is used to reduce the likelihood of duplication: `option.${optionListName}.${value}`. This ID can be any string, so it doesn't matter if there's whitespace or punctuation in it -- it just has to be unique.

## Relabeling options

To change the display label of an existing option, provide a message override using the [`messages`](../README.md#messages) configuration property.

### Finding the message ID

Find the ID of the message to change using the [messages reference](../messages.js), by searching for the option label text. For example, to change the label of the "Prints and Drawings" option in the `departments` list, search for "Prints and Drawings" in the messages reference file. This locates the message with ID `option.departments.prints-drawings`:

```
"option.departments.prints-drawings": "Prints and Drawings",
```

Verify that you've found the correct message ID: The ID for an option list value label should start with `option.` It should contain the name of the option list (in this case, `departments`), and will likely contain a value that resembles the default label (in this case, `prints-drawings`).

### Setting the label

Set the message for the ID that you located in the messages reference.

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
          'option.departments.prints-drawings': 'My new label',
        },
      });
    </script>
  </body>
</html>
```
