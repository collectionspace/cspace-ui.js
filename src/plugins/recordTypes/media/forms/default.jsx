export default (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
  } = pluginContext.layoutComponents;

  const {
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="mediaInfo" collapsible>
        <Field name="identificationNumber" />
      </Panel>
    </Field>
  );
};
