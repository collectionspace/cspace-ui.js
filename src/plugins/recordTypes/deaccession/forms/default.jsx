import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Cols,
    Panel,
    Row,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Cols>
          <Col>
            <Field name="deaccessionNumber" />

            <Field name="deaccessionReasons">
              <Field name="deaccessionReason" />
            </Field>

          </Col>
          <Col>
            <Field name="deaccessionDate" />
            <Field name="deaccessionRationale" />
          </Col>
        </Cols>
        <Field name="deaccessionNote" />
        <Field name="deaccessionApprovalGroupList">
          <Field name="deaccessionApprovalGroup">
            <Panel>
              <Row>
                <Field name="deaccessionApprovalGroup" />
                <Field name="deaccessionApprovalIndividual" />
                <Field name="deaccessionApprovalStatus" />
                <Field name="deaccessionApprovalDate" />
              </Row>
              <Field name="deaccessionApprovalNote" />
            </Panel>
          </Field>
        </Field>
      </Panel>

      <Panel name="exit" collapsible>
        <Row>
          <Field name="exitDate" />
          <Field name="exitRecipients">
            <Field name="exitRecipient" />
          </Field>
          <Field name="exitMethods">
            <Field name="exitMethod" />
          </Field>
        </Row>
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.deaccession.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
