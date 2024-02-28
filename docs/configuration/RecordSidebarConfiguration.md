# Record Sidebar Configuration

The sidebar that is displayed when viewing or editing a record may be configured by providing a sidebar descriptor object in the `sidebar` configuration property of each record type.

Currently only the related records that are displayed may be configured, by supplying an array of related record descriptors. A related record panel will be displayed for each descriptor, in the order listed.

**NOTE: This configuration controls the related record *tables* in the sidebar. It does *not* affect/control the media snapshot panel that appears at the top of the sidebar in Object records. See [the `mediaSnapshotSort` setting](./README.md#mediaSnapshotSort) to control order of display in that panel.**

```
type SidebarDescriptor = {
  relatedRecords: Array<RelatedRecordDescriptor>,
};
```
```
type RelatedRecordDescriptor = {
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
        relatedRecords: [
          { recordType: 'collectionobject' },
          { recordType: 'procedure' },
          { recordType: 'media', columnSet: 'narrow', sort: 'title' },
        ],
      },
    },
  },
});
```

## Property Reference

The related record descriptor has the following properties:

### recordType
```
recordType: string
```
A record type name, which must correspond to a key in the [recordTypes](./RecordTypeConfiguration) configuration. Related records of this type will be displayed.

### columnSet
```
columnSet: string = 'narrow'
```
A column set name, which should correspond to a key in the [columns](./ColumnConfiguration) configuration for the specified record type. If the specified column set does not exist for the specified record type, the `default` columnSet for the record typewill be used.

### sort
```
sort: string
```
A column name, which must correspond to a key in the column set specified. The related record list will be initially sorted by this column. For a descending sort order, specify `desc` following the column name, as in `title desc`.
