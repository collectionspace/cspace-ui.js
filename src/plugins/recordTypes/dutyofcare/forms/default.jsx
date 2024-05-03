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
            <Field name="dutyOfCareNumber" />
            <Field name="title" />
          </Col>
          <Col>
            <Field name="originationDate" />
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

        <Field name="detailGroupList">
          <Field name="detailGroup">
            <Panel>
              <Row>
                <Field name="detailType" />
                <Field name="detailLevel" />
                <Field name="detailDeterminedBy" />
                <Field name="detailDeterminationDate" />
              </Row>
              <Field name="detailNote" />
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
      id: 'form.dutyofcare.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
