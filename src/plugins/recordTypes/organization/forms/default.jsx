import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Panel,
    Row,
    Cols,
    Col,
  } = configContext.layoutComponents;

  const {
    Field,
    InputTable,
    Subrecord,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Field name="orgTermGroupList">
          <Field name="orgTermGroup">
            <Panel>
              <Row>
                <Field name="termDisplayName" />
                <Field name="termName" />
                <Field name="termQualifier" />
                <Field name="termStatus" />
              </Row>

              <Row>
                <Field name="termType" />
                <Field name="termFlag" />
                <Field name="termLanguage" />
                <Field name="termPrefForLang" />
              </Row>

              <InputTable name="nameDetail">
                <Field name="mainBodyName" />
                <Field name="additionsToName" />
              </InputTable>

              <InputTable name="termSource">
                <Field name="termSource" />
                <Field name="termSourceDetail" />
                <Field name="termSourceID" />
                <Field name="termSourceNote" />
              </InputTable>
            </Panel>
          </Field>
        </Field>

        <Cols>
          <Col>
            <Field name="organizationRecordTypes">
              <Field name="organizationRecordType" />
            </Field>

            <Field name="foundingDateGroup" />
            <Field name="foundingPlace" />
            <Field name="dissolutionDateGroup" />
          </Col>

          <Col>
            <Field name="nameNote" />

            <Field name="groups">
              <Field name="group" />
            </Field>

            <Field name="functions">
              <Field name="function" />
            </Field>

            <Field name="historyNotes">
              <Field name="historyNote" />
            </Field>
          </Col>
        </Cols>

        <Field name="contactGroupList">
          <Field name="contactGroup">
            <Field name="contactName" />
            <Field name="contactRole" />
            <Field name="contactDateGroup" />
            <Field name="contactEndDateGroup" />
            <Field name="contactStatus" />
          </Field>
        </Field>
      </Panel>

      <Subrecord name="contact" />

      <Panel name="hierarchy" collapsible collapsed>
        <Field name="relation-list-item" subpath="rel:relations-common-list" />
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.organization.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
