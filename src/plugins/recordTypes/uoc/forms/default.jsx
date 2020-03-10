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
      <Panel name="useOfCollections" collapsible>
        <Cols>
          <Col>
            <Field name="referenceNumber" />

            <Row>
              <Col>
                <Field name="methodList">
                  <Field name="method" />
                </Field>
              </Col>

              <Col>
                <Field name="collectionTypeList">
                  <Field name="collectionType" />
                </Field>
              </Col>
            </Row>
          </Col>

          <Col>
            <Field name="projectId" />

            <Row>
              <Col>
                <Field name="subcollection" />
              </Col>

              <Col>
                <Field name="materialTypeList">
                  <Field name="materialType" />
                </Field>
              </Col>
            </Row>
          </Col>
        </Cols>

        <Field name="userGroupList">
          <Field name="userGroup">
            <Field name="user" />
            <Field name="userUocRole" />
            <Field name="userInstitution" />
            <Field name="userInstitutionRole" />
          </Field>
        </Field>

        <Field name="title" />

        <Cols>
          <Col>
            <Field name="dateRequested" />
            <Field name="dateCompleted" />

            <Field name="occasionList">
              <Field name="occasion" />
            </Field>
          </Col>

          <Col>
            <Field name="projectDescription" />
          </Col>
        </Cols>

        <Field name="authorizationGroupList">
          <Field name="authorizationGroup">
            <Field name="authorizedBy" />
            <Field name="authorizationDate" />
            <Field name="authorizationStatus" />
            <Field name="authorizationNote" />
          </Field>
        </Field>

        <Field name="useDateGroupList">
          <Field name="useDateGroup">
            <Field name="useDate" />
            <Field name="useDateTimeNote" />
            <Field name="useDateNumberOfVisitors" />
            <Field name="useDateHoursSpent" />
            <Field name="useDateVisitorNote" />
          </Field>
        </Field>

        <Cols>
          <Col>
            <Field name="endDate" />
          </Col>

          <Col />
        </Cols>

        <Field name="staffGroupList">
          <Field name="staffGroup">
            <Field name="staffName" />
            <Field name="staffRole" />
            <Field name="staffHours" />
            <Field name="staffNote" />
          </Field>
        </Field>

        <Row>
          <Field name="locationList">
            <Field name="location" />
          </Field>

          <Row>
            <Field name="feeGroupList">
              <Field name="feeGroup">
                <Field name="feeCurrency" />
                <Field name="feeValue" />
                <Field name="feePaid" />
                <Field name="feeNote" />
              </Field>
            </Field>
          </Row>
        </Row>

        <Field name="note" />

        <Row>
          <Field name="provisos" />
          <Field name="obligationsFulfilled" />
        </Row>

        <Field name="result" />
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.uoc.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
