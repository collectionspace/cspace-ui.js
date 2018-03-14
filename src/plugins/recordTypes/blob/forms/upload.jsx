import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Field name="file" />
    </Field>
  );
};

export default configContext => ({
  messages: defineMessages({
    name: {
      id: 'form.blob.upload.name',
      defaultMessage: 'Upload Template',
    },
  }),
  sortOrder: 2,
  template: template(configContext),
});
