const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    Row,
    Cols,
    Col,
  } = pluginContext.layoutComponents;

  const {
    Field,
    InputTable,
    Subrecord,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">

      <Panel name="info" collapsible>

        <Field name="orgTermGroupList">
          <Field name="orgTermGroup">

            <Panel>

              <InputTable>
                <Field name="termDisplayName" />
                <Field name="termName" />
                <Field name="termQualifier" />
                <Field name="termStatus" />
              </InputTable>

              <InputTable>
                <Field name="termType" />
                <Field name="termFlag" />
                <Field name="termLanguage" />
                <Field name="termPrefForLang" />
              </InputTable>

              <InputTable>
                <Field name="mainBodyName" />
                <Field name="additionsToName" />
              </InputTable>

              <InputTable>
                <Field name="termSource" />
                <Field name="termSourceDetail" />
                <Field name="termSourceID" />
                <Field name="termSourceNote" />
              </InputTable>

            </Panel>

          </Field>
        </Field>

        <Row>
          <Field name="organizationRecordTypes" label="">
            <Field name="organizationRecordType" />
          </Field>
          <Field name="groups" label="">
            <Field name="group" />
          </Field>
        </Row>

        <Row>
          <Field name="foundingDateGroup" />
          <Field name="foundingPlace" />
        </Row>

        <Row>
          <Field name="functions" label="">
            <Field name="function" />
          </Field>
          <Field name="contactNames" label="">
            <Field name="contactName" />
          </Field>
        </Row>

        <Cols>
          <Col>
            <Field name="dissolutionDateGroup" />
          </Col>
          <Col />
        </Cols>

        <Field name="historyNotes" label="">
          <Field name="historyNote" />
        </Field>

      </Panel>

      <Subrecord name="contact" template="default" />

      <Panel name="hierarchy" collapsible collapsed>
        <Field name="relation-list-item" subpath="ns2:relations-common-list" />
      </Panel>

    </Field>
  );
};

export default pluginContext => ({
  template: template(pluginContext),
});
