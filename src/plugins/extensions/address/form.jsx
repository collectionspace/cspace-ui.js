export default (configContext) => {
  const {
    layoutComponents,
    lib,
    recordComponents,
  } = configContext;

  const {
    React,
  } = lib;

  const {
    Panel,
    Row,
    Cols,
    Col,
  } = layoutComponents;

  const {
    Field,
  } = recordComponents;

  return (
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
  );
};
