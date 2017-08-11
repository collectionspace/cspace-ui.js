export default {
  serviceName: 'Concepts',
  servicePath: 'conceptauthorities',
  serviceType: 'authority',

  objectName: 'Conceptitem',

  documentName: 'concept',

  quickAddData: values => ({
    document: {
      '@name': 'concepts',
      'ns2:concepts_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/concept',
        conceptTermGroupList: {
          conceptTermGroup: {
            termDisplayName: values.displayName,
          },
        },
      },
    },
  }),
};
