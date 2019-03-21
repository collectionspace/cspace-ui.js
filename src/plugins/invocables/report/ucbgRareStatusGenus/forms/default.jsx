import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="params">
      <Field name="genus" />
    </Field>
  );
};

export default configContext => ({
  messages: defineMessages({
    name: {
      id: 'form.report.ucbgRateStatusGenus.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  sortOrder: 0,
  template: template(configContext),
});
