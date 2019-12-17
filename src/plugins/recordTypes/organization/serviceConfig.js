export default {
  serviceName: 'Organizations',
  servicePath: 'orgauthorities',
  serviceType: 'authority',

  objectName: 'Organization',
  documentName: 'organizations',

  quickAddData: (values) => ({
    document: {
      'ns2:organizations_common': {
        '@xmlns:ns2': 'http://collectionspace.org/services/organization',
        orgTermGroupList: {
          orgTermGroup: [
            {
              termDisplayName: values.displayName,
            },
          ],
        },
      },
    },
  }),
};
