import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.movement.name',
      description: 'The name of the record type.',
      defaultMessage: 'Location/Movement/Inventory',
    },
    collectionName: {
      id: 'record.movement.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Location/Movement/Inventory',
    },
  }),
  panel: defineMessages({
    location: {
      id: 'panel.movement.location',
      defaultMessage: 'Object Location Information',
    },
    movement: {
      id: 'panel.movement.movement',
      defaultMessage: 'Movement Information',
    },
    inventory: {
      id: 'panel.movement.inventory',
      defaultMessage: 'Inventory Information',
    },
  }),
  inputTable: defineMessages({
    currentLocation: {
      id: 'inputTable.movement.currentLocation',
      defaultMessage: 'Current location',
    },
  }),
};
