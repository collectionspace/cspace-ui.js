import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Cols,
    Panel,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Cols>
          <Col>
            <Field name="csid" />
            <Field name="resourceType" />
            <Field name="resourceCSID" />
          </Col>
          <Col>
            <Field name="principal" />
            <Field name="eventDate" />
            <Field name="eventType" />
          </Col>
        </Cols>
      </Panel>
      <Panel name="change" collapsible>
        <Field name="fieldChangedGroupList">
          <Field name="fieldChangedGroup">
            <Field name="fieldName" />
            <Field name="originalValue" />
            <Field name="newValue" />
          </Field>
        </Field>
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.audit.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
