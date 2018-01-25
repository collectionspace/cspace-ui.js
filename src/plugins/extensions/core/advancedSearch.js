export default (pluginContext) => {
  const {
    OP_CONTAIN,
    OP_RANGE,
  } = pluginContext.searchOperators;

  return [
    {
      op: OP_CONTAIN,
      path: 'ns2:collectionspace_core/updatedBy',
    },
    {
      op: OP_RANGE,
      path: 'ns2:collectionspace_core/updatedAt',
    },
  ];
};
