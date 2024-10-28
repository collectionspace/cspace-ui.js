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
            defaultChildSubpath: 'ns2:repatriationrequests_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:repatriationrequests_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/repatriationrequest',
          },
        },
        requestNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.repatriationrequests_common.requestNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.repatriationrequests_common.requestNumber.name',
                defaultMessage: 'Repatriation Request number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'repatriationrequests_common:requestNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'repatriationrequest',
              },
            },
          },
        },
        title: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.repatriationrequests_common.title.name',
                defaultMessage: 'Title',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        requestDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.repatriationrequests_common.requestDate.name',
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
                  id: 'field.repatriationrequests_common.alternativeIdentifierGroup.name',
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
                    id: 'field.repatriationrequests_common.alternativeIdentifier.fullName',
                    defaultMessage: 'Alternative identifier value',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.alternativeIdentifier.name',
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
                    id: 'field.repatriationrequests_common.alternativeIdentifierNote.fullName',
                    defaultMessage: 'Alternative identifier note',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.alternativeIdentifierNote.name',
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
                  id: 'field.repatriationrequests_common.type.name',
                  defaultMessage: 'Type',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'requesttype',
                },
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
                  id: 'field.repatriationrequests_common.note.name',
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
                  id: 'field.repatriationrequests_common.treatmentNote.name',
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
                  id: 'field.repatriationrequests_common.partiesInvolvedGroup.name',
                  defaultMessage: 'Parties involved',
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
                    id: 'field.repatriationrequests_common.involvedParty.fullName',
                    defaultMessage: 'Parties involved person',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.involvedParty.name',
                    defaultMessage: 'Person',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local',
                  },
                },
              },
            },
            involvedOnBehalfOf: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationrequests_common.involvedOnBehalfOf.fullName',
                    defaultMessage: 'Parties involved on behalf of',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.involvedOnBehalfOf.name',
                    defaultMessage: 'On behalf of',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'organization/local',
                  },
                },
              },
            },
            involvedRole: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationrequests_common.involvedRole.fullName',
                    defaultMessage: 'Parties involved role',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.involvedRole.name',
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
                  id: 'field.repatriationrequests_common.geographicPlaceGroup.name',
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
                    id: 'field.repatriationrequests_common.geographicPlace.fullName',
                    defaultMessage: 'Place represented name',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.geographicPlace.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'place/local',
                  },
                },
              },
            },
            geographicPlaceNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationrequests_common.geographicPlaceNote.fullName',
                    defaultMessage: 'Place represented note',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.geographicPlaceNote.name',
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
                  id: 'field.repatriationrequests_common.timePeriodGroup.name',
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
                    id: 'field.repatriationrequests_common.timePeriod.fullName',
                    defaultMessage: 'Time period era',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.timePeriod.name',
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
                    id: 'field.repatriationrequests_common.timePeriodNote.fullName',
                    defaultMessage: 'Time period note',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.timePeriodNote.name',
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
                  id: 'field.repatriationrequests_common.culturalGroup.name',
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
                    id: 'field.repatriationrequests_common.culture.fullName',
                    defaultMessage: 'Cultural group name',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.culture.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'concept/ethculture,concept/archculture',
                  },
                },
              },
            },
            cultureNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationrequests_common.cultureNote.fullName',
                    defaultMessage: 'Cultural group note',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.cultureNote.name',
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
                  id: 'field.repatriationrequests_common.archaeologicalSiteGroup.name',
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
                    id: 'field.repatriationrequests_common.archaeologicalSite.fullName',
                    defaultMessage: 'Archaeological site name',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.archaeologicalSite.name',
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
                    id: 'field.repatriationrequests_common.archaeologicalSiteNote.fullName',
                    defaultMessage: 'Archaeological site note',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.archaeologicalSiteNote.name',
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
                  id: 'field.repatriationrequests_common.statusGroup.fullName',
                  defaultMessage: 'Repatriation Request status',
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
                    id: 'field.repatriationrequests_common.statusGroupType.fullName',
                    defaultMessage: 'Repatriation Request status group',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.statusGroupType.name',
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
                    id: 'field.repatriationrequests_common.statusIndividual.fullName',
                    defaultMessage: 'Repatriation Request status individual',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.statusIndividual.name',
                    defaultMessage: 'Individual',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local',
                  },
                },
              },
            },
            status: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationrequests_common.status.fullName',
                    defaultMessage: 'Repatriation Request status',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.status.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'deaccessionapprovalstatus',
                  },
                },
              },
            },
            statusDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationrequests_common.statusDate.fullName',
                    defaultMessage: 'Repatriation Request status date',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.statusDate.name',
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
                    id: 'field.repatriationrequests_common.statusNote.fullName',
                    defaultMessage: 'Repatriation Request status note',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.statusNote.name',
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
                  id: 'field.repatriationrequests_common.documentationGroup.fullName',
                  defaultMessage: 'Repatriation Request documentation status',
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
                    id: 'field.repatriationrequests_common.documentationNote.fullName',
                    defaultMessage: 'Repatriation Request documentation status note',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.documentationNote.name',
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
                    id: 'field.repatriationrequests_common.documentationDate.fullName',
                    defaultMessage: 'Repatriation Request documentation status date',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.documentationDate.name',
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
                    id: 'field.repatriationrequests_common.documentationStatus.fullName',
                    defaultMessage: 'Repatriation Request documentation status',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.documentationStatus.name',
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
                    id: 'field.repatriationrequests_common.documentationIndividual.fullName',
                    defaultMessage: 'Repatriation Request documentation status individual',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.documentationIndividual.name',
                    defaultMessage: 'Individual',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local',
                  },
                },
              },
            },
            documentationGroupType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.repatriationrequests_common.documentationGroupType.fullName',
                    defaultMessage: 'Repatriation Request documentation status group',
                  },
                  name: {
                    id: 'field.repatriationrequests_common.documentationGroupType.name',
                    defaultMessage: 'Group',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'documentationgroup',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
};
