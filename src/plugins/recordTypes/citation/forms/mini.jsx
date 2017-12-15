import { defineMessages } from 'react-intl';

const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

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

      <Field name="citationPublicationInfoGroupList">
        <Field name="citationPublicationInfoGroup">
          <Field name="publisher" />
          <Field name="publicationPlace" />
          <Field name="publicationDate" />
        </Field>
      </Field>
    </Field>
  );
};

export default pluginContext => ({
  disabled: true,
  messages: defineMessages({
    name: {
      id: 'form.citation.mini.name',
      defaultMessage: 'Mini Template',
    },
  }),
  template: template(pluginContext),
});
