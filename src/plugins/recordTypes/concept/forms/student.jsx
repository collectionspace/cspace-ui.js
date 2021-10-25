import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Cols,
    Panel,
    Row,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Field name="conceptTermGroupList">
          <Field name="conceptTermGroup">
            <Panel>
              <Row>
                <Field name="termDisplayName" />
                <Field name="termName" />
                <Field name="termQualifier" />
                <Field name="termStatus" />
              </Row>
            </Panel>
          </Field>
        </Field>

        <Cols>
          <Col>
            <Field name="conceptRecordTypes">
              <Field name="conceptRecordType" />
            </Field>
          </Col>

          <Col />
        </Cols>
      </Panel>


    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.concept.student.name',
      defaultMessage: 'Student Template',
    },
  }),
  template: template(configContext),
});
