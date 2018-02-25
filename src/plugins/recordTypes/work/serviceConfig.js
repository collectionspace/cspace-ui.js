export default {
  serviceName: 'Works',
  servicePath: 'workauthorities',
  serviceType: 'authority',

  objectName: 'Workitem',
  documentName: 'works',

  quickAddData: values => ({
    document: {
      'ns2:works_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/work',
        workTermGroupList: {
          workTermGroup: [
            {
              termDisplayName: values.displayName,
            },
          ],
        },
      },
    },
  }),
};
