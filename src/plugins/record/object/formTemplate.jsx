import {
  AuthorityControlledInput,
  CompoundInput,
  DateInput,
  IDGeneratorInput,
  StaticControlledInput,
  StructuredDateInput,
  TextInput,
  VocabularyControlledInput,
} from 'cspace-input';

import Panel from '../../../components/layout/Panel';
import Row from '../../../components/layout/Row';

import { getPartPropertyName } from '../../../helpers/recordDataHelpers';

export default (pluginContext) => {
  const {
    React,
  } = pluginContext;

  return (
    <CompoundInput defaultChildSubpath={getPartPropertyName('collectionobjects_common')}>
      <Panel name="idPanel" collapsible>
        <Row>
          <div>
            <IDGeneratorInput name="objectNumber" />
            <TextInput name="numberOfObjects" />
            <CompoundInput name="otherNumberList">
              <CompoundInput name="otherNumber" tabular repeating>
                <TextInput name="numberValue" />
                <TextInput name="numberType" />
              </CompoundInput>
            </CompoundInput>
            <CompoundInput name="responsibleDepartments">
              <TextInput name="responsibleDepartment" repeating />
            </CompoundInput>
            <TextInput name="collection" />
            <TextInput name="recordStatus" />
          </div>
          <div>
            <CompoundInput name="briefDescriptions">
              <TextInput name="briefDescription" multiline repeating />
            </CompoundInput>
            <TextInput name="distinguishingFeatures" multiline />
            <CompoundInput name="comments">
              <TextInput name="comment" multiline repeating />
            </CompoundInput>
          </div>
        </Row>

        <TextInput name="computedCurrentLocation" />

        <CompoundInput name="titleGroupList">
          <CompoundInput name="titleGroup" repeating>
            <Panel>
              <Row>
                <div>
                  <TextInput name="title" />
                  <TextInput name="titleLanguage" />
                </div>
                <div>
                  <TextInput name="titleType" />
                  <CompoundInput name="titleTranslationSubGroupList">
                    <CompoundInput name="titleTranslationSubGroup" tabular repeating>
                      <TextInput name="titleTranslation" />
                      <TextInput name="titleTranslationLanguage" />
                    </CompoundInput>
                  </CompoundInput>
                </div>
              </Row>
            </Panel>
          </CompoundInput>
        </CompoundInput>

        <CompoundInput name="objectNameList">
          <CompoundInput name="objectNameGroup" tabular repeating>
            <TextInput name="objectName" />
            <TextInput name="objectNameCurrency" />
            <TextInput name="objectNameLevel" />
            <TextInput name="objectNameSystem" />
            <TextInput name="objectNameType" />
            <TextInput name="objectNameLanguage" />
            <TextInput name="objectNameNote" />
          </CompoundInput>
        </CompoundInput>
      </Panel>

      <Panel name="descPanel" collapsible>
        <Row>
          <div>
            <TextInput name="copyNumber" />

            <CompoundInput name="objectStatusList">
              <StaticControlledInput name="objectStatus" repeating />
            </CompoundInput>

            <StaticControlledInput name="sex" />
            <StaticControlledInput name="phase" />

            <CompoundInput name="forms">
              <StaticControlledInput name="form" repeating />
            </CompoundInput>
          </div>

          <div>
            <TextInput name="editionNumber" />

            <CompoundInput tabular msgkey="ageGroup">
              <TextInput name="age" />
              <VocabularyControlledInput name="ageQualifier" />
              <StaticControlledInput name="ageUnit" />
            </CompoundInput>

            <CompoundInput name="styles">
              <TextInput name="style" repeating />
            </CompoundInput>

            <CompoundInput name="colors">
              <TextInput name="color" repeating />
            </CompoundInput>
          </div>
        </Row>

        <CompoundInput name="materialGroupList">
          <CompoundInput name="materialGroup" tabular repeating>
            <TextInput name="material" />
            <TextInput name="materialComponent" />
            <TextInput name="materialComponentNote" />
            <TextInput name="materialName" />
            <TextInput name="materialSource" />
          </CompoundInput>
        </CompoundInput>

        <TextInput name="physicalDescription" multiline />

        <Row>
          <div>
            <CompoundInput name="objectComponentGroupList">
              <CompoundInput name="objectComponentGroup" tabular repeating>
                <StaticControlledInput name="objectComponentName" />
                <TextInput name="objectComponentInformation" />
              </CompoundInput>
            </CompoundInput>
          </div>

          <div>
            <CompoundInput name="technicalAttributeGroupList">
              <CompoundInput name="technicalAttributeGroup" tabular repeating>
                <StaticControlledInput name="technicalAttribute" />
                <StaticControlledInput name="technicalAttributeMeasurement" />
                <StaticControlledInput name="technicalAttributeMeasurementUnit" />
              </CompoundInput>
            </CompoundInput>
          </div>
        </Row>

        <CompoundInput name="measuredPartGroupList">
          <CompoundInput name="measuredPartGroup" repeating>
            <Panel>
              <Row>
                <div>
                  <StaticControlledInput name="measuredPart" />
                </div>

                <div>
                  <TextInput name="dimensionSummary" />
                </div>
              </Row>

              <CompoundInput name="dimensionSubGroupList">
                <CompoundInput name="dimensionSubGroup" tabular repeating>
                  <StaticControlledInput name="dimension" />
                  <AuthorityControlledInput name="measuredBy" />
                  <StaticControlledInput name="measurementMethod" />
                  <TextInput name="value" />
                  <StaticControlledInput name="measurementUnit" />
                  <TextInput name="valueQualifier" />
                  <DateInput name="valueDate" />
                </CompoundInput>
              </CompoundInput>
            </Panel>
          </CompoundInput>
        </CompoundInput>

        <Panel name="contentPanel" collapsible collapsed>
          <TextInput name="contentDescription" multiline />

          <Row>
            <div>
              <CompoundInput name="contentLanguages">
                <VocabularyControlledInput name="contentLanguage" repeating />
              </CompoundInput>

              <CompoundInput name="contentActivities">
                <TextInput name="contentActivity" repeating />
              </CompoundInput>

              <CompoundInput name="contentConcepts">
                <AuthorityControlledInput name="contentConcept" repeating />
              </CompoundInput>

              <StructuredDateInput name="contentDate" />

              <CompoundInput name="contentPositions">
                <StaticControlledInput name="contentPosition" repeating />
              </CompoundInput>

              <CompoundInput name="contentObjectGroupList">
                <CompoundInput name="contentObjectGroup" tabular repeating>
                  <TextInput name="contentObject" />
                  <StaticControlledInput name="contentObjectType" />
                </CompoundInput>
              </CompoundInput>
            </div>

            <div>
              <CompoundInput name="contentPeoples">
                <TextInput name="contentPeople" repeating />
              </CompoundInput>

              <CompoundInput name="contentPersons">
                <AuthorityControlledInput name="contentPerson" repeating />
              </CompoundInput>

              <CompoundInput name="contentPlaces">
                <TextInput name="contentPlace" repeating />
              </CompoundInput>

              <CompoundInput name="contentScripts">
                <StaticControlledInput name="contentScript" repeating />
              </CompoundInput>

              <CompoundInput name="contentOrganizations">
                <AuthorityControlledInput name="contentOrganization" repeating />
              </CompoundInput>

              <CompoundInput name="contentEventNameGroupList">
                <CompoundInput name="contentEventNameGroup" tabular repeating>
                  <TextInput name="contentEventName" />
                  <TextInput name="contentEventNameType" />
                </CompoundInput>
              </CompoundInput>

              <CompoundInput name="contentOtherGroupList">
                <CompoundInput name="contentOtherGroup" tabular repeating>
                  <TextInput name="contentOther" />
                  <TextInput name="contentOtherType" />
                </CompoundInput>
              </CompoundInput>
            </div>
          </Row>

          <TextInput name="contentNote" multiline />
        </Panel>

        <Panel name="textInscriptPanel" collapsible collapsed>
          <CompoundInput name="textualInscriptionGroupList">
            <CompoundInput name="textualInscriptionGroup" repeating>
              <Panel>
                <TextInput name="inscriptionContent" multiline />

                <Row>
                  <div>
                    <AuthorityControlledInput name="inscriptionContentInscriber" />
                    <VocabularyControlledInput name="inscriptionContentLanguage" />
                    <StructuredDateInput name="inscriptionContentDateGroup" />
                  </div>

                  <div>
                    <StaticControlledInput name="inscriptionContentPosition" />
                    <StaticControlledInput name="inscriptionContentScript" />
                    <StaticControlledInput name="inscriptionContentType" />
                    <TextInput name="inscriptionContentMethod" />
                  </div>
                </Row>

                <TextInput name="inscriptionContentInterpretation" multiline />
                <TextInput name="inscriptionContentTranslation" />
                <TextInput name="inscriptionContentTransliteration" />
              </Panel>
            </CompoundInput>
          </CompoundInput>
        </Panel>

        <Panel name="nonTextInscriptPanel" collapsible collapsed>
          <CompoundInput name="nonTextualInscriptionGroupList">
            <CompoundInput name="nonTextualInscriptionGroup" repeating>
              <Panel>
                <TextInput name="inscriptionDescription" multiline />

                <Row>
                  <div>
                    <AuthorityControlledInput name="inscriptionDescriptionInscriber" />
                    <StructuredDateInput name="inscriptionDescriptionDateGroup" />
                  </div>

                  <div>
                    <StaticControlledInput name="inscriptionDescriptionPosition" />
                    <StaticControlledInput name="inscriptionDescriptionType" />
                    <TextInput name="inscriptionDescriptionMethod" />
                  </div>
                </Row>

                <TextInput name="inscriptionDescriptionInterpretation" multiline />
              </Panel>
            </CompoundInput>
          </CompoundInput>
        </Panel>
      </Panel>

      <Panel name="prodPanel" collapsible collapsed>
        <Row>
          <div>
            <CompoundInput name="objectProductionDateGroupList">
              <StructuredDateInput name="objectProductionDateGroup" repeating />
            </CompoundInput>

            <CompoundInput name="techniqueGroupList">
              <CompoundInput name="techniqueGroup" tabular repeating>
                <TextInput name="technique" />
                <TextInput name="techniqueType" />
              </CompoundInput>
            </CompoundInput>

            <CompoundInput name="objectProductionPlaceGroupList">
              <CompoundInput name="objectProductionPlaceGroup" tabular repeating>
                <TextInput name="objectProductionPlace" />
                <TextInput name="objectProductionPlaceRole" />
              </CompoundInput>
            </CompoundInput>

            <CompoundInput name="objectProductionReasons">
              <TextInput name="objectProductionReason" multiline reapeating />
            </CompoundInput>
          </div>

          <div>
            <CompoundInput name="objectProductionPeopleGroupList">
              <CompoundInput name="objectProductionPeopleGroup" tabular repeating>
                <TextInput name="objectProductionPeople" />
                <TextInput name="objectProductionPeopleRole" />
              </CompoundInput>
            </CompoundInput>

            <CompoundInput name="objectProductionPersonGroupList">
              <CompoundInput name="objectProductionPersonGroup" tabular repeating>
                <AuthorityControlledInput name="objectProductionPerson" />
                <TextInput name="objectProductionPersonRole" />
              </CompoundInput>
            </CompoundInput>

            <CompoundInput name="objectProductionOrganizationGroupList">
              <CompoundInput name="objectProductionOrganizationGroup" tabular repeating>
                <AuthorityControlledInput name="objectProductionOrganization" />
                <TextInput name="objectProductionOrganizationRole" />
              </CompoundInput>
            </CompoundInput>

            <TextInput name="objectProductionNote" multiline />
          </div>
        </Row>
      </Panel>

      <Panel name="histPanel" collapsible collapsed>
        <Panel name="assocPanel" collapsible collapsed>
          <Row>
            <div>
              <CompoundInput name="assocActivityGroupList">
                <CompoundInput name="assocActivityGroup" tabular repeating>
                  <TextInput name="assocActivity" />
                  <TextInput name="assocActivityType" />
                  <TextInput name="assocActivityNote" />
                </CompoundInput>
              </CompoundInput>

              <CompoundInput name="assocObjectGroupList">
                <CompoundInput name="assocObjectGroup" tabular repeating>
                  <TextInput name="assocObject" />
                  <TextInput name="assocObjectType" />
                  <TextInput name="assocObjectNote" />
                </CompoundInput>
              </CompoundInput>

              <CompoundInput name="assocConceptGroupList">
                <CompoundInput name="assocConceptGroup" tabular repeating>
                  <AuthorityControlledInput name="assocConcept" />
                  <TextInput name="assocConceptType" />
                  <TextInput name="assocConceptNote" />
                </CompoundInput>
              </CompoundInput>

              <CompoundInput name="assocCulturalContextGroupList">
                <CompoundInput name="assocCulturalContextGroup" tabular repeating>
                  <TextInput name="assocCulturalContext" />
                  <TextInput name="assocCulturalContextType" />
                  <TextInput name="assocCulturalContextNote" />
                </CompoundInput>
              </CompoundInput>

              <CompoundInput name="assocOrganizationGroupList">
                <CompoundInput name="assocOrganizationGroup" tabular repeating>
                  <AuthorityControlledInput name="assocOrganization" />
                  <TextInput name="assocOrganizationType" />
                  <TextInput name="assocOrganizationNote" />
                </CompoundInput>
              </CompoundInput>

              <CompoundInput name="assocPeopleGroupList">
                <CompoundInput name="assocPeopleGroup" tabular repeating>
                  <TextInput name="assocPeople" />
                  <TextInput name="assocPeopleType" />
                  <TextInput name="assocPeopleNote" />
                </CompoundInput>
              </CompoundInput>

              <CompoundInput name="assocPersonGroupList">
                <CompoundInput name="assocPersonGroup" tabular repeating>
                  <AuthorityControlledInput name="assocPerson" />
                  <TextInput name="assocPersonType" />
                  <TextInput name="assocPersonNote" />
                </CompoundInput>
              </CompoundInput>

              <CompoundInput name="assocPlaceGroupList">
                <CompoundInput name="assocPlaceGroup" tabular repeating>
                  <TextInput name="assocPlace" />
                  <TextInput name="assocPlaceType" />
                  <TextInput name="assocPlaceNote" />
                </CompoundInput>
              </CompoundInput>
            </div>

            <div>
              <Panel>
                <CompoundInput tabular msgkey="assocEventGroup">
                  <TextInput name="assocEventName" />
                  <TextInput name="assocEventNameType" />
                </CompoundInput>

                <CompoundInput name="assocEventOrganizations">
                  <AuthorityControlledInput name="assocEventOrganization" repeating />
                </CompoundInput>

                <CompoundInput name="assocEventPeoples">
                  <TextInput name="assocEventPeople" repeating />
                </CompoundInput>

                <CompoundInput name="assocEventPersons">
                  <AuthorityControlledInput name="assocEventPerson" repeating />
                </CompoundInput>

                <CompoundInput name="assocEventPlaces">
                  <TextInput name="assocEventPlace" repeating />
                </CompoundInput>

                <TextInput name="assocEventNote" />
              </Panel>

              <CompoundInput name="assocDateGroupList">
                <CompoundInput name="assocDateGroup" tabular repeating>
                  <StructuredDateInput name="assocStructuredDateGroup" />
                  <TextInput name="assocDateType" />
                  <TextInput name="assocDateNote" />
                </CompoundInput>
              </CompoundInput>
            </div>
          </Row>
        </Panel>

        <TextInput name="objectHistoryNote" multiline />

        <CompoundInput name="usageGroupList">
          <CompoundInput name="usageGroup" tabular repeating>
            <TextInput name="usage" />
            <TextInput name="usageNote" />
          </CompoundInput>
        </CompoundInput>

        <Row>
          <div>
            <CompoundInput name="owners">
              <AuthorityControlledInput name="owner" repeating />
            </CompoundInput>

            <CompoundInput name="ownershipDateGroupList">
              <StructuredDateInput name="ownershipDateGroup" repeating />
            </CompoundInput>
          </div>

          <div>
            <Row>
              <div>
                <StaticControlledInput name="ownershipAccess" />
              </div>

              <div>
                <StaticControlledInput name="ownershipCategory" />
              </div>
            </Row>

            <TextInput name="ownershipPlace" />
          </div>
        </Row>

        <CompoundInput tabular msgkey="ownershipExchangeGroup">
          <StaticControlledInput name="ownershipExchangeMethod" />
          <TextInput name="ownershipExchangeNote" />
          <VocabularyControlledInput name="ownershipExchangePriceCurrency" />
          <TextInput name="ownershipExchangePriceValue" />
        </CompoundInput>
      </Panel>

      <Panel name="ownerPanel" collapsible collapsed>
        <TextInput name="ownersPersonalExperience" multiline />
        <TextInput name="ownersPersonalResponse" multiline />

        <CompoundInput name="ownersReferences">
          <TextInput name="ownersReference" repeating />
        </CompoundInput>

        <TextInput name="ownersContributionNote" multiline />
      </Panel>

      <Panel name="viewerPanel" collapsible collapsed>
        <TextInput name="viewersRole" />
        <TextInput name="viewersPersonalExperience" multiline />
        <TextInput name="viewersPersonalResponse" multiline />

        <CompoundInput name="viewersReferences">
          <TextInput name="viewersReference" repeating />
        </CompoundInput>

        <TextInput name="viewersContributionNote" multiline />
      </Panel>

      <Panel name="referencePanel" collapsible collapsed>
        <CompoundInput name="referenceGroupList">
          <CompoundInput name="referenceGroup" tabular repeating>
            <AuthorityControlledInput name="reference" />
            <TextInput name="referenceNote" />
          </CompoundInput>
        </CompoundInput>
      </Panel>

      <Panel name="collectPanel" collapsible collapsed>
        <Row>
          <div>
            <StructuredDateInput name="fieldCollectionDate" />

            <CompoundInput name="fieldCollectionMethods">
              <VocabularyControlledInput name="fieldCollectionMethod" repeating />
            </CompoundInput>

            <TextInput name="fieldCollectionNote" multiline />
            <TextInput name="fieldCollectionNumber" />
          </div>

          <div>
            <AuthorityControlledInput name="fieldCollectionPlace" />

            <CompoundInput name="fieldCollectionSources">
              <AuthorityControlledInput name="fieldCollectionSource" repeating />
            </CompoundInput>

            <CompoundInput name="fieldCollectors">
              <AuthorityControlledInput name="fieldCollector" repeating />
            </CompoundInput>

            <CompoundInput name="fieldColEventNames">
              <TextInput name="fieldColEventName" repeating />
            </CompoundInput>
          </div>
        </Row>
      </Panel>
    </CompoundInput>
  );
};
