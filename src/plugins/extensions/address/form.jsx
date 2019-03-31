export default (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Panel,
    Row,
    Cols,
    Col,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

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
