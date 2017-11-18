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
    <Field name="ns2:role">
      <Row>
        <Col>
          <Field name="displayName" />
          <Field name="description" />
        </Col>
        <Field name="permission" />
      </Row>
    </Field>
  );
};

export default pluginContext => ({
  messages: defineMessages({
    name: {
      id: 'form.authrole.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(pluginContext),
});
