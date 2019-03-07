import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Panel,
    Row,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

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

export default configContext => ({
  messages: defineMessages({
    name: {
      id: 'form.group.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
