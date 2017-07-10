export default (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    Row,
    Cols,
    Col,
  } = pluginContext.layoutComponents;

  const {
    Field,
    InputTable,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">

      <Panel name="info" collapsible>

        <Row>
          <Field name="exitNumber" />
          <Field name="exitDateGroup" />
        </Row>

        <Row>
          <Field name="currentOwner" />

          <Cols>
            <Col>
              { /* Wrapped in col because of label prop which seems
               necessary to display label properly in advanced search*/ }
              <Field name="exitMethods" label="">
                <Field name="exitMethod" />
              </Field>
            </Col>
          </Cols>
        </Row>

        <Row>
          <Field name="depositor" />
          <Field name="exitReason" />
        </Row>

        <Field name="exitNote" />
        <Field name="packingNote" />
      </Panel>

      <Panel name="deaccessionDisposalInfo" collapsible>
        <Row>
          <Field name="disposalNewObjectNumber" />
          <InputTable>
            <Field name="deaccessionAuthorizer" />
            <Field name="authorizationDate" />
          </InputTable>
        </Row>

        <Field name="deacApprovalGroupList" label="">
          <Field name="deacApprovalGroup">
            <Field name="deaccessionApprovalGroup" />
            <Field name="deaccessionApprovalStatus" />
            <Field name="deaccessionApprovalDate" />
          </Field>
        </Field>

        <Row>
          <Field name="deaccessionDate" />
          <Field name="disposalDate" />
          <Field name="disposalMethod" />
        </Row>

        <Row>
          <Field name="disposalReason" />
          <Field name="disposalProposedRecipient" />
          <Field name="disposalRecipient" />
        </Row>

        <InputTable>
          <Field name="disposalCurrency" />
          <Field name="disposalValue" />
        </InputTable>

        <InputTable>
          <Field name="groupDisposalCurrency" />
          <Field name="groupDisposalValue" />
        </InputTable>

        <Row>
          <Field name="disposalProvisos" />
          <Field name="disposalNote" />
        </Row>
      </Panel>

    </Field>
  );
};
