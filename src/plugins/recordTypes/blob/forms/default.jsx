import { defineMessages } from 'react-intl';

export default () => ({
  messages: defineMessages({
    name: {
      id: 'form.blob.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  sortOrder: 0,
  template: (data) => {
    if (!data) {
      return null;
    }

    const document = data.get('document');

    if (!document) {
      return null;
    }

    // Show the view template if this is an existing record, or the upload template if new.
    return (document.getIn(['ns2:collectionspace_core', 'uri']) ? 'view' : 'upload');
  },
});
