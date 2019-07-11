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
    InputTable,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="useOfCollections" collapsible>

        <Row>
          <Field name="referenceNumber" />
          <Field name="projectId" />
        </Row>

        <Row>
          <Cols>
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

            <Col>
              <Field name="materialTypeList">
                <Field name="materialType" />
              </Field>
            </Col>
          </Cols>
        </Row>

        <Field name="userGroupList">
          <Field name="userGroup">
            <Field name="user" />
            <Field name="userType" />
            <Field name="userRole" />
            <Field name="userInstitution" />
          </Field>
        </Field>

        <Field name="title" />
        <Cols>
          <Col>
            <Field name="dateRequested" />
            <Field name="dateCompleted" />  {/* turn into date completed */}

            <Field name="occasionList">
              <Field name="occasion"/> {/*turn into dynnamic list */}
            </Field> 
          </Col>
          
          <Col>
            <Field name="projectDescription" />
          </Col>
        </Cols>

        <Field name="linkToContract" />
        <Field name="authorizationGroupList">
          <Field name="authorizationGroup">
            <Field name="authorizedBy" />
            <Field name="authorizationDate" />
            <Field name="authorizationNote" />
            <Field name="authorizationStatus" />
          </Field>
        </Field>

        <Cols>
          <Col>
            <Field name="useDateGroupList">
              <Field name="useDateGroup" >
                <Field name="useDate" />
                <Field name="useDateNumberOfVisitors" />
                <Field name="useDateHoursSpent" />
                <Field name="useDateVisitorNote" />
              </Field>
            </Field>

            <Field name="endDate" />

            <Field name="staffGroupList">
              <Field name="staffGroup">
                <Field name="staffName" />
                <Field name="staffRole" />
                <Field name="staffHours" />
                <Field name="staffNote" />
              </Field>
            </Field>

            <Field name="locationList">
              <Field name="location" />
            </Field>


          </Col>

          <Col>
            <Field name="note" />
            <Row>
              <Field name="provisos" />
              <Field name="obligationsFulfilled" />
            </Row>

            <Row>
              <InputTable name="feeCharged">
                <Field name="feeAmount" />
                <Field name="feeNote" />
              </InputTable>
            <Field name="feePaid" />
            </Row>
          </Col>
        </Cols>

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
