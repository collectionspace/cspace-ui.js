import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Row,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Field
        name="relation-list-item"
        subpath="rel:relations-common-list"
        showChildren={false}
        showSiblings={false}
      />

      <Row>
        <Field name="birthDateGroup" />
        <Field name="deathDateGroup" />
      </Row>

      <Field name="bioNote" />
    </Field>
  );
};

export default configContext => ({
  disabled: true,
  messages: defineMessages({
    name: {
      id: 'form.person.mini.name',
      defaultMessage: 'Mini Template',
    },
  }),
  template: template(configContext),
});
