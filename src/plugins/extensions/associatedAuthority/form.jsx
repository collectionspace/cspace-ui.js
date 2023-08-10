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
              <Field name="personNote" />
            </Row>
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
              <Field name="peopleNote" />
            </Row>
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
              <Field name="organizationNote" />
            </Row>
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
              <Field name="conceptNote" />
            </Row>
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
              <Field name="placeNote" />
            </Row>
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
              <Field name="chronologyNote" />
            </Row>
          </Panel>
        </Field>
      </Field>
    </>
  );
};
