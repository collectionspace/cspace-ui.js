# Search Result Column Configuration

The columns displayed in search result tables for each record type may be configured by providing an column set map in the record type's `columns` configuration property. A column set map is an object that contains column set descriptors, keyed by name. A column set descriptor is an object that contains column descriptors, keyed by name.

```
type ColumnSetMap = {[columnSetName: string]: ColumnSetDescriptor};
```
```
type ColumnSetDescriptor = {[columnName: string]: ColumnDescriptor};
```
```
type ColumnDescriptor = {
  formatValue: (data: Immutable.Map | Immutable.List | string) => string,
  messages: MessageDescriptorMap,
  order: number,
  sortBy: string,
  width: number,
};
```

## Example

```
cspaceUI((configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    recordTypes: {
      collectionobject: {
        columns: {
          default: {
            objectNumber: {
              messages: defineMessages({
                label: {
                  id: 'column.collectionobject.default.objectNumber',
                  defaultMessage: 'Identification number',
                },
              }),
              order: 10,
              sortBy: 'collectionobjects_common:objectNumber',
              width: 200,
            },
            updatedAt: {
              formatValue: formatTimestamp,
              messages: defineMessages({
                label: {
                  id: 'column.procedure.default.updatedAt',
                  defaultMessage: 'Updated',
                },
              }),
              order: 40,
              sortBy: 'collectionspace_core:updatedAt',
              width: 150,
            },
          },
        },
      },
    },
  },
});
```

ℹ️ The `defineMessages` function used in the example is exported by the [react-intl](https://github.com/yahoo/react-intl/wiki) package.

## Description

The column set map defines one or two column sets. A column set named `default` must be defined, and a column set named `narrow` may optionally be defined. The `narrow` column set is used when redering search result tables in the right sidebar, where there the available space is smaller. The `default` column set is used when rendering search result tables elsewhere. If the `narrow` column set is not defined, the `default` is used in the sidebar as well.

Each column set map contains one or more named columns. The column names used must correspond to the names of fields that have been configured to be returned as list results in REST API requests. This configuration is currently done in the application layer XML files, using the `mini` property on application layer field definitions.

For each named column, a column descriptor must be provided to configure the column. A column descriptor contains the following properties:

### formatValue
```
formatValue: (data: Immutable.Map | Immutable.List | string) => string
```
A function to use to format values in the column. The function accepts the value, and returns a string, which will be displayed. When the column is defined in a [configurer function](./README.md#configurer-function), useful formatting functions are provided in the [configuration context](./ConfigurationContext.md) passed to the configurer, under the [`formatHelpers`](./ConfigurationContext.md#formathelpers-object) property.

If `formatValue` is not defined, values in the column will be displayed as strings with no formatting applied.

### messages
```
messages: MessageDescriptorMap
```
A [react-intl message descriptor map](https://github.com/yahoo/react-intl/wiki/API#definemessages) containing messages for the column. A message with the key `label` must be supplied. This message is displayed in the header for the column.

### order
```
order: number
```
A number indicating the order of the column. Columns appear from left to right in increasing `order` number.

### sortBy
```
sortBy: string
```
The field to use to sort the column. This should be a schema name (without the namespace prefix), followed by `:`, followed by the name of the field in the schema, as specified in the [REST API documentation](https://wiki.collectionspace.org/display/UNRELEASED/Common+Services+REST+API+documentation#CommonServicesRESTAPIdocumentation-Sorting).

### width
```
width: number
```
The width of the column, in pixels. If the sum of the widths specified for all columns in the column set exceeds the available space, column widths are scaled down proportionally to fit the available space.
