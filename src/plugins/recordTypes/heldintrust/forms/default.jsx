import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Row,
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
            <Field name="heldInTrustNumber" />
            <Field name="owners">
              <Field name="owner" />
            </Field>
            <Field name="plannedReturnGroupList">
              <Field name="plannedReturnGroup">
                <Field name="plannedReturnDate" />
                <Field name="plannedReturnNote" />
              </Field>
            </Field>
          </Col>
          <Col>
            <Field name="agreementDescriptions">
              <Field name="agreementDescription" />
            </Field>
            <Field name="typeOfAgreement" />
            <Field name="agreementRenewalDates">
              <Field name="agreementRenewalDate" />
            </Field>
          </Col>
        </Cols>

        <Field name="agreementApprovalGroupList">
          <Field name="agreementApprovalGroup">
            <Panel>
              <Row>
                <Field name="agreementGroup" />
                <Field name="agreementIndividual" />
                <Field name="agreementStatus" />
                <Field name="agreementDate" />
              </Row>
              <Field name="agreementNote" />
            </Panel>
          </Field>
        </Field>

        <Field name="correspondenceGroupList">
          <Field name="correspondenceGroup">
            <Panel>
              <Row>
                <Field name="correspondenceSender" />
                <Field name="correspondenceRecipient" />
                <Field name="correspondenceType" />
                <Field name="correspondenceDate" />
              </Row>
              <Field name="correspondenceSummary" />
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
      id: 'form.heldintrust.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  sortOrder: 0,
  template: template(configContext),
});
