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
    InputTable,
    Field,
    Subrecord,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Field name="personTermGroupList">
          <Field name="personTermGroup">
            <Panel>
              <Row>
                <Field name="termDisplayName" />
                <Field name="termName" />
                <Field name="termQualifier" />
                <Field name="termStatus" />
              </Row>

              <Row>
                <Field name="termType" />
                <Field name="termFlag" />
                <Field name="termLanguage" />
                <Field name="termPrefForLang" />
              </Row>

              <InputTable name="nameDetail">
                <Field name="salutation" />
                <Field name="title" />
                <Field name="foreName" />
                <Field name="middleName" />
                <Field name="surName" />
                <Field name="nameAdditions" />
                <Field name="initials" />
              </InputTable>

              <InputTable name="termSource">
                <Field name="termSource" />
                <Field name="termSourceDetail" />
                <Field name="termSourceID" />
                <Field name="termSourceNote" />
              </InputTable>
            </Panel>
          </Field>
        </Field>

        <Row>
          <Col>
            <Field name="gender" />

            <Field name="occupations">
              <Field name="occupation" />
            </Field>

            <Field name="schoolsOrStyles">
              <Field name="schoolOrStyle" />
            </Field>

            <Field name="groups">
              <Field name="group" />
            </Field>

            <Field name="nationalities">
              <Field name="nationality" />
            </Field>
          </Col>
          <Col>
            <Field name="nameNote" />

            <Row>
              <Field name="birthDateGroup" />
              <Field name="birthPlace" />
            </Row>

            <Row>
              <Field name="deathDateGroup" />
              <Field name="deathPlace" />
            </Row>

            <Field name="bioNote" />
          </Col>
        </Row>
      </Panel>

      <Subrecord name="contact" />

      <Panel name="supplied" collapsible collapsed>
        <Field name="pronounGroupList">
          <Field name="pronounGroup">
            <Panel>
              <Row>
                <Field name="declinedToAnswerPronoun" />
                <Field name="suppliedPronouns">
                  <Field name="suppliedPronoun" />
                </Field>
                <Field name="useRestrictionPronoun" />
              </Row>
            </Panel>
          </Field>
        </Field>
        <Field name="genderGroupList">
          <Field name="genderGroup">
            <Panel>
              <Row>
                <Field name="declinedToAnswerGender" />
                <Field name="suppliedGenders">
                  <Field name="suppliedGender" />
                </Field>
                <Field name="useRestrictionGender" />
              </Row>
            </Panel>
          </Field>
        </Field>
        <Field name="raceGroupList">
          <Field name="raceGroup">
            <Panel>
              <Row>
                <Field name="declinedToAnswerRace" />
                <Field name="suppliedRaces">
                  <Field name="suppliedRace" />
                </Field>
                <Field name="useRestrictionRace" />
              </Row>
            </Panel>
          </Field>
        </Field>
        <Field name="ethnicityGroupList">
          <Field name="ethnicityGroup">
            <Panel>
              <Row>
                <Field name="declinedToAnswerEthnicity" />
                <Field name="suppliedEthnicities">
                  <Field name="suppliedEthnicity" />
                </Field>
                <Field name="useRestrictionEthnicity" />
              </Row>
            </Panel>
          </Field>
        </Field>
        <Field name="sexualityGroupList">
          <Field name="sexualityGroup">
            <Panel>
              <Row>
                <Field name="declinedToAnswerSexuality" />
                <Field name="suppliedSexualities">
                  <Field name="suppliedSexuality" />
                </Field>
                <Field name="useRestrictionSexuality" />
              </Row>
            </Panel>
          </Field>
        </Field>
        <Field name="birthPlaceGroupList">
          <Field name="birthPlaceGroup">
            <Panel>
              <Row>
                <Field name="declinedToAnswerBirthPlace" />
                <Field name="suppliedBirthPlace" />
                <Field name="useRestrictionBirthPlace" />
              </Row>
            </Panel>
          </Field>
        </Field>
        <Field name="suppliedBirthDateGroupList">
          <Field name="suppliedBirthDateGroup">
            <Panel>
              <Row>
                <Field name="declinedToAnswerBirthDate" />
                <Field name="suppliedStructuredBirthDateGroup" />
                <Field name="useRestrictionBirthDate" />
              </Row>
            </Panel>
          </Field>
        </Field>
        <Field name="otherGroupList">
          <Field name="otherGroup">
            <Panel>
              <Row>
                <Field name="informationAuthor" />
                <Field name="informationDate" />
                <Field name="informationUseRestriction" />
              </Row>
              <Field name="otherInformation" />
            </Panel>
          </Field>
        </Field>
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
      id: 'form.person.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
