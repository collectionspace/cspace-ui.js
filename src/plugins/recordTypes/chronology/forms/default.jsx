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
        {extensions.associatedAuthority.form}
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
