const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">

      <Panel name="info" collapsible>

        <Row>
          <Field name="family" />
          <Field name="commonName" />
          <Field name="locale" />
        </Row>

        <Row>
          <Field name="taxonName" />
          <Field name="labelData" />
        </Row>

        <Row>
          <Field name="numberOfLabels" />
          <Field name="printLabels" />
        </Row>

      </Panel>

    </Field>
  );
};

export default pluginContext => ({
  template: template(pluginContext),
});
