export default (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    // Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Field name="personTermGroupList">
          <Field name="personTermGroup">
            <Panel>
              <Field name="termDisplayName" />
              <Field name="termSource" />
            </Panel>
          </Field>
        </Field>
      </Panel>
    </Field>
  );
};
