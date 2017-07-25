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

              <InputTable>
                <Field name="termDisplayName" />
                <Field name="termName" />
                <Field name="termQualifier" />
                <Field name="termStatus" />
              </InputTable>

              <InputTable>
                <Field name="termType" />
                <Field name="termFlag" />
                <Field name="historicalStatus" />
                <Field name="termLanguage" />
                <Field name="termPrefForLang" />
              </InputTable>

              <InputTable>
                <Field name="nameAbbrev" />
                <Field name="nameNote" />
                <Field name="nameDateGroup" />
              </InputTable>

              <InputTable>
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

        <Field name="addrGroupList">
          <Field name="addrGroup">

            <Panel>

              <Row>
                <Field name="addressType" />
                <Field name="addressMunicipality" />
              </Row>

              <Row>
                <Field name="addressPlace1" />
                <Field name="addressStateOrProvince" />
              </Row>

              <Row>
                <Field name="addressPlace2" />
                <Field name="addressPostCode" />
              </Row>

              <Cols>
                <Col />
                <Col>
                  <Field name="addressCountry" />
                </Col>
              </Cols>

            </Panel>

          </Field>
        </Field>

      </Panel>

      <Panel name="localityInfo" collapsible>

        <InputTable>
          <Field name="vCoordinates" />
          <Field name="vLatitude" />
          <Field name="vLongitude" />
          <Field name="vCoordSys" />
          <Field name="vSpatialReferenceSystem" />
        </InputTable>

        <InputTable>
          <Field name="vElevation" />
          <Field name="vDepth" />
          <Field name="vDistanceAboveSurface" />
          <Field name="vUnitofMeasure" />
        </InputTable>

        <InputTable>
          <Field name="minElevationInMeters" />
          <Field name="maxElevationInMeters" />
          <Field name="minDepthInMeters" />
          <Field name="maxDepthInMeters" />
        </InputTable>

        <InputTable>
          <Field name="minDistanceAboveSurfaceMeters" />
          <Field name="maxDistanceAboveSurfaceMeters" />
        </InputTable>

        <Row>
          <Field name="vCoordSource" />
          <Field name="vCoordSourceRefId" />
        </Row>

      </Panel>

      <Panel name="geoRefInfo" collapsible>

        <Field name="placeGeoRefGroupList" label="">
          <Field name="placeGeoRefGroup">

            <Panel>

              <InputTable>
                <Field name="decimalLatitude" />
                <Field name="decimalLongitude" />
                <Field name="geodeticDatum" />
                <Field name="coordUncertaintyInMeters" />
                <Field name="coordPrecision" />
              </InputTable>

              <InputTable>
                <Field name="pointRadiusSpatialFit" />
                <Field name="footprintWKT" />
                <Field name="footprintSRS" />
                <Field name="footprintSpatialFit" />
              </InputTable>

              <InputTable>
                <Field name="geoReferencedBy" />
                <Field name="geoRefDateGroup" />
                <Field name="geoRefProtocol" />
                <Field name="geoRefSource" />
                <Field name="geoRefVerificationStatus" />
              </InputTable>

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
