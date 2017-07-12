const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
    InputTable,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>

        <Row>
          <Field name="loanInNumber" />
          <Field name="loanPurpose" />
        </Row>

        <Row>
          <Field name="loanStatusGroupList">
            <Field name="loanStatusGroup">
              <Field name="loanStatus" />
              <Field name="loanStatusDate" />
              <Field name="loanStatusNote" />
            </Field>
          </Field>
        </Row>

        <Row>
          <Field name="lenderGroupList">
            <Field name="lenderGroup">
              <Field name="lender" />
              <Field name="lendersContact" />
              <Field name="lendersAuthorizer" />
              <Field name="lendersAuthorizationDate" />
            </Field>
          </Field>
        </Row>

        <Row>
          <InputTable name="borrower">
            <Field name="borrowersContact" />
            <Field name="borrowersAuthorizer" />
            <Field name="borrowersAuthorizationDate" />
          </InputTable>
        </Row>

        <Row>
          <Field name="specialConditionsOfLoan" />
          <Field name="loanInNote" />
        </Row>

        <Row>
          <Field name="loanInDate" />
          <Field name="loanReturnDate" />
          <Field name="loanRenewalApplicationDate" />
        </Row>

      </Panel>
    </Field>
  );
};

export default pluginContext => ({
  template: template(pluginContext),
});
