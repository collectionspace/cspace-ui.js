import { defineMessages } from 'react-intl';

export default {
  workTermStatuses: {
    values: [
      'quickaddedneedsattention',
      'inprogress',
      'complete',
    ],
    messages: defineMessages({
      quickaddedneedsattention: {
        id: 'option.workTermStatuses.quickaddedneedsattention',
        defaultMessage: 'quick added, needs attention',
      },
      inprogress: {
        id: 'option.workTermStatuses.inprogress',
        defaultMessage: 'in progress',
      },
      complete: {
        id: 'option.workTermStatuses.complete',
        defaultMessage: 'complete',
      },
    }),
  },
};
