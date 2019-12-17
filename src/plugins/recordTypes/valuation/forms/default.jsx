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
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Cols>
          <Col>
            <Field name="valuationcontrolRefNumber" />

            <Field name="valueAmountsList">
              <Field name="valueAmounts">
                <Field name="valueCurrency" />
                <Field name="valueAmount" />
              </Field>
            </Field>

            <Field name="valueDate" />
            <Field name="valueRenewalDate" />
          </Col>

          <Col>
            <Field name="valueSource" />
            <Field name="valueType" />
            <Field name="valueNote" />
          </Col>
        </Cols>
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.valuation.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
