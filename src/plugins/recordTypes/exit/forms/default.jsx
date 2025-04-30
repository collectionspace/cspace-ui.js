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
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Cols>
          <Col>
            <Field name="exitNumber" />
            <Field name="exitDate" />
            <Field name="reason" />
            <Field name="methods">
              <Field name="method" />
            </Field>
          </Col>
          <Col>
            <Field name="owners">
              <Field name="owner" />
            </Field>
            <Field name="exitAgentGroupList">
              <Field name="exitAgentGroup">
                <Field name="agent" />
                <Field name="role" />
              </Field>
            </Field>
          </Col>
        </Cols>

        <Field name="exitCountNote" />
        <Field name="note" />
        <Field name="approvalStatusGroupList">
          <Field name="approvalStatusGroup">
            <Panel>
              <Row>
                <Field name="group" />
                <Field name="individual" />
                <Field name="status" />
                <Field name="date" />
              </Row>
              <Field name="approvalStatusNotes">
                <Field name="approvalStatusNote" />
              </Field>
            </Panel>
          </Field>
        </Field>
      </Panel>

      <Panel name="sale" collapsible collapsed>
        <Row>
          <Field name="saleCurrency" />
          <Field name="saleValue" />
          <Field name="saleDate" />
          <Field name="saleNumber" />
          <Field name="saleLot" />
        </Row>
        <Field name="saleNote" />
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.exit.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
