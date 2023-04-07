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
      <Field name="personGroupList">
        <Field name="personGroup">
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

      <Field name="peopleGroupList">
        <Field name="peopleGroup">
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

      <Field name="organizationGroupList">
        <Field name="organizationGroup">
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

      <Field name="conceptGroupList">
        <Field name="conceptGroup">
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

      <Field name="placeGroupList">
        <Field name="placeGroup">
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

      <Field name="relatedPeriodGroupList">
        <Field name="relatedPeriodGroup">
          <Panel>
            <Row>
              <Field name="relatedPeriod" />
              <Field name="relatedPeriodType" />
              <Field name="relatedPeriodStructuredDateGroup" />
              <Field name="relatedPeriodCitations">
                <Field name="relatedPeriodCitation" />
              </Field>
              <Field name="relatedPeriodNote" />
            </Row>
          </Panel>
        </Field>
      </Field>
    </>
  );
};
