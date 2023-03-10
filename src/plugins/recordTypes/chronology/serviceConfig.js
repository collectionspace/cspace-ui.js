export default {
  serviceName: 'Chronologies',
  servicePath: 'chronologyauthorities',
  serviceType: 'authority',

  objectName: 'Chronology',
  documentName: 'chronologies',

  quickAddData: (values) => ({
    document: {
      'ns2:chronologies_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/chronology',
        chronologyTermGroupList: {
          chronologyTermGroup: [
            {
              termDisplayName: values.displayName,
            },
          ],
        },
      },
    },
  }),
};
