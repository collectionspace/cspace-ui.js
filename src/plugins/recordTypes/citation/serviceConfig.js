export default {
  serviceName: 'Citations',
  servicePath: 'citationauthorities',
  serviceType: 'authority',

  objectName: 'Citation',

  documentName: 'citation',

  quickAddData: values => ({
    document: {
      '@name': 'citations',
      'ns2:citations_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/citation',
        citationTermGroupList: {
          citationTermGroup: {
            termDisplayName: values.displayName,
          },
        },
      },
    },
  }),
};
