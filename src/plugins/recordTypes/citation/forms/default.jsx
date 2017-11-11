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
    InputTable,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="info" collapsible>
        <Field name="citationTermGroupList">
          <Field name="citationTermGroup">
            <Panel>
              <Row>
                <Field name="termDisplayName" />
                <Field name="termStatus" />
              </Row>

              <Row>
                <Field name="termType" />
                <Field name="termFlag" />
                <Field name="termLanguage" />
                <Field name="termPrefForLang" />
              </Row>

              <Field name="termFullCitation" />
              <Field name="termTitle" />
              <Field name="termSubTitle" />

              <Row>
                <Field name="termSectionTitle" />
                <Field name="termVolume" />
                <Field name="termIssue" />
              </Row>

              <InputTable name="termSource">
                <Field name="termSource" />
                <Field name="termSourceDetail" />
                <Field name="termSourceID" />
                <Field name="termSourceNote" />
              </InputTable>
            </Panel>
          </Field>
        </Field>

        <Field name="citationPublicationInfoGroupList">
          <Field name="citationPublicationInfoGroup">
            <Field name="publisher" />
            <Field name="publicationPlace" />
            <Field name="publicationDate" />
            <Field name="edition" />
            <Field name="pages" />
          </Field>
        </Field>

        <Field name="citationAgentInfoGroupList">
          <Field name="citationAgentInfoGroup">
            <Field name="agent" />
            <Field name="role" />
            <Field name="note" />
          </Field>
        </Field>

        <Field name="citationNote" />

        <Field name="citationResourceIdentGroupList">
          <Field name="citationResourceIdentGroup">
            <Field name="resourceIdent" />
            <Field name="type" />
            <Field name="captureDate" />
          </Field>
        </Field>

        <Field name="citationRelatedTermsGroupList">
          <Field name="citationRelatedTermsGroup">
            <Field name="relatedTerm" />
            <Field name="relationType" />
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
      id: 'form.citation.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(pluginContext),
});
