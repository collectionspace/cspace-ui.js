export default (pluginContext) => {
  const {
    OP_OR,
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
  } = pluginContext.searchOperators;

  const {
    extensions,
  } = pluginContext.config;

  return {
    op: OP_OR,
    value: [
      {
        op: OP_CONTAIN,
        path: 'ns2:movements_common/movementReferenceNumber',
      },
      {
        op: OP_EQ,
        path: 'ns2:movements_common/normalLocation',
      },
      {
        op: OP_EQ,
        path: 'ns2:movements_common/currentLocation',
      },
      {
        op: OP_RANGE,
        path: 'ns2:movements_common/locationDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:movements_common/reasonForMove',
      },
      {
        op: OP_EQ,
        path: 'ns2:movements_common/movementMethods/movementMethod',
      },
      {
        op: OP_RANGE,
        path: 'ns2:movements_common/plannedRemovalDate',
      },
      {
        op: OP_RANGE,
        path: 'ns2:movements_common/removalDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:movements_common/movementContact',
      },
      {
        op: OP_EQ,
        path: 'ns2:movements_common/inventoryActionRequired',
      },
      {
        op: OP_EQ,
        path: 'ns2:movements_common/frequencyForInventory',
      },
      {
        op: OP_RANGE,
        path: 'ns2:movements_common/inventoryDate',
      },
      {
        op: OP_RANGE,
        path: 'ns2:movements_common/nextInventoryDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:movements_common/inventoryContactList/inventoryContact',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:movements_common/inventoryNote',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
