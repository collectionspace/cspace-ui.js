import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.transport.name',
      description: 'The name of the record type',
      defaultMessage: 'Transport',
    },
    collectionName: {
      id: 'record.transport.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Transports',
    },
  }),
  inputTable: defineMessages({
    transporter: {
      id: 'inputTable.transport.transporter',
      defaultMessage: 'Transporter',
    },
    authorization: {
      id: 'inputTable.transport.authorization',
      defaultMessage: 'Authorization',
    },
    departure: {
      id: 'inputTable.transport.departure',
      defaultMessage: 'Departure',
    },
    arrival: {
      id: 'inputTable.transport.arrival',
      defaultMessage: 'Arrival',
    },
    finalShippingCost: {
      id: 'inputTable.transport.finalShippingCost',
      defaultMessage: 'Final shipping cost',
    },
    customsBroker: {
      id: 'inputTable.transport.customsBroker',
      defaultMessage: 'Customs broker',
    },
    customsDeclaredValue: {
      id: 'inputTable.transport.customsDeclaredValue',
      defaultMessage: 'Declared value for customs',
    },
    customsFee: {
      id: 'inputTable.transport.customsFee',
      defaultMessage: 'Customs fee',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.transport.info',
      defaultMessage: 'Transport Information',
    },
    cost: {
      id: 'panel.transport.cost',
      defaultMessage: 'Cost Information',
    },
  }),
};
