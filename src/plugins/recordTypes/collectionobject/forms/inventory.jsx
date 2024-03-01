import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Panel,
    Row,
  } = configContext.layoutComponents;

  const {
    Field,
  } = configContext.recordComponents;

  const {
    extensions,
  } = configContext.config;

  return (
    <Field name="document">
      <Panel name="id" collapsible>
        <Row>
          <Col>
            <Field name="objectNumber" />

            <Field name="otherNumberList">
              <Field name="otherNumber">
                <Field name="numberValue" />
                <Field name="numberType" />
              </Field>
            </Field>

            <Field name="inventoryStatusList">
              <Field name="inventoryStatus" />
            </Field>
          </Col>

          <Col>
            <Field name="briefDescriptions">
              <Field name="briefDescription" />
            </Field>
          </Col>
        </Row>

        <Field name="titleGroupList">
          <Field name="titleGroup">
            <Panel>
              <Row>
                <Col>
                  <Field name="title" />
                  <Field name="titleLanguage" />
                </Col>

                <Col>
                  <Field name="titleType" />

                  <Field name="titleTranslationSubGroupList">
                    <Field name="titleTranslationSubGroup">
                      <Field name="titleTranslation" />
                      <Field name="titleTranslationLanguage" />
                    </Field>
                  </Field>
                </Col>
              </Row>
            </Panel>
          </Field>
        </Field>

        <Field name="objectNameList">
          <Field name="objectNameGroup">
            <Field name="objectName" />
            <Field name="objectNameControlled" />
            <Field name="objectNameCurrency" />
            <Field name="objectNameLevel" />
            <Field name="objectNameSystem" />
            <Field name="objectNameType" />
            <Field name="objectNameLanguage" />
            <Field name="objectNameNote" />
          </Field>
        </Field>
      </Panel>

      <Panel name="desc" collapsible collapsed>
        {extensions.dimension.form}
      </Panel>

      <Panel name="prod" collapsible collapsed>
        <Row>
          <Col>
            <Field name="objectProductionDateGroupList">
              <Field name="objectProductionDateGroup" />
            </Field>

            <Field name="objectProductionPersonGroupList">
              <Field name="objectProductionPersonGroup">
                <Field name="objectProductionPerson" />
                <Field name="objectProductionPersonRole" />
              </Field>
            </Field>
          </Col>

          <Col>
            <Field name="objectProductionOrganizationGroupList">
              <Field name="objectProductionOrganizationGroup">
                <Field name="objectProductionOrganization" />
                <Field name="objectProductionOrganizationRole" />
              </Field>
            </Field>
          </Col>
        </Row>
      </Panel>

      <Panel name="hierarchy" collapsible collapsed>
        <Field name="relation-list-item" subpath="rel:relations-common-list" />
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.collectionobject.inventory.name',
      defaultMessage: 'Inventory Template',
    },
  }),
  sortOrder: 1,
  template: template(configContext),
});
