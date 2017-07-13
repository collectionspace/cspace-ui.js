import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  objectAuditCategory: {
    values: [
      'low',
      'medium',
      'high',
    ],
    messages: defineMessages({
      low: {
        id: 'option.objectAuditCategory.low',
        defaultMessage: 'low',
      },
      medium: {
        id: 'option.objectAuditCategory.medium',
        defaultMessage: 'medium',
      },
      high: {
        id: 'option.objectAuditCategory.high',
        defaultMessage: 'high',
      },
    }),
  },
  completeness: {
    values: [
      'complete',
      'fragmented',
      'incomplete',
    ],
    messages: defineMessages({
      complete: {
        id: 'option.completeness.complete',
        defaultMessage: 'complete',
      },
      fragmented: {
        id: 'option.completeness.fragmented',
        defaultMessage: 'fragmented',
      },
      incomplete: {
        id: 'option.completeness.incomplete',
        defaultMessage: 'incomplete',
      },
    }),
  },
  condition: {
    values: [
      'needs-no-work',
      'exhibitable-needs-work',
      'not-exhibitable-stable',
      'in-jeopardy',
    ],
    messages: defineMessages({
      'needs-no-work': {
        id: 'option.condition.needs-no-work',
        defaultMessage: 'needs no work',
      },
      'exhibitable-needs-work': {
        id: 'option.condition.exhibitable-needs-work',
        defaultMessage: 'exhibitable / needs work',
      },
      'not-exhibitable-stable': {
        id: 'option.condition.not-exhibitable-stable',
        defaultMessage: 'not exhibitable / stable',
      },
      'in-jeopardy': {
        id: 'option.condition.in-jeopardy',
        defaultMessage: 'in jeopardy',
      },
    }),
  },
  conservationTreatmentPriority: {
    values: [
      'low',
      'medium',
      'high',
    ],
    messages: defineMessages({
      low: {
        id: 'option.conservationTreatmentPriority.low',
        defaultMessage: 'low',
      },
      medium: {
        id: 'option.conservationTreatmentPriority.medium',
        defaultMessage: 'medium',
      },
      high: {
        id: 'option.conservationTreatmentPriority.high',
        defaultMessage: 'high',
      },
    }),
  },
  hazard: {
    values: [
      'poisonous',
      'radioactive',
    ],
    messages: defineMessages({
      poisonous: {
        id: 'option.hazard.poisonous',
        defaultMessage: 'poisonous',
      },
      radioactive: {
        id: 'option.hazard.radioactive',
        defaultMessage: 'radioactive',
      },
    }),
  },
  conditionCheckMethod: {
    values: [
      'observed',
      'x-rayed',
    ],
    messages: defineMessages({
      observed: {
        id: 'option.conditionCheckMethod.observed',
        defaultMessage: 'observed',
      },
      'x-rayed': {
        id: 'option.conditionCheckMethod.x-rayed',
        defaultMessage: 'x-rayed',
      },
    }),
  },
  conditionCheckReason: {
    values: [
      'conservation',
      'damaged-in-transit',
      'loan-in',
      'new-acquisition',
    ],
    messages: defineMessages({
      conservation: {
        id: 'option.conditionCheckReason.conservation',
        defaultMessage: 'conservation',
      },
      'damaged-in-transit': {
        id: 'option.conditionCheckReason.damaged-in-transit',
        defaultMessage: 'damaged in transit',
      },
      'loan-in': {
        id: 'option.conditionCheckReason.loan-in',
        defaultMessage: 'loan in',
      },
      'new-acquisition': {
        id: 'option.conditionCheckReason.new-acquisition',
        defaultMessage: 'new acquisition',
      },
    }),
  },
  salvagePriorityCode: {
    values: [
      'low',
      'medium',
      'high',
    ],
    messages: defineMessages({
      low: {
        id: 'option.salvagePriorityCode.low',
        defaultMessage: 'low',
      },
      medium: {
        id: 'option.salvagePriorityCode.medium',
        defaultMessage: 'medium',
      },
      high: {
        id: 'option.salvagePriorityCode.high',
        defaultMessage: 'high',
      },
    }),
  },

};
