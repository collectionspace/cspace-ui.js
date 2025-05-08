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
            <Field name="documentationNumber" />
            <Field name="titles">
              <Field name="title" />
            </Field>
            <Field name="types">
              <Field name="type" />
            </Field>
          </Col>
          <Col>
            <Field name="originationDate" />
            <Field name="consultationNotes">
              <Field name="consultationNote" />
            </Field>
            <Field name="treatmentNotes">
              <Field name="treatmentNote" />
            </Field>
          </Col>
        </Cols>

        <Field name="note" />
        <Field name="partiesInvolvedGroupList">
          <Field name="partiesInvolvedGroup">
            <Field name="involvedParty" />
            <Field name="involvedOnBehalfOf" />
            <Field name="involvedRole" />
          </Field>
        </Field>

        <Field name="affiliationGroupList">
          <Field name="affiliationGroup">
            <Panel>
              <Row>
                <Field name="tribeOrNation" />
                <Field name="includeInNotice" />
                <Field name="determinedByList">
                  <Field name="determinedBy" />
                </Field>
                <Field name="determinationDate" />
              </Row>
              <Field name="basisOfDetermination" />
              <Field name="determinationNote" />
            </Panel>
          </Field>
        </Field>

        <Field name="statusGroupList">
          <Field name="statusGroup">
            <Panel>
              <Row>
                <Field name="statusGroupType" />
                <Field name="statusIndividual" />
                <Field name="status" />
                <Field name="statusDate" />
              </Row>
              <Field name="statusNote" />
            </Panel>
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
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.summarydocumentation.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
