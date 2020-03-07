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
        path: 'ns2:intakes_common/entryNumber',
      },
      {
        op: OP_RANGE,
        path: 'ns2:intakes_common/entryDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:intakes_common/entryReason',
      },
      {
        op: OP_EQ,
        path: 'ns2:intakes_common/entryMethods/entryMethod',
      },
      {
        op: OP_RANGE,
        path: 'ns2:intakes_common/returnDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:intakes_common/currentOwners/currentOwner',
      },
      {
        op: OP_EQ,
        path: 'ns2:intakes_common/depositorGroupList/depositorGroup/depositor',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:intakes_common/fieldCollectionEventNames/fieldCollectionEventName',
      },
      {
        op: OP_EQ,
        path: 'ns2:intakes_common/currentLocationGroupList/currentLocationGroup/currentLocation',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
