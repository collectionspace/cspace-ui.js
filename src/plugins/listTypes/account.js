import { defineMessages } from 'react-intl';

export default () => ({
  listTypes: {
    account: {
      listNodeName: 'ns2:accounts-common-list',
      itemNodeName: 'account-list-item',
      messages: defineMessages({
        resultCount: {
          id: 'list.account.resultCount',
          defaultMessage: `{totalItems, plural,
            =0 {No users}
            one {1 user}
            other {{startNum, number}–{endNum, number} of {totalItems, number} users}
          } found`,
        },
        searching: {
          id: 'list.account.searching',
          defaultMessage: 'Finding users...',
        },
      }),
      normalizeListData: (data, listTypeConfig) => {
        // Make namespace prefixes consistent. accounts-common-list is sometimes ns2 and sometimes
        // ns3. The other prefix is used for jaxb, but it's not needed.

        const [listNodeNsPrefix, listNodeName] = listTypeConfig.listNodeName.split(':', 2);
        const [rootNodeFullName, rootNodeData] = data.entrySeq().first();
        const [rootNodeNsPrefix, rootNodeName] = rootNodeFullName.split(':', 2);

        if (rootNodeName === listNodeName && rootNodeNsPrefix !== listNodeNsPrefix) {
          const rootNodeNsUri = rootNodeData.get(`@xmlns:${rootNodeNsPrefix}`);

          const updatedRootNodeData = rootNodeData
            .delete(`@xmlns:${rootNodeNsPrefix}`)
            .set(`@xmlns:${listNodeNsPrefix}`, rootNodeNsUri);

          const updatedData = data
            .delete(`${rootNodeNsPrefix}:${rootNodeName}`)
            .set(`${listNodeNsPrefix}:${listNodeName}`, updatedRootNodeData);

          return updatedData;
        }

        return data;
      },
      getItemLocationPath: (item) => {
        const csid = item.get('csid');

        return `/admin/account/${csid}`;
      },
    },
  },
});
