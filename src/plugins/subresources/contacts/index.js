export default () => ({
  subresources: {
    contacts: {
      listType: 'common',
      recordType: 'contact',
      serviceConfig: {
        servicePath: 'contacts',
      },
    },
  },
});
