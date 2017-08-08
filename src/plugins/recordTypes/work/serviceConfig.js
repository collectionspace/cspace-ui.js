export default {
  serviceName: 'Works',
  servicePath: 'workauthorities',
  serviceType: 'authority',

  objectName: 'Workitem',

  documentName: 'work',

  quickAddData: values => ({
    document: {
      '@name': 'works',
      'ns2:works_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/work',
        workTermGroupList: {
          workTermGroup: {
            termDisplayName: values.displayName,
          },
        },
      },
    },
  }),
};
