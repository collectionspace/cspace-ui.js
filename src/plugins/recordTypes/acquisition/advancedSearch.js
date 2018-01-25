export default (pluginContext) => {
  const {
    OP_OR,
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
  } = pluginContext.searchOperators;

  return {
    op: OP_OR,
    value: [
      {
        op: OP_CONTAIN,
        path: 'ns2:acquisitions_common/acquisitionReferenceNumber',
      },
      // {
      //   op: OP_RANGE,
      //   path: 'ns2:acquisitions_common/accessionDateGroup',
      // },
      // {
      //   op: OP_RANGE,
      //   path: 'ns2:acquisitions_common/acquisitionDateGroupList/acquisitionDateGroup',
      // },
      {
        op: OP_EQ,
        path: 'ns2:acquisitions_common/acquisitionMethod',
      },
      {
        op: OP_EQ,
        path: 'ns2:acquisitions_common/acquisitionSources/acquisitionSource',
      },
      {
        op: OP_EQ,
        path: 'ns2:acquisitions_common/acquisitionFundingList/acquisitionFunding/acquisitionFundingSource',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:acquisitions_common/creditLine',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:acquisitions_common/fieldCollectionEventNames/fieldCollectionEventName',
      },
      {
        op: OP_RANGE,
        path: 'ns2:collectionspace_core/updatedAt',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:collectionspace_core/updatedBy',
      },
    ],
  };
};
