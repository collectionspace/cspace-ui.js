import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
  } = configContext.inputComponents;

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
      saveMessage: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.saveMessage.name',
              defaultMessage: 'Save message',
            },
          }),
        },
      },
      eventComment: {
        [config]: {
          messages: {
            name: {
              id: 'field.audit_common.eventComment.name',
              defaultMessage: 'Event comment',
            },
          },
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
      fieldChangedGroupList: {
        [config]: {
          view: {
            type: CompoundInput,
          },
        },
        fieldChangedGroup: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.audit_common.fieldChangedGroup.name',
                defaultMessage: 'Field changed',
              },
            }),
          },
          key: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.audit_common.key.name',
                  defaultMessage: 'Key',
                },
              }),
            },
          },
          fieldName: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.audit_common.fieldName.name',
                  defaultMessage: 'Field name',
                },
              }),
            },
          },
          originalValue: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.audit_common.originalValue.name',
                  defaultMessage: 'Original value',
                },
              }),
            },
          },
          newValue: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.audit_common.newValue.name',
                  defaultMessage: 'New value',
                },
              }),
            },
          },
          changeReason: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.audit_common.changeReason.name',
                  defaultMessage: 'Change reason',
                },
              }),
            },
          },
        },
      },
    },
  };
};
