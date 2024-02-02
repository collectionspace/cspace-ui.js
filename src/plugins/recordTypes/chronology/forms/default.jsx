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

  const {
    extensions,
  } = configContext.config;

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
            <Field name="primaryDateRangeStructuredDateGroup" />
            <Field name="chronologyType" />
            <Field name="spatialCoverages">
              <Field name="spatialCoverage" />
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

      <Panel name="altdate" collapsible collapsed>
        <Field name="altDateGroupList">
          <Field name="altDateGroup">
            <Panel>
              <Cols>
                <Col>
                  <Field name="altDateRangeStructuredDateGroup" />
                  <Field name="altDateSpatialCoverages">
                    <Field name="altDateSpatialCoverage" />
                  </Field>
                </Col>

                <Col>
                  <Field name="altDateCitations">
                    <Field name="altDateCitation" />
                  </Field>
                  <Field name="altDateNote" />
                </Col>
              </Cols>
            </Panel>
          </Field>
        </Field>
      </Panel>

      <Panel name="authorities" collapsible collapsed>
        {extensions.associatedAuthority.form}
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
