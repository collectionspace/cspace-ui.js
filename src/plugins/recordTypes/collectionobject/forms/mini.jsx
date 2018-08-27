import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

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

      <Field
        name="0"
        repeating={false}
        subpath={['ns2:collectionobjects_common', 'briefDescriptions', 'briefDescription']}
      />
    </Field>
  );
};

export default configContext => ({
  disabled: true,
  messages: defineMessages({
    name: {
      id: 'form.collectionobject.mini.name',
      defaultMessage: 'Mini Template',
    },
  }),
  template: template(configContext),
});
