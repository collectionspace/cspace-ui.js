import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Row,
  } = configContext.layoutComponents;

  const {
    ContentViewer,
    Field,
  } = configContext.recordComponents;

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

export default configContext => ({
  messages: defineMessages({
    name: {
      id: 'form.blob.view.name',
      defaultMessage: 'View Template',
    },
  }),
  sortOrder: 1,
  template: template(configContext),
});
