import { defineMessages } from 'react-intl';

export default () => ({
  listTypes: {
    role: {
      listNodeName: 'ns2:roles_list',
      itemNodeName: 'role',
      messages: defineMessages({
        resultCount: {
          id: 'list.role.resultCount',
          defaultMessage: `{totalItems, plural,
            =0 {No roles}
            one {1 role}
            other {{startNum, number}–{endNum, number} of {totalItems, number} roles}
          } found`,
        },
        searching: {
          id: 'list.role.searching',
          defaultMessage: 'Finding roles...',
        },
      }),
      getItemLocationPath: (item) => {
        const csid = item.get('@csid');

        return `/admin/authrole/${csid}`;
      },
    },
  },
});
