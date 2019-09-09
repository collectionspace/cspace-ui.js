import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    // Col,
    // Panel,
    Row,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Row>
        <Field name="name" />
        <Field name="className" />
      </Row>

      <Field name="notes" />

      <Panel name="mode">
        <Row>
          <Field name="supportsNoContext" />
          <Field name="supportsDocList" />
          <Field name="supportsGroup" />
          <Field name="supportsSingleDoc" />
        </Row>
      </Panel>

      <Row>
        <Col>
          <Field name="forDocTypes">
            <Field name="forDocType" />
          </Field>
        </Col>

        <Field name="createsNewFocus" />
      </Row>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.batch.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
