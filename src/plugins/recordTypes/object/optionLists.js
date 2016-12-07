import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  ageUnits: {
    values: [
      'days',
      'months',
      'weeks',
      'years',
    ],
    messageDescriptors: defineMessages({
      days: {
        id: 'option.ageUnits.days',
        defaultMessage: 'days',
      },
      months: {
        id: 'option.ageUnits.months',
        defaultMessage: 'months',
      },
      weeks: {
        id: 'option.ageUnits.weeks',
        defaultMessage: 'weeks',
      },
      years: {
        id: 'option.ageUnits.years',
        defaultMessage: 'years',
      },
    }),
  },
  collections: {
    values: [
      'library-collection',
      'permanent-collection',
      'study-collection',
      'teaching-collection',
    ],
    messageDescriptors: defineMessages({
      'library-collection': {
        id: 'option.collections.library-collection',
        defaultMessage: 'library collection',
      },
      'permanent-collection': {
        id: 'option.collections.permanent-collection',
        defaultMessage: 'permanent collection',
      },
      'study-collection': {
        id: 'option.collections.study-collection',
        defaultMessage: 'study collection',
      },
      'teaching-collection': {
        id: 'option.collections.teaching-collection',
        defaultMessage: 'teaching collection',
      },
    }),
  },
  contentObjectTypes: {
    values: [
      'furniture',
      'food',
    ],
    messageDescriptors: defineMessages({
      furniture: {
        id: 'option.contentObjectTypes.furniture',
        defaultMessage: 'furniture',
      },
      food: {
        id: 'option.contentObjectTypes.food',
        defaultMessage: 'food',
      },
    }),
  },
  dimensions: {
    values: [
      'area',
      'base',
      'circumference',
      'count',
      'depth',
      'diameter',
      'height',
      'length',
      'running-time',
      'target',
      'volume',
      'weight',
      'width',
    ],
    messageDescriptors: defineMessages({
      area: {
        id: 'option.dimensions.area',
        defaultMessage: 'area',
      },
      base: {
        id: 'option.dimensions.base',
        defaultMessage: 'base',
      },
      circumference: {
        id: 'option.dimensions.circumference',
        defaultMessage: 'circumference',
      },
      count: {
        id: 'option.dimensions.count',
        defaultMessage: 'count',
      },
      depth: {
        id: 'option.dimensions.depth',
        defaultMessage: 'depth',
      },
      diameter: {
        id: 'option.dimensions.diameter',
        defaultMessage: 'diameter',
      },
      height: {
        id: 'option.dimensions.height',
        defaultMessage: 'height',
      },
      length: {
        id: 'option.dimensions.length',
        defaultMessage: 'length',
      },
      'running-time': {
        id: 'option.dimensions.running-time',
        defaultMessage: 'running time',
      },
      target: {
        id: 'option.dimensions.target',
        defaultMessage: 'target',
      },
      volume: {
        id: 'option.dimensions.volume',
        defaultMessage: 'volume',
      },
      weight: {
        id: 'option.dimensions.weight',
        defaultMessage: 'weight',
      },
      width: {
        id: 'option.dimensions.width',
        defaultMessage: 'width',
      },
    }),
  },
  forms: {
    values: [
      'dry',
      'pinned',
      'thin-section',
      'wet',
    ],
    messageDescriptors: defineMessages({
      dry: {
        id: 'option.forms.dry',
        defaultMessage: 'dry',
      },
      pinned: {
        id: 'option.forms.pinned',
        defaultMessage: 'pinned',
      },
      'thin-section': {
        id: 'option.forms.thin-section',
        defaultMessage: 'thin section',
      },
      wet: {
        id: 'option.forms.wet',
        defaultMessage: 'wet',
      },
    }),
  },
  inscriptionTypes: {
    values: [
      'brand',
      'decoration',
      'estate-stamp',
      'graffiti',
      'label',
      'maker\'s-mark',
    ],
    messageDescriptors: defineMessages({
      brand: {
        id: 'option.inscriptionTypes.brand',
        defaultMessage: 'brand',
      },
      decoration: {
        id: 'option.inscriptionTypes.decoration',
        defaultMessage: 'decoration',
      },
      'estate-stamp': {
        id: 'option.inscriptionTypes.estate-stamp',
        defaultMessage: 'estate stamp',
      },
      graffiti: {
        id: 'option.inscriptionTypes.graffiti',
        defaultMessage: 'graffiti',
      },
      label: {
        id: 'option.inscriptionTypes.label',
        defaultMessage: 'label',
      },
      'maker\'s-mark': {
        id: 'option.inscriptionTypes.maker\'s-mark',
        defaultMessage: 'maker\'s mark',
      },
    }),
  },
  measuredParts: {
    values: [
      'base',
      'frame',
      'framed',
      'image-size',
      'mount',
      'paper-size',
      'plate-size',
      'unframed',
    ],
    messageDescriptors: defineMessages({
      base: {
        id: 'option.measuredParts.base',
        defaultMessage: 'base',
      },
      frame: {
        id: 'option.measuredParts.frame',
        defaultMessage: 'frame',
      },
      framed: {
        id: 'option.measuredParts.framed',
        defaultMessage: 'framed',
      },
      'image-size': {
        id: 'option.measuredParts.image-size',
        defaultMessage: 'image size',
      },
      mount: {
        id: 'option.measuredParts.mount',
        defaultMessage: 'mount',
      },
      'paper-size': {
        id: 'option.measuredParts.paper-size',
        defaultMessage: 'paper size',
      },
      'plate-size': {
        id: 'option.measuredParts.plate-size',
        defaultMessage: 'plate size',
      },
      unframed: {
        id: 'option.measuredParts.unframed',
        defaultMessage: 'unframed',
      },
    }),
  },
  measurementMethods: {
    values: [
      'microscopy_reticule',
      'standard_mesh_screen',
      'sliding_calipers',
      'spreading_calipers',
      'measuring_tape_cloth',
      'measuring_tape_metal',
      'osteometric_board',
      'ruler',
      'pacing_pedometer',
      'odometer',
      'taping_chaining',
      'stadia_transit',
      'optical_range_finder',
      'electronic_distance_measurement',
      'protractor',
      'goniometer',
      'theodolite_total_station',
      'balance_beam_scale',
      'spring_scale',
      'hydraulic_or_pneumatic_scale',
    ],
    messageDescriptors: defineMessages({
      microscopy_reticule: {
        id: 'option.measurementMethods.microscopy_reticule',
        defaultMessage: 'microscopy (reticule)',
      },
      standard_mesh_screen: {
        id: 'option.measurementMethods.standard_mesh_screen',
        defaultMessage: 'standard mesh/screen',
      },
      sliding_calipers: {
        id: 'option.measurementMethods.sliding_calipers',
        defaultMessage: 'sliding calipers',
      },
      spreading_calipers: {
        id: 'option.measurementMethods.spreading_calipers',
        defaultMessage: 'spreading calipers',
      },
      measuring_tape_cloth: {
        id: 'option.measurementMethods.measuring_tape_cloth',
        defaultMessage: 'measuring tape (cloth)',
      },
      measuring_tape_metal: {
        id: 'option.measurementMethods.measuring_tape_metal',
        defaultMessage: 'measuring tape (metal)',
      },
      osteometric_board: {
        id: 'option.measurementMethods.osteometric_board',
        defaultMessage: 'osteometric board',
      },
      ruler: {
        id: 'option.measurementMethods.ruler',
        defaultMessage: 'ruler',
      },
      pacing_pedometer: {
        id: 'option.measurementMethods.pacing_pedometer',
        defaultMessage: 'pacing pedometer',
      },
      odometer: {
        id: 'option.measurementMethods.odometer',
        defaultMessage: 'odometer',
      },
      taping_chaining: {
        id: 'option.measurementMethods.taping_chaining',
        defaultMessage: 'taping/chaining',
      },
      stadia_transit: {
        id: 'option.measurementMethods.stadia_transit',
        defaultMessage: 'stadia/transit',
      },
      optical_range_finder: {
        id: 'option.measurementMethods.optical_range_finder',
        defaultMessage: 'optical range finder',
      },
      electronic_distance_measurement: {
        id: 'option.measurementMethods.electronic_distance_measurement',
        defaultMessage: 'electronic distance measurement',
      },
      protractor: {
        id: 'option.measurementMethods.protractor',
        defaultMessage: 'protractor',
      },
      goniometer: {
        id: 'option.measurementMethods.goniometer',
        defaultMessage: 'goniometer',
      },
      theodolite_total_station: {
        id: 'option.measurementMethods.theodolite_total_station',
        defaultMessage: 'theodolite/total station',
      },
      balance_beam_scale: {
        id: 'option.measurementMethods.balance_beam_scale',
        defaultMessage: 'balance/beam scale',
      },
      spring_scale: {
        id: 'option.measurementMethods.spring_scale',
        defaultMessage: 'spring scale',
      },
      hydraulic_or_pneumatic_scale: {
        id: 'option.measurementMethods.hydraulic_or_pneumatic_scale',
        defaultMessage: 'hydraulic or pneumatic scale',
      },
    }),
  },
  measurementUnits: {
    values: [
      'carats',
      'centimeters',
      'cubic-centimeters',
      'feet',
      'inches',
      'kilograms',
      'liters',
      'millimeters',
      'meters',
      'minutes',
      'pixels',
      'square-feet',
      'stories',
    ],
    messageDescriptors: defineMessages({
      carats: {
        id: 'option.measurementUnits.carats',
        defaultMessage: 'carats',
      },
      centimeters: {
        id: 'option.measurementUnits.centimeters',
        defaultMessage: 'centimeters',
      },
      'cubic-centimeters': {
        id: 'option.measurementUnits.cubic-centimeters',
        defaultMessage: 'cubic centimeters',
      },
      feet: {
        id: 'option.measurementUnits.feet',
        defaultMessage: 'feet',
      },
      inches: {
        id: 'option.measurementUnits.inches',
        defaultMessage: 'inches',
      },
      kilograms: {
        id: 'option.measurementUnits.kilograms',
        defaultMessage: 'kilograms',
      },
      liters: {
        id: 'option.measurementUnits.liters',
        defaultMessage: 'liters',
      },
      millimeters: {
        id: 'option.measurementUnits.millimeters',
        defaultMessage: 'millimeters',
      },
      meters: {
        id: 'option.measurementUnits.meters',
        defaultMessage: 'meters',
      },
      minutes: {
        id: 'option.measurementUnits.minutes',
        defaultMessage: 'minutes',
      },
      pixels: {
        id: 'option.measurementUnits.pixels',
        defaultMessage: 'pixels',
      },
      'square-feet': {
        id: 'option.measurementUnits.square-feet',
        defaultMessage: 'square feet',
      },
      stories: {
        id: 'option.measurementUnits.stories',
        defaultMessage: 'stories',
      },
    }),
  },
  nameCurrencies: {
    values: [
      'current',
      'archaic',
    ],
    messageDescriptors: defineMessages({
      current: {
        id: 'option.nameCurrencies.current',
        defaultMessage: 'current',
      },
      archaic: {
        id: 'option.nameCurrencies.archaic',
        defaultMessage: 'archaic',
      },
    }),
  },
  nameLevels: {
    values: [
      'group',
      'subgroup',
    ],
    messageDescriptors: defineMessages({
      group: {
        id: 'option.nameLevels.group',
        defaultMessage: 'group',
      },
      subgroup: {
        id: 'option.nameLevels.subgroup',
        defaultMessage: 'subgroup',
      },
    }),
  },
  nameSystems: {
    values: [
      'art-and-architecture-thesaurus',
      'nomenclature',
    ],
    messageDescriptors: defineMessages({
      'art-and-architecture-thesaurus': {
        id: 'option.nameSystems.art-and-architecture-thesaurus',
        defaultMessage: 'Art & Architecture Thesaurus',
      },
      nomenclature: {
        id: 'option.nameSystems.nomenclature',
        defaultMessage: 'nomenclature',
      },
    }),
  },
  nameTypes: {
    values: [
      'classified',
      'denomination',
      'simple',
      'taxonomic',
      'typological',
    ],
    messageDescriptors: defineMessages({
      classified: {
        id: 'option.nameTypes.classified',
        defaultMessage: 'classified',
      },
      denomination: {
        id: 'option.nameTypes.denomination',
        defaultMessage: 'denomination',
      },
      simple: {
        id: 'option.nameTypes.simple',
        defaultMessage: 'simple',
      },
      taxonomic: {
        id: 'option.nameTypes.taxonomic',
        defaultMessage: 'taxonomic',
      },
      typological: {
        id: 'option.nameTypes.typological',
        defaultMessage: 'typological',
      },
    }),
  },
  numberTypes: {
    values: [
      'lender',
      'obsolete',
      'previous',
      'serial',
      'unknown',
    ],
    messageDescriptors: defineMessages({
      lender: {
        id: 'option.numberTypes.lender',
        defaultMessage: 'lender',
      },
      obsolete: {
        id: 'option.numberTypes.obsolete',
        defaultMessage: 'obsolete',
      },
      previous: {
        id: 'option.numberTypes.previous',
        defaultMessage: 'previous',
      },
      serial: {
        id: 'option.numberTypes.serial',
        defaultMessage: 'serial',
      },
      unknown: {
        id: 'option.numberTypes.unknown',
        defaultMessage: 'unknown',
      },
    }),
  },
  objectComponentNames: {
    values: [
      'blade',
      'buttonhole',
      'handle',
      'sleeve',
    ],
    messageDescriptors: defineMessages({
      blade: {
        id: 'option.objectComponentNames.blade',
        defaultMessage: 'blade',
      },
      buttonhole: {
        id: 'option.objectComponentNames.buttonhole',
        defaultMessage: 'buttonhole',
      },
      handle: {
        id: 'option.objectComponentNames.handle',
        defaultMessage: 'handle',
      },
      sleeve: {
        id: 'option.objectComponentNames.sleeve',
        defaultMessage: 'sleeve',
      },
    }),
  },
  objectStatuses: {
    values: [
      'copy',
      'forgery',
      'holotype',
      'paralectotype',
      'paratype',
      'type',
    ],
    messageDescriptors: defineMessages({
      copy: {
        id: 'option.objectStatuses.copy',
        defaultMessage: 'copy',
      },
      forgery: {
        id: 'option.objectStatuses.forgery',
        defaultMessage: 'forgery',
      },
      holotype: {
        id: 'option.objectStatuses.holotype',
        defaultMessage: 'holotype',
      },
      paralectotype: {
        id: 'option.objectStatuses.paralectotype',
        defaultMessage: 'paralectotype',
      },
      paratype: {
        id: 'option.objectStatuses.paratype',
        defaultMessage: 'paratype',
      },
      type: {
        id: 'option.objectStatuses.type',
        defaultMessage: 'type',
      },
    }),
  },
  ownershipAccessLevels: {
    values: [
      'limited',
      'open',
      'restricted',
    ],
    messageDescriptors: defineMessages({
      limited: {
        id: 'option.ownershipAccessLevels.limited',
        defaultMessage: 'limited',
      },
      open: {
        id: 'option.ownershipAccessLevels.open',
        defaultMessage: 'open',
      },
      restricted: {
        id: 'option.ownershipAccessLevels.restricted',
        defaultMessage: 'restricted',
      },
    }),
  },
  ownershipCategories: {
    values: [
      'company',
      'public',
      'private',
    ],
    messageDescriptors: defineMessages({
      company: {
        id: 'option.ownershipCategories.company',
        defaultMessage: 'company',
      },
      public: {
        id: 'option.ownershipCategories.public',
        defaultMessage: 'public',
      },
      private: {
        id: 'option.ownershipCategories.private',
        defaultMessage: 'private',
      },
    }),
  },
  ownershipExchangeMethods: {
    values: [
      'bequest',
      'exchange',
      'gift',
      'purchase',
      'transfer',
      'treasure',
    ],
    messageDescriptors: defineMessages({
      bequest: {
        id: 'option.ownershipExchangeMethods.bequest',
        defaultMessage: 'bequest',
      },
      exchange: {
        id: 'option.ownershipExchangeMethods.exchange',
        defaultMessage: 'exchange',
      },
      gift: {
        id: 'option.ownershipExchangeMethods.gift',
        defaultMessage: 'gift',
      },
      purchase: {
        id: 'option.ownershipExchangeMethods.purchase',
        defaultMessage: 'purchase',
      },
      transfer: {
        id: 'option.ownershipExchangeMethods.transfer',
        defaultMessage: 'transfer',
      },
      treasure: {
        id: 'option.ownershipExchangeMethods.treasure',
        defaultMessage: 'treasure',
      },
    }),
  },
  phases: {
    values: [
      'adult',
      'imago',
      'larva',
      'nymph',
      'pupa',
    ],
    messageDescriptors: defineMessages({
      adult: {
        id: 'option.phases.adult',
        defaultMessage: 'adult',
      },
      imago: {
        id: 'option.phases.imago',
        defaultMessage: 'imago',
      },
      larva: {
        id: 'option.phases.larva',
        defaultMessage: 'larva',
      },
      nymph: {
        id: 'option.phases.nymph',
        defaultMessage: 'nymph',
      },
      pupa: {
        id: 'option.phases.pupa',
        defaultMessage: 'pupa',
      },
    }),
  },
  positions: {
    values: [
      'back',
      'base',
      'bottom',
      'front',
      'inside',
      'left',
      'outside',
      'recto',
      'right',
      'rim',
      'top',
      'verso',
    ],
    messageDescriptors: defineMessages({
      back: {
        id: 'option.positions.back',
        defaultMessage: 'back',
      },
      base: {
        id: 'option.positions.base',
        defaultMessage: 'base',
      },
      bottom: {
        id: 'option.positions.bottom',
        defaultMessage: 'bottom',
      },
      front: {
        id: 'option.positions.front',
        defaultMessage: 'front',
      },
      inside: {
        id: 'option.positions.inside',
        defaultMessage: 'inside',
      },
      left: {
        id: 'option.positions.left',
        defaultMessage: 'left',
      },
      outside: {
        id: 'option.positions.outside',
        defaultMessage: 'outside',
      },
      recto: {
        id: 'option.positions.recto',
        defaultMessage: 'recto',
      },
      right: {
        id: 'option.positions.right',
        defaultMessage: 'right',
      },
      rim: {
        id: 'option.positions.rim',
        defaultMessage: 'rim',
      },
      top: {
        id: 'option.positions.top',
        defaultMessage: 'top',
      },
      verso: {
        id: 'option.positions.verso',
        defaultMessage: 'verso',
      },
    }),
  },
  recordStatuses: {
    values: [
      'approved',
      'in-process',
      'new',
      'temporary',
    ],
    messageDescriptors: defineMessages({
      approved: {
        id: 'option.recordStatuses.approved',
        defaultMessage: 'approved',
      },
      'in-process': {
        id: 'option.recordStatuses.in-process',
        defaultMessage: 'in process',
      },
      new: {
        id: 'option.recordStatuses.new',
        defaultMessage: 'new',
      },
      temporary: {
        id: 'option.recordStatuses.temporary',
        defaultMessage: 'temporary',
      },
    }),
  },
  scripts: {
    values: [
      'carolingian-miniscule',
      'gothic-script',
      'palmer-method',
      'roman-cursive',
      'rustic-capitals',
      'spencerian-method',
      'square-capitals',
    ],
    messageDescriptors: defineMessages({
      'carolingian-miniscule': {
        id: 'option.scripts.carolingian-miniscule',
        defaultMessage: 'Carolingian minuscule',
      },
      'gothic-script': {
        id: 'option.scripts.gothic-script',
        defaultMessage: 'Gothic script',
      },
      'palmer-method': {
        id: 'option.scripts.palmer-method',
        defaultMessage: 'Palmer method',
      },
      'roman-cursive': {
        id: 'option.scripts.roman-cursive',
        defaultMessage: 'Roman cursive',
      },
      'rustic-capitals': {
        id: 'option.scripts.rustic-capitals',
        defaultMessage: 'rustic capitals',
      },
      'spencerian-method': {
        id: 'option.scripts.spencerian-method',
        defaultMessage: 'Spencerian method',
      },
      'square-capitals': {
        id: 'option.scripts.square-capitals',
        defaultMessage: 'square capitals',
      },
    }),
  },
  sexes: {
    values: [
      'male',
      'female',
    ],
    messageDescriptors: defineMessages({
      male: {
        id: 'option.sexes.male',
        defaultMessage: 'male',
      },
      female: {
        id: 'option.sexes.female',
        defaultMessage: 'female',
      },
    }),
  },
  technicalAttributes: {
    values: [
      'magnetic-tape-type',
      'record-speed',
    ],
    messageDescriptors: defineMessages({
      'magnetic-tape-type': {
        id: 'option.technicalAttributes.magnetic-tape-type',
        defaultMessage: 'magnetic tape type',
      },
      'record-speed': {
        id: 'option.technicalAttributes.record-speed',
        defaultMessage: 'record speed',
      },
    }),
  },
  technicalAttributeMeasurements: {
    values: [
      'metal',
      '78',
    ],
    messageDescriptors: defineMessages({
      metal: {
        id: 'option.technicalAttributeMeasurements.metal',
        defaultMessage: 'metal',
      },
      78: {
        id: 'option.technicalAttributeMeasurements.78',
        defaultMessage: '78',
      },
    }),
  },
  technicalAttributeMeasurementUnits: {
    values: [
      'rpm',
    ],
    messageDescriptors: defineMessages({
      rpm: {
        id: 'option.technicalAttributeMeasurementUnits.rpm',
        defaultMessage: 'rpm',
      },
    }),
  },
  titleTypes: {
    values: [
      'assigned-by-artist',
      'collection',
      'generic',
      'popular',
      'series',
      'trade',
    ],
    messageDescriptors: defineMessages({
      'assigned-by-artist': {
        id: 'option.titleTypes.assigned-by-artist',
        defaultMessage: 'assigned by artist',
      },
      collection: {
        id: 'option.titleTypes.collection',
        defaultMessage: 'collection',
      },
      generic: {
        id: 'option.titleTypes.generic',
        defaultMessage: 'generic',
      },
      popular: {
        id: 'option.titleTypes.popular',
        defaultMessage: 'popular',
      },
      series: {
        id: 'option.titleTypes.series',
        defaultMessage: 'series',
      },
      trade: {
        id: 'option.titleTypes.trade',
        defaultMessage: 'trade',
      },
    }),
  },
};
