export default {
  serviceName: 'Locations',
  servicePath: 'locationauthorities',
  serviceType: 'authority',

  objectName: 'Locationitem',
  documentName: 'locations',

  quickAddData: values => ({
    document: {
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
