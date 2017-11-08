export default () => () => ({
  recordTypes: {
    authrole: {
      serviceConfig: {
        servicePath: 'authorization/roles',
        serviceType: 'security',
      },
    },
  },
});
