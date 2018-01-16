import Immutable from 'immutable';
import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

export default (pluginContext) => {
  const {
    CompoundInput,
    OptionPickerInput,
    TextInput,
    WorkflowStateInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const coreFields = getCoreFields(pluginContext);

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
      // Define core fields
      ...coreFields,
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
          compute: (data) => {
            if (!data) {
              return data;
            }

            let terms = data.get('list-item');

            if (!terms) {
              return data;
            }

            if (!Immutable.List.isList(terms)) {
              terms = Immutable.List.of(terms);
            }

            return data.set('list-item', terms.map((term, index) =>
              term.set('order', index.toString().padStart(4, '0'))));
          },
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
                tabular: true,
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
