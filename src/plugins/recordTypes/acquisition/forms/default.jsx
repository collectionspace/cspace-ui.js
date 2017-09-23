const template = (pluginContext) => {
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
        <Cols>
          <Col>
            <Field name="acquisitionReferenceNumber" />
            <Field name="accessionDateGroup" />

            <InputTable name="acquisitionAuthorizer">
              <Field name="acquisitionAuthorizer" />
              <Field name="acquisitionAuthorizerDate" />
            </InputTable>

            <Field name="acquisitionDateGroupList">
              <Field name="acquisitionDateGroup" />
            </Field>

            <Field name="acquisitionMethod" />

            <Field name="acquisitionSources">
              <Field name="acquisitionSource" />
            </Field>

            <Field name="owners">
              <Field name="owner" />
            </Field>

            <Field name="transferOfTitleNumber" />
          </Col>

          <Col>
            <Panel name="priceInformation">
              <InputTable name="groupPurchasePrice">
                <Field name="groupPurchasePriceCurrency" />
                <Field name="groupPurchasePriceValue" />
              </InputTable>

              <InputTable name="objectOfferPrice">
                <Field name="objectOfferPriceCurrency" />
                <Field name="objectOfferPriceValue" />
              </InputTable>

              <InputTable name="objectPurchaseOfferPrice">
                <Field name="objectPurchaseOfferPriceCurrency" />
                <Field name="objectPurchaseOfferPriceValue" />
              </InputTable>

              <InputTable name="objectPurchasePrice">
                <Field name="objectPurchasePriceCurrency" />
                <Field name="objectPurchasePriceValue" />
              </InputTable>

              <InputTable name="originalObjectPurchasePrice">
                <Field name="originalObjectPurchasePriceCurrency" />
                <Field name="originalObjectPurchasePriceValue" />
              </InputTable>
            </Panel>

            <Field name="acquisitionReason" />
          </Col>
        </Cols>

        <Field name="acquisitionNote" />
        <Field name="acquisitionProvisos" />

        <Row>
          <Field name="acquisitionFundingList">
            <Field name="acquisitionFunding">
              <Field name="acquisitionFundingCurrency" />
              <Field name="acquisitionFundingValue" />
              <Field name="acquisitionFundingSource" />
              <Field name="acquisitionFundingSourceProvisos" />
            </Field>
          </Field>
        </Row>

        <Field name="creditLine" />
      </Panel>

      <Panel name="objectCollectionInformation" collapsible collapsed>
        <Row>
          <Field name="fieldCollectionEventNames">
            <Field name="fieldCollectionEventName" />
          </Field>
        </Row>
      </Panel>
    </Field>
  );
};

export default pluginContext => ({
  template: template(pluginContext),
});
