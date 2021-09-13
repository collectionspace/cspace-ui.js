import { defineMessages } from 'react-intl';

export default () => ({
  listTypes: {
    audit: {
      listNodeName: 'ns3:audit_common_list',
      itemNodeName: 'audit-list-item',
      messages: defineMessages({
        resultCount: {
          id: 'list.common.resultCount',
          defaultMessage: `{totalItems, plural,
            =0 {No records}
            one {1 record}
            other {{startNum, number}–{endNum, number} of {totalItems, number} records}
          } found`,
        },
        searching: {
          id: 'list.common.searching',
          defaultMessage: 'Finding audit records...',
        },
      }),
      getItemLocationPath: () => null,
    },
  },
});
