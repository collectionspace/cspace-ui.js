export default {
  serviceName: 'Taxon',
  servicePath: 'taxonomyauthority',
  serviceType: 'authority',

  objectName: 'Taxon',
  documentName: 'taxon',

  quickAddData: values => ({
    document: {
      'ns2:taxon_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/taxonomy',
        taxonTermGroupList: {
          taxonTermGroup: [
            {
              termDisplayName: values.displayName,
            },
          ],
        },
      },
    },
  }),
};
