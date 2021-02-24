import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Cols,
    Panel,
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
            <Field name="insuranceIndemnityReferenceNumber" />
            <Field name="insurerIndemnifier" />

            <InputTable name="insurancePurchasePrice">
              <Field name="insuranceIndemnityCurrency" />
              <Field name="insuranceIndemnityValue" />
            </InputTable>
          </Col>
          <Col>
            <Field name="insuranceIndemnityType" />
            <Field name="insuranceIndemnityPolicyNumber" />

            <InputTable name="minimumLiabilityPrice">
              <Field name="minimumLiabilityCurrency" />
              <Field name="minimumLiabilityValue" />
            </InputTable>
          </Col>
        </Cols>

        <InputTable name="authorization">
          <Field name="insuranceIndemnityAuthorizer" />
          <Field name="insuranceIndemnityAuthorizationDate" />
        </InputTable>

        <Field name="insuranceIndemnityStatusGroupList">
          <Field name="insuranceIndemnityStatusGroup">
            <Field name="insuranceIndemnityStatus" />
            <Field name="insuranceIndemnityStatusDate" />
            <Field name="insuranceIndemnityStatusNote" />
          </Field>
        </Field>

        <Field name="insuranceIndemnityNote" />

        <Field name="quoteProviderGroupList">
          <Field name="quoteProviderGroup">
            <Field name="insuranceIndemnityQuoteProvider" />
            <Field name="insuranceIndemnityQuoteCurrency" />
            <Field name="insuranceIndemnityQuoteValue" />
            <Field name="insuranceIndemnityQuoteDate" />
          </Field>
        </Field>
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.insurance.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
