import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Row,
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
        <Cols>
          <Col>
            <Field name="entryMethods">
              <Field name="entryMethod" />
            </Field>
          </Col>
          <Col>
            <Col>
              <Field name="agreementRenewalDate" />
            </Col>
          </Col>
        </Cols>
        <Cols>
          <Cols>
            <Field name="entryReason" />
          </Cols>
          <Col>
            <Field name="returnDate" />
          </Col>
        </Cols>
        <Field name="entryNote" />
        <Field name="internalApprovalGroupList">
          <Field name="internalApprovalGroup">
            <Field name="internalApprovalGroup" />
            <Field name="internalApprovalIndividual" />
            <Field name="internalApprovalStatus" />
            <Field name="internalApprovalDate" />
            <Field name="internalApprovalNote" />
          </Field>
        </Field>
        <Field name="externalApprovalGroupList">
          <Field name="externalApprovalGroup">
            <Field name="externalApprovalGroup" />
            <Field name="externalApprovalIndividual" />
            <Field name="externalApprovalStatus" />
            <Field name="externalApprovalDate" />
            <Field name="externalApprovalNote" />
          </Field>
        </Field>
      </Panel>

      <Panel name="fieldCollectionInfo" collapsible collapsed>
        <Field name="fieldCollectionGroupList">
            <Field name="fieldCollectionGroup">
              <Panel>
                <Cols>
                  <Col>
                    <Field name="fieldCollectionDates" >
                      <Field name="fieldCollectionDate" />
                    </Field>
                  
                    <Field name="fieldCollectionMethods">
                      <Field name="fieldCollectionMethod" />
                    </Field>
                    
                    <Field name="fieldCollectionPlaces" >
                      <Field name="fieldCollectionPlace" />
                    </Field>
                    
                    <Field name="fieldCollectionPlaceVerbatim" />
                  </Col>
                  <Col>
                    <Field name="fieldCollectionNumber" />

                    <Field name="fieldCollectionSources">
                      <Field name="fieldCollectionSource" />
                    </Field>

                    <Field name="fieldCollectors">
                      <Field name="fieldCollector" />
                    </Field>
                    <Field name="fieldCollectionEventNames">
                      <Field name="fieldCollectionEventName" />
                    </Field>
                  </Col>
                </Cols>
                <Field name="fieldCollectionNote" />
            </Panel>
          </Field>
        </Field>
      </Panel>

      <Panel name="cultureCareAndHandling" collapsible collapsed>
        <Field name="handlingPreferences" />
        <Field name="handlingLimitationsGroupList">
          <Field name="handlingLimitationsGroup">
            <Panel>
              <Row>
                <Col>
                  <Field name="handlingLimitationsType" />
                  <Field name="handlingLimitationsLevel" />
                  <Field name="handlingLimitationsDetail" />
                </Col>
                <Col>
                  <Field name="handlingLimitationsRequestor" />
                  <Field name="handlingLimitationsOnBehalfOf" />
                  <Field name="handlingLimitationsDate" />
                </Col>
              </Row>
            </Panel>
          </Field>
        </Field>
      </Panel>

      <Panel name="correspondence" collapsible collapsed>
        <Field name="correspondenceGroupList">
          <Field name="correspondenceGroup">
            <Field name="correspondenceDate" />
            <Field name="correspondenceSender" />
            <Field name="correspondenceRecipient" />
            <Field name="correspondenceSummary" />
            <Field name="correspondenceReference" />
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
