import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Field,
  } = configContext.recordComponents;

  const {
    Col,
    Cols,
  } = configContext.layoutComponents;

  return (
    <Field name="params">
      <Cols>
        <Col>
          <Field name="numberOfObjects" />
          <Field name="fieldCollector" />
          <Field name="fieldCollectionPlace" />
          <Field name="objectProductionPerson" />
          <Field name="responsibleDepartment" />
        </Col>

        <Col>
          <Field name="numberValue" />
          <Field name="assocPeople" />
          <Field name="contentPlace" />
          <Field name="objectProductionPlace" />
        </Col>

        <Col>
          <Field name="numberType" />
          <Field name="material" />
          <Field name="objectStatus" />
          <Field name="objectName" />
        </Col>
      </Cols>
      <Field name="briefDescription" />
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.report.Bulk Object Edit Batch Job.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  sortOrder: 0,
  template: template(configContext),
});
