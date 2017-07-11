export default (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Col,
    Cols,
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
    InputTable,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">

      <Panel name="objectEntryInfo" collapsible>

        <Row>
          <Field name="entryNumber" />
          <Field name="returnDate" />
        </Row>

        <Row>
          <Field name="entryDate" />
          <Field name="currentOwner" />
        </Row>

        <Row>
          <Field name="entryReason" />
          <InputTable>
            <Field name="depositor" />
            <Field name="depositorsRequirements" />
          </InputTable>
        </Row>

        <Cols>
          <Col>
            <Field name="entryMethods" label="">
              <Field name="entryMethod" />
            </Field>
          </Col>
          <Col />
        </Cols>

        <Field name="entryNote" />
        <Field name="packingNote" />

      </Panel>


      <Panel name="objectCollectionInfo" collapsible>

        <Row>
          <Field name="fieldCollectionDate" />
          <Field name="fieldCollectionPlace" />
        </Row>

        <Cols>
          <Col>
            <Field name="fieldCollectionMethods" label="">
              <Field name="fieldCollectionMethod" />
            </Field>
          </Col>
          <Col>
            <Field name="fieldCollectionSources" label="">
              <Field name="fieldCollectionSource" />
            </Field>
          </Col>
        </Cols>

        <Cols>
          <Col>
            <Field name="fieldCollectionEventNames" label="">
              <Field name="fieldCollectionEventName" />
            </Field>
          </Col>
          <Col>
            <Field name="fieldCollectors" label="">
              <Field name="fieldCollector" />
            </Field>
          </Col>
        </Cols>

        <Cols>
          <Col>
            <Field name="fieldCollectionNumber" />
          </Col>
          <Col />
        </Cols>

        <Field name="fieldCollectionNote" />

      </Panel>

      <Panel name="valuation" collapsible>

        <Row>
          <Field name="valuer" />
          <Field name="valuationReferenceNumber" />
        </Row>

      </Panel>

      <Panel name="insurance" collapsible>

        <Cols>
          <Col>
            <Field name="insurers" label="">
              <Field name="insurer" />
            </Field>
          </Col>
          <Col>
            <Field name="insuranceReferenceNumber" />
          </Col>
        </Cols>

        <Row>
          <Field name="insurancePolicyNumber" />
          <Field name="insuranceRenewalDate" />
        </Row>

        <Field name="insuranceNote" />

      </Panel>


      <Panel name="location" collapsible>

        <Field name="currentLocationGroupList">
          <Field name="currentLocationGroup">
            { /*TODO fix currentLocation field source */ }
            <Field name="currentLocation" />
            <Field name="currentLocationFitness" />
            <Field name="currentLocationNote" />
          </Field>
        </Field>

        <Row>
          <Field name="locationDate" />
          { /*TODO fix normalLocation field source */ }
          <Field name="normalLocation" />
        </Row>

      </Panel>


      <Panel name="condition" collapsible>

        <Cols>
          <Col>
            <Field name="conditionCheckMethods" label="">
              <Field name="conditionCheckMethod" />
            </Field>
          </Col>
          <Col>
            <Field name="conditionCheckDate" />
          </Col>
        </Cols>

        <Cols>
          <Col>
            <Field name="conditionCheckReasons" label="">
              <Field name="conditionCheckReason" />
            </Field>
          </Col>
          <Col>
            <Field name="conditionCheckReferenceNumber" />
          </Col>
        </Cols>

        <Cols>
          <Col>
            <Field name="conditionCheckersOrAssessors" label="">
              <Field name="conditionCheckerOrAssessor" />
            </Field>
          </Col>
          <Col />
        </Cols>

        <Field name="conditionCheckNote" />

      </Panel>

    </Field>
  );
};
