export default (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>

        <Row>
          <Field name="loanOutNumber" />
          <Field name="loanPurpose" />
        </Row>

        <Row>
          <Field name="lendersGroup">
            <Field name="lendersAuthorizer" />
            <Field name="lendersContact" />
            <Field name="lendersAuthorizationDate" />
          </Field>
        </Row>

        <Row>
          <Field name="borrowerGroup">
            <Field name="borrower" />
            <Field name="borrowersContact" />
            <Field name="borrowersAuthorizer" />
            <Field name="borrowersAuthorizationDate" />
          </Field>
        </Row>

        <Row>
          <Field name="specialConditionsOfLoan" />
          <Field name="loanOutNote" />
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
          <Field name="loanOutDate" />
          <Field name="loanReturnDate" />
          <Field name="loanRenewalApplicationDate" />
        </Row>

      </Panel>
    </Field>
  );
};
