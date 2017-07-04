export default (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Cols,
    Col,
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
    InputTable,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>

        <Cols>
          <Col>
            <Field name="conservationNumber" />
          </Col>
          <Col />
        </Cols>
        <Row>
          <Field name="conservationStatusGroupList">
            <Field name="conservationStatusGroup">
              <Field name="status" />
              <Field name="statusDate" />
            </Field>
          </Field>
          <Field name="conservators">
            <Field name="conservator" />
          </Field>
        </Row>

        <Row>
          <Field name="treatmentPurpose" />
          <Field name="otherPartyGroupList">
            <Field name="otherPartyGroup">
              <Field name="otherParty" />
              <Field name="otherPartyRole" />
              <Field name="otherPartyNote" />
            </Field>
          </Field>
        </Row>

        <Field name="examinationGroupList">

          <Field name="examinationGroup">
            <Panel>
              <InputTable>
                <Field name="examinationStaff" />
                <Field name="examinationPhase" />
                <Field name="examinationDate" />
              </InputTable>
              <Field name="examinationNote" />
            </Panel>
          </Field>
        </Field>

        <Field name="fabricationNote" />
        <Field name="proposedTreatment" />

        <Row>
          <InputTable name="approvalInfo">
            <Field name="approvedBy" />
            <Field name="approvedDate" />
          </InputTable>
          <Field name="treatmentStartDate" />
          <Field name="treatmentEndDate" />
        </Row>

        <Field name="treatmentSummary" />

      </Panel>

      <Panel name="objectAnalysisInfo" collapsible>

        <Cols>
          <Col>
            <Field name="researcher" />
          </Col>
          <Col />
        </Cols>

        <Row>
          <Field name="proposedAnalysis" />
          <Field name="proposedAnalysisDate" />
        </Row>

        <Field name="destAnalysisGroupList">
          <Field name="destAnalysisGroup">
            <Panel>
              <InputTable>
                <Field name="destAnalysisApprovedDate" />
                <Field name="destAnalysisApprovalNote" />
              </InputTable>
              <InputTable>
                <Field name="sampleBy" />
                <Field name="sampleDate" />
              </InputTable>
              <Row>
                { /* TODO fix checkbox behavior to prevent jumping to page start on select */ }
                <Field name="sampleReturned" />
                <Field name="sampleReturnedLocation" />
              </Row>
              <Field name="sampleDescription" />
            </Panel>
          </Field>
        </Field>

        <Field name="analysisMethod" />
        <Field name="analysisResults" />
      </Panel>
    </Field>

  );
};
