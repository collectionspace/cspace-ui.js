# Form Configuration

The forms displayed for each record type may be configured by providing an form descriptor map in the record type's `forms` configuration property. A form descriptor map is an object that contains form descriptors, keyed by name.

```
type FormDescriptorMap = {[formName: string]: FormDescriptor};
```
```
type FormDescriptor = {
  disabled: boolean,
  messages: MessageDescriptorMap,
  sortOrder: number,
  template: Object,
};
```

## Example

```
cspaceUI((configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Cols,
    Panel,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

  return {
    recordTypes: {
      collectionobject: {
        forms: {
          default: {
            messages: defineMessages({
              name: {
                id: 'form.collectionobject.default.name',
                defaultMessage: 'Standard Template',
              },
            }),
            sortOrder: 0,
            template: (
              <Field name="document">
                <Panel name="id" collapsible>
                  <Cols>
                    <Col>
                      <Field name="objectNumber" />
                      <Field name="numberOfObjects" />
                    </Col>
                    <Col>
                      <Field name="briefDescriptions">
                        <Field name="briefDescription" />
                      </Field>
                    </Col>
                  </Panel>
              </Field>
            ),
          },
        },
      },
    },
  },
});
```

ℹ️ The `defineMessages` function used in the example is exported by the [react-intl](https://github.com/yahoo/react-intl/wiki) package.

ℹ️ This example uses [JSX](https://reactjs.org/docs/introducing-jsx.html), so the React libary must be in scope. It is provided in the configuration context.

## Description

The form descriptor map contains one or more named form descriptors. A form named `default` is required. If additional forms are configured, they will be selectable by the end user as alternate templates to be used to view and edit the record type.

A form descriptor may have the following properties:

### disabled
```
disabled: boolean
```
If true, the form is not shown in the template selector.

### messages
```
messages: MessageDescriptorMap
```
A [react-intl message descriptor map](https://github.com/yahoo/react-intl/wiki/API#definemessages) containing messages for the form. A message with the key `name` must be supplied. This message is displayed in the template selector.

### sortOrder
```
sortOrder: number
```
A number indicating the sort order of the template. This is used in the template selector dropdown to order the available forms, from low to high.

### template
```
template: Object
```
A React element that describes the form's rendering. This may be created with [JSX](https://reactjs.org/docs/introducing-jsx.html), or by writing the [equivalent JavaScript](https://reactjs.org/docs/introducing-jsx.html#jsx-represents-objects).

The rendering for individual fields is described in (field configuration)[./FieldConfiguration.md]. The form template only determines the layout of fields: the order in which they appear, and how they're grouped into rows, columns, and panels. When the form is defined in a configurer function, React components are provided in the configuration context, under the `layoutComponents` and `recordComponents`. These components may be used to lay out the form:

Use a `Field` component to indicate that a field should be rendered, according to its view configuration. The `name` prop must correspond to the field name, as defined in the record type's field descriptor. `Field` tags must be nested in the same way as their corresponding field descriptors are nested in the record type's field descriptor.
