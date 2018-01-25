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
        path: 'ns2:exhibitions_common/exhibitionNumber',
      },
      {
        op: OP_EQ,
        path: 'ns2:exhibitions_common/type',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:exhibitions_common/title',
      },
      {
        op: OP_EQ,
        path: 'ns2:exhibitions_common/sponsors/sponsor',
      },
      {
        op: OP_EQ,
        path: 'ns2:exhibitions_common/organizers/organizer',
      },
      {
        op: OP_EQ,
        path: 'ns2:exhibitions_common/venueGroupList/venueGroup/venue',
      },
      {
        op: OP_RANGE,
        path: 'ns2:exhibitions_common/venueGroupList/venueGroup/venueOpeningDate',
      },
      {
        op: OP_RANGE,
        path: 'ns2:exhibitions_common/venueGroupList/venueGroup/venueClosingDate',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:collectionspace_core/updatedBy',
      },
      {
        op: OP_RANGE,
        path: 'ns2:collectionspace_core/updatedAt',
      },
    ],
  };
};
