const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Col,
    Cols,
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Cols>
          <Col>
            <Field name="family" />
            <Field name="commonName" />
            <Field name="locale" />
          </Col>

          <Col>
            <Field name="taxonName" />

            <Row>
              <Field name="numberOfLabels" />
              <Field name="printLabels" />
            </Row>
          </Col>
        </Cols>

        <Field name="labelData" />
      </Panel>
    </Field>
  );
};

export default pluginContext => ({
  template: template(pluginContext),
});
