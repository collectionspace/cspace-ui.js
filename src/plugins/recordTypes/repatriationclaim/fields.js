import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    TextInput,
    TermPickerInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_DATE,
  } = configContext.dataTypes;

  const {
    extensions,
  } = configContext.config;

  const {
    validateNotInUse,
  } = configContext.validationHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:repatriationclaims_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:repatriationclaims_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/repatriationclaim',
          },
        },
        claimNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.repatriationclaims_common.claimNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.repatriationclaims_common.claimNumber.name',
                defaultMessage: 'Claim number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'repatriationclaims_common:claimNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'repatriationclaim',
              },
            },
          },
        },
        title: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.repatriationclaims_common.title.name',
                defaultMessage: 'Title',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        claimDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.repatriationclaims_common.claimDate.name',
                defaultMessage: 'Origination date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        alternativeIdentifierGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          alternativeIdentifierGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.repatriationclaims_common.alternativeIdentifierGroup.name',
                  defaultMessage: 'Alternative identifier',
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
            alternativeIdentifier: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.alternativeIdentifier.fullName',
                    defaultMessage: 'Alternative identifier value',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.alternativeIdentifier.name',
                    defaultMessage: 'Value',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            alternativeIdentifierNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.alternativeIdentifierNote.fullName',
                    defaultMessage: 'Alternative identifier note',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.alternativeIdentifierNote.name',
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
        types: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          type: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.repatriationclaims_common.type.name',
                  defaultMessage: 'Type',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        notes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          note: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.repatriationclaims_common.note.name',
                  defaultMessage: 'Note',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
                props: {
                  multiline: true,
                },
              },
            },
          },
        },
        treatmentNotes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          treatmentNote: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.repatriationclaims_common.treatmentNote.name',
                  defaultMessage: 'Treatment note',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
                props: {
                  multiline: true,
                },
              },
            },
          },
        },
        partiesInvolvedGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          partiesInvolvedGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.repatriationclaims_common.partiesInvolvedGroup.name',
                  defaultMessage: 'Party involved',
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
            involvedParty: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.involvedParty.fullName',
                    defaultMessage: 'Party involved name',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.involvedParty.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/ulan',
                  },
                },
              },
            },
            involvedOnBehalfOf: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.involvedOnBehalfOf.fullName',
                    defaultMessage: 'Party involved on behalf of',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.involvedOnBehalfOf.name',
                    defaultMessage: 'On behalf of',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'organization/local,organization/ulan',
                  },
                },
              },
            },
            involvedRole: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.involvedRole.fullName',
                    defaultMessage: 'Party involved role',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.involvedRole.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'nagprainvolvedrole',
                  },
                },
              },
            },
          },
        },
        geographicPlaceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          geographicPlaceGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.repatriationclaims_common.geographicPlaceGroup.name',
                  defaultMessage: 'Place represented',
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
            geographicPlace: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.geographicPlace.fullName',
                    defaultMessage: 'Place represented name',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.geographicPlace.name',
                    defaultMessage: 'Name',
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
            geographicPlaceNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.geographicPlaceNote.fullName',
                    defaultMessage: 'Place represented note',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.geographicPlaceNote.name',
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
        timePeriodGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          timePeriodGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.repatriationclaims_common.timePeriodGroup.name',
                  defaultMessage: 'Time period',
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
            timePeriod: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.timePeriod.fullName',
                    defaultMessage: 'Time period era',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.timePeriod.name',
                    defaultMessage: 'Era',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'chronology/era',
                  },
                },
              },
            },
            timePeriodNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.timePeriodNote.fullName',
                    defaultMessage: 'Time period note',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.timePeriodNote.name',
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
        culturalGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          culturalGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.repatriationclaims_common.culturalGroup.name',
                  defaultMessage: 'Cultural group',
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
            culture: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.culture.fullName',
                    defaultMessage: 'Cultural group name',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.culture.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'concept/ethculture',
                  },
                },
              },
            },
            cultureNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.cultureNote.fullName',
                    defaultMessage: 'Cultural group note',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.cultureNote.name',
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
        archaeologicalSiteGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          archaeologicalSiteGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.repatriationclaims_common.archaeologicalSiteGroup.name',
                  defaultMessage: 'Archaeological site',
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
            archaeologicalSite: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.archaeologicalSite.fullName',
                    defaultMessage: 'Archaeological site name',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.archaeologicalSite.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'place/archaeological',
                  },
                },
              },
            },
            archaeologicalSiteNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.archaeologicalSiteNote.fullName',
                    defaultMessage: 'Archaeological site note',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.archaeologicalSiteNote.name',
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
        statusGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          statusGroup: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.repatriationclaims_common.statusGroup.fullName',
                  defaultMessage: 'Claim status',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            statusGroupType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.statusGroupType.fullName',
                    defaultMessage: 'Claim status group',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.statusGroupType.name',
                    defaultMessage: 'Group',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'deaccessionapprovalgroup',
                  },
                },
              },
            },
            statusIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.statusIndividual.fullName',
                    defaultMessage: 'Claim status individual',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.statusIndividual.name',
                    defaultMessage: 'Individual',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/ulan',
                  },
                },
              },
            },
            status: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.status.fullName',
                    defaultMessage: 'Claim status state',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.status.name',
                    defaultMessage: 'State',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'nagprastatus',
                  },
                },
              },
            },
            statusDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.statusDate.fullName',
                    defaultMessage: 'Claim status date',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.statusDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            statusNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.statusNote.fullName',
                    defaultMessage: 'Claim status note',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.statusNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                  props: {
                    height: 46,
                    multiline: true,
                  },
                },
              },
            },
          },
        },
        documentationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          documentationGroup: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.repatriationclaims_common.documentationGroup.fullName',
                  defaultMessage: 'Claim documentation',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            documentationNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.documentationNote.fullName',
                    defaultMessage: 'Claim documentation note',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.documentationNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                  props: {
                    // double the height of a normal input box
                    height: 46,
                    multiline: true,
                  },
                },
              },
            },
            documentationDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.documentationDate.fullName',
                    defaultMessage: 'Claim documentation date',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.documentationDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            documentationStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.documentationStatus.fullName',
                    defaultMessage: 'Claim documentation status',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.documentationStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'nagpradocumentationstatus',
                  },
                },
              },
            },
            documentationIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.documentationIndividual.fullName',
                    defaultMessage: 'Claim documentation individual',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.documentationIndividual.name',
                    defaultMessage: 'Individual',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/ulan',
                  },
                },
              },
            },
            documentationGroupType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationclaims_common.documentationGroupType.fullName',
                    defaultMessage: 'Claim documentation group',
                  },
                  name: {
                    id: 'field.repatriationclaims_common.documentationGroupType.name',
                    defaultMessage: 'Group',
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
