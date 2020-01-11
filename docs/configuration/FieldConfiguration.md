# Field Configuration

Fields for each record type are configured by providing a field descriptor in the record type's `fields` configuration property. A field descriptor is an object that configures each field in a document, and specifies its child fields, if any.

```
type FieldDescriptor = {
  [configKey: string]: FieldConfig,
  [childFieldName: string]: FieldDescriptor,
};
```
```
type FieldConfig = {
  cloneable: boolean,
  defaultValue: Immutable.Map | Immutable.List | string,
  dataType: string,
  messages: MessageDescriptorMap,
  repeating: boolean,
  required: boolean | function,
  service: FieldServiceConfig,
  view: FieldViewConfig,
};
```
```
type FieldServiceConfig = {
  ns: string,
};
```
```
type FieldViewConfig = {
  type: class | function,
  props: Object,
};
```

## Example

```
cspaceUI((configContext) => {
  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    IDGeneratorInput,
    TextInput,
  } = configContext.inputComponents;

  return {
    recordTypes: {
      collectionobject: {
        fields: {
          document: {
            'ns2:collectionobjects_common': {
              [config]: {
                service: {
                  ns: 'http://collectionspace.org/services/collectionobject',
                },
              },
              objectNumber: {
                [config]: {
                  cloneable: false,
                  messages: defineMessages({
                    name: {
                      id: 'field.collectionobjects_common.objectNumber.name',
                      defaultMessage: 'Identification number',
                    },
                  }),
                  required: true,
                  searchView: {
                    type: TextInput,
                  },
                  view: {
                    type: IDGeneratorInput,
                    props: {
                      source: 'accession,intake,loanin',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});
```

ℹ️ The `defineMessages` function used in the example is exported by the [react-intl](https://github.com/yahoo/react-intl/wiki) package. It is optional. Messages may also be defined using a plain object.

## Description

A field may contain child fields. For each child field, the field descriptor contains a property whose name is the field name, and whose value is the child field descriptor.

In addition to child fields, a field descriptor may contain a single property whose name is the configuration key string, and whose value is an object containing configuration for the field itself. When the field is defined in a configurer function, the configuration key string is provided in the configuration context passed to the configurer, as the `configKey` property.

The field configuration object may contain the following properties:

### cloneable
```
cloneable: boolean = true
```
If true, when a record is cloned, the value of this field is cloned to the new record. Otherwise, the field in the new record will be set to the default value if one exists; otherwise, it will be empty.

### defaultValue
```
defaultValue:  Array | Object | string | number | boolean
```
The default value of the field. If this is a repeating field, the value should be an array of values. If this is a complex field (a field that contains other fields), the value should be an object that contains values for each child field. Otherwise, the value should be a string, number, or boolean, depending on the data type of the field.

### dataType
```
dataType: string = DATA_TYPE_STRING
```
The data type of the field's value. When the field descriptor is defined in a configurer function, data type constants are provided in the configuration context passed to the configurer, under the `dataTypes` property.

### messages
```
messages: MessageDescriptorMap
```
A [react-intl message descriptor map](https://github.com/yahoo/react-intl/wiki/API#definemessages) containing messages for the field. A message with the key `name` must be supplied. This message is displayed as the label of the field on record editor forms. Messages with the keys `fullName` and `groupName` may optionally be supplied. The `fullName` message is used to describe the field on search forms, in search results, and in notification messages. If `fullName` is not supplied, the `name` message is used instead. The `groupName` message is used to describe the field on search forms, within a group search. If `groupName` is not supplied, the `fullName` or `name` message is used instead.

ℹ️ The `fullName` message is used when a field is described out of the context of any ancestor fields, so the message should be fully descriptive and unambiguous with respect to other fields on the record. The `groupName` message is used when a field is described in the context of its parent (group) field, so the message should be unambiguous with respect to other fields in the same group. The `name` message is used only on the record form, where labels for all ancestor fields are available to provide context, so the message should be as concise as possible, and should avoid duplicating information contained in ancestor field labels.

The [style guide](../style) has more information, including examples, about the usage of each message.

### repeating
```
repeating: boolean = false
```
If true, the field is repeating (multivalued), and will be rendered with add and remove buttons to add and remove values.

### required
```
required: boolean | (requiredContext) => boolean
```
If true, the field is required. It will be rendered with a required indictor, and will trigger an error notification if it is left empty.

If a function is provided, the function will be called with a requiredContext object as an argument,  and it must return a boolean. The requiredContext has the following properties:

| Property          | Type           | Description |
| ----------------- | -------------- | ----------- |
| `fieldDescriptor` | Object         | The field's descriptor, containing its configuration and the configuration of any descendants. |
| `form`            | String         | The name of the form (template) that is in use. |
| `path`            | Array          | The path to the field in the record data. |
| `recordData`      | Immutable.Map  | The record data. |
| `recordType`      | String         | The name of the record type. |
| `roleNames`       | Immutable.List | The current user's roles. |
| `subrecordData`   | Immutable.Map  | The data of the record's subrecords, if any (e.g. blob in media, contact in person/organization). |

### searchView
```
searchView: FieldViewConfig
```
Configuration that describes how the field is to be rendered on the search form. If absent, the `view` configuration will be used on the search form. See the `view` property for details.

### service
```
service: FieldServiceConfig
```
An object that describes service layer configuration for the field. The following properties may be set:

| Property | Type   | Description |
| -------- | ------ | ----------- |
| `ns`     | String | The namespace URI for the field. |

### view
```
view: FieldViewConfig
```
Configuration that describes how the field is to be rendered on the record editor form. The following properties may be set:

| Property | Type     | Description |
| -------- | -------- | ----------- |
| `type`   | Function | The React component that should be used to render the field. When the field descriptor is defined in a configurer function, React component types that may be used are provided in the configuration context passed to the configurer, under the `inputComponents` property. |
| `props`  | Object   | Props to set on the React component when it is rendered. The possible props will depend on the type of component. |
