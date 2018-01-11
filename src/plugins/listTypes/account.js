import { defineMessages } from 'react-intl';

export default () => ({
  listTypes: {
    account: {
      listNodeName: 'ns3:accounts-common-list',
      itemNodeName: 'account-list-item',
      messages: defineMessages({
        resultCount: {
          id: 'list.account.resultCount',
          defaultMessage: `{totalItems, plural,
            =0 {No users}
            one {1 user}
            other {{startNum}–{endNum} of {totalItems} users}
          } found`,
        },
        searching: {
          id: 'list.account.searching',
          defaultMessage: 'Finding users...',
        },
      }),
      getItemLocationPath: (item) => {
        const csid = item.get('csid');

        return `/admin/account/${csid}`;
      },
    },
  },
});
