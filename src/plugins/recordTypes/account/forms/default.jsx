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

        <Col>
          <Field name="roleList">
            <Field name="role" />
          </Field>
        </Col>
      </Row>
    </Field>
  );
};

export default configContext => ({
  messages: defineMessages({
    name: {
      id: 'form.account.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
