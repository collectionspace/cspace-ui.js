import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Col>
        <Field name="name" />
        <Field name="notes" />
      </Col>
    </Field>
  );
};

export default configContext => ({
  messages: defineMessages({
    name: {
      id: 'form.report.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
