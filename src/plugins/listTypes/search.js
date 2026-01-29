import { defineMessages } from 'react-intl';

export default () => ({
  listTypes: {
    search: {
      listNodeName: 'ns3:advancedsearch-common-list',
      itemNodeName: 'advancedsearch-list-item',
      messages: defineMessages({
        resultCount: {
          id: 'list.search.resultCount',
          defaultMessage: `{totalItems, plural,
            =0 {No records}
            one {1 record}
            other {{startNum, number}–{endNum, number} of {totalItems, number} records}
          } found`,
        },
        searching: {
          id: 'list.search.searching',
          defaultMessage: 'Finding records...',
        },
      }),
      getItemLocationPath: (item) => `/record/collectionobject/${item.get('csid')}`,
    },
  },
});
