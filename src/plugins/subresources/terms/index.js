import { defineMessages } from 'react-intl';
import columns from './columns';

export default () => ({
  subresources: {
    terms: {
      columns,
      listType: 'authRef',
      messages: defineMessages({
        collectionName: {
          id: 'subresource.terms.collectionName',
          description: 'The name of a collection of subresources of the type.',
          defaultMessage: 'Authority Terms Used by {record}',
        },
      }),
      serviceConfig: {
        servicePath: 'authorityrefs',
      },
    },
  },
});
