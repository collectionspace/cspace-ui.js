import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Panel,
    Row,
    Cols,
    Col,
  } = configContext.layoutComponents;

  const {
    Field,
    InputTable,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Cols>
          <Col>
            <Field name="exitNumber" />
            <Field name="exitDateGroup" />
            <Field name="exitReason" />

            <Field name="exitMethods">
              <Field name="exitMethod" />
            </Field>
          </Col>

          <Col>
            <Field name="exitQuantity" />
            <Field name="currentOwner" />
            <Field name="depositor" />
          </Col>
        </Cols>

        <Field name="exitNote" />
        <Field name="packingNote" />
      </Panel>

      <Panel name="deaccessionDisposalInfo" collapsible collapsed>
        <Row>
          <Field name="displosalNewObjectNumber" />
          <Field name="deaccessionAuthorizer" />
          <Field name="authorizationDate" />
        </Row>

        <Field name="deacApprovalGroupList">
          <Field name="deacApprovalGroup">
            <Field name="deaccessionApprovalGroup" />
            <Field name="deaccessionApprovalIndividual" />
            <Field name="deaccessionApprovalStatus" />
            <Field name="deaccessionApprovalDate" />
            <Field name="deaccessionApprovalNote" />
          </Field>
        </Field>

        <Cols>
          <Col>
            <Field name="deaccessionDate" />
            <Field name="disposalDate" />
            <Field name="disposalMethod" />
            <Field name="displosalReason" />
          </Col>

          <Col>
            <Field name="disposalProposedRecipient" />
            <Field name="disposalRecipient" />

            <InputTable name="disposal">
              <Field name="disposalCurrency" />
              <Field name="displosalValue" />
            </InputTable>

            <InputTable name="groupDisposal">
              <Field name="groupDisposalCurrency" />
              <Field name="groupDisplosalValue" />
            </InputTable>
          </Col>
        </Cols>

        <Field name="displosalProvisos" />
        <Field name="displosalNote" />
      </Panel>
    </Field>
  );
};

export default configContext => ({
  messages: defineMessages({
    name: {
      id: 'form.objectexit.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
