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
      messages: {
        record: defineMessages({
          name: {
            id: 'record.place.name',
            description: 'The name of the record type.',
            defaultMessage: 'Place',
          },
          collectionName: {
            id: 'record.place.collectionName',
            description: 'The name of a collection of records of the type.',
            defaultMessage: 'Places',
          },
        }),
      },
      forms: {
        default: {
          template: <div />,
        },
      },
      title: () => '',
      vocabularies: {
        all: {
          isCreatable: false,
          messages: defineMessages({
            name: {
              id: 'vocab.place.all.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'All',
            },
            collectionName: {
              id: 'vocab.place.all.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'All Places',
            },
          }),
          serviceConfig: {
            servicePath: '_ALL_',
          },
          type: 'all',
        },
        local: {
          messages: defineMessages({
            name: {
              id: 'vocab.place.local.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'Local',
            },
            collectionName: {
              id: 'vocab.place.local.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'Local Places',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(place)',
          },
        },
        tgn: {
          messages: defineMessages({
            name: {
              id: 'vocab.place.tgn.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'TGN',
            },
            collectionName: {
              id: 'vocab.place.tgn.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'TGN Places',
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
