const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Field name="target" />
    </Field>
  );
};

export default configContext => ({
  template: template(configContext),
});
