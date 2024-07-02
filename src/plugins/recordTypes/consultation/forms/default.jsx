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
            <Field name="consultationNumber" />
            <Field name="consultationDate" />
          </Col>
          <Col>
            <Field name="reason" />
            <Field name="notes">
              <Field name="note" />
            </Field>
          </Col>
        </Cols>

        <Field name="partiesInvolvedGroupList">
          <Field name="partiesInvolvedGroup">
            <Field name="involvedParty" />
            <Field name="involvedOnBehalfOf" />
            <Field name="involvedRole" />
          </Field>
        </Field>

        <Field name="consultationLogGroupList">
          <Field name="consultationLogGroup">
            <Panel>
              <Row>
                <Field name="consultType" />
                <Field name="consultParties">
                  <Field name="consultParty" />
                </Field>
                <Field name="consultStatus" />
                <Field name="consultDate" />
              </Row>
              <Field name="consultNote" />
            </Panel>
          </Field>
        </Field>
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.consultation.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
