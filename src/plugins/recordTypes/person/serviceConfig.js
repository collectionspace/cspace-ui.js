export default {
  serviceName: 'Persons',
  servicePath: 'personauthorities',
  serviceType: 'authority',

  objectName: 'Person',
  documentName: 'persons',

  quickAddData: (values) => ({
    document: {
      'ns2:persons_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/person',
        personTermGroupList: {
          personTermGroup: [
            {
              termDisplayName: values.displayName,
            },
          ],
        },
      },
    },
  }),
};
