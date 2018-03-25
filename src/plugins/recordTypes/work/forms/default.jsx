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
  } = configContext.recordComponents;

  const {
    extensions,
  } = configContext.config;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Field name="workTermGroupList">
          <Field name="workTermGroup">
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
            <Field name="workType" />

            <Field name="workDateGroupList">
              <Field name="workDateGroup">
                <Field name="workDate" />
              </Field>
            </Field>

            <Field name="workHistoryNote" />
          </Col>

          <Col>
            <Field name="creatorGroupList">
              <Field name="creatorGroup">
                <Field name="creator" />
                <Field name="creatorType" />
              </Field>
            </Field>

            <Field name="publisherGroupList">
              <Field name="publisherGroup">
                <Field name="publisher" />
                <Field name="publisherType" />
              </Field>
            </Field>
          </Col>
        </Cols>

        {extensions.address.form}
      </Panel>

      <Panel name="hierarchy" collapsible collapsed>
        <Field name="relation-list-item" subpath="rel:relations-common-list" />
      </Panel>
    </Field>
  );
};

export default configContext => ({
  messages: defineMessages({
    name: {
      id: 'form.work.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
