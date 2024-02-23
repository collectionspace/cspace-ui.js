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
  } = layoutComponents;

  const {
    Field,
  } = recordComponents;

  return (
    <>
      <Field name="assocPersonAuthGroupList">
        <Field name="assocPersonAuthGroup">
          <Panel>
            <Row>
              <Field name="assocPerson" />
              <Field name="assocPersonType" />
              <Field name="assocPersonStructuredDateGroup" />
              <Field name="assocPersonCitations">
                <Field name="assocPersonCitation" />
              </Field>
            </Row>
            <Field name="assocPersonNote" />
          </Panel>
        </Field>
      </Field>

      <Field name="assocPeopleAuthGroupList">
        <Field name="assocPeopleAuthGroup">
          <Panel>
            <Row>
              <Field name="assocPeople" />
              <Field name="assocPeopleType" />
              <Field name="assocPeopleStructuredDateGroup" />
              <Field name="assocPeopleCitations">
                <Field name="assocPeopleCitation" />
              </Field>
            </Row>
            <Field name="assocPeopleNote" />
          </Panel>
        </Field>
      </Field>

      <Field name="assocOrganizationAuthGroupList">
        <Field name="assocOrganizationAuthGroup">
          <Panel>
            <Row>
              <Field name="assocOrganization" />
              <Field name="assocOrganizationType" />
              <Field name="assocOrganizationStructuredDateGroup" />
              <Field name="assocOrganizationCitations">
                <Field name="assocOrganizationCitation" />
              </Field>
            </Row>
            <Field name="assocOrganizationNote" />
          </Panel>
        </Field>
      </Field>

      <Field name="assocConceptAuthGroupList">
        <Field name="assocConceptAuthGroup">
          <Panel>
            <Row>
              <Field name="assocConcept" />
              <Field name="assocConceptType" />
              <Field name="assocConceptStructuredDateGroup" />
              <Field name="assocConceptCitations">
                <Field name="assocConceptCitation" />
              </Field>
            </Row>
            <Field name="assocConceptNote" />
          </Panel>
        </Field>
      </Field>

      <Field name="assocPlaceAuthGroupList">
        <Field name="assocPlaceAuthGroup">
          <Panel>
            <Row>
              <Field name="assocPlace" />
              <Field name="assocPlaceType" />
              <Field name="assocPlaceStructuredDateGroup" />
              <Field name="assocPlaceCitations">
                <Field name="assocPlaceCitation" />
              </Field>
            </Row>
            <Field name="assocPlaceNote" />
          </Panel>
        </Field>
      </Field>

      <Field name="assocChronologyAuthGroupList">
        <Field name="assocChronologyAuthGroup">
          <Panel>
            <Row>
              <Field name="assocChronology" />
              <Field name="assocChronologyType" />
              <Field name="assocChronologyStructuredDateGroup" />
              <Field name="assocChronologyCitations">
                <Field name="assocChronologyCitation" />
              </Field>
            </Row>
            <Field name="assocChronologyNote" />
          </Panel>
        </Field>
      </Field>
    </>
  );
};
