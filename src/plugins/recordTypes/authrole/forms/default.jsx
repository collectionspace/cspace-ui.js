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

          {/*
            * Add a hidden text input to prevent enter from submitting the form. Otherwise there
            * would only be one text input, and forms with only one text input automatically
            * submit when enter is pressed in that input.
            */}
          <input type="text" style={{ display: 'none' }} />
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
