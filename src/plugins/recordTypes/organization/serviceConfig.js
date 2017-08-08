export default {
  serviceName: 'Organizations',
  servicePath: 'orgauthorities',
  serviceType: 'authority',

  objectName: 'Organization',

  documentName: 'organization',

  quickAddData: values => ({
    document: {
      '@name': 'organizations',
      'ns2:organizations_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/organization',
        orgTermGroupList: {
          orgTermGroup: {
            termDisplayName: values.displayName,
          },
        },
      },
    },
  }),
};
