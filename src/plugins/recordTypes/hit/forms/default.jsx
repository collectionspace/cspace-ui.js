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
      <Panel name="hitInfo" collapsible>
        <Cols>
          <Col>
            <Field name="hitNumber" />
          </Col>
          <Col>
            <Field name="entryDate" />
          </Col>
        </Cols>
        <Field name="hitDepositorGroupList">
          <Field name="hitDepositorGroup">
            <Field name="depositor" />
            <Field name="depositorContact" />
            <Field name="depositorContactType" />
            <Field name="depositorNote" />
          </Field>
        </Field>
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.hit.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  sortOrder: 0,
  template: template(configContext),
});
