export default (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    AuthorityControlledInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    OptionControlledInput,
    StructuredDateInput,
    TextInput,
    VocabularyControlledInput,
  } = pluginContext.inputComponents;

  const {
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    getPartPropertyName,
  } = pluginContext.recordDataHelpers;

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
                <OptionControlledInput name="numberType" optionListName="numberTypes" />
              </CompoundInput>
            </CompoundInput>
            <CompoundInput name="responsibleDepartments">
              <OptionControlledInput
                name="responsibleDepartment"
                optionListName="departments"
                repeating
              />
            </CompoundInput>
            <OptionControlledInput name="collection" optionListName="collections" />
            <OptionControlledInput name="recordStatus" optionListName="recordStatuses" />
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
                  <VocabularyControlledInput name="titleLanguage" vocabularyName="languages" />
                </div>
                <div>
                  <OptionControlledInput name="titleType" optionListName="titleTypes" />
                  <CompoundInput name="titleTranslationSubGroupList">
                    <CompoundInput name="titleTranslationSubGroup" tabular repeating>
                      <TextInput name="titleTranslation" />
                      <VocabularyControlledInput
                        name="titleTranslationLanguage"
                        vocabularyName="languages"
                      />
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
            <OptionControlledInput name="objectNameCurrency" optionListName="nameCurrencies" />
            <OptionControlledInput name="objectNameLevel" optionListName="nameLevels" />
            <OptionControlledInput name="objectNameSystem" optionListName="nameSystems" />
            <OptionControlledInput name="objectNameType" optionListName="nameTypes" />
            <VocabularyControlledInput name="objectNameLanguage" vocabularyName="languages" />
            <TextInput name="objectNameNote" />
          </CompoundInput>
        </CompoundInput>
      </Panel>

      <Panel name="descPanel" collapsible>
        <Row>
          <div>
            <TextInput name="copyNumber" />

            <CompoundInput name="objectStatusList">
              <OptionControlledInput
                name="objectStatus"
                optionListName="objectStatuses"
                repeating
              />
            </CompoundInput>

            <OptionControlledInput name="sex" optionListName="sexes" />
            <OptionControlledInput name="phase" optionListName="phases" />

            <CompoundInput name="forms">
              <OptionControlledInput name="form" optionListName="forms" repeating />
            </CompoundInput>
          </div>

          <div>
            <TextInput name="editionNumber" />

            <CompoundInput tabular msgkey="ageGroup">
              <TextInput name="age" />
              <VocabularyControlledInput name="ageQualifier" vocabularyName="agequalifier" />
              <OptionControlledInput name="ageUnit" optionListName="ageUnits" />
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
                <OptionControlledInput
                  name="objectComponentName"
                  optionListName="objectComponentNames"
                />
                <TextInput name="objectComponentInformation" />
              </CompoundInput>
            </CompoundInput>
          </div>

          <div>
            <CompoundInput name="technicalAttributeGroupList">
              <CompoundInput name="technicalAttributeGroup" tabular repeating>
                <OptionControlledInput
                  name="technicalAttribute"
                  optionListName="technicalAttributes"
                />
                <OptionControlledInput
                  name="technicalAttributeMeasurement"
                  optionListName="technicalAttributeMeasurements"
                />
                <OptionControlledInput
                  name="technicalAttributeMeasurementUnit"
                  optionListName="technicalAttributeMeasurementUnits"
                />
              </CompoundInput>
            </CompoundInput>
          </div>
        </Row>

        <CompoundInput name="measuredPartGroupList">
          <CompoundInput name="measuredPartGroup" repeating>
            <Panel>
              <Row>
                <div>
                  <OptionControlledInput name="measuredPart" optionListName="measuredParts" />
                </div>

                <div>
                  <TextInput name="dimensionSummary" />
                </div>
              </Row>

              <CompoundInput name="dimensionSubGroupList">
                <CompoundInput name="dimensionSubGroup" tabular repeating>
                  <OptionControlledInput name="dimension" optionListName="dimensions" />
                  <AuthorityControlledInput
                    name="measuredBy"
                    authority={
                      'person/person,person/person_shared,organization/organization,' +
                      'organization/organization_shared'
                    }
                  />
                  <OptionControlledInput
                    name="measurementMethod"
                    optionListName="measurementMethods"
                  />
                  <TextInput name="value" />
                  <OptionControlledInput name="measurementUnit" optionListName="measurementUnits" />
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
                <VocabularyControlledInput
                  name="contentLanguage"
                  vocabularyName="languages"
                  repeating
                />
              </CompoundInput>

              <CompoundInput name="contentActivities">
                <TextInput name="contentActivity" repeating />
              </CompoundInput>

              <CompoundInput name="contentConcepts">
                <AuthorityControlledInput
                  name="contentConcept"
                  authority="concept/concept,concept/material_ca,concept/material_ca_shared"
                  repeating
                />
              </CompoundInput>

              <StructuredDateInput name="contentDate" />

              <CompoundInput name="contentPositions">
                <OptionControlledInput
                  name="contentPosition"
                  optionListName="positions"
                  repeating
                />
              </CompoundInput>

              <CompoundInput name="contentObjectGroupList">
                <CompoundInput name="contentObjectGroup" tabular repeating>
                  <TextInput name="contentObject" />
                  <OptionControlledInput
                    name="contentObjectType"
                    optionListName="contentObjectTypes"
                  />
                </CompoundInput>
              </CompoundInput>
            </div>

            <div>
              <CompoundInput name="contentPeoples">
                <TextInput name="contentPeople" repeating />
              </CompoundInput>

              <CompoundInput name="contentPersons">
                <AuthorityControlledInput
                  name="contentPerson"
                  authority="person/person,person/person_shared,person/ulan_pa"
                  repeating
                />
              </CompoundInput>

              <CompoundInput name="contentPlaces">
                <TextInput name="contentPlace" repeating />
              </CompoundInput>

              <CompoundInput name="contentScripts">
                <OptionControlledInput name="contentScript" optionListName="scripts" repeating />
              </CompoundInput>

              <CompoundInput name="contentOrganizations">
                <AuthorityControlledInput
                  name="contentOrganization"
                  authority={
                    'organization/organization,organization/organization_shared,' +
                    'organization/ulan_oa'
                  }
                  repeating
                />
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
                    <AuthorityControlledInput
                      name="inscriptionContentInscriber"
                      authority={
                        'person/person,organization/organization,' +
                        'organization/organization_shared'
                      }
                    />
                    <VocabularyControlledInput
                      name="inscriptionContentLanguage"
                      vocabularyName="languages"
                    />
                    <StructuredDateInput name="inscriptionContentDateGroup" />
                  </div>

                  <div>
                    <OptionControlledInput
                      name="inscriptionContentPosition"
                      optionListName="positions"
                    />
                    <OptionControlledInput
                      name="inscriptionContentScript"
                      optionListName="scripts"
                    />
                    <OptionControlledInput
                      name="inscriptionContentType"
                      optionListName="inscriptionTypes"
                    />
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
                    <AuthorityControlledInput
                      name="inscriptionDescriptionInscriber"
                      authority={
                        'person/person,person/person_shared,organization/organization,' +
                        'organization/organization_shared'
                      }
                    />
                    <StructuredDateInput name="inscriptionDescriptionDateGroup" />
                  </div>

                  <div>
                    <OptionControlledInput
                      name="inscriptionDescriptionPosition"
                      optionListName="positions"
                    />
                    <OptionControlledInput
                      name="inscriptionDescriptionType"
                      optionListName="inscriptionTypes"
                    />
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
              <TextInput name="objectProductionReason" multiline repeating />
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
                <AuthorityControlledInput
                  name="objectProductionPerson"
                  authority="person/person,person/person_shared"
                />
                <TextInput name="objectProductionPersonRole" />
              </CompoundInput>
            </CompoundInput>

            <CompoundInput name="objectProductionOrganizationGroupList">
              <CompoundInput name="objectProductionOrganizationGroup" tabular repeating>
                <AuthorityControlledInput
                  name="objectProductionOrganization"
                  authority="organization/organization,organization/organization_shared"
                />
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
                  <AuthorityControlledInput
                    name="assocConcept"
                    authority="concept/concept"
                  />
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
                  <AuthorityControlledInput
                    name="assocOrganization"
                    authority="organization/organization,organization/organization_shared"
                  />
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
                  <AuthorityControlledInput
                    name="assocPerson"
                    authority="person/person,person/person_shared"
                  />
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
                  <AuthorityControlledInput
                    name="assocEventOrganization"
                    authority="organization/organization,organization/organization_shared"
                    repeating
                  />
                </CompoundInput>

                <CompoundInput name="assocEventPeoples">
                  <TextInput name="assocEventPeople" repeating />
                </CompoundInput>

                <CompoundInput name="assocEventPersons">
                  <AuthorityControlledInput
                    name="assocEventPerson"
                    authority="person/person,person/person_shared"
                    repeating
                  />
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
              <AuthorityControlledInput
                name="owner"
                authority={
                  'person/person,person/person_shared,organization/organization,' +
                  'organization/organization_shared'
                }
                repeating
              />
            </CompoundInput>

            <CompoundInput name="ownershipDateGroupList">
              <StructuredDateInput name="ownershipDateGroup" repeating />
            </CompoundInput>
          </div>

          <div>
            <Row>
              <div>
                <OptionControlledInput
                  name="ownershipAccess"
                  optionListName="ownershipAccessLevels"
                />
              </div>

              <div>
                <OptionControlledInput
                  name="ownershipCategory"
                  optionListName="ownershipCategories"
                />
              </div>
            </Row>

            <TextInput name="ownershipPlace" />
          </div>
        </Row>

        <CompoundInput tabular msgkey="ownershipExchangeGroup">
          <OptionControlledInput
            name="ownershipExchangeMethod"
            optionListName="ownershipExchangeMethods"
          />
          <TextInput name="ownershipExchangeNote" />
          <VocabularyControlledInput
            name="ownershipExchangePriceCurrency"
            vocabularyName="currency"
          />
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
            <AuthorityControlledInput
              name="reference"
              authority="citation/citation,citation/citation_shared,citation/worldcat"
            />
            <TextInput name="referenceNote" />
          </CompoundInput>
        </CompoundInput>
      </Panel>

      <Panel name="collectPanel" collapsible collapsed>
        <Row>
          <div>
            <StructuredDateInput name="fieldCollectionDate" />

            <CompoundInput name="fieldCollectionMethods">
              <VocabularyControlledInput
                name="fieldCollectionMethod"
                vocabularyName="collectionmethod"
                repeating
              />
            </CompoundInput>

            <TextInput name="fieldCollectionNote" multiline />
            <TextInput name="fieldCollectionNumber" />
          </div>

          <div>
            <AuthorityControlledInput
              name="fieldCollectionPlace"
              authority="place/place,place/place_shared,place/tgn_place"
            />

            <CompoundInput name="fieldCollectionSources">
              <AuthorityControlledInput
                name="fieldCollectionSource"
                authority="person/person,person/person_shared"
                repeating
              />
            </CompoundInput>

            <CompoundInput name="fieldCollectors">
              <AuthorityControlledInput
                name="fieldCollector"
                authority={
                  'person/person,person/person_shared,organization/organization' +
                  'organization/organization_shared'
                }
                repeating
              />
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
