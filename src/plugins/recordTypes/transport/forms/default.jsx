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

        <InputTable>
          <Field name="transporter" />
          <Field name="transporterContact" />
          <Field name="transporterContactNumber" />
        </InputTable>

        <Cols>
          <Col>
            <InputTable>
              <Field name="transportAuthorizer" />
              <Field name="transportAuthorizationDate" />
            </InputTable>
          </Col>

          <Col>
            <Field name="transportTrackingNumberGroupList">
              <Field name="transportTrackingNumberGroup">
                <Field name="transportTrackingNumber" />
                <Field name="transportTrackingNumberNote" />
              </Field>
            </Field>
          </Col>
        </Cols>

        <Cols>
          <Col>
            <Field name="departurePoint" />
          </Col>
          <Col>
            <InputTable>
              <Field name="transportDepartureDate" />
              <Field name="transportDepartureTime" />
            </InputTable>
          </Col>
        </Cols>

        <Cols>
          <Col>
            <Field name="destination" />
          </Col>
          <Col>
            <InputTable>
              <Field name="transportArrivalDate" />
              <Field name="transportArrivalTime" />
            </InputTable>
          </Col>
        </Cols>

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

      <Panel name="transportCosts" collapsible>
        <Row>
          <Field name="transportCostType" />
          <Field name="transportCostResponsibleParty" />
          <Field name="insuranceCostResponsibleParty" />
        </Row>

        <InputTable>
          <Field name="finalShippingCostCurrency" />
          <Field name="finalShippingCostValue" />
        </InputTable>

        <InputTable>
          <Field name="customsBroker" />
          <Field name="customsBrokerContact" />
        </InputTable>

        <InputTable>
          <Field name="customsDeclaredValueCurrency" />
          <Field name="customsDeclaredValueAmount" />
        </InputTable>

        <InputTable>
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

        <Field name="shippingQuotesList">
          <Field name="shippingQuotes">
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
