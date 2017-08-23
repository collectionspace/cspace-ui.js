const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Col,
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    InputTable,
    Field,
    Subrecord,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Field name="personTermGroupList">
          <Field name="personTermGroup">
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
                <Field name="termLanguage" />
                <Field name="termPrefForLang" />
              </Row>

              <InputTable name="nameDetail">
                <Field name="salutation" />
                <Field name="title" />
                <Field name="foreName" />
                <Field name="middleName" />
                <Field name="surName" />
                <Field name="nameAdditions" />
                <Field name="initials" />
              </InputTable>

              <InputTable name="termSource">
                <Field name="termSource" />
                <Field name="termSourceDetail" />
                <Field name="termSourceID" />
                <Field name="termSourceNote" />
              </InputTable>
            </Panel>
          </Field>
        </Field>

        <Row>
          <Col>
            <Field name="gender" />

            <Field name="occupations">
              <Field name="occupation" />
            </Field>

            <Field name="schoolsOrStyles">
              <Field name="schoolOrStyle" />
            </Field>

            <Field name="groups">
              <Field name="group" />
            </Field>

            <Field name="nationalities">
              <Field name="nationality" />
            </Field>
          </Col>
          <Col>
            <Field name="nameNote" />

            <Row>
              <Field name="birthDateGroup" />
              <Field name="birthPlace" />
            </Row>

            <Row>
              <Field name="deathDateGroup" />
              <Field name="deathPlace" />
            </Row>

            <Field name="bioNote" />
          </Col>
        </Row>
      </Panel>

      <Subrecord name="contact" />

      <Panel name="hierarchy" collapsible collapsed>
        <Field name="relation-list-item" subpath="ns2:relations-common-list" />
      </Panel>
    </Field>
  );
};

export default pluginContext => ({
  template: template(pluginContext),
});
