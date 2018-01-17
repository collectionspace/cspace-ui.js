import { defineMessages } from 'react-intl';

const template = pluginContext => (data, config) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
  } = pluginContext.recordComponents;

  const workflowStateField = config.showTermListStateIcon
    ? <Field name="workflowState" flex="0 0 32px" />
    : null;

  return (
    <Field name="document">
      <Row>
        <Field name="displayName" />
        <Field name="source" />
      </Row>

      <Field name="description" />

      <Field name="list-item" subpath="ns2:abstract-common-list">
        <Field name="displayName" />
        <Field name="description" />
        <Field name="source" />
        <Field name="sourcePage" />
        <Field name="termStatus" />
        {workflowStateField}
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
