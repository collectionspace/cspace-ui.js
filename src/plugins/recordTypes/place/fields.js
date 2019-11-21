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
    DATA_TYPE_STRUCTURED_DATE,
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
            messages: defineMessages({
              name: {
                id: 'field.places_common.csid.name',
                defaultMessage: 'System CSID',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        inAuthority: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.places_common.inAuthority.name',
                defaultMessage: 'System authority CSID',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        refName: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.places_common.refName.name',
                defaultMessage: 'System ref name',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        shortIdentifier: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.places_common.shortIdentifier.name',
                defaultMessage: 'System short ID',
              },
            }),
            view: {
              type: TextInput,
            },
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
                  fullName: {
                    id: 'field.places_common.termDisplayName.fullName',
                    defaultMessage: 'Term display name',
                  },
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
                  fullName: {
                    id: 'field.places_common.termName.fullName',
                    defaultMessage: 'Term name',
                  },
                  name: {
                    id: 'field.places_common.termName.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                  props: {
                    // Suppress Chrome autofill
                    autoComplete: 'cspace-name',
                  },
                },
              },
            },
            termQualifier: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.places_common.termQualifier.fullName',
                    defaultMessage: 'Term qualifier',
                  },
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
            termStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.places_common.termStatus.fullName',
                    defaultMessage: 'Term status',
                  },
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
            termType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.places_common.termType.fullName',
                    defaultMessage: 'Term type',
                  },
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
            historicalStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.places_common.historicalStatus.fullName',
                    defaultMessage: 'Term historical status',
                  },
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
                  fullName: {
                    id: 'field.places_common.termPrefForLang.fullName',
                    defaultMessage: 'Term preferred for lang',
                  },
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
            nameAbbrev: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.places_common.nameAbbrev.fullName',
                    defaultMessage: 'Term abbreviation',
                  },
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
                  fullName: {
                    id: 'field.places_common.nameNote.fullName',
                    defaultMessage: 'Term note',
                  },
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
                dataType: DATA_TYPE_STRUCTURED_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.places_common.nameDateGroup.fullName',
                    defaultMessage: 'Term date',
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
            termSource: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.places_common.termSource.fullName',
                    defaultMessage: 'Term source',
                  },
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
                  fullName: {
                    id: 'field.places_common.termSourceDetail.fullName',
                    defaultMessage: 'Term source detail',
                  },
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
                  fullName: {
                    id: 'field.places_common.termSourceID.fullName',
                    defaultMessage: 'Term source ID',
                  },
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
                  fullName: {
                    id: 'field.places_common.termSourceNote.fullName',
                    defaultMessage: 'Term source note',
                  },
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
                dataType: DATA_TYPE_STRUCTURED_DATE,
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
                  fullName: {
                    id: 'field.places_common.ownershipNote.fullName',
                    defaultMessage: 'Ownership note',
                  },
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
        minDistanceAboveSurfaceInMeters: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.places_common.minDistanceAboveSurfaceInMeters.name',
                defaultMessage: 'Min distance above surface (m)',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        maxDistanceAboveSurfaceInMeters: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.places_common.maxDistanceAboveSurfaceInMeters.name',
                defaultMessage: 'Max distance above surface (m)',
              },
            }),
            view: {
              type: TextInput,
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
        placeGeoRefGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          placeGeoRefGroup: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                fullName: {
                  id: 'field.places_common.placeGeoRefGroup.fullName',
                  defaultMessage: 'Georeference',
                },
              }),
              view: {
                type: CompoundInput,
              },
            },
            decimalLatitude: {
              [config]: {
                dataType: DATA_TYPE_FLOAT,
                messages: defineMessages({
                  fullName: {
                    id: 'field.places_common.decimalLatitude.fullName',
                    defaultMessage: 'Georeference decimal latitude',
                  },
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
                  fullName: {
                    id: 'field.places_common.decimalLongitude.fullName',
                    defaultMessage: 'Georeference decimal longitude',
                  },
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
                  fullName: {
                    id: 'field.places_common.geodeticDatum.fullName',
                    defaultMessage: 'Georeference datum',
                  },
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
                  fullName: {
                    id: 'field.places_common.coordUncertaintyInMeters.fullName',
                    defaultMessage: 'Georeference uncertainty (m)',
                  },
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
                  fullName: {
                    id: 'field.places_common.coordPrecision.fullName',
                    defaultMessage: 'Georeference precision',
                  },
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
                  fullName: {
                    id: 'field.places_common.pointRadiusSpatialFit.fullName',
                    defaultMessage: 'Georeference point radius spatial fit',
                  },
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
                  fullName: {
                    id: 'field.places_common.footprintWKT.fullName',
                    defaultMessage: 'Georeference footprint WKT',
                  },
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
                  fullName: {
                    id: 'field.places_common.footprintSRS.fullName',
                    defaultMessage: 'Georeference footprint SRS',
                  },
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
                  fullName: {
                    id: 'field.places_common.footprintSpatialFit.fullName',
                    defaultMessage: 'Georeference footprint spatial fit',
                  },
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
                dataType: DATA_TYPE_STRUCTURED_DATE,
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
                  fullName: {
                    id: 'field.places_common.geoRefProtocol.fullName',
                    defaultMessage: 'Georeference protocol',
                  },
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
                  fullName: {
                    id: 'field.places_common.geoRefSource.fullName',
                    defaultMessage: 'Georeference source',
                  },
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
                  fullName: {
                    id: 'field.places_common.geoRefVerificationStatus.fullName',
                    defaultMessage: 'Georeference verification',
                  },
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
                  fullName: {
                    id: 'field.places_common.geoRefRemarks.fullName',
                    defaultMessage: 'Georeference remarks',
                  },
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
                  fullName: {
                    id: 'field.places_common.geoRefPlaceName.fullName',
                    defaultMessage: 'Georeference place name',
                  },
                  name: {
                    id: 'field.places_common.geoRefPlaceName.name',
                    defaultMessage: 'Place name',
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
