import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    AutocompleteInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      target: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.batch.Merge Authority Items.targetCSID.name',
              defaultMessage: 'Target record',
            },
          }),
          required: true,
          view: {
            type: AutocompleteInput,
            props: {
              disableAltTerms: true,
              source: 'citation/local,citation/worldcat,concept/activity,concept/associated,concept/material,concept/occasion,organization/local,organization/ulan,person/local,person/ulan,place/local,place/tgn,location/local,location/offsite,work/local',
              showQuickAdd: false,
            },
          },
        },
      },
    },
  };
};
