import { defineMessages } from 'react-intl';

const template = (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="id" collapsible>
        <Row>
          <div>
            <Field name="objectNumber" />
            <Field name="numberOfObjects" />

            <Field name="responsibleDepartments">
              <Field name="responsibleDepartment" />
            </Field>

            <Field name="collection" />
          </div>

          <div>
            <Field name="briefDescriptions">
              <Field name="briefDescription" />
            </Field>

            <Field name="distinguishingFeatures" />
          </div>
        </Row>

        <Field name="titleGroupList">
          <Field name="titleGroup">
            <Panel>
              <Row>
                <div>
                  <Field name="title" />
                  <Field name="titleLanguage" />
                </div>

                <div>
                  <Field name="titleType" />

                  <Field name="titleTranslationSubGroupList">
                    <Field name="titleTranslationSubGroup">
                      <Field name="titleTranslation" />
                      <Field name="titleTranslationLanguage" />
                    </Field>
                  </Field>
                </div>
              </Row>
            </Panel>
          </Field>
        </Field>

        <Field name="objectNameList">
          <Field name="objectNameGroup">
            <Field name="objectName" />
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
        <Row>
          <div>
            <Field name="copyNumber" />
          </div>

          <div>
            <Field name="editionNumber" />

            <Field name="colors">
              <Field name="color" />
            </Field>
          </div>
        </Row>

        <Field name="materialGroupList">
          <Field name="materialGroup">
            <Field name="material" />
            <Field name="materialComponent" />
            <Field name="materialComponentNote" />
            <Field name="materialName" />
            <Field name="materialSource" />
          </Field>
        </Field>

        <Field name="physicalDescription" />

        <Row>
          <Field name="technicalAttributeGroupList">
            <Field name="technicalAttributeGroup">
              <Field name="technicalAttribute" />
              <Field name="technicalAttributeMeasurement" />
              <Field name="technicalAttributeMeasurementUnit" />
            </Field>
          </Field>
          <div />
        </Row>

        {/* TODO: Break out measuredPartGroupList */}

        <Field name="measuredPartGroupList">
          <Field name="measuredPartGroup">
            <Panel>
              <Row>
                <Field name="measuredPart" />
                <Field name="dimensionSummary" />
              </Row>

              <Field name="dimensionSubGroupList">
                <Field name="dimensionSubGroup">
                  <Field name="dimension" />
                  <Field name="measuredBy" />
                  <Field name="measurementMethod" />
                  <Field name="value" />
                  <Field name="measurementUnit" />
                  <Field name="valueQualifier" />
                  <Field name="valueDate" />
                </Field>
              </Field>
            </Panel>
          </Field>
        </Field>

        <Panel name="content" collapsible collapsed>
          <Field name="contentDescription" />

          <Row>
            <div>
              <Field name="contentLanguages">
                <Field name="contentLanguage" />
              </Field>

              <Field name="contentActivities">
                <Field name="contentActivity" />
              </Field>

              <Field name="contentConcepts">
                <Field name="contentConcept" label="" />
              </Field>

              <Field name="contentDateGroup" />

              <Field name="contentPositions">
                <Field name="contentPosition" />
              </Field>

              <Field name="contentObjectGroupList">
                <Field name="contentObjectGroup">
                  <Field name="contentObject" />
                  <Field name="contentObjectType" />
                </Field>
              </Field>
            </div>

            <div>
              <Field name="contentPeoples">
                <Field name="contentPeople" />
              </Field>

              <Field name="contentPersons">
                <Field name="contentPerson" label="" />
              </Field>

              <Field name="contentPlaces">
                <Field name="contentPlace" />
              </Field>

              <Field name="contentScripts">
                <Field name="contentScript" />
              </Field>

              <Field name="contentOrganizations">
                <Field name="contentOrganization" label="" />
              </Field>

              <Field name="contentEventNameGroupList">
                <Field name="contentEventNameGroup">
                  <Field name="contentEventName" />
                  <Field name="contentEventNameType" />
                </Field>
              </Field>

              <Field name="contentOtherGroupList">
                <Field name="contentOtherGroup">
                  <Field name="contentOther" />
                  <Field name="contentOtherType" />
                </Field>
              </Field>
            </div>
          </Row>

          <Field name="contentNote" />
        </Panel>
      </Panel>

      <Panel name="prod" collapsible collapsed>
        <Row>
          <div>
            <Field name="objectProductionDateGroupList">
              <Field name="objectProductionDateGroup" />
            </Field>

            <Field name="techniqueGroupList">
              <Field name="techniqueGroup">
                <Field name="technique" />
                <Field name="techniqueType" />
              </Field>
            </Field>

            <Field name="objectProductionPlaceGroupList">
              <Field name="objectProductionPlaceGroup" >
                <Field name="objectProductionPlace" />
                <Field name="objectProductionPlaceRole" />
              </Field>
            </Field>
          </div>

          <div>
            <Field name="objectProductionPersonGroupList">
              <Field name="objectProductionPersonGroup">
                <Field name="objectProductionPerson" />
                <Field name="objectProductionPersonRole" />
              </Field>
            </Field>

            <Field name="objectProductionOrganizationGroupList">
              <Field name="objectProductionOrganizationGroup">
                <Field name="objectProductionOrganization" />
                <Field name="objectProductionOrganizationRole" />
              </Field>
            </Field>

            <Field name="objectProductionNote" />
          </div>
        </Row>
      </Panel>

      <Panel name="reference" collapsible collapsed>
        <Field name="referenceGroupList">
          <Field name="referenceGroup">
            <Field name="reference" />
            <Field name="referenceNote" />
          </Field>
        </Field>
      </Panel>

      <Panel name="hierarchy" collapsible collapsed>
        <Field name="relation-list-item" subpath="rel:relations-common-list" />
      </Panel>
    </Field>
  );
};

export default pluginContext => ({
  messages: defineMessages({
    name: {
      id: 'form.collectionobject.photo.name',
      defaultMessage: 'Photograph Template',
    },
  }),
  sortOrder: 2,
  template: template(pluginContext),
});
