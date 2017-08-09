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

        <Field name="taxonTermGroupList">
          <Field name="taxonTermGroup">

            <Panel>

              <InputTable>
                <Field name="termDisplayName" />
                <Field name="termFormattedDisplayName" />
                <Field name="termQualifier" />
                <Field name="termStatus" />
              </InputTable>

              <InputTable>
                <Field name="termType" />
                <Field name="termFlag" />
                <Field name="termLanguage" />
                <Field name="termPrefForLang" />
                <Field name="taxonomicStatus" />				
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
          <Field name="taxonRank" />
          <Field name="taxonCurrency" />
        </Row>

        <Field name="taxonAuthorGroupList">
          <Field name="taxonAuthorGroup">
            <Field name="taxonAuthor" />
            <Field name="taxonAuthorType" />
          </Field>
        </Field>

		<Row>
          <Field name="taxonYear" />
		  <Field name="taxonCitationList">
              <Field name="taxonCitation" />
            </Field>
        </Row>
		
        <Field name="taxonIsNamedHybrid" />
        <Field name="taxonNote" />

		<InputTable>
		  <Field name="commonNameGroupList">
            <Field name="commonNameGroup">
            
			  <Field name="commonName" />
			  <Field name="commonNameLanguage" />
			  <Field name="commonNameSource" />
			  <Field name="commonNameSourceDetail" />
			
			</Field>
          </Field>
		</InputTable>
		
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
