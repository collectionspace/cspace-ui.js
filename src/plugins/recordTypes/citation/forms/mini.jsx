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

export default configContext => ({
  disabled: true,
  messages: defineMessages({
    name: {
      id: 'form.citation.mini.name',
      defaultMessage: 'Mini Template',
    },
  }),
  template: template(configContext),
});
