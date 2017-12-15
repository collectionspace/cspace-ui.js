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
      <Field
        name="relation-list-item"
        subpath="rel:relations-common-list"
        showChildren={false}
        showSiblings={false}
      />

      <Row>
        <Field name="foundingDateGroup" />
        <Field name="dissolutionDateGroup" />
      </Row>

      <Field name="historyNotes">
        <Field name="historyNote" />
      </Field>
    </Field>
  );
};

export default pluginContext => ({
  disabled: true,
  messages: defineMessages({
    name: {
      id: 'form.organization.mini.name',
      defaultMessage: 'Mini Template',
    },
  }),
  template: template(pluginContext),
});
