import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  termType: {
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
        id: 'option.termType.common',
        defaultMessage: 'common',
      },
      'technical-scientific': {
        id: 'option.termType.technical-scientific',
        defaultMessage: 'technical or scientific',
      },
      native: {
        id: 'option.termType.native',
        defaultMessage: 'native',
      },
      'non-native': {
        id: 'option.termType.non-native',
        defaultMessage: 'non-native',
      },
      local: {
        id: 'option.termType.local',
        defaultMessage: 'local',
      },
      descriptive: {
        id: 'option.termType.descriptive',
        defaultMessage: 'descriptive',
      },
      'spelling-variant': {
        id: 'option.termType.spelling-variant',
        defaultMessage: 'spelling variant',
      },
    }),
  },
  termStatus: {
    values: [
      'provisional',
      'under-review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.termStatus.provisional',
        defaultMessage: 'provisional',
      },
      'under-review': {
        id: 'option.termStatus.under-review',
        defaultMessage: 'under review',
      },
      accepted: {
        id: 'option.termStatus.accepted',
        defaultMessage: 'accepted',
      },
      rejected: {
        id: 'option.termStatus.rejected',
        defaultMessage: 'rejected',
      },
    }),
  },
  historicalStatus: {
    values: [
      'current',
      'historical',
      'both',
    ],
    messages: defineMessages({
      current: {
        id: 'option.historicalStatus.current',
        defaultMessage: 'current',
      },
      historical: {
        id: 'option.historicalStatus.historical',
        defaultMessage: 'historical',
      },
      both: {
        id: 'option.historicalStatus.both',
        defaultMessage: 'both',
      },
    }),
  },
  placeType: {
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
      'localilty',
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
      'union-territory',
      'unitary-authority',
      'urban-prefecture',
      'water-body',
    ],
    messages: defineMessages({
      'autonomous-region': {
        id: 'option.placeType.autonomous-region',
        defaultMessage: 'autonomous region',
      },
      borough: {
        id: 'option.placeType.borough',
        defaultMessage: 'borough',
      },
      city: {
        id: 'option.placeType.city',
        defaultMessage: 'city',
      },
      'collection-site': {
        id: 'option.placeType.collection-site',
        defaultMessage: 'collection site',
      },
      continent: {
        id: 'option.placeType.continent',
        defaultMessage: 'continent',
      },
      country: {
        id: 'option.placeType.country',
        defaultMessage: 'country',
      },
      'country-code': {
        id: 'option.placeType.country-code',
        defaultMessage: 'country code',
      },
      county: {
        id: 'option.placeType.county',
        defaultMessage: 'county',
      },
      'dependent-state': {
        id: 'option.placeType.dependent-state',
        defaultMessage: 'dependent state',
      },
      'deserted-settlement': {
        id: 'option.placeType.deserted-settlement',
        defaultMessage: 'deserted settlement',
      },
      'district-national': {
        id: 'option.placeType.district-national',
        defaultMessage: 'district national',
      },
      'general-region': {
        id: 'option.placeType.general-region',
        defaultMessage: 'general region',
      },
      governorate: {
        id: 'option.placeType.governorate',
        defaultMessage: 'governorate',
      },
      'inhabited-place': {
        id: 'option.placeType.inhabited-place',
        defaultMessage: 'inhabited place',
      },
      island: {
        id: 'option.placeType.island',
        defaultMessage: 'island',
      },
      'island-group': {
        id: 'option.placeType.island-group',
        defaultMessage: 'island group',
      },
      locality: {
        id: 'option.placeType.locality',
        defaultMessage: 'locality',
      },
      'metropolitan-area': {
        id: 'option.placeType.metropolitan-area',
        defaultMessage: 'metropolitan area',
      },
      municipality: {
        id: 'option.placeType.municipality',
        defaultMessage: 'municipality',
      },
      nation: {
        id: 'option.placeType.nation',
        defaultMessage: 'nation',
      },
      'national-division': {
        id: 'option.placeType.national-division',
        defaultMessage: 'national division',
      },
      neighborhood: {
        id: 'option.placeType.neighborhood',
        defaultMessage: 'neighborhood',
      },
      'occupied-territory': {
        id: 'option.placeType.occupied-territory',
        defaultMessage: 'occupied territory',
      },
      prefecture: {
        id: 'option.placeType.prefecture',
        defaultMessage: 'prefecture',
      },
      province: {
        id: 'option.placeType.province',
        defaultMessage: 'province',
      },
      region: {
        id: 'option.placeType.region',
        defaultMessage: 'region',
      },
      state: {
        id: 'option.placeType.state',
        defaultMessage: 'state',
      },
      'state-province': {
        id: 'option.placeType.state-province',
        defaultMessage: 'state-province',
      },
      territory: {
        id: 'option.placeType.territory',
        defaultMessage: 'territory',
      },
      'union-territory': {
        id: 'option.placeType.union-territory',
        defaultMessage: 'union territory',
      },
      'unitary-authority': {
        id: 'option.placeType.unitary-authority',
        defaultMessage: 'unitary-authority',
      },
      'urban-prefecture': {
        id: 'option.placeType.urban-prefecture',
        defaultMessage: 'urban-prefecture',
      },
      'water-body': {
        id: 'option.placeType.water-body',
        defaultMessage: 'water-body',
      },
    }),
  },
  vCoordSys: {
    values: [
      'altitude-depth',
      'latitude-longitude',
      'national-grid-reference',
      'utm',
    ],
    messages: defineMessages({
      'altitude-depth': {
        id: 'option.vCoordSys.altitude-depth',
        defaultMessage: 'altitude depth',
      },
      'latitude-longitude': {
        id: 'option.vCoordSys.latitude-longitude',
        defaultMessage: 'latitude longitude',
      },
      'national-grid-reference': {
        id: 'option.vCoordSys.national-grid-reference',
        defaultMessage: 'national grid reference',
      },
      utm: {
        id: 'option.vCoordSys.utm',
        defaultMessage: 'Universal Transverse Mercator (UTM)',
      },
    }),
  },
  vSpatialReferenceSystem: {
    values: [
      'epsg4326-wgs84',
      'epsg4269-nad83',
      'epsg4267-nad27',
      'unkown',
    ],
    messages: defineMessages({
      'epsg4326-wgs84': {
        id: 'option.vSpatialReferenceSystem.epsg4326-wgs84',
        defaultMessage: 'EPSG:4326-WGS84',
      },
      'epsg4269-nad83': {
        id: 'option.vSpatialReferenceSystem.epsg4269-nad83',
        defaultMessage: 'EPSG:4269-NAD83',
      },
      'epsg4267-nad27': {
        id: 'option.vSpatialReferenceSystem.epsg4267-nad27',
        defaultMessage: 'EPSG:4267-NAD27',
      },
      unkown: {
        id: 'option.vSpatialReferenceSystem.unkown',
        defaultMessage: 'unkown',
      },
    }),
  },
  vUnitofMeasure: {
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
        id: 'option.vUnitofMeasure.acres',
        defaultMessage: 'acres',
      },
      centimeters: {
        id: 'option.vUnitofMeasure.centimeters',
        defaultMessage: 'centimeters',
      },
      feet: {
        id: 'option.vUnitofMeasure.feet',
        defaultMessage: 'feet',
      },
      hectares: {
        id: 'option.vUnitofMeasure.hectares',
        defaultMessage: 'hectares',
      },
      inches: {
        id: 'option.vUnitofMeasure.inches',
        defaultMessage: 'inches',
      },
      kilometers: {
        id: 'option.vUnitofMeasure.kilometers',
        defaultMessage: 'kilometers',
      },
      meters: {
        id: 'option.vUnitofMeasure.meters',
        defaultMessage: 'meters',
      },
      millimeters: {
        id: 'option.vUnitofMeasure.millimeters',
        defaultMessage: 'millimeters',
      },
      'square-feet': {
        id: 'option.vUnitofMeasure.square-feet',
        defaultMessage: 'square feet',
      },
      'square-meters': {
        id: 'option.vUnitofMeasure.square-meters',
        defaultMessage: 'square meters',
      },
      'square-yards': {
        id: 'option.vUnitofMeasure.square-yards',
        defaultMessage: 'square yards',
      },
      stories: {
        id: 'option.vUnitofMeasure.stories',
        defaultMessage: 'stories',
      },
    }),
  },
  geodeticDatum: {
    values: [
      'epsg4326-wgs84',
      'epsg4269-nad83',
      'epsg4267-nad27',
      'unknown',
    ],
    messages: defineMessages({
      'epsg4326-wgs84': {
        id: 'option.geodeticDatum.epsg4326-wgs84',
        defaultMessage: 'EPSG:4326-WGS84',
      },
      'epsg4269-nad83': {
        id: 'option.geodeticDatum.epsg4269-nad83',
        defaultMessage: 'EPSG:4269-NAD83',
      },
      'epsg4267-nad27': {
        id: 'option.geodeticDatum.epsg4267-nad27',
        defaultMessage: 'EPSG:4267-NAD27',
      },
      unknown: {
        id: 'option.geodeticDatum.unknown',
        defaultMessage: 'unknown',
      },
    }),
  },
  geoRefProtocol: {
    values: [
      'chapman-wieczorek-2006-guide-best-practices-georeferencing',
      'manis-herpnet-ornis-georeferencing-guidelines',
      'georeferencing-dummies',
      'biogeomancer',
    ],
    messages: defineMessages({
      'chapman-wieczorek-2006-guide-best-practices-georeferencing': {
        id: 'option.geoRefProtocol.chapman-wieczorek-2006-guide-best-practices-georeferencing',
        defaultMessage: 'Chapman, Wieczorek 2006, Guide to Best Practices for Georeferencing',
      },
      'manis-herpnet-ornis-georeferencing-guidelines': {
        id: 'option.geoRefProtocol.manis-herpnet-ornis-georeferencing-guidelines',
        defaultMessage: 'MaNIS/HerpNet/ORNIS Georeferencing Guidelines',
      },
      'georeferencing-dummies': {
        id: 'option.geoRefProtocol.georeferencing-dummies',
        defaultMessage: 'Georeferencing For Dummies',
      },
      biogeomancer: {
        id: 'option.geoRefProtocol.biogeomancer',
        defaultMessage: 'BioGeomancer',
      },
    }),
  },
  geoRefVerificationStatus: {
    values: [
      'unverified',
      'verified-data-custodian',
      'verified-contributor',
    ],
    messages: defineMessages({
      unverified: {
        id: 'option.geoRefVerificationStatus.unverified',
        defaultMessage: 'unverified',
      },
      'verified-data-custodian': {
        id: 'option.geoRefVerificationStatus.verified-data-custodian',
        defaultMessage: 'verified data custodian',
      },
      'verified-contributor': {
        id: 'option.geoRefVerificationStatus.verified-contributor',
        defaultMessage: 'verified contributor',
      },
    }),
  },
};
