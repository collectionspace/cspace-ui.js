export default (pluginContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
  } = pluginContext.searchOperators;

  const {
    defaultAdvancedSearchBooleanOp,
    extensions,
  } = pluginContext.config;

  return {
    op: defaultAdvancedSearchBooleanOp,
    value: [
      {
        op: OP_CONTAIN,
        path: 'ns2:conservation_common/conservationNumber',
      },
      {
        op: OP_EQ,
        path: 'ns2:conservation_common/conservationStatusGroupList/conservationStatusGroup/status',
      },
      {
        op: OP_EQ,
        path: 'ns2:conservation_common/treatmentPurpose',
      },
      {
        op: OP_EQ,
        path: 'ns2:conservation_common/conservators/conservator',
      },
      {
        op: OP_EQ,
        path: 'ns2:conservation_common/approvedBy',
      },
      {
        op: OP_RANGE,
        path: 'ns2:conservation_common/approvedDate',
      },
      {
        op: OP_RANGE,
        path: 'ns2:conservation_common/treatmentStartDate',
      },
      {
        op: OP_RANGE,
        path: 'ns2:conservation_common/treatmentEndDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:conservation_common/researcher',
      },
      {
        op: OP_RANGE,
        path: 'ns2:conservation_common/proposedAnalysisDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:conservation_common/destAnalysisGroupList/destAnalysisGroup/sampleBy',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
