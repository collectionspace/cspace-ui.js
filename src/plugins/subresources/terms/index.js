import { defineMessages } from 'react-intl';
import columns from './columns';

export default () => ({
  subresources: {
    terms: {
      columns,
      messages: defineMessages({
        collectionName: {
          id: 'subresource.terms.collectionName',
          description: 'The name of the subresource when used as a title describing search results.',
          defaultMessage: 'Authority Terms Used by {record}',
        },
      }),
      serviceConfig: {
        servicePath: 'authorityrefs',
      },
    },
  },
});
