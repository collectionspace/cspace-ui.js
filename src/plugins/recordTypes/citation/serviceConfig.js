export default {
  serviceName: 'Citations',
  servicePath: 'citationauthorities',
  serviceType: 'authority',

  objectName: 'Citation',
  documentName: 'citations',

  quickAddData: (values) => ({
    document: {
      'ns2:citations_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/citation',
        citationTermGroupList: {
          citationTermGroup: [
            {
              termDisplayName: values.displayName,
            },
          ],
        },
      },
    },
  }),
};
