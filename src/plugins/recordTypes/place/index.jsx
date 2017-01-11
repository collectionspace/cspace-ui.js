import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    place: {
      serviceConfig: {
        serviceName: 'Places',
        servicePath: 'placeauthorities',
        serviceType: 'authority',

        objectName: 'Placeitem',

        documentName: 'places',

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
        resultsTitle: {
          id: 'record.place.resultsTitle',
          description: 'The name of the record when used as a title describing search results.',
          defaultMessage: 'Places',
        },
      }),
      forms: {
        default: <div />,
      },
      title: () => '',
      vocabularies: {
        all: {
          isCreatable: false,
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.place.all.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'All Vocabularies',
            },
          }),
          serviceConfig: {
            servicePath: '_ALL_',
          },
          type: 'all',
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
            servicePath: 'urn:cspace:name(place)',
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
            servicePath: 'urn:cspace:name(tgn_place)',
          },
        },
      },
    },
  },
});
