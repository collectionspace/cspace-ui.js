import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

export default (pluginContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    HierarchyInput,
    OptionPickerInput,
    TextInput,
    TermPickerInput,
    CheckboxInput,
    StructuredDateInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_FLOAT,
    DATA_TYPE_INT,
  } = pluginContext.dataTypes;

  const coreFields = getCoreFields(pluginContext);

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:places_common',
          },
        },
      },
      'ns2:relations-common-list': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/relation',
          },
        },
        'relation-list-item': {
          [config]: {
            view: {
              type: HierarchyInput,
              props: {
                messages: defineMessages({
                  parent: {
                    id: 'hierarchyInput.place.parent',
                    defaultMessage: 'Broader context',
                  },
                  children: {
                    id: 'hierarchyInput.place.children',
                    defaultMessage: 'Narrower context',
                  },
                  siblings: {
                    id: 'hierarchyInput.place.siblings',
                    defaultMessage: 'Equivalent context',
                  },
                }),
              },
            },
          },
        },
      },
      // Define core fields
      ...coreFields,
      'ns2:places_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/place',
          },
        },
        placeTermGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.placeTermGroupList.name',
                defaultMessage: 'Place term group(s)',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          placeTermGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            termDisplayName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termDisplayName.name',
                    defaultMessage: 'Display name',
                  },
                }),
                required: true,
                view: {
                  type: TextInput,
                },
              },
            },
            termName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termName.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termType.name',
                    defaultMessage: 'Term type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'placeTermTypes',
                  },
                },
              },
            },
            termFlag: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termFlag.name',
                    defaultMessage: 'Term flag',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'placetermflag',
                  },
                },
              },
            },
            termStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'placeTermStatuses',
                  },
                },
              },
            },
            termQualifier: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termQualifier.name',
                    defaultMessage: 'Qualifier',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termLanguage: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termLanguage.name',
                    defaultMessage: 'Language',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'languages',
                  },
                },
              },
            },
            termPrefForLang: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termPrefForLang.name',
                    defaultMessage: 'Pref for lang',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            termSource: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termSource.name',
                    defaultMessage: 'Source',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'citation/local,citation/shared,citation/worldcat',
                  },
                },
              },
            },
            termSourceDetail: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termSourceDetail.name',
                    defaultMessage: 'Source detail',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termSourceID: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termSourceID.name',
                    defaultMessage: 'Source ID',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termSourceNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termSourceNote.name',
                    defaultMessage: 'Source note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            historicalStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.historicalStatus.name',
                    defaultMessage: 'Historical status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'placeHistoricalStatuses',
                  },
                },
              },
            },
            nameAbbrev: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.nameAbbrev.name',
                    defaultMessage: 'Abbreviation',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            nameNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.nameNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            nameDateGroup: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.nameDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
          },
        },
        placeType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.placeType.name',
                defaultMessage: 'Place record type',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'placeTypes',
              },
            },
          },
        },
        placeSource: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.placeSource.name',
                defaultMessage: 'Place source',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        placeNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.placeNote.name',
                defaultMessage: 'Place note',
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
        placeOwnerGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.placeOwnerGroupList.name',
                defaultMessage: 'Place owners',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          placeOwnerGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                },
              },
            },
            owner: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.owner.name',
                    defaultMessage: 'Owner',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/shared,organization/local,organization/shared',
                  },
                },
              },
            },
            ownershipDateGroup: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.ownershipDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            ownershipNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.ownershipNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        addrGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.addrGroupList.name',
                defaultMessage: 'Address',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          addrGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            addressType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.addressType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'addresstype',
                  },
                },
              },
            },
            addressPlace1: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.addressPlace1.name',
                    defaultMessage: 'Line 1',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            addressPlace2: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.addressPlace2.name',
                    defaultMessage: 'Line 2',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            addressMunicipality: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.addressMunicipality.name',
                    defaultMessage: 'Municipality',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'place/local,place/tgn',
                  },
                },
              },
            },
            addressStateOrProvince: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.addressStateOrProvince.name',
                    defaultMessage: 'State/Province',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'place/local,place/tgn',
                  },
                },
              },
            },
            addressPostCode: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.addressPostCode.name',
                    defaultMessage: 'Postal code',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            addressCountry: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.addressCountry.name',
                    defaultMessage: 'Country',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'place/local,place/tgn',
                  },
                },
              },
            },
          },
        },
        vCoordinates: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vCoordinates.name',
                defaultMessage: 'Verbatim coords',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        vLatitude: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vLatitude.name',
                defaultMessage: 'Verbatim latitude',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        vLongitude: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vLongitude.name',
                defaultMessage: 'Verbatim longitude',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        vCoordSys: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vCoordSys.name',
                defaultMessage: 'Coordinate system',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'coordinateSystems',
              },
            },
          },
        },
        vSpatialReferenceSystem: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vSpatialReferenceSystem.name',
                defaultMessage: 'Spatial ref system',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'spatialRefSystems',
              },
            },
          },
        },
        vCoordSource: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vCoordSource.name',
                defaultMessage: 'Coordinate source',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        vCoordSourceRefId: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vCoordSourceRefId.name',
                defaultMessage: 'Coordinate source detail',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        vUnitofMeasure: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vUnitofMeasure.name',
                defaultMessage: 'Unit of measure',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'localityUnits',
              },
            },
          },
        },
        vElevation: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vElevation.name',
                defaultMessage: 'Elevation',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        minElevationInMeters: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.places_common.minElevationInMeters.name',
                defaultMessage: 'Min elevation (m)',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        maxElevationInMeters: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.places_common.maxElevationInMeters.name',
                defaultMessage: 'Max elevation (m)',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        vDepth: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vDepth.name',
                defaultMessage: 'Depth',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        minDepthInMeters: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.places_common.minDepthInMeters.name',
                defaultMessage: 'Min depth (m)',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        maxDepthInMeters: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.places_common.maxDepthInMeters.name',
                defaultMessage: 'Max depth (m)',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        vDistanceAboveSurface: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.vDistanceAboveSurface.name',
                defaultMessage: 'Distance above surface',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        minDistanceAboveSurfaceMeters: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.places_common.minDistanceAboveSurfaceMeters.name',
                defaultMessage: 'Min distance above surface (m)',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        maxDistanceAboveSurfaceMeters: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.places_common.maxDistanceAboveSurfaceMeters.name',
                defaultMessage: 'Max distance above surface (m)',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        placeGeoRefGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.placeGeoRefGroupList.name',
                defaultMessage: 'Georeference',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          placeGeoRefGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            decimalLatitude: {
              [config]: {
                dataType: DATA_TYPE_FLOAT,
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.decimalLatitude.name',
                    defaultMessage: 'Decimal latitude',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            decimalLongitude: {
              [config]: {
                dataType: DATA_TYPE_FLOAT,
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.decimalLongitude.name',
                    defaultMessage: 'Decimal longitude',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            geodeticDatum: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.geodeticDatum.name',
                    defaultMessage: 'Datum',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'geodeticDatums',
                  },
                },
              },
            },
            coordUncertaintyInMeters: {
              [config]: {
                dataType: DATA_TYPE_INT,
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.coordUncertaintyInMeters.name',
                    defaultMessage: 'Uncertainty (m)',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            coordPrecision: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.coordPrecision.name',
                    defaultMessage: 'Precision',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            pointRadiusSpatialFit: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.pointRadiusSpatialFit.name',
                    defaultMessage: 'Point radius spatial fit',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            footprintWKT: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.footprintWKT.name',
                    defaultMessage: 'Footprint WKT',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            footprintSRS: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.footprintSRS.name',
                    defaultMessage: 'Footprint SRS',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            footprintSpatialFit: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.footprintSpatialFit.name',
                    defaultMessage: 'Footprint spatial fit',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            geoReferencedBy: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.geoReferencedBy.name',
                    defaultMessage: 'Georeferenced by',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/shared,organization/local,organization/shared',
                  },
                },
              },
            },
            geoRefDateGroup: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.geoRefDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            geoRefProtocol: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.geoRefProtocol.name',
                    defaultMessage: 'Protocol',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'geoRefProtocols',
                  },
                },
              },
            },
            geoRefSource: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.geoRefSource.name',
                    defaultMessage: 'Source',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            geoRefVerificationStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.geoRefVerificationStatus.name',
                    defaultMessage: 'Verification',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'geoRefVerificationStatuses',
                  },
                },
              },
            },
            geoRefRemarks: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.geoRefRemarks.name',
                    defaultMessage: 'Remarks',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            geoRefPlaceName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.geoRefPlaceName.name',
                    defaultMessage: 'Georeference place name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
      },
    },
  };
};
