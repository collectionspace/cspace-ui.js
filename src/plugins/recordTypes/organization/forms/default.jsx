import { defineMessages } from 'react-intl';

const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    Row,
    Cols,
    Col,
  } = pluginContext.layoutComponents;

  const {
    Field,
    InputTable,
    Subrecord,
  } = pluginContext.recordComponents;

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

            <Field name="contactNames">
              <Field name="contactName" />
            </Field>
          </Col>

          <Col>
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
      </Panel>

      <Subrecord name="contact" />

      <Panel name="hierarchy" collapsible collapsed>
        <Field name="relation-list-item" subpath="rel:relations-common-list" />
      </Panel>
    </Field>
  );
};

export default pluginContext => ({
  messages: defineMessages({
    name: {
      id: 'form.organization.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(pluginContext),
});
