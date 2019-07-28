const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Field name="inventoryStatus" />
    </Field>
  );
};

export default configContext => ({
  template: template(configContext),
});
