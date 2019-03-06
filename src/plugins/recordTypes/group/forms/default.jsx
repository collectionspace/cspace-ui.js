import { defineMessages } from 'react-intl';
import { cpus } from 'os';

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
        <Field name="title" />

        <Cols>
          <Col>
            <Field name="responsibleDepartment" />
            <Field name="owner" />
          </Col>

          <Col>
            <Field name="groupEarliestSingleDate" />
            <Field name="groupLatestDate" />
          </Col>
        </Cols>

        <Field name="scopeNote" />
      </Panel>
    </Field>
  );
};

export default configContext => ({
  messages: defineMessages({
    name: {
      id: 'form.group.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
