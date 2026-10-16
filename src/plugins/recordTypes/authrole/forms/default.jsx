import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Row,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

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

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.authrole.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
