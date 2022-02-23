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
    InputTable,
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
            <Field name="numberOfObjects" />

            <Field name="otherNumberList">
              <Field name="otherNumber">
                <Field name="numberValue" />
                <Field name="numberType" />
              </Field>
            </Field>

            <Field name="responsibleDepartments">
              <Field name="responsibleDepartment" />
            </Field>

            <Row>
              <Field name="collection" />

              <Col>
                <Field name="namedCollections">
                  <Field name="namedCollection" />
                </Field>
              </Col>
            </Row>

            <Field name="recordStatus" />

            <Field name="publishToList">
              <Field name="publishTo" />
            </Field>

            <Field name="inventoryStatusList">
              <Field name="inventoryStatus" />
            </Field>
          </Col>

          <Col>
            <Field name="briefDescriptions">
              <Field name="briefDescription" />
            </Field>

            <Field name="distinguishingFeatures" />

            <Field name="comments">
              <Field name="comment" />
            </Field>

            <Field name="computedCurrentLocation" />
          </Col>
        </Row>

        <Field name="annotationGroupList" subpath="ns2:collectionobjects_annotation">
          <Field name="annotationGroup">
            <Field name="annotationType" />
            <Field name="annotationNote" />
            <Field name="annotationDate" />
            <Field name="annotationAuthor" />
          </Field>
        </Field>

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
            <Field name="objectNameCurrency" />
            <Field name="objectNameLevel" />
            <Field name="objectNameSystem" />
            <Field name="objectNameType" />
            <Field name="objectNameLanguage" />
            <Field name="objectNameNote" />
          </Field>
        </Field>

        <Field name="objectSignificanceGroupList">
          <Field name="objectSignificanceGroup">
            <Field name="assignedSignificance" />
            <Field name="significanceAssignedBy" />
            <Field name="significanceAssignedDate" />
            <Field name="significanceAssignedContact" />
          </Field>
        </Field>

        <Row>
          <Field name="objectSuppliedBy" />
          <Field name="objectComponentStatus" />
        </Row>

        <Field name="objectCredentialGroupList">
          <Field name="objectCredentialGroup">
            <Field name="credentialType" />
            <Field name="credentialRequiredForUse" />
            <Field name="credentialLocation" />
          </Field>
        </Field>

        <Field name="objectDistributedLedgerGroupList">
          <Field name="objectDistributedLedgerGroup">
            <Field name="distributedStorageLedger" />
            <Field name="storageLedgerParentIdentifier" />
            <Field name="storageLedgerObjectIdentifier" />
          </Field>
        </Field>

        <Field name="objectLedgerGroupList">
          <Field name="objectLedgerGroup">
            <Field name="objectLedger" />
            <Field name="objectLedgerContactAddress" />
            <Field name="objectLedgerTokenID" />
          </Field>
        </Field>

      </Panel>

      <Panel name="desc" collapsible collapsed>
        <Row>
          <Col>
            <Field name="copyNumber" />

            <Field name="objectStatusList">
              <Field name="objectStatus" />
            </Field>

            <Field name="sex" />
            <Field name="phase" />

            <Field name="forms">
              <Field name="form" />
            </Field>
          </Col>

          <Col>
            <Field name="editionNumber" />

            <InputTable name="age">
              <Field name="ageQualifier" />
              <Field name="age" />
              <Field name="ageUnit" />
            </InputTable>

            <Field name="styles">
              <Field name="style" />
            </Field>

            <Field name="colors">
              <Field name="color" />
            </Field>
          </Col>
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
        <Field name="intendedBehavior" />

        <Row>
          <Col>
            <Field name="objectComponentGroupList">
              <Field name="objectComponentGroup">
                <Field name="objectComponentName" />
                <Field name="objectComponentInformation" />
              </Field>
            </Field>
          </Col>

          <Col>
            <Field name="technicalAttributeGroupList">
              <Field name="technicalAttributeGroup">
                <Field name="technicalAttribute" />
                <Field name="technicalAttributeMeasurement" />
                <Field name="technicalAttributeMeasurementUnit" />
              </Field>
            </Field>
          </Col>
        </Row>

        {extensions.dimension.form}

        <Panel name="content" collapsible collapsed>
          <Field name="contentDescription" />

          <Row>
            <Col>
              <Field name="contentLanguages">
                <Field name="contentLanguage" />
              </Field>

              <Field name="contentActivities">
                <Field name="contentActivity" />
              </Field>

              <Field name="contentConcepts">
                <Field name="contentConcept" />
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
            </Col>

            <Col>
              <Field name="contentPeoples">
                <Field name="contentPeople" />
              </Field>

              <Field name="contentPersons">
                <Field name="contentPerson" />
              </Field>

              <Field name="contentPlaces">
                <Field name="contentPlace" />
              </Field>

              <Field name="contentScripts">
                <Field name="contentScript" />
              </Field>

              <Field name="contentOrganizations">
                <Field name="contentOrganization" />
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
            </Col>
          </Row>

          <Field name="contentNote" />
        </Panel>

        <Panel name="textInscript" collapsible collapsed>
          <Field name="textualInscriptionGroupList">
            <Field name="textualInscriptionGroup">
              <Panel>
                <Field name="inscriptionContent" />

                <Row>
                  <Col>
                    <Field name="inscriptionContentInscriber" />
                    <Field name="inscriptionContentLanguage" />
                    <Field name="inscriptionContentDateGroup" />
                  </Col>

                  <Col>
                    <Field name="inscriptionContentPosition" />
                    <Field name="inscriptionContentScript" />
                    <Field name="inscriptionContentType" />
                    <Field name="inscriptionContentMethod" />
                  </Col>
                </Row>

                <Field name="inscriptionContentInterpretation" />
                <Field name="inscriptionContentTranslation" />
                <Field name="inscriptionContentTransliteration" />
              </Panel>
            </Field>
          </Field>
        </Panel>

        <Panel name="nonTextInscript" collapsible collapsed>
          <Field name="nonTextualInscriptionGroupList">
            <Field name="nonTextualInscriptionGroup">
              <Panel>
                <Field name="inscriptionDescription" />

                <Row>
                  <Col>
                    <Field name="inscriptionDescriptionInscriber" />
                    <Field name="inscriptionDescriptionDateGroup" />
                  </Col>

                  <Col>
                    <Field name="inscriptionDescriptionPosition" />
                    <Field name="inscriptionDescriptionType" />
                    <Field name="inscriptionDescriptionMethod" />
                  </Col>
                </Row>

                <Field name="inscriptionDescriptionInterpretation" />
              </Panel>
            </Field>
          </Field>
        </Panel>
      </Panel>

      <Panel name="prod" collapsible collapsed>
        <Row>
          <Col>
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
              <Field name="objectProductionPlaceGroup">
                <Field name="objectProductionPlace" />
                <Field name="objectProductionPlaceRole" />
              </Field>
            </Field>

            <Field name="objectProductionReasons">
              <Field name="objectProductionReason" />
            </Field>
          </Col>

          <Col>
            <Field name="objectProductionPeopleGroupList">
              <Field name="objectProductionPeopleGroup">
                <Field name="objectProductionPeople" />
                <Field name="objectProductionPeopleRole" />
              </Field>
            </Field>

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
          </Col>
        </Row>
      </Panel>

      <Panel name="hist" collapsible collapsed>
        <Panel name="assoc" collapsible collapsed>
          <Row>
            <Col>
              <Field name="assocActivityGroupList">
                <Field name="assocActivityGroup">
                  <Field name="assocActivity" />
                  <Field name="assocActivityType" />
                  <Field name="assocActivityNote" />
                </Field>
              </Field>

              <Field name="assocObjectGroupList">
                <Field name="assocObjectGroup">
                  <Field name="assocObject" />
                  <Field name="assocObjectType" />
                  <Field name="assocObjectNote" />
                </Field>
              </Field>

              <Field name="assocConceptGroupList">
                <Field name="assocConceptGroup">
                  <Field name="assocConcept" />
                  <Field name="assocConceptType" />
                  <Field name="assocConceptNote" />
                </Field>
              </Field>

              <Field name="assocCulturalContextGroupList">
                <Field name="assocCulturalContextGroup">
                  <Field name="assocCulturalContext" />
                  <Field name="assocCulturalContextType" />
                  <Field name="assocCulturalContextNote" />
                </Field>
              </Field>

              <Field name="assocOrganizationGroupList">
                <Field name="assocOrganizationGroup">
                  <Field name="assocOrganization" />
                  <Field name="assocOrganizationType" />
                  <Field name="assocOrganizationNote" />
                </Field>
              </Field>

              <Field name="assocPeopleGroupList">
                <Field name="assocPeopleGroup">
                  <Field name="assocPeople" />
                  <Field name="assocPeopleType" />
                  <Field name="assocPeopleNote" />
                </Field>
              </Field>

              <Field name="assocPersonGroupList">
                <Field name="assocPersonGroup">
                  <Field name="assocPerson" />
                  <Field name="assocPersonType" />
                  <Field name="assocPersonNote" />
                </Field>
              </Field>

              <Field name="assocPlaceGroupList">
                <Field name="assocPlaceGroup">
                  <Field name="assocPlace" />
                  <Field name="assocPlaceType" />
                  <Field name="assocPlaceNote" />
                </Field>
              </Field>
            </Col>

            <Col>
              <InputTable name="assocEvent">
                <Field name="assocEventName" />
                <Field name="assocEventNameType" />
              </InputTable>

              <Field name="assocEventOrganizations">
                <Field name="assocEventOrganization" />
              </Field>

              <Field name="assocEventPeoples">
                <Field name="assocEventPeople" />
              </Field>

              <Field name="assocEventPersons">
                <Field name="assocEventPerson" />
              </Field>

              <Field name="assocEventPlaces">
                <Field name="assocEventPlace" />
              </Field>

              <Field name="assocEventNote" />

              <Field name="assocDateGroupList">
                <Field name="assocDateGroup">
                  <Field name="assocStructuredDateGroup" />
                  <Field name="assocDateType" />
                  <Field name="assocDateNote" />
                </Field>
              </Field>
            </Col>
          </Row>
        </Panel>

        <Field name="objectHistoryNote" />

        <Field name="usageGroupList">
          <Field name="usageGroup">
            <Field name="usage" />
            <Field name="usageNote" />
          </Field>
        </Field>

        <Row>
          <Col>
            <Field name="owners">
              <Field name="owner" />
            </Field>

            <Field name="ownershipDateGroupList">
              <Field name="ownershipDateGroup" />
            </Field>
          </Col>

          <Col>
            <Row>
              <Field name="ownershipAccess" />
              <Field name="ownershipCategory" />
            </Row>

            <Field name="ownershipPlace" />
          </Col>
        </Row>

        <InputTable name="ownershipExchange">
          <Field name="ownershipExchangeMethod" />
          <Field name="ownershipExchangeNote" />
          <Field name="ownershipExchangePriceCurrency" />
          <Field name="ownershipExchangePriceValue" />
        </InputTable>
      </Panel>

      <Panel name="owner" collapsible collapsed>
        <Field name="ownersPersonalExperience" />
        <Field name="ownersPersonalResponse" />

        <Field name="ownersReferences">
          <Field name="ownersReference" />
        </Field>

        <Field name="ownersContributionNote" />
      </Panel>

      <Panel name="viewer" collapsible collapsed>
        <Field name="viewersRole" />
        <Field name="viewersPersonalExperience" />
        <Field name="viewersPersonalResponse" />

        <Field name="viewersReferences">
          <Field name="viewersReference" />
        </Field>

        <Field name="viewersContributionNote" />
      </Panel>

      <Panel name="reference" collapsible collapsed>
        <Field name="referenceGroupList">
          <Field name="referenceGroup">
            <Field name="reference" />
            <Field name="referenceNote" />
          </Field>
        </Field>
      </Panel>

      <Panel name="collect" collapsible collapsed>
        <Row>
          <Col>
            <Field name="fieldCollectionDateGroup" />

            <Field name="fieldCollectionMethods">
              <Field name="fieldCollectionMethod" />
            </Field>

            <Field name="fieldCollectionPlace" />

            <Field name="fieldCollectionSources">
              <Field name="fieldCollectionSource" />
            </Field>

            <Field name="fieldCollectors">
              <Field name="fieldCollector" />
            </Field>
          </Col>

          <Col>
            <Field name="fieldCollectionNumber" />

            <Field name="fieldColEventNames">
              <Field name="fieldColEventName" />
            </Field>

            <Field name="fieldCollectionFeature" />
            <Field name="fieldCollectionNote" />
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
      id: 'form.collectionobject.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  sortOrder: 0,
  template: template(configContext),
});
