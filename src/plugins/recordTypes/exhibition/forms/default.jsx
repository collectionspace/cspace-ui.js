export default (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    Row,
    Column,
  } = pluginContext.layoutComponents;

  const {
    Field,
    InputTable,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">

      <Panel name="info" collapsible>

        <Row>
          <Field name="exhibitionNumber" />
          <Field name="type" />
          <Field name="title" />
        </Row>

        <Row>
          <Field name="sponsors">
            <Field name="sponsor" />
          </Field>
          <Field name="organizers">
            <Field name="organizer" />
          </Field>
        </Row>

        <Row>
          <Field name="venueGroupList">
            <Field name="venueGroup">
              <Field name="venue" />
              <Field name="venueOpeningDate" />
              <Field name="venueClosingDate" />
              <Field name="venueAttendance" />
              {/*TODO Add external URL input function*/}
              <Field name="venueURL" />
            </Field>
          </Field>
        </Row>

        <Row>
          <Field name="workingGroupList">
            <Field name="workingGroup">
              <Panel>
                <Row>
                  <Field name="workingGroupTitle" />
                  <Field name="workingGroupNote" />
                </Row>
              </Panel>

              <Row>
                <Field name="exhibitionPersonGroupList">
                  <Field name="exhibitionPersonGroup">
                    <Field name="exhibitionPerson" />
                    <Field name="exhibitionPersonRole" />
                  </Field>
                </Field>
              </Row>
            </Field>
          </Field>
        </Row>

        {/*TODO Verify if layout of notes are okay, because does not match 4.5*/}
        <Row>
          <Field name="planningNote" />
          <Field name="curatorialNote" />
        </Row>
        <Row>
          <Field name="generalNote" />
          <Field name="boilerplateText" />
        </Row>

        <Row>
          <Field name="galleryRotationGroupList">
            <Field name="galleryRotationGroup">
              <Field name="galleryRotationName" />
              <Field name="galleryRotationStartDateGroup" />
              <Field name="galleryRotationEndDateGroup" />
              <Field name="galleryRotationNote" />
            </Field>
          </Field>
        </Row>

        <Row>
          <Field name="exhibitionReferenceGroupList">
            <Field name="exhibitionReferenceGroup">
              <Field name="exhibitionReference" />
              <Field name="exhibitionReferenceType" />
              <Field name="exhibitionReferenceNote" />
            </Field>
          </Field>
        </Row>

      </Panel>

      <Panel name="planningInfo" collapsible>

        <Row>
          <Field name="exhibitionSectionGroupList">
            <Field name="exhibitionSectionGroup">
              <Field name="exhibitionSectionName" />
              <Field name="exhibitionSectionLocation" />
              <Field name="exhibitionSectionObjects" />
              <Field name="exhibitionSectionNote" />
            </Field>
          </Field>
        </Row>

        <Row>
          <Field name="exhibitionStatusGroupList">
            <Field name="exhibitionStatusGroup">
              <Field name="exhibitionStatus" />
              <Field name="exhibitionStatusDate" />
              <Field name="exhibitionStatusNote" />
            </Field>
          </Field>
        </Row>

      </Panel>

      <Panel name="exhibitedObjectInformation" collapsible>

        <Row>
          <Field name="exhibitionObjectGroupList">
            <Field name="exhibitionObjectGroup">
              <Field name="exhibitionObjectNumber" />
              <Field name="exhibitionObjectName" />
              <Field name="exhibitionObjectConsCheckDate" />
              <Field name="exhibitionObjectConsTreatment" />
              <Field name="exhibitionObjectMount" />
              <Field name="exhibitionObjectSection" />
              <Field name="exhibitionObjectCase" />
              <Field name="exhibitionObjectSeqNum" />
              <Field name="exhibitionObjectRotation" />
              <Field name="exhibitionObjectNote" />
            </Field>
          </Field>
        </Row>

      </Panel>
    </Field>
  );
};
