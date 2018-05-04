# Record Type Configuration

In order to view and edit records in CollectionSpace, the UI must be configured with information about each type of record in the system. For each record type, this information includes:

- Schema - The names and data types of the fields, and their logical organization.
- Views - How to display each field to the user, and the types of user interactions that should be allowed.
- Forms - How to visually organize (lay out) the fields for viewing and editing.
- Columns - How to display record data in a search result table.
- Advanced search conditions - The fields and operators that should be used in searches.

## Example

Record types are configured by the `recordTypes` property of the [cspace-ui configuration](../configuration) object, as in the following example:

```JavaScript
cspaceUI({
  recordTypes: {
    intake: {
      fields: {
        // Field configuration...
      },
      forms: {
        // Form configuration...
      },
      // ...
    },
    person: {
      advancedSearch: {
        // Search condition configuration...
      },
      columns: {
        // Search result table configuration...
      },
      // ...
    },
    // Other record types...
  },
});
```

## Description

The value of `recordTypes` should be a record type map object:

```
type RecordTypeMap = { [recordTypeName: string]: RecordTypeDescriptor }
```

The record type map is keyed by name. The name of each record type appears in the URLs of pages in the UI. For example, since `intake` is the name of a record type in the example, the URL to view or edit records of that type will include the path `/record/intake`.

The value for each name is an object describing the record type:

```
type RecordTypeDescriptor = {
  advancedSearch: AdvancedSearchConditionDescriptor,
  columns: ColumnSetMap,
  disabled: boolean,
  fields: FieldDescriptor,
  forms: FormDescriptorMap,
  messages: RecordMessageMap,
  normalizeRecordData: (data: Immutable.Map, recordTypeConfig: RecordTypeDescriptor) => Immutable.Map,
  prepareForSending: (data: Immutable.Map) => Immutable.Map,
  requestConfig: RequestDescriptor,
  serviceConfig: ServiceDescriptor,
  subrecords: SubrecordMap,
  title: (data: Immutable.Map) => string,
  vocabularies: VocabularyMap,
}
```

## Property Reference

The record type descriptor has the following properties:

### advancedSearch
```
advancedSearch: AdvancedSearchConditionDescriptor
```
An [advanced search condition descriptor](./AdvancedSearchConfiguration.md) that describes the conditions to be displayed on the search form for the record type.

### columns
```
columns: ColumnSetMap
```
A [column set map](./ColumnConfiguration.md) that describes columns to be displayed in search result tables for the record type.

### disabled
```
disabled: boolean
```
If true, the record type is not shown in the UI.

### fields
```
fields: FieldDescriptor
```
A [field descriptor](./FieldConfiguration.md) that describes the fields in the record type.

### forms
```
forms: FormDescriptorMap
```
A [form descriptor map](./FormConfiguration.md) that describes how fields in the record type are to be layed out when viewed and edited.

### messages
```
messages: RecordMessageMap
```
A [record message map](./RecordMessageConfiguration.md) that contains message descriptors associated with the record type.

### normalizeRecordData
```
normalizeRecordData: (data: Immutable.Map, recordTypeConfig: RecordTypeDescriptor) => Immutable.Map
```

### prepareForSending
```
prepareForSending: (data: Immutable.Map) => Immutable.Map,
```

### requestConfig
```
requestConfig: RequestDescriptor
```

### serviceConfig
```
serviceConfig: ServiceDescriptor
```
A [service descriptor](./RecordServiceConfiguration.md) that describes the service layer configuration of the record type.

### sidebar
```
sidebar: SidebarDescriptor
```
A [sidebar descriptor](./RecordSidebarConfiguration.md) that describes the sidebar to be displayed when editing a record of the type.

### title
```
title: (data: Immutable.Map) => string
```
A function that returns the title of a record to be displayed in the header of record editors, and in notifications. Details TK.

### vocabularies
```
vocabularies: VocabularyMap
```
A [vocabulary map](./VocabularyConfiguration.md) that describes the vocabularies in an authority record type.