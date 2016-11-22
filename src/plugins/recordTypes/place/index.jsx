import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    place: {
      serviceConfig: {
        name: 'placeauthorities',
        isAuthority: true,
        vocabularies: {
          place: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.placeauthorities.place.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'Local Places',
              },
            }),
          },
          tgn_place: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.placeauthorities.tgn_place.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'Thesaurus of Geographic Names',
              },
            }),
          },
        },
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
    },
  },
});
