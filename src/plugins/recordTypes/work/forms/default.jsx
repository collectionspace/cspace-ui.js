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
  } = pluginContext.recordComponents;

  return (
    <Field name="document">

      <Panel name="info" collapsible>

        <Field name="workTermGroupList">
          <Field name="workTermGroup">

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
                <Field name="termSource" />
                <Field name="termSourceDetail" />
                <Field name="termSourceID" />
                <Field name="termSourceNote" />
              </InputTable>

            </Panel>

          </Field>
        </Field>

        <Row>
          <Field name="workType" />
          <Field name="creatorGroupList">
            <Field name="creatorGroup">
              <Field name="creator" />
              <Field name="creatorType" />
            </Field>
          </Field>
        </Row>

        <Row>
          <Field name="workDateGroupList">
            <Field name="workDateGroup">
              <Field name="workDate" />
            </Field>
          </Field>
          <Field name="publisherGroupList">
            <Field name="publisherGroup">
              <Field name="publisher" />
              <Field name="publisherType" />
            </Field>
          </Field>
        </Row>

        <Field name="workHistoryNote" />


        <Field name="addrGroupList">
          <Field name="addrGroup">

            <Panel>

              <Row>
                <Field name="addressType" />
                <Field name="addressMunicipality" />
              </Row>

              <Row>
                <Field name="addressPlace1" />
                <Field name="addressStateOrProvince" />
              </Row>

              <Row>
                <Field name="addressPlace2" />
                <Field name="addressPostCode" />
              </Row>

              <Cols>
                <Col />
                <Col>
                  <Field name="addressCountry" />
                </Col>
              </Cols>

            </Panel>

          </Field>
        </Field>

      </Panel>

      <Panel name="hierarchy" collapsible collapsed>
        <Field name="relation-list-item" subpath="ns2:relations-common-list" />
      </Panel>

    </Field>
  );
};

export default pluginContext => ({
  template: template(pluginContext),
});
