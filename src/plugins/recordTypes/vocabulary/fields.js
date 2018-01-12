import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

export default (pluginContext) => {
  const {
    CompoundInput,
    TextInput,
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
                id: 'field.vocabulary.displayName.name',
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
                id: 'field.vocabulary.source.name',
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
                id: 'field.vocabulary.description.name',
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
    },
  };
};
