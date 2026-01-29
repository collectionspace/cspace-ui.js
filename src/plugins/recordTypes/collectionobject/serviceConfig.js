export default {
  serviceName: 'CollectionObjects',
  servicePath: 'collectionobjects',
  serviceType: 'object',

  objectName: 'CollectionObject',
  documentName: 'collectionobjects',

  features: {
    updatedSearch: true,
  },

  quickAddData: (values) => ({
    document: {
      'ns2:collectionobjects_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/collectionobject',
        objectNumber: values.displayName,
      },
    },
  }),
};
