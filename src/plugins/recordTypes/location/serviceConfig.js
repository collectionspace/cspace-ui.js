export default {
  serviceName: 'Locations',
  servicePath: 'locationauthorities',
  serviceType: 'authority',

  objectName: 'Location',

  documentName: 'location',

  quickAddData: values => ({
    document: {
      '@name': 'locations',
      'ns2:locations_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/location',
        locTermGroupList: {
          locTermGroup: {
            termDisplayName: values.displayName,
          },
        },
      },
    },
  }),
};
