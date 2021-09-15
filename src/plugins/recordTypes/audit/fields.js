import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    DATA_TYPE_DATETIME,
  } = configContext.dataTypes;

  const {
    configKey: config,
  } = configContext.configHelpers;

  return {
    'ns3:audit_common': {
      [config]: {
        service: {
          ns: 'http://collectionspace.org/services/audit',
        },
      },
      csid: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.csid.name',
              defaultMessage: 'CSID',
            },
          }),
        },
      },
      idNumber: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.idNumber.name',
              defaultMessage: 'Id Number',
            },
          }),
        },
      },
      resourceType: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.resourceType.name',
              defaultMessage: 'Resource type',
            },
          }),
        },
      },
      resourceCSID: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.resourceCSID.name',
              defaultMessage: 'Resource CSID',
            },
          }),
        },
      },
      eventType: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.eventType.name',
              defaultMessage: 'Event type',
            },
          }),
        },
      },
      principal: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.principal.name',
              defaultMessage: 'Principal',
            },
          }),
        },
      },
      eventDate: {
        [config]: {
          dataType: DATA_TYPE_DATETIME,
          messages: defineMessages({
            name: {
              id: 'field.audit_common.eventDate.name',
              defaultMessage: 'Event date',
            },
          }),
        },
      },
    },
  };
};
