# Vocabulary Configuration

The vocabularies in each authority record type may be configured by providing a vocabulary map in the record type's `vocabularies` configuration property. A vocabulary map is an object that contains vocabulary descriptors, keyed by name.

```
type VocabularyMap = {[vocabularyName: string]: VocabularyDescriptor};
```
```
type VocabularyDescriptor = {
  messages: MessageDescriptorMap,
  serviceConfig: ServiceDescriptor,
  sortOrder: number,
};
```

## Example

```
cspaceUI({
  recordTypes: {
    person: {
      vocabularies: {
        local: {
          messages: defineMessages({
            name: {
              id: 'vocab.person.local.name',
              description: 'The name of the local person vocabulary.',
              defaultMessage: 'Local',
            },
            collectionName: {
              id: 'vocab.person.local.collectionName',
              description: 'The name of a collection of records from the local person vocabulary.',
              defaultMessage: 'Local Persons',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(person)',
          },
          sortOrder: 0,
        },
        ulan: {
          messages: defineMessages({
            name: {
              id: 'vocab.person.ulan.name',
              description: 'The name of the ulan person vocabulary.',
              defaultMessage: 'ULAN',
            },
            collectionName: {
              id: 'vocab.person.ulan.collectionName',
              description: 'The name of a collection of records from the ulan person vocabulary.',
              defaultMessage: 'ULAN Persons',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(ulan_pa)',
          },
        },
      },
    },
  },
});
```

ℹ️ The `defineMessages` function used in the example is exported by the [react-intl](https://github.com/yahoo/react-intl/wiki) package.

## Description

The vocabulary descriptor contains the following properties:

### disabled
```
disabled: boolean
```
If true, the vocabulary is not shown in the UI.

### disableAltTerms
```
disableAltTerms: boolean
```
If true, alternate terms (aka non-preferred terms) are disabled (but remain visible when they match the partial term that the user has entered). The user may only select the preferred term.

### messages
```
messages: MessageDescriptorMap,
```
A [react-intl message descriptor map](https://github.com/yahoo/react-intl/wiki/API#definemessages). The message descriptor map must contain two keys:

|Key             |Description|
|----------------|-----------|
|`name`          |The name of the vocabulary.|
|`collectionName`|The name of a collection of records from the vocabulary. This is usually, but not necessarily, pluralized.|


### serviceConfig
```
serviceConfig: ServiceDescriptor
```
A [service descriptor](./RecordServiceConfiguration.md) that describes the service layer configuration of the vocabulary.

### sortOrder
```
sortOrder: number
```
A number indicating the sort order of the vocabulary. This is used to order the vocabularies within an authority on the Create New page and in dropdowns, from low to high.
