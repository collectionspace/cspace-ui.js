import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    OptionPickerInput,
    TextInput,
    WorkflowStateInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    extensions,
  } = configContext.config;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:vocabularies_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:vocabularies_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/vocabulary',
          },
          view: {
            type: CompoundInput,
          },
        },
        displayName: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.vocabularies_common.displayName.name',
                defaultMessage: 'Name',
              },
            }),
            required: true,
            view: {
              type: TextInput,
            },
          },
        },
        source: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.vocabularies_common.source.name',
                defaultMessage: 'Source',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        description: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.vocabularies_common.description.name',
                defaultMessage: 'Description',
              },
            }),
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
      },
      'ns2:abstract-common-list': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/jaxb',
          },
          view: {
            type: CompoundInput,
          },
        },
        'list-item': {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.vocabularyitems_common.list-item.name',
                defaultMessage: 'Terms',
              },
            }),
            repeating: true,
            view: {
              type: CompoundInput,
              props: {
                disableRemoveButton: data => (data && data.get('referenced') === 'true'),
                tabular: true,
                sortableFields: {
                  displayName: true,
                },
              },
            },
          },
          displayName: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.vocabularyitems_common.displayName.name',
                  defaultMessage: 'Name',
                },
                fullName: {
                  id: 'field.vocabularyitems_common.displayName.fullName',
                  defaultMessage: 'Term name',
                },
              }),
              required: true,
              view: {
                type: TextInput,
              },
            },
          },
          description: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.vocabularyitems_common.description.name',
                  defaultMessage: 'Description',
                },
              }),
              view: {
                type: TextInput,
              },
            },
          },
          source: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.vocabularyitems_common.source.name',
                  defaultMessage: 'Source',
                },
              }),
              view: {
                type: TextInput,
              },
            },
          },
          sourcePage: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.vocabularyitems_common.sourcePage.name',
                  defaultMessage: 'Source page',
                },
              }),
              view: {
                type: TextInput,
              },
            },
          },
          termStatus: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.vocabularyitems_common.termStatus.name',
                  defaultMessage: 'Status',
                },
              }),
              view: {
                type: OptionPickerInput,
                props: {
                  source: 'vocabTermStatuses',
                },
              },
            },
          },
          workflowState: {
            [config]: {
              view: {
                type: WorkflowStateInput,
              },
            },
          },
        },
      },
    },
  };
};
