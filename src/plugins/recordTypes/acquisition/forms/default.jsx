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

        <Cols>

          { /* Start the left column */ }
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
              <Field name="acquisitionSource" label=""/>
            </Field>
            <Field name="owners">
              <Field name="owner" />
            </Field>
            <Field name="transferOfTitleNumber" />
          </Col>

          { /* Start the right column */ }
          <Col>
            <Panel name="priceInformation">
              <InputTable name="groupPurchasePrice">
                <Field name="groupPurchasePriceValue" />
                <Field name="groupPurchasePriceCurrency" />
              </InputTable>
              <InputTable name="objectOfferPrice">
                <Field name="objectOfferPriceValue" />
                <Field name="objectOfferPriceCurrency" />
              </InputTable>
              <InputTable name="objectPurchaseOfferPrice">
                <Field name="objectPurchaseOfferPriceValue" />
                <Field name="objectPurchaseOfferPriceCurrency" />
              </InputTable>
              <InputTable name="objectPurchasePrice">
                <Field name="objectPurchasePriceValue" />
                <Field name="objectPurchasePriceCurrency" />
              </InputTable>
              <InputTable name="originalObjectPurchasePrice">
                <Field name="originalObjectPurchasePriceValue" />
                <Field name="originalObjectPurchasePriceCurrency" />
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

      <Panel name="objectCollectionInformation" collapsible>

        <Row>
          <Field name="fieldCollectionEventNames">
            <Field name="fieldCollectionEventName" />
          </Field>
        </Row>

      </Panel>

    </Field>
  );
};
