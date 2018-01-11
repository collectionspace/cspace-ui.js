import { defineMessages } from 'react-intl';

const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Col,
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="ns3:accounts_common">
      <Row>
        <Col>
          <Field name="email" />
          <Field name="screenName" />
          <Field name="password" />
          <Field name="confirmPassword" />
          <Field name="status" />
          <Field name="userId" />
        </Col>
        <Field name="role" />
      </Row>
    </Field>
  );
};

export default pluginContext => ({
  messages: defineMessages({
    name: {
      id: 'form.account.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(pluginContext),
});
