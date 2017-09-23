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
      <Field name="file" />
    </Field>
  );
};

export default pluginContext => ({
  messages: defineMessages({
    name: {
      id: 'form.blob.upload.name',
      defaultMessage: 'Upload Template',
    },
  }),
  sortOrder: 2,
  template: template(pluginContext),
});
