export default {
  serviceName: 'CollectionObjects',
  servicePath: 'collectionobjects',
  serviceType: 'object',

  objectName: 'CollectionObject',

  documentName: 'collectionobjects',

  quickAddData: values => ({
    document: {
      '@name': 'collectionobjects',
      'ns2:collectionobjects_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/collectionobject',
        objectNumber: values.displayName,
      },
    },
  }),
};
