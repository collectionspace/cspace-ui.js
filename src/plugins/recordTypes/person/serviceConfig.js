export default {
  serviceName: 'Persons',
  servicePath: 'personauthorities',
  serviceType: 'authority',

  objectName: 'Person',

  documentName: 'persons',

  parts: {
    persons_common: 'http://collectionspace.org/services/person',
  },

  quickAddData: values => ({
    document: {
      '@name': 'persons',
      'ns2:persons_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/person',
        personTermGroupList: {
          personTermGroup: {
            termDisplayName: values.displayName,
          },
        },
      },
    },
  }),
};
