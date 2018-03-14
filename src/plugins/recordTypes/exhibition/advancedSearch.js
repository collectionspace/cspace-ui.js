export default (configContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
  } = configContext.searchOperators;

  const {
    defaultAdvancedSearchBooleanOp,
    extensions,
  } = configContext.config;

  return {
    op: defaultAdvancedSearchBooleanOp,
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
      ...extensions.core.advancedSearch,
    ],
  };
};
