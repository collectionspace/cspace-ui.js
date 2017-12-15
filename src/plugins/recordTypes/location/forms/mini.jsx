import { defineMessages } from 'react-intl';

const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Field
        name="relation-list-item"
        subpath="rel:relations-common-list"
        showChildren={false}
        showSiblings={false}
      />

      <Field name="locationType" />
      <Field name="address" />
    </Field>
  );
};

export default pluginContext => ({
  disabled: true,
  messages: defineMessages({
    name: {
      id: 'form.location.mini.name',
      defaultMessage: 'Mini Template',
    },
  }),
  template: template(pluginContext),
});
