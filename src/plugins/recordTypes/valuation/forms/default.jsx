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
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>

        <Row>
          <Field name="valuationcontrolRefNumber" />
          <Field name="valueType" />
        </Row>

        <Row>
          <Field name="valueAmountsList">
            <Field name="valueAmounts">
              <Field name="valueAmount" />
              <Field name="valueCurrency" />
            </Field>
          </Field>
          <Field name="valueSource" />
        </Row>

        <Row>
          <Field name="valueDate" />
          <Field name="valueRenewalDate" />
        </Row>

        <Field name="valueNote" />

      </Panel>
    </Field>
  );
};

export default pluginContext => ({
  template: template(pluginContext),
});
