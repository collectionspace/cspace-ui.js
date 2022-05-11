import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Row,
    Cols,
    Panel,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Cols>
          <Col>
            <Field name="iterationIdentificationNumber" />
          </Col>
          <Col>
            <Field name="iterationCreatorGroupList">
              <Field name="iterationCreatorGroup">
                <Field name="iterationCreator" />
                <Field name="iterationCreatorRole" />
              </Field>
            </Field>
          </Col>
        </Cols>

        <Field name="installerGroupList">
          <Field name="installerGroup">
            <Field name="installer" />
            <Field name="installerRole" />
            <Field name="installerExtent" />
          </Field>
        </Field>

        <Field name="presenceGroupList">
          <Field name="presenceGroup">
            <Field name="installDeinstall" />
            <Field name="artistPresent" />
            <Field name="presentExtent" />
          </Field>
        </Field>

        <Panel name="evaluation" collapsible collapsed>
          <Cols>
            <Col>
              <Field name="evaluationGroupList">
                <Field name="evaluationGroup">
                  <Field name="iterationSuccessful" />
                  <Field name="iterationEvaluator" />
                </Field>
              </Field>
            </Col>

            <Row>
              <Field name="iterationViewed" />
              <Field name="iterationApproved" />
            </Row>
          </Cols>

          <Field name="iterationEvaluationNotes" />
        </Panel>
      </Panel>

      <Panel name="space" collapsible collapsed>
        <Field name="spaceGroupList">
          <Field name="spaceGroup">
            <Row>
              <Field name="descriptionType" />
              <Field name="approvalEntity" />
              <Field name="approvalDate" />
            </Row>
            <Field name="spaceDescription" />
          </Field>
        </Field>
      </Panel>

      <Panel name="details" collapsible collapsed>
        <Field name="exhibitionGroupList">
          <Field name="exhibitionGroup">
            <Field name="exhibitionCopyIdentificationNumber" />
            <Field name="exhibitionApprovalEntity" />
            <Field name="exhibitionApprovalDate" />
          </Field>
        </Field>

        <Field name="installedEquipmentGroupList">
          <Field name="installedEquipmentGroup">
            <Field name="installedEquipmentDescription" />
            <Field name="installedEquipmentApprovalEntity" />
            <Field name="installedEquipmentApprovalDate" />
          </Field>
        </Field>

        <Field name="technicalSetupGroupList">
          <Field name="technicalSetupGroup">
            <Row>
              <Field name="technicalSetupType" />
              <Field name="technicalSetupApprovalEntity" />
              <Field name="technicalSetupApprovalDate" />
            </Row>
            <Field name="technicalSetupDescription" />
          </Field>
        </Field>

        <Field name="iterationSpecificGroupList">
          <Field name="iterationSpecificGroup">
            <Row>
              <Field name="modificationApprovalEntity" />
              <Field name="modificationApprovalDate" />
            </Row>
            <Field name="modificationDescription" />
          </Field>
        </Field>

        <Field name="installationGroupList">
          <Field name="installationGroup">
            <Row>
              <Field name="installationApprovalEntity" />
              <Field name="installationApprovalDate" />
            </Row>
            <Field name="installationDescription" />
          </Field>
        </Field>

        <Field name="maintenanceGroupList">
          <Field name="maintenanceGroup">
            <Field name="maintenanceType" />
            <Field name="maintenanceContact" />
            <Field name="maintenanceDate" />
            <Field name="maintenanceExtent" />
          </Field>
        </Field>

        <Field name="securityGroupList">
          <Field name="securityGroup">
            <Field name="securityRequirements" />
            <Field name="securityApprovalEntity" />
            <Field name="securityApprovalDate" />
          </Field>
        </Field>
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.iterationreport.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  sortOrder: 0,
  template: template(configContext),
});
