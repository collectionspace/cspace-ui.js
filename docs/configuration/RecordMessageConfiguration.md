# Record Message Configuration

Messages associated with a record type may be configured by providing a record message map in the record type's `messages` configuration property.

```
type RecordMessageMap = {[messageGroupName: string]: MessageDescriptorMap};
```

## Example

```
cspaceUI({
  recordTypes: {
    collectionobject: {
      messages: {
        record: defineMessages({
          name: {
            id: 'record.collectionobject.name',
            description: 'The name of the collectionobject record type.',
            defaultMessage: 'Object',
          },
          collectionName: {
            id: 'record.collectionobject.collectionName',
            description: 'The name of a collection of collectionobject records.',
            defaultMessage: 'Objects',
          },
        }),
        panel: defineMessages({
          id: {
            id: 'panel.collectionobject.id',
            description: 'The name of the collectionobject id panel.',
            defaultMessage: 'Object Identification Information',
          },
          desc: {
            id: 'panel.collectionobject.desc',
            description: 'The name of the collectionobject desc panel.',
            defaultMessage: 'Object Description Information',
          },
        },
      },
    },
  },
});
```

ℹ️ The `defineMessages` function used in the example is exported by the [react-intl](https://github.com/yahoo/react-intl/wiki) package.

## Description

A record message map defines named groups of message descriptors, each of which is a [react-intl message descriptor map](https://github.com/yahoo/react-intl/wiki/API#definemessages).

A group named `record` is required. The `record` message descriptor map must contain two keys:

|Key             |Description|
|----------------|-----------|
|`name`          |The name of the record type.|
|`collectionName`|The name of a collection of records of the type. This is usually, but not necessarily, pluralized.|

A group named `panel` is required if any `Panel` components are present in any of the record type's [form templates](./FormConfiguration.md). The `panel` message descriptor map must contain a key corresponding to the `name` prop of each `Panel`, which defines the label displayed in the header of that panel.