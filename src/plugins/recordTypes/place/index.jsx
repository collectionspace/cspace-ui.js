import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    place: {
      group: 'authority',
      serviceConfig: {
        name: 'placeauthorities',
        quickAddData: values => ({
          document: {
            '@name': 'places',
            'ns2:places_common': {
              '@xmlns:ns2': 'http://collectionspace.org/services/place',
              placeTermGroupList: {
                placeTermGroup: {
                  termDisplayName: values.displayName,
                },
              },
            },
          },
        }),
      },
      messageDescriptors: defineMessages({
        recordNameTitle: {
          id: 'record.place.nameTitle',
          description: 'The name of the record when used as a title.',
          defaultMessage: 'Place',
        },
      }),
      forms: {
        default: <div />,
      },
      title: () => '',
      vocabularies: {
        all: {
          group: 'all',
          isCreatable: false,
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.place.all.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'All vocabularies',
            },
          }),
          serviceConfig: {
            name: '_ALL_',
          },
        },
        local: {
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.place.local.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'Local Places',
            },
          }),
          serviceConfig: {
            name: 'urn:cspace:name(place)',
          },
        },
        tgn: {
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.place.tgn.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'Thesaurus of Geographic Names',
            },
          }),
          serviceConfig: {
            name: 'urn:cspace:name(tgn_place)',
          },
        },
      },
    },
  },
});
