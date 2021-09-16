import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    DateInput,
    TextInput,
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
        view: {
          type: CompoundInput,
        },
      },
      csid: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.csid.name',
              defaultMessage: 'Audit record identifier',
            },
          }),
          view: {
            type: TextInput,
            props: {
              readOnly: true,
            },
          },
        },
      },
      idNumber: {
        [config]: {
          messages: defineMessages({
            fullName: {
              id: 'field.audit_common.idNumber.fullName',
              defaultMessage: 'Audit record id',
            },
            name: {
              id: 'field.audit_common.idNumber.name',
              defaultMessage: 'Id',
            },
          }),
          view: {
            type: TextInput,
            props: {
              readOnly: true,
            },
          },
        },
      },
      resourceType: {
        [config]: {
          messages: defineMessages({
            fullName: {
              id: 'field.audit_common.resourceType.fullName',
              defaultMessage: 'Related record type',
            },
            name: {
              id: 'field.audit_common.resourceType.name',
              defaultMessage: 'Record type',
            },
          }),
          view: {
            type: TextInput,
            props: {
              readOnly: true,
            },
          },
        },
      },
      resourceCSID: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.resourceCSID.name',
              defaultMessage: 'Audited record identifier',
            },
          }),
          view: {
            type: TextInput,
            props: {
              readOnly: true,
            },
          },
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
          view: {
            type: TextInput,
            props: {
              readOnly: true,
            },
          },
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
          view: {
            type: TextInput,
            props: {
              readOnly: true,
            },
          },
        },
      },
      eventType: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.eventType.name',
              defaultMessage: 'Audit event type',
            },
          }),
          view: {
            type: TextInput,
            props: {
              readOnly: true,
            },
          },
        },
      },
      principal: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.audit_common.principal.name',
              defaultMessage: 'Updated by',
            },
          }),
          view: {
            type: TextInput,
            props: {
              readOnly: true,
            },
          },
        },
      },
      eventDate: {
        [config]: {
          dataType: DATA_TYPE_DATETIME,
          messages: defineMessages({
            name: {
              id: 'field.audit_common.eventDate.name',
              defaultMessage: 'Updated at',
            },
          }),
          view: {
            type: DateInput,
            props: {
              readOnly: true,
            },
          },
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
            repeating: true,
            view: {
              type: CompoundInput,
            },
          },
          key: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.audit_common.key.name',
                  defaultMessage: 'Key',
                },
              }),
              view: {
                type: TextInput,
                props: {
                  readOnly: true,
                },
              },
            },
          },
          fieldName: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.audit_common.fieldName.name',
                  defaultMessage: 'Field',
                },
              }),
              view: {
                type: TextInput,
                props: {
                  readOnly: true,
                },
              },
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
              view: {
                type: TextInput,
                props: {
                  readOnly: true,
                },
              },
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
              view: {
                type: TextInput,
                props: {
                  readOnly: true,
                },
              },
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
              view: {
                type: TextInput,
                props: {
                  readOnly: true,
                },
              },
            },
          },
        },
      },
    },
  };
};
