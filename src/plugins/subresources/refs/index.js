import { defineMessages } from 'react-intl';
import columns from './columns';

export default () => ({
  subresources: {
    refs: {
      columns,
      listType: 'refDoc',
      messages: defineMessages({
        collectionName: {
          id: 'subresource.refs.collectionName',
          description: 'The name of a collection of subresources of the type.',
          defaultMessage: 'Uses of {record}',
        },
      }),
      serviceConfig: {
        servicePath: 'refObjs',
      },
    },
  },
});
