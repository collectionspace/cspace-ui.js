import { defineMessages } from 'react-intl';

const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Col,
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible collapsed>
        <Row>
          <Col>
            <Field name="emailGroupList">
              <Field name="emailGroup">
                <Field name="email" />
                <Field name="emailType" />
              </Field>
            </Field>

            <Field name="telephoneNumberGroupList">
              <Field name="telephoneNumberGroup">
                <Field name="telephoneNumber" />
                <Field name="telephoneNumberType" />
              </Field>
            </Field>
          </Col>

          <Col>
            <Field name="faxNumberGroupList">
              <Field name="faxNumberGroup">
                <Field name="faxNumber" />
                <Field name="faxNumberType" />
              </Field>
            </Field>

            <Field name="webAddressGroupList">
              <Field name="webAddressGroup">
                <Field name="webAddress" />
                <Field name="webAddressType" />
              </Field>
            </Field>
          </Col>
        </Row>

        <Field name="addressGroupList">
          <Field name="addressGroup">
            <Panel>
              <Row>
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
              </Row>
            </Panel>
          </Field>
        </Field>
      </Panel>
    </Field>
  );
};

export default pluginContext => ({
  messages: defineMessages({
    name: {
      id: 'form.contact.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(pluginContext),
});
