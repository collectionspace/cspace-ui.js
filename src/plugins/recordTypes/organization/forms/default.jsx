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

      <Panel name="contactInfo">

        <Row>
          <Field name="emailGroupList">
            <Field name="emailGroup">
              <Field name="emailType" />
              <Field name="email" />
            </Field>
          </Field>
          <Field name="faxNumberGroupList">
            <Field name="faxNumberGroup">
              <Field name="faxNumberType" />
              <Field name="faxNumber" />
            </Field>
          </Field>
        </Row>

        <Row>
          <Field name="telephoneNumberGroupList">
            <Field name="telephoneNumberGroup">
              <Field name="telephoneNumberType" />
              <Field name="telephoneNumber" />
            </Field>
          </Field>
          <Field name="webAddressGroupList">
            <Field name="webAddressGroup">
              <Field name="webAddressType" />
              <Field name="webAddress" />
            </Field>
          </Field>
        </Row>

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
