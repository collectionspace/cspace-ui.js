import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.iterationreport.name',
      description: 'The name of the record type.',
      defaultMessage: 'Iteration Report',
    },
    collectionName: {
      id: 'record.iterationreport.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Iteration Reports',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.iterationreport.info',
      defaultMessage: 'Iteration Information',
    },
    space: {
      id: 'panel.iterationreport.space',
      defaultMessage: 'Space Information',
    },
    details: {
      id: 'panel.iterationreport.details',
      defaultMessage: 'Iteration Details',
    },
    evaluation: {
      id: 'panel.iterationreport.evaluation',
      defaultMessage: 'Iteration Evaluation',
    },
  }),
};
