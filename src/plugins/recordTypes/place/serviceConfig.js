export default {
  serviceName: 'Places',
  servicePath: 'placeauthorities',
  serviceType: 'authority',

  objectName: 'Placeitem',

  documentName: 'place',

  quickAddData: values => ({
    document: {
      '@name': 'places',
      'ns2:places_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/place',
        placeTermGroupList: {
          placeTermGroup: {
            termDisplayName: values.displayName,
          },
        },
      },
    },
  }),
};
