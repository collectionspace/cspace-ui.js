# Record Sidebar Configuration

The sidebar that is displayed when viewing or editing a record may be configured by providing a sidebar descriptor object in the `sidebar` configuration property of each record type.

Currently only the related procedures that are displayed may be configured, by supplying an array of related procedure descriptors. A related record panel will be displayed for each descriptor, in the order listed.

```
type SidebarDescriptor = {
  relatedProcedures: Array<RelatedProcedureDescriptor>,
};
```
```
type RelatedProcedureDescriptor = {
  recordType: string,
  columnSet: string,
  sort: string,
};
```

## Example

```
cspaceUI({
  recordTypes: {
    collectionobject: {
      sidebar: {
        relatedProcedures: [
          { recordType: 'procedure' },
          { recordType: 'media', columnSet: 'narrow', sort: 'title' },
        ],
      },
    },
  },
});
```

## Property Reference

The related procedure descriptor has the following properties:

### recordType
```
recordType: string
```
A record type name, which must correspond to a key in the [recordTypes](./RecordTypeConfiguration) configuration. Related records of this type will be displayed.

### columnSet
```
columnSet: string = 'narrow'
```
A column set name, which must correspond to a key in the [columns](./ColumnConfiguration) configuration for the specified record type.

### sort
```
sort: string
```
A column name, which must correspond to a key in the column set specified. The related record list will be initially sorted by this column. For a descending sort order, specify `desc` following the column name, as in `title desc`.
