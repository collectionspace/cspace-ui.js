import { defineMessages } from 'react-intl';

const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Row>
        <Field name="displayName" />
        <Field name="source" />
      </Row>

      <Field name="description" />

      <Field name="list-item" subpath="jaxb:abstract-common-list">
        <Field name="displayName" />
        <Field name="description" />
        <Field name="source" />
        <Field name="sourcePage" />
        <Field name="termStatus" />
        <Field name="workflowState" flex="0 0 16px" />
      </Field>
    </Field>
  );
};

export default pluginContext => ({
  messages: defineMessages({
    name: {
      id: 'form.vocabulary.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(pluginContext),
});
