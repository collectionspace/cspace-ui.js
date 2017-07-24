import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  record: defineMessages({
    name: {
      id: 'record.conditioncheck.name',
      description: 'The name of the record type.',
      defaultMessage: 'Condition Check',
    },
    collectionName: {
      id: 'record.conditioncheck.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Condition Checks',
    },
  }),
  panel: defineMessages({
    objectConditionAndTechAssessmentInfo: {
      id: 'panel.conditioncheck.objectConditionAndTechAssessmentInfo',
      defaultMessage: 'Object Condition and Technical Assessment Information',
    },
    conditionCheckAndTechAssessmentInfo: {
      id: 'panel.conditioncheck.conditionCheckAndTechAssessmentInfo',
      defaultMessage: 'Condition Check Technical Assessment Information',
    },
    objectRequirementInfo: {
      id: 'panel.conditioncheck.objectRequirementInfo',
      defaultMessage: 'Object Requirement Information',
    },
  }),
};
