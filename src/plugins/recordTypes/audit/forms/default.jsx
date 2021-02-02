import { defineMessages } from 'react-intl';


const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Panel,
    Row,
    Col,
    Cols,
  } = configContext.layoutComponents;

  const {
    Field,
    InputTable
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="auditInfo">
        <Field name="id" />
      </Panel>

      <Panel name="changeInfo">
        <Cols>
          <Col>
            <Field name="recordType" />
          </Col>
          <Col>
            <Field name="recordId" />
          </Col>
        </Cols>

        <Field name="fieldChangedGroupList">
          <Field name="fieldChangedGroup">
            <Field name="fieldName" />
            <Field name="originalValue" />
            <Field name="newValue" />
            <Field name="changeReason" />
          </Field>
        </Field>

        
        <Field name="relationshipGroupList">
          <Field name="relationshipGroup">
            <Field name="relPredicate" />
            <Field name="relObjRecordType" />
            <Field name="relObjectTitle" />
            <Field name="relChange" />
          </Field>
        </Field>

        <Field name="relRecordChecksumList">
          <Field name="relRecordChecksum" />
        </Field>

        <Cols>
          <Col>
            <Field name="saveMessage" />
            <Field name="updatedBy" />
            <Field name="updatedAt" />
          </Col>
          <Col>
            <Field name="recordChecksum" />
          </Col>
        </Cols>
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
