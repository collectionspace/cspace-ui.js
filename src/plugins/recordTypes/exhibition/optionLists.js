import { defineMessages } from 'react-intl';

export default {
  exhibitionConsTreatmentStatuses: {
    values: [
      'Needed',
      'Not needed',
      'Done',
    ],
    messages: defineMessages({
      Needed: {
        id: 'option.exhibitionConsTreatmentStatuses.Needed',
        defaultMessage: 'needed',
      },
      'Not needed': {
        id: 'option.exhibitionConsTreatmentStatuses.Not needed',
        defaultMessage: 'not needed',
      },
      Done: {
        id: 'option.exhibitionConsTreatmentStatuses.Done',
        defaultMessage: 'done',
      },
    }),
  },
  exhibitionMountStatuses: {
    values: [
      'Needed',
      'Not needed',
      'Done',
    ],
    messages: defineMessages({
      Needed: {
        id: 'option.exhibitionMountStatuses.Needed',
        defaultMessage: 'needed',
      },
      'Not needed': {
        id: 'option.exhibitionMountStatuses.Not needed',
        defaultMessage: 'not needed',
      },
      Done: {
        id: 'option.exhibitionMountStatuses.Done',
        defaultMessage: 'done',
      },
    }),
  },
};
