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
        <Field name="workType" />

        <Field name="workDateGroupList">
          <Field name="workDateGroup">
            <Field name="workDate" />
          </Field>
        </Field>
      </Row>

      <Field name="workHistoryNote" />
    </Field>
  );
};

export default pluginContext => ({
  disabled: true,
  messages: defineMessages({
    name: {
      id: 'form.work.mini.name',
      defaultMessage: 'Mini Template',
    },
  }),
  template: template(pluginContext),
});
