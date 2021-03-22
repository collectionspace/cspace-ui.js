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
    InputTable,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Row>
          <Field name="transportReferenceNumber" />
          <Field name="transportMethod" />
          <Field name="numberOfCrates" />
        </Row>

        <InputTable name="transporter">
          <Field name="transporter" />
          <Field name="transporterContact" />
          <Field name="transporterContactNumber" />
        </InputTable>

        <Row>
          <InputTable name="authorization">
            <Field name="transportAuthorizer" />
            <Field name="transportAuthorizationDate" />
          </InputTable>

          <Col>
            <Field name="transportTrackingNumberGroupList">
              <Field name="transportTrackingNumberGroup">
                <Field name="transportTrackingNumber" />
                <Field name="transportTrackingNumberNote" />
              </Field>
            </Field>
          </Col>
        </Row>

        <InputTable name="departure">
          <Field name="departurePoint" />
          <Field name="transportDepartureDate" />
          <Field name="transportDepartureTime" />
        </InputTable>

        <InputTable name="arrival">
          <Field name="destination" />
          <Field name="transportArrivalDate" />
          <Field name="transportArrivalTime" />
        </InputTable>

        <Cols>
          <Col>
            <Field name="courierGroupList">
              <Field name="courierGroup">
                <Field name="courier" />
                <Field name="courierContactNumber" />
              </Field>
            </Field>
          </Col>
          <Col>
            <Field name="transportRemarks" />
          </Col>
        </Cols>
      </Panel>

      <Panel name="cost" collapsible>
        <Row>
          <Field name="transportCostType" />
          <Field name="transportCostResponsibleParty" />
          <Field name="insuranceCostResponsibleParty" />
        </Row>

        <InputTable name="finalShippingCost">
          <Field name="finalShippingCostCurrency" />
          <Field name="finalShippingCostValue" />
        </InputTable>

        <InputTable name="customsBroker">
          <Field name="customsBroker" />
          <Field name="customsBrokerContact" />
        </InputTable>

        <InputTable name="customsDeclaredValue">
          <Field name="customsDeclaredValueCurrency" />
          <Field name="customsDeclaredValueAmount" />
        </InputTable>

        <InputTable name="customsFee">
          <Field name="customsFeeCurrency" />
          <Field name="customsFeeValue" />
          <Field name="customsFeeNote" />
        </InputTable>

        <Field name="additionalCostsGroupList">
          <Field name="additionalCostsGroup">
            <Field name="additionalCostsType" />
            <Field name="additionalCostsCurrency" />
            <Field name="additionalCostsValue" />
          </Field>
        </Field>

        <Field name="shippingQuoteGroupList">
          <Field name="shippingQuoteGroup">
            <Field name="shippingQuoteProvider" />
            <Field name="shippingQuoteCurrency" />
            <Field name="shippingQuoteValue" />
            <Field name="shippingQuoteDate" />
          </Field>
        </Field>
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.transport.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
