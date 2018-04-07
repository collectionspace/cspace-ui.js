import { defineMessages } from 'react-intl';

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
    conditionCheckAndTechAssessmentInfo: {
      id: 'panel.conditioncheck.conditionCheckAndTechAssessmentInfo',
      defaultMessage: 'Condition Check/Technical Assessment Information',
    },
    objectConditionAndTechAssessmentInfo: {
      id: 'panel.conditioncheck.objectConditionAndTechAssessmentInfo',
      defaultMessage: 'Object Condition Information',
    },
    objectRequirementInfo: {
      id: 'panel.conditioncheck.objectRequirementInfo',
      defaultMessage: 'Object Recommendation/Requirement Information',
    },
  }),
};
