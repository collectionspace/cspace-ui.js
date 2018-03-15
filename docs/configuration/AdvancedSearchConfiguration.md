# Advanced Search Configuration

The advanced search conditions that are displayed for each record type may be configured by providing an advanced search condition descriptor in the record type's `advancedSearch` configuration property.

An advanced search condition consists of a field, an operator, and a value.

```
type AdvancedSearchConditionDescriptor = {
  op: string,
  path: string,
  value: Array<AdvancedSearchConditionDescriptor> | Array<string> | string,
}
```

## Example

```
cspaceUI((configContext) => {
  const {
    OP_AND,
    OP_CONTAIN,
    OP_EQ,
  } = configContext.searchOperators;

  return {
    recordTypes: {
      collectionobject: {
        advancedSearch: {
          op: OP_AND,
          value: [
            {
              op: OP_CONTAIN,
              path: 'ns2:collectionobjects_common/objectNumber',
            },
            {
              op: OP_EQ,
              path: 'ns2:collectionobjects_common/responsibleDepartments/responsibleDepartment',
            },
          },
        },
      },
    },
  },
});
```

## Description

An advanced search condition descriptor has the following properties:

### op
```
op: string
```
The search operator. When the advanced search condition is defined in a configurer function, search operators are provided in the configuration context passed to the configurer, under the `searchOperators` property.

The following search operators are available:

|Operator    |Description|
|------------|-----------|
|`OP_AND`    |Boolean and operator.|
|`OP_OR`     |Boolean or operator.|
|`OP_CONTAIN`|String contains operator. Accepts wildcards.|
|`OP_EQ`     |Equals operator.|
|`OP_GT`     |Greater than operator.|
|`OP_GTE`    |Greater than or equals operator.|
|`OP_LT`     |Less than operator.|
|`OP_LTE`    |Less than or equals operator.|
|`OP_MATCH`  |Matches operator. Accepts wildcards.|
|`OP_RANGE`  |Range search operator.|

### path
```
path: string
```
A path specifying the field to search. Each element of the path is the field name as specified in field configuration. Path elements are joined with `/`.

If the operator is a boolean operator (`OP_AND` or `OP_OR`), `path` should not be specified, and it will be ignored if it is present.

### value
```
value: Array<AdvancedSearchConditionDescriptor> | Array<string> | string
```
The value of the search condition.

If the operator is a boolean operator (`OP_AND` or `OP_OR`), the value should be an array of search conditions to be combined using the operator.

For other operators, the value may be a string or an array of strings to be or'ed together.

⚠️ Typically, values are not specified in advanced search configuration for operators other than `OP_AND` and `OP_OR`. Only specify values for other operators if the search form should be filled in with those values when it is initially displayed.