import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    HierarchyInput,
    OptionPickerInput,
    TextInput,
    TermPickerInput,
    CheckboxInput,
    StructuredDateInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_BOOL,
    DATA_TYPE_FLOAT,
    DATA_TYPE_INT,
  } = configContext.dataTypes;

  const {
    extensions,
  } = configContext.config;

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
      'rel:relations-common-list': {
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
                    defaultMessage: 'Broader place',
                  },
                  children: {
                    id: 'hierarchyInput.place.children',
                    defaultMessage: 'Narrower places',
                  },
                  siblings: {
                    id: 'hierarchyInput.place.siblings',
                    defaultMessage: 'Adjacent places',
                  },
                }),
              },
            },
          },
        },
      },
      ...extensions.core.fields,
      'ns2:places_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/place',
          },
        },
        csid: {
          [config]: {
            cloneable: false,
          },
        },
        inAuthority: {
          [config]: {
            cloneable: false,
          },
        },
        refName: {
          [config]: {
            cloneable: false,
          },
        },
        shortIdentifier: {
          [config]: {
            cloneable: false,
          },
        },
        placeTermGroupList: {
          [config]: {
            messages: defineMessages({
              required: {
                id: 'field.places_common.placeTermGroupList.required',
                defaultMessage: 'At least one term display name is required. Please enter a value.',
              },
            }),
            required: true,
            view: {
              type: CompoundInput,
            },
          },
          placeTermGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.places_common.placeTermGroup.name',
                  defaultMessage: 'Term',
                },
              }),
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
                    defaultMessage: 'Type',
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
                  fullName: {
                    id: 'field.places_common.termFlag.fullName',
                    defaultMessage: 'Term flag',
                  },
                  name: {
                    id: 'field.places_common.termFlag.name',
                    defaultMessage: 'Flag',
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
                  fullName: {
                    id: 'field.places_common.termLanguage.fullName',
                    defaultMessage: 'Term language',
                  },
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
                dataType: DATA_TYPE_BOOL,
                messages: defineMessages({
                  name: {
                    id: 'field.places_common.termPrefForLang.name',
                    defaultMessage: 'Preferred for lang',
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
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.places_common.termSource.fullName',
                    defaultMessage: 'Source name',
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
                    defaultMessage: 'Detail',
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
                    defaultMessage: 'ID',
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
                    defaultMessage: 'Note',
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
                  fullName: {
                    id: 'field.places_common.nameDateGroup.fullName',
                    defaultMessage: 'Name date',
                  },
                  name: {
                    id: 'field.places_common.nameDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
          },
        },
        placeType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.places_common.placeType.name',
                defaultMessage: 'Place type',
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
            searchView: {
              type: TextInput,
            },
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
            view: {
              type: CompoundInput,
            },
          },
          placeOwnerGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.places_common.placeOwnerGroup.name',
                  defaultMessage: 'Ownership',
                },
              }),
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
                  fullName: {
                    id: 'field.places_common.ownershipDateGroup.fullName',
                    defaultMessage: 'Ownership date',
                  },
                  name: {
                    id: 'field.places_common.ownershipDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
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
        ...extensions.address.fields,
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
                  fullName: {
                    id: 'field.places_common.geoRefDateGroup.fullName',
                    defaultMessage: 'Georeference date',
                  },
                  name: {
                    id: 'field.places_common.geoRefDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
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
