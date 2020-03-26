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
          <Field name="numberValue" />
          <Field name="fieldCollectionDate" />
          <Field name="material" />
          <Field name="fieldCollectionPlace" />
          <Field name="responsibleDepartment" />

        </Col>

        <Col>
          <Field name="assocPeople" />
          <Field name="numberType" />
          <Field name="objectProductionPerson" />
          <Field name="objectProductionDate" />
          <Field name="objectProductionPlace" />
        </Col>

        <Col>
          <Field name="fieldCollector" />
          <Field name="objectStatus" />
          <Field name="contentDateGroup" />
          <Field name="contentPlace" />
          <Field name="objectName" />
        </Col>
      </Cols>

      <Field name="briefDescription" />
    </Field>
  );
};

export default configContext => ({
  messages: defineMessages({
    name: {
      id: 'form.report.Bulk Object Edit Batch Job.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  sortOrder: 0,
  template: template(configContext),
});
