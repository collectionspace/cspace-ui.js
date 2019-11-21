import { defineMessages } from 'react-intl';

export default {
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
  panel: defineMessages({
    info: {
      id: 'panel.place.info',
      defaultMessage: 'Place Information',
    },
    localityInfo: {
      id: 'panel.place.localityInfo',
      defaultMessage: 'Locality Information',
    },
    geoRefInfo: {
      id: 'panel.place.geoRefInfo',
      defaultMessage: 'Georeference Information',
    },
    hierarchy: {
      id: 'panel.place.hierarchy',
      defaultMessage: 'Hierarchy',
    },
  }),
};
