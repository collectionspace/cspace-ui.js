export default (pluginContext) => {
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
        <Field name="title" />

        <Row>
          <Field name="responsibleDepartment" />
          <Field name="owner" />
        </Row>

        <Field name="scopeNote" />
      </Panel>
    </Field>
  );
};
