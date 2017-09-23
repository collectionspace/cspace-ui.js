import { defineMessages } from 'react-intl';

const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Col,
    Row,
  } = pluginContext.layoutComponents;

  const {
    ContentViewer,
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Row>
        <ContentViewer />

        <Col>
          <Field name="name" />

          <Row>
            <Field name="mimeType" />
            <Field name="length" />
            <Field name="createdAt" subpath="ns2:collectionspace_core" />
            <Field name="updatedAt" subpath="ns2:collectionspace_core" />
          </Row>
        </Col>
      </Row>
    </Field>
  );
};

export default pluginContext => ({
  messages: defineMessages({
    name: {
      id: 'form.blob.view.name',
      defaultMessage: 'View Template',
    },
  }),
  sortOrder: 1,
  template: template(pluginContext),
});
