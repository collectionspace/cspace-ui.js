import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Cols,
    Col,
    Panel,
    Row,
  } = configContext.layoutComponents;

  const {
    Field,
    InputTable,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Field name="chronologyTermGroupList">
          <Field name="chronologyTermGroup">
            <Panel>
              <Row>
                <Field name="termDisplayName" />
                <Field name="termName" />
                <Field name="termQualifier" />
                <Field name="termStatus" />
              </Row>

              <Row>
                <Field name="termType" />
                <Field name="termFlag" />
                <Field name="historicalStatus" />
                <Field name="termLanguage" />
                <Field name="termPrefForLang" />
              </Row>

              <InputTable name="termSource">
                <Field name="termSource" />
                <Field name="termSourceDetail" />
                <Field name="termSourceID" />
                <Field name="termSourceNote" />
              </InputTable>
            </Panel>
          </Field>
        </Field>

        <Cols>
          <Col>
            <Field name="chronologyDateStructuredDateGroup" />
            <Field name="chronologyType" />
            <Field name="chronologyPlaces">
              <Field name="chronologyPlace" />
            </Field>
          </Col>
          <Col>
            <Field name="chronologyDescription" />
            <Field name="chronologyNote" />
          </Col>
        </Cols>

        <Field name="identifierGroupList">
          <Field name="identifierGroup">
            <Field name="identifierValue" />
            <Field name="identifierCitation" />
            <Field name="identifierDate" />
          </Field>
        </Field>
      </Panel>

      <Panel name="associated" collapsible collapsed>
        <Field name="personGroupList">
          <Field name="personGroup">
            <Panel>
              <Row>
                <Field name="person" />
                <Field name="personType" />
                <Field name="personStructuredDateGroup" />
                <Field name="personCitations">
                  <Field name="personCitation" />
                </Field>
                <Field name="personNote" />
              </Row>
            </Panel>
          </Field>
        </Field>

        <Field name="peopleGroupList">
          <Field name="peopleGroup">
            <Panel>
              <Row>
                <Field name="people" />
                <Field name="peopleType" />
                <Field name="peopleStructuredDateGroup" />
                <Field name="peopleCitations">
                  <Field name="peopleCitation" />
                </Field>
                <Field name="peopleNote" />
              </Row>
            </Panel>
          </Field>
        </Field>

        <Field name="organizationGroupList">
          <Field name="organizationGroup">
            <Panel>
              <Row>
                <Field name="organization" />
                <Field name="organizationType" />
                <Field name="organizationStructuredDateGroup" />
                <Field name="organizationCitations">
                  <Field name="organizationCitation" />
                </Field>
                <Field name="organizationNote" />
              </Row>
            </Panel>
          </Field>
        </Field>

        <Field name="conceptGroupList">
          <Field name="conceptGroup">
            <Panel>
              <Row>
                <Field name="concept" />
                <Field name="conceptType" />
                <Field name="conceptStructuredDateGroup" />
                <Field name="conceptCitations">
                  <Field name="conceptCitation" />
                </Field>
                <Field name="conceptNote" />
              </Row>
            </Panel>
          </Field>
        </Field>

        <Field name="placeGroupList">
          <Field name="placeGroup">
            <Panel>
              <Row>
                <Field name="place" />
                <Field name="placeType" />
                <Field name="placeStructuredDateGroup" />
                <Field name="placeCitations">
                  <Field name="placeCitation" />
                </Field>
                <Field name="placeNote" />
              </Row>
            </Panel>
          </Field>
        </Field>

        <Field name="relatedPeriodGroupList">
          <Field name="relatedPeriodGroup">
            <Panel>
              <Row>
                <Field name="relatedPeriod" />
                <Field name="relatedPeriodType" />
                <Field name="relatedPeriodStructuredDateGroup" />
                <Field name="relatedPeriodCitations">
                  <Field name="relatedPeriodCitation" />
                </Field>
                <Field name="relatedPeriodNote" />
              </Row>
            </Panel>
          </Field>
        </Field>
      </Panel>

      <Panel name="altdate" collapsible collapsed>
        <Field name="otherDateGroupList">
          <Field name="otherDateGroup">
            <Panel>
              <Cols>
                <Col>
                  <Field name="otherDateStructuredDateGroup" />
                  <Field name="otherDatePlaces">
                    <Field name="otherDatePlace" />
                  </Field>
                </Col>

                <Col>
                  <Field name="otherDateCitations">
                    <Field name="otherDateCitation" />
                  </Field>
                  <Field name="otherDateNote" />
                </Col>
              </Cols>
            </Panel>
          </Field>
        </Field>
      </Panel>

      <Panel name="hierarchy" collapsible collapsed>
        <Field name="relation-list-item" subpath="rel:relations-common-list" />
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.chronology.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
