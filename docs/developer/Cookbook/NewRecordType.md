# Adding support for a new record type

Support for a new record type may be added by implementing a record type plugin. The built-in record type plugins are located in the [src/plugins/recordTypes](../../../src/plugins/recordTypes) directory. Each subdirectory contains the code implementing a plugin for a record type.

Start by copying an existing record type plugin, to use it as a template.

```
$ cp -r src/plugins/recordTypes/collectionobject src/plugins/recordTypes/{name}
```

Substitute `{name}` with the name of the new record type. By convention, this is the name that you want to appear in the URL when editing a record. That URL will have the form `/record/{name}/{csid}`.

Edit the following files in the new plugin directory:

- **forms/default.jsx**

  This file contains the definition of the React component used to view and edit a record of the new type. In the future, additional templates may be defined in other files under the forms directory. This is the default template.

- **messageDescriptors.js**

  This file contains the definitions of translatable messages for the record type, including the labels for fields and panels in forms.

- **optionLists.js**

  This file contains the definitions of option lists used by controlled list fields in the record type.

- **serviceConfig.js**

  This file contains information about the CollectionSpace service associated with the record type.

- **title.js**

  This file defines a function to compute the title of a record from its data.

Next, add the plugin to the default set of record type plugins that are enabled in the application. This is done by editing [src/plugins/recordTypes/index.js](../../../src/plugins/recordTypes/index.js). In that file, import the new plugin, and add it to the exported list of plugins.

The new record type should now appear on the Create New screen, and you should now be able to view and edit records of the new type at the URL `/record/{name}/{csid}`.
