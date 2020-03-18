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

          <Field name="otherNumberList">
            <Field name="otherNumber">
              <Field name="numberValue" />
              <Field name="numberType" />
            </Field>
          </Field>

          <Field name="fieldCollectionDate" />
          <Field name="materialGroup">
            <Field name="material" />
          </Field>

          <Field name="fieldCollectionPlace" />

          <Field name="objectNameGroup">
            <Field name="objectName" />
          </Field>
        </Col>

        <Col>
          <Field name="assocPeopleGroup">
            <Field name="assocPeople" />
          </Field>

          <Field name="objectProductionPersonGroup">
            <Field name="objectProductionPerson" />
          </Field>

          <Field name="objectProductionDate" />

          <Field name="objectProductionPlaceGroup">
            <Field name="objectProductionPlace" />
          </Field>

          <Field name="responsibleDepartments">
            <Field name="responsibleDepartment" />
          </Field>
        </Col>

        <Col>
          <Field name="fieldCollectors">
            <Field name="fieldCollector" />
          </Field>

          <Field name="objectStatusList">
            <Field name="objectStatus" />
          </Field>

          <Field name="contentDateGroup" />
          <Field name="contentPlaces">
            <Field name="contentPlace" />
          </Field>
        </Col>
      </Cols>

      <Field name="briefDescriptions">
        <Field name="briefDescription" />
      </Field>
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
