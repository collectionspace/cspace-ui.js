import { defineMessages } from 'react-intl';

const template = (configContext) => (data, config) => {
  const {
    React,
  } = configContext.lib;

  const {
    Row,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

  const {
    showTermListStateIcon,
  } = config;

  const workflowStateField = showTermListStateIcon
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
        {workflowStateField}
        <Field name="displayName" />
        <Field name="description" />
        <Field name="source" />
        <Field name="sourcePage" />
        <Field name="termStatus" />
      </Field>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.vocabulary.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
