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
              <Field name="person" />
              <Field name="personType" />
              <Field name="personStructuredDateGroup" />
              <Field name="personCitations">
                <Field name="personCitation" />
              </Field>
            </Row>
            <Field name="personNote" />
          </Panel>
        </Field>
      </Field>

      <Field name="assocPeopleAuthGroupList">
        <Field name="assocPeopleAuthGroup">
          <Panel>
            <Row>
              <Field name="people" />
              <Field name="peopleType" />
              <Field name="peopleStructuredDateGroup" />
              <Field name="peopleCitations">
                <Field name="peopleCitation" />
              </Field>
            </Row>
            <Field name="peopleNote" />
          </Panel>
        </Field>
      </Field>

      <Field name="assocOrganizationAuthGroupList">
        <Field name="assocOrganizationAuthGroup">
          <Panel>
            <Row>
              <Field name="organization" />
              <Field name="organizationType" />
              <Field name="organizationStructuredDateGroup" />
              <Field name="organizationCitations">
                <Field name="organizationCitation" />
              </Field>
            </Row>
            <Field name="organizationNote" />
          </Panel>
        </Field>
      </Field>

      <Field name="assocConceptAuthGroupList">
        <Field name="assocConceptAuthGroup">
          <Panel>
            <Row>
              <Field name="concept" />
              <Field name="conceptType" />
              <Field name="conceptStructuredDateGroup" />
              <Field name="conceptCitations">
                <Field name="conceptCitation" />
              </Field>
            </Row>
            <Field name="conceptNote" />
          </Panel>
        </Field>
      </Field>

      <Field name="assocPlaceAuthGroupList">
        <Field name="assocPlaceAuthGroup">
          <Panel>
            <Row>
              <Field name="place" />
              <Field name="placeType" />
              <Field name="placeStructuredDateGroup" />
              <Field name="placeCitations">
                <Field name="placeCitation" />
              </Field>
            </Row>
            <Field name="placeNote" />
          </Panel>
        </Field>
      </Field>

      <Field name="assocChronologyAuthGroupList">
        <Field name="assocChronologyAuthGroup">
          <Panel>
            <Row>
              <Field name="chronology" />
              <Field name="chronologyType" />
              <Field name="chronologyStructuredDateGroup" />
              <Field name="chronologyCitations">
                <Field name="chronologyCitation" />
              </Field>
            </Row>
            <Field name="chronologyNote" />
          </Panel>
        </Field>
      </Field>
    </>
  );
};
