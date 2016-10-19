# Record Type Plugins

A record type plugin extends the CollectionSpace UI to support a new... record type.

This includes: Adding a link to the Create New screen, adding an option to the search box, adding a URL to view and edit the record, providing a form template for editing the record, and providing column definitions for search results.

## API

### Standard Configuration Options

A record type plugin should support the following standard configuration options:

[TBD]

### Properties

A record type plugin has the following properties. All properties must exist and be non-null.

#### `messageDescriptors`: [MessageDescriptorMap](https://github.com/yahoo/react-intl/wiki/API#definemessages)

A [React Intl](https://github.com/yahoo/react-intl) message descriptor map, as returned from [`defineMessages`](https://github.com/yahoo/react-intl/wiki/API#definemessages).

One message descriptor is required, with key `recordNameTitle` and ID `recordNameTitle`. This message is the name of the record, when used as a title.

Example:
```JavaScript
messageDescriptors: {
  // Required record name title message
  recordNameTitle: {
    id: 'recordNameTitle',
    defaultMessage: 'Intake',
  },
}
```

The remaining descriptors specify panel and field labels for the record's template. By convention, the message descriptor key for a panel/field label should be identical to the name of the panel/field. The message descriptor ID for a panel label should have the form `panel.{panel name}.label`. The message descriptor ID for a field label should have the form `field.{field name}.label`.

Example:
```JavaScript
messageDescriptors: {
  // Label for the panel with name descPanel
  descPanel: {
    id: 'panel.descPanel.label',
    defaultMessage: 'Object Description Information',
  },
  // Label for the field with name objectNumber
  objectNumber: {
    id: 'field.objectNumber.label',
    defaultMessage: 'Identification number',
  },
}
```

#### `serviceConfig`: Object

An object describing the record's CollectionSpace service. The service config object must have the following properties:

`name`: `string`

The name of the CollectionSpace service, e.g. `collectionobjects`, `intakes`. This corresponds to the part of the REST API url that follows `/cspace-services/`.

`parts`: `Object`

A map of the record's top level parts, as returned from the REST API. The keys of the map are the part names, and the values are namespace URIs.

Example:

```JavaScript
serviceConfig: {
  name: 'collectionobjects',
  parts: {
    collectionobjects_common: 'http://collectionspace.org/services/collectionobject',
  },
}
```

This map is used to construct new records to be sent to the REST API. Therefore parts that are returned from the API, but that don't need to be sent, like `collectionspace_core` and `account_permission`, should not be present in this map. The namespace prefix (`ns2`) is added automatically when needed, and should not be present in the keys.

#### `formTemplate`: [`ReactElement`](https://facebook.github.io/react/docs/glossary.html#react-elements)

A React element representing the form to be displayed to view or edit the record. 

[TODO: Fill in more information about props]

#### `title`: `(cspaceDocument: Immutable.Map) => string`

A function that returns the title of a given document, to be displayed in the title bar of the record editor. The document data is passed in as an [Immutable.js](http://facebook.github.io/immutable-js/) [Map](http://facebook.github.io/immutable-js/docs/#/Map) object. The function may retrieve field values from the document, compute the desired title, and return it.

#### [Others TBD]
