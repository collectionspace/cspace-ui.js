const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    Row,
    Cols,
    Col,
  } = pluginContext.layoutComponents;

  const {
    Field,
    InputTable,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Field name="placeTermGroupList">
          <Field name="placeTermGroup">
            <Panel>
              <Row>
                <Field name="termDisplayName" />
                <Field name="termName" />
                <Field name="termQualifier" />
                <Field name="termStatus" />
              </Row>

              <Row>
                <Field name="termType" />
                <Field name="termFlag" />
                <Field name="historicalStatus" />
                <Field name="termLanguage" />
                <Field name="termPrefForLang" />
              </Row>

              <InputTable name="nameDetail">
                <Field name="nameAbbrev" />
                <Field name="nameNote" />
                <Field name="nameDateGroup" />
              </InputTable>

              <InputTable name="termSource">
                <Field name="termSource" />
                <Field name="termSourceDetail" />
                <Field name="termSourceID" />
                <Field name="termSourceNote" />
              </InputTable>
            </Panel>
          </Field>
        </Field>

        <Row>
          <Field name="placeType" />
          <Field name="placeSource" />
        </Row>

        <Field name="placeOwnerGroupList">
          <Field name="placeOwnerGroup">
            <Field name="owner" />
            <Field name="ownershipDateGroup" />
            <Field name="ownershipNote" />
          </Field>
        </Field>

        <Field name="placeNote" />

        {/* TODO: Break out address group */}

        <Field name="addrGroupList">
          <Field name="addrGroup">
            <Panel>
              <Cols>
                <Col>
                  <Field name="addressPlace1" />
                  <Field name="addressPlace2" />
                  <Field name="addressMunicipality" />

                </Col>

                <Col>
                  <Row>
                    <Field name="addressStateOrProvince" />
                    <Field name="addressPostCode" />
                  </Row>

                  <Field name="addressCountry" />

                  <Row>
                    <Col>
                      <Field name="addressType" />
                    </Col>

                    <Col />
                  </Row>
                </Col>
              </Cols>
            </Panel>
          </Field>
        </Field>
      </Panel>

      <Panel name="localityInfo" collapsible collapsed>
        <Row>
          <Field name="vCoordinates" />
          <Field name="vLatitude" />
          <Field name="vLongitude" />
          <Field name="vCoordSys" />
          <Field name="vSpatialReferenceSystem" />
        </Row>

        <Row>
          <Field name="vElevation" />
          <Field name="vDepth" />
          <Field name="vDistanceAboveSurface" />
          <Field name="vUnitofMeasure" />
        </Row>

        <Row>
          <Col>
            <Field name="minElevationInMeters" />
            <Field name="maxElevationInMeters" />
          </Col>

          <Col>
            <Field name="minDepthInMeters" />
            <Field name="maxDepthInMeters" />
          </Col>

          <Col>
            <Field name="minDistanceAboveSurfaceMeters" />
            <Field name="maxDistanceAboveSurfaceMeters" />
          </Col>

          <Col />
        </Row>

        <Row>
          <Field name="vCoordSource" />
          <Field name="vCoordSourceRefId" />
        </Row>
      </Panel>

      <Panel name="geoRefInfo" collapsible collapsed>
        <Field name="placeGeoRefGroupList">
          <Field name="placeGeoRefGroup">
            <Panel>
              <Row>
                <Field name="decimalLatitude" />
                <Field name="decimalLongitude" />
                <Field name="geodeticDatum" />
                <Field name="coordUncertaintyInMeters" />
                <Field name="coordPrecision" />
              </Row>

              <Row>
                <Field name="pointRadiusSpatialFit" />
                <Field name="footprintWKT" />
                <Field name="footprintSRS" />
                <Field name="footprintSpatialFit" />
              </Row>

              <Row>
                <Field name="geoReferencedBy" />
                <Field name="geoRefDateGroup" />
                <Field name="geoRefProtocol" />
                <Field name="geoRefSource" />
                <Field name="geoRefVerificationStatus" />
              </Row>

              <Row>
                <Field name="geoRefRemarks" />
                <Field name="geoRefPlaceName" />
              </Row>
            </Panel>
          </Field>
        </Field>
      </Panel>

      <Panel name="hierarchy" collapsible collapsed>
        <Field name="relation-list-item" subpath="ns2:relations-common-list" />
      </Panel>
    </Field>
  );
};

export default pluginContext => ({
  template: template(pluginContext),
});
