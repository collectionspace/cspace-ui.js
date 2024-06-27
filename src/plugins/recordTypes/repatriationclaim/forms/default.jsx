import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Cols,
    Row,
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
            <Field name="claimNumber" />
            <Field name="title" />
            <Field name="types">
              <Field name="type" />
            </Field>
            <Field name="alternativeTitleGroupList">
              <Field name="alternativeTitleGroup">
                <Field name="alternativeTitle" />
                <Field name="alternativeTitleNote" />
              </Field>
            </Field>
          </Col>
          <Col>
            <Field name="claimDate" />
            <Field name="notes">
              <Field name="note" />
            </Field>
            <Field name="treatmentNotes">
              <Field name="treatmentNote" />
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
      </Panel>

      <Panel name="context" collapsible collapsed>
        <Cols>
          <Col>
            <Field name="geographicPlaceGroupList">
              <Field name="geographicPlaceGroup">
                <Field name="geographicPlace" />
                <Field name="geographicPlaceNote" />
              </Field>
            </Field>
            <Field name="culturalGroupList">
              <Field name="culturalGroup">
                <Field name="culture" />
                <Field name="cultureNote" />
              </Field>
            </Field>
          </Col>
          <Col>
            <Field name="timePeriodGroupList">
              <Field name="timePeriodGroup">
                <Field name="timePeriod" />
                <Field name="timePeriodNote" />
              </Field>
            </Field>
            <Field name="archaeologicalSiteGroupList">
              <Field name="archaeologicalSiteGroup">
                <Field name="archaeologicalSite" />
                <Field name="archaeologicalSiteNote" />
              </Field>
            </Field>
          </Col>
        </Cols>
      </Panel>

      <Panel name="status" collapsible collapsed>
        <Field name="nagpraStatusGroupList">
          <Field name="nagpraStatusGroup">
            <Panel>
              <Row>
                <Field name="statusGroup" />
                <Field name="statusIndividual" />
                <Field name="status" />
                <Field name="statusDate" />
              </Row>
              <Field name="statusNote" />
            </Panel>
          </Field>
        </Field>
      </Panel>

      <Panel name="documentation" collapsible collapsed>
        <Field name="nagpraDocumentationGroupList">
          <Field name="nagpraDocumentationGroup">
            <Panel>
              <Row>
                <Field name="documentationGroup" />
                <Field name="documentationIndividual" />
                <Field name="documentationStatus" />
                <Field name="documentationDate" />
              </Row>
              <Field name="documentationNote" />
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
      id: 'form.repatriationclaim.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
