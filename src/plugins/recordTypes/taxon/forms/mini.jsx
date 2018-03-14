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
        <Field name="taxonRank" />
        <Field name="taxonCurrency" />
      </Row>

      <Field name="taxonNote" />
    </Field>
  );
};

export default configContext => ({
  disabled: true,
  messages: defineMessages({
    name: {
      id: 'form.taxon.mini.name',
      defaultMessage: 'Mini Template',
    },
  }),
  template: template(configContext),
});
