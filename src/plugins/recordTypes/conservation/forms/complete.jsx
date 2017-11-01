const template = (pluginContext) => {
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
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Cols>
          <Col>
            <Field name="conservationNumber" />

            <Field name="conservationStatusGroupList">
              <Field name="conservationStatusGroup">
                <Field name="status" />
                <Field name="statusDate" />
              </Field>
            </Field>

            <Field name="treatmentPurpose" />
          </Col>

          <Col>
            <Field name="conservators">
              <Field name="conservator" />
            </Field>

            <Field name="otherPartyGroupList">
              <Field name="otherPartyGroup">
                <Field name="otherParty" />
                <Field name="otherPartyRole" />
                <Field name="otherPartyNote" />
              </Field>
            </Field>
          </Col>
        </Cols>

        <Field name="examinationGroupList">
          <Field name="examinationGroup">
            <Panel>
              <Row>
                <Field name="examinationStaff" />
                <Field name="examinationPhase" />
                <Field name="examinationDate" />
              </Row>

              <Field name="examinationNote" />
            </Panel>
          </Field>
        </Field>

        <Field name="fabricationNote" />
        <Field name="proposedTreatment" />

        <Row>
          <Field name="approvedBy" />
          <Field name="approvedDate" />
          <Field name="treatmentStartDate" />
          <Field name="treatmentEndDate" />
        </Row>

        <Field name="treatmentSummary" />
      </Panel>

      <Panel name="objectAnalysisInfo" collapsible collapsed>
        <Field name="proposedAnalysis" />

        <Row>
          <Field name="researcher" />
          <Field name="proposedAnalysisDate" />
        </Row>

        <Field name="destAnalysisGroupList">
          <Field name="destAnalysisGroup">
            <Panel>
              <Row>
                <Field name="destAnalysisApprovedDate" />
                <Field name="destAnalysisApprovalNote" />
                <Field name="sampleBy" />
                <Field name="sampleDate" />
              </Row>

              <Field name="sampleDescription" />

              <Row>
                <Field name="sampleReturned" />
                <Field name="sampleReturnedLocation" />
              </Row>
            </Panel>
          </Field>
        </Field>

        <Field name="analysisMethod" />
        <Field name="analysisResults" />
      </Panel>
    </Field>
  );
};

export default pluginContext => ({
  template: template(pluginContext),
});
