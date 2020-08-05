import { defineMessages } from 'react-intl';

export default {
  placeTermTypes: {
    values: [
      'common',
      'technical-scientific',
      'native',
      'non-native',
      'local',
      'descriptive',
      'spelling-variant',
    ],
    messages: defineMessages({
      common: {
        id: 'option.placeTermTypes.common',
        defaultMessage: 'common name',
      },
      'technical-scientific': {
        id: 'option.placeTermTypes.technical-scientific',
        defaultMessage: 'technical or scientific name',
      },
      native: {
        id: 'option.placeTermTypes.native',
        defaultMessage: 'native name',
      },
      'non-native': {
        id: 'option.placeTermTypes.non-native',
        defaultMessage: 'non-native name',
      },
      local: {
        id: 'option.placeTermTypes.local',
        defaultMessage: 'local name',
      },
      descriptive: {
        id: 'option.placeTermTypes.descriptive',
        defaultMessage: 'descriptive name',
      },
      'spelling-variant': {
        id: 'option.placeTermTypes.spelling-variant',
        defaultMessage: 'spelling variant',
      },
    }),
  },
  placeTermStatuses: {
    values: [
      'provisional',
      'under review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.placeTermStatuses.provisional',
        defaultMessage: 'provisional',
      },
      'under review': {
        id: 'option.placeTermStatuses.under review',
        defaultMessage: 'under review',
      },
      accepted: {
        id: 'option.placeTermStatuses.accepted',
        defaultMessage: 'accepted',
      },
      rejected: {
        id: 'option.placeTermStatuses.rejected',
        defaultMessage: 'rejected',
      },
    }),
  },
  placeHistoricalStatuses: {
    values: [
      'current',
      'historical',
      'both',
    ],
    messages: defineMessages({
      current: {
        id: 'option.placeHistoricalStatuses.current',
        defaultMessage: 'current',
      },
      historical: {
        id: 'option.placeHistoricalStatuses.historical',
        defaultMessage: 'historical',
      },
      both: {
        id: 'option.placeHistoricalStatuses.both',
        defaultMessage: 'both',
      },
    }),
  },
  placeTypes: {
    values: [
      'autonomous-region',
      'borough',
      'city',
      'collection-site',
      'continent',
      'country',
      'country-code',
      'county',
      'dependent-state',
      'deserted-settlement',
      'district-national',
      'general-region',
      'governorate',
      'inhabited-place',
      'island',
      'island-group',
      'locality',
      'metropolitan-area',
      'municipality',
      'nation',
      'national-division',
      'neighborhood',
      'occupied-territory',
      'prefecture',
      'province',
      'region',
      'state',
      'state-province',
      'territory',
      'township',
      'union-territory',
      'unitary-authority',
      'urban-prefecture',
      'water-body',
    ],
    messages: defineMessages({
      'autonomous-region': {
        id: 'option.placeTypes.autonomous-region',
        defaultMessage: 'autonomous region',
      },
      borough: {
        id: 'option.placeTypes.borough',
        defaultMessage: 'borough',
      },
      city: {
        id: 'option.placeTypes.city',
        defaultMessage: 'city',
      },
      'collection-site': {
        id: 'option.placeTypes.collection-site',
        defaultMessage: 'collection site',
      },
      continent: {
        id: 'option.placeTypes.continent',
        defaultMessage: 'continent',
      },
      country: {
        id: 'option.placeTypes.country',
        defaultMessage: 'country',
      },
      'country-code': {
        id: 'option.placeTypes.country-code',
        defaultMessage: 'country code',
      },
      county: {
        id: 'option.placeTypes.county',
        defaultMessage: 'county',
      },
      'dependent-state': {
        id: 'option.placeTypes.dependent-state',
        defaultMessage: 'dependent state',
      },
      'deserted-settlement': {
        id: 'option.placeTypes.deserted-settlement',
        defaultMessage: 'deserted settlement',
      },
      'district-national': {
        id: 'option.placeTypes.district-national',
        defaultMessage: 'district (national)',
      },
      'general-region': {
        id: 'option.placeTypes.general-region',
        defaultMessage: 'general region',
      },
      governorate: {
        id: 'option.placeTypes.governorate',
        defaultMessage: 'governorate',
      },
      'inhabited-place': {
        id: 'option.placeTypes.inhabited-place',
        defaultMessage: 'inhabited place',
      },
      island: {
        id: 'option.placeTypes.island',
        defaultMessage: 'island',
      },
      'island-group': {
        id: 'option.placeTypes.island-group',
        defaultMessage: 'island group',
      },
      locality: {
        id: 'option.placeTypes.locality',
        defaultMessage: 'locality',
      },
      'metropolitan-area': {
        id: 'option.placeTypes.metropolitan-area',
        defaultMessage: 'metropolitan area',
      },
      municipality: {
        id: 'option.placeTypes.municipality',
        defaultMessage: 'municipality',
      },
      nation: {
        id: 'option.placeTypes.nation',
        defaultMessage: 'nation',
      },
      'national-division': {
        id: 'option.placeTypes.national-division',
        defaultMessage: 'national division',
      },
      neighborhood: {
        id: 'option.placeTypes.neighborhood',
        defaultMessage: 'neighborhood',
      },
      'occupied-territory': {
        id: 'option.placeTypes.occupied-territory',
        defaultMessage: 'occupied territory',
      },
      prefecture: {
        id: 'option.placeTypes.prefecture',
        defaultMessage: 'prefecture',
      },
      province: {
        id: 'option.placeTypes.province',
        defaultMessage: 'province',
      },
      region: {
        id: 'option.placeTypes.region',
        defaultMessage: 'region',
      },
      state: {
        id: 'option.placeTypes.state',
        defaultMessage: 'state',
      },
      'state-province': {
        id: 'option.placeTypes.state-province',
        defaultMessage: 'state province',
      },
      territory: {
        id: 'option.placeTypes.territory',
        defaultMessage: 'territory',
      },
      township: {
        id: 'option.placeTypes.township',
        defaultMessage: 'township',
      },
      'union-territory': {
        id: 'option.placeTypes.union-territory',
        defaultMessage: 'union territory',
      },
      'unitary-authority': {
        id: 'option.placeTypes.unitary-authority',
        defaultMessage: 'unitary authority',
      },
      'urban-prefecture': {
        id: 'option.placeTypes.urban-prefecture',
        defaultMessage: 'urban prefecture',
      },
      'water-body': {
        id: 'option.placeTypes.water-body',
        defaultMessage: 'water body',
      },
    }),
  },
  coordinateSystems: {
    values: [
      'altitude-depth',
      'latitude-longitude',
      'national-grid-reference',
      'utm',
    ],
    messages: defineMessages({
      'altitude-depth': {
        id: 'option.coordinateSystems.altitude-depth',
        defaultMessage: 'altitude depth',
      },
      'latitude-longitude': {
        id: 'option.coordinateSystems.latitude-longitude',
        defaultMessage: 'latitude and longitude',
      },
      'national-grid-reference': {
        id: 'option.coordinateSystems.national-grid-reference',
        defaultMessage: 'National Grid reference',
      },
      utm: {
        id: 'option.coordinateSystems.utm',
        defaultMessage: 'Universal Transverse Mercator (UTM)',
      },
    }),
  },
  spatialRefSystems: {
    values: [
      'epsg4326-wgs84',
      'epsg4269-nad83',
      'epsg4267-nad27',
      'unknown',
    ],
    messages: defineMessages({
      'epsg4326-wgs84': {
        id: 'option.spatialRefSystems.epsg4326-wgs84',
        defaultMessage: 'EPSG:4326-WGS84',
      },
      'epsg4269-nad83': {
        id: 'option.spatialRefSystems.epsg4269-nad83',
        defaultMessage: 'EPSG:4269-NAD83',
      },
      'epsg4267-nad27': {
        id: 'option.spatialRefSystems.epsg4267-nad27',
        defaultMessage: 'EPSG:4267-NAD27',
      },
      unknown: {
        id: 'option.spatialRefSystems.unknown',
        defaultMessage: 'unknown',
      },
    }),
  },
  localityUnits: {
    values: [
      'acres',
      'centimeters',
      'feet',
      'hectares',
      'inches',
      'kilometers',
      'meters',
      'miles',
      'millimeters',
      'square-feet',
      'square-meters',
      'square-yards',
      'stories',
    ],
    messages: defineMessages({
      acres: {
        id: 'option.localityUnits.acres',
        defaultMessage: 'acres',
      },
      centimeters: {
        id: 'option.localityUnits.centimeters',
        defaultMessage: 'centimeters',
      },
      feet: {
        id: 'option.localityUnits.feet',
        defaultMessage: 'feet',
      },
      hectares: {
        id: 'option.localityUnits.hectares',
        defaultMessage: 'hectares',
      },
      inches: {
        id: 'option.localityUnits.inches',
        defaultMessage: 'inches',
      },
      kilometers: {
        id: 'option.localityUnits.kilometers',
        defaultMessage: 'kilometers',
      },
      meters: {
        id: 'option.localityUnits.meters',
        defaultMessage: 'meters',
      },
      miles: {
        id: 'option.localityUnits.miles',
        defaultMessage: 'miles',
      },
      millimeters: {
        id: 'option.localityUnits.millimeters',
        defaultMessage: 'millimeters',
      },
      'square-feet': {
        id: 'option.localityUnits.square-feet',
        defaultMessage: 'square feet',
      },
      'square-meters': {
        id: 'option.localityUnits.square-meters',
        defaultMessage: 'square meters',
      },
      'square-yards': {
        id: 'option.localityUnits.square-yards',
        defaultMessage: 'square yards',
      },
      stories: {
        id: 'option.localityUnits.stories',
        defaultMessage: 'stories',
      },
    }),
  },
  geodeticDatums: {
    values: [
      'epsg4326-wgs84',
      'epsg4269-nad83',
      'epsg4267-nad27',
      'unknown',
    ],
    messages: defineMessages({
      'epsg4326-wgs84': {
        id: 'option.geodeticDatums.epsg4326-wgs84',
        defaultMessage: 'EPSG:4326-WGS84',
      },
      'epsg4269-nad83': {
        id: 'option.geodeticDatums.epsg4269-nad83',
        defaultMessage: 'EPSG:4269-NAD83',
      },
      'epsg4267-nad27': {
        id: 'option.geodeticDatums.epsg4267-nad27',
        defaultMessage: 'EPSG:4267-NAD27',
      },
      unknown: {
        id: 'option.geodeticDatums.unknown',
        defaultMessage: 'unknown',
      },
    }),
  },
  geoRefProtocols: {
    values: [
      'chapman-wieczorek-2006-guide-best-practices-georeferencing',
      'manis-herpnet-ornis-georeferencing-guidelines',
      'georeferencing-dummies',
      'biogeomancer',
    ],
    messages: defineMessages({
      'chapman-wieczorek-2006-guide-best-practices-georeferencing': {
        id: 'option.geoRefProtocols.chapman-wieczorek-2006-guide-best-practices-georeferencing',
        defaultMessage: 'Chapman, Wieczorek 2006, Guide to Best Practices for Georeferencing',
      },
      'manis-herpnet-ornis-georeferencing-guidelines': {
        id: 'option.geoRefProtocols.manis-herpnet-ornis-georeferencing-guidelines',
        defaultMessage: 'MaNIS/HerpNet/ORNIS Georeferencing Guidelines',
      },
      'georeferencing-dummies': {
        id: 'option.geoRefProtocols.georeferencing-dummies',
        defaultMessage: 'Georeferencing For Dummies',
      },
      biogeomancer: {
        id: 'option.geoRefProtocols.biogeomancer',
        defaultMessage: 'BioGeomancer',
      },
    }),
  },
  geoRefVerificationStatuses: {
    values: [
      'unverified',
      'verified-data-custodian',
      'verified-contributor',
    ],
    messages: defineMessages({
      unverified: {
        id: 'option.geoRefVerificationStatuses.unverified',
        defaultMessage: 'unverified',
      },
      'verified-data-custodian': {
        id: 'option.geoRefVerificationStatuses.verified-data-custodian',
        defaultMessage: 'verified by data custodian',
      },
      'verified-contributor': {
        id: 'option.geoRefVerificationStatuses.verified-contributor',
        defaultMessage: 'verified by contributor',
      },
    }),
  },
};
