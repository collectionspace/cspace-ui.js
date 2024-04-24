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
            defaultChildSubpath: 'ns2:nagpraclaims_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:nagpraclaims_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/nagpraclaim',
          },
        },
        claimNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.nagpraclaims_common.claimNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.nagpraclaims_common.claimNumber.name',
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
              fieldName: 'nagpraclaims_common:claimNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'nagpraclaim',
              },
            },
          },
        },
        title: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.nagpraclaims_common.title.name',
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
                id: 'field.nagpraclaims_common.claimDate.name',
                defaultMessage: 'Origination date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        alternativeTitleGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          alternativeTitleGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.nagpraclaims_common.alternativeTitleGroup.name',
                  defaultMessage: 'Alternative title',
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
            alternativeTitle: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagpraclaims_common.alternativeTitle.fullName',
                    defaultMessage: 'Alternative title name/number',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.alternativeTitle.name',
                    defaultMessage: 'Name/number',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            alternativeTitleNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagpraclaims_common.alternativeTitleNote.fullName',
                    defaultMessage: 'Alternative title note',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.alternativeTitleNote.name',
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
                  id: 'field.nagpraclaims_common.type.name',
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
                  id: 'field.nagpraclaims_common.note.name',
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
                  id: 'field.nagpraclaims_common.treatmentNote.name',
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
                  id: 'field.nagpraclaims_common.partiesInvolvedGroup.name',
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
                    id: 'field.nagpraclaims_common.involvedParty.fullName',
                    defaultMessage: 'Party involved name',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.involvedParty.name',
                    defaultMessage: 'Name',
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
                    id: 'field.nagpraclaims_common.involvedOnBehalfOf.fullName',
                    defaultMessage: 'Party involved on behalf of',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.involvedOnBehalfOf.name',
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
                    id: 'field.nagpraclaims_common.involvedRole.fullName',
                    defaultMessage: 'Party involved role',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.involvedRole.name',
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
                  id: 'field.nagpraclaims_common.geographicPlaceGroup.name',
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
                    id: 'field.nagpraclaims_common.geographicPlace.fullName',
                    defaultMessage: 'Place represented name',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.geographicPlace.name',
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
                    id: 'field.nagpraclaims_common.geographicPlaceNote.fullName',
                    defaultMessage: 'Place represented note',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.geographicPlaceNote.name',
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
                  id: 'field.nagpraclaims_common.timePeriodGroup.name',
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
                    id: 'field.nagpraclaims_common.timePeriod.fullName',
                    defaultMessage: 'Time period era',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.timePeriod.name',
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
                    id: 'field.nagpraclaims_common.timePeriodNote.fullName',
                    defaultMessage: 'Time period note',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.timePeriodNote.name',
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
                  id: 'field.nagpraclaims_common.culturalGroup.name',
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
                    id: 'field.nagpraclaims_common.culture.fullName',
                    defaultMessage: 'Cultural group name',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.culture.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'concept/culture',
                  },
                },
              },
            },
            cultureNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagpraclaims_common.cultureNote.fullName',
                    defaultMessage: 'Cultural group note',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.cultureNote.name',
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
                  id: 'field.nagpraclaims_common.archaeologicalSiteGroup.name',
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
                    id: 'field.nagpraclaims_common.archaeologicalSite.fullName',
                    defaultMessage: 'Archaeological site name',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.archaeologicalSite.name',
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
                    id: 'field.nagpraclaims_common.archaeologicalSiteNote.fullName',
                    defaultMessage: 'Archaeological site note',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.archaeologicalSiteNote.name',
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
        nagpraStatusGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          nagpraStatusGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.nagpraclaims_common.nagpraStatusGroup.name',
                  defaultMessage: 'Claim status',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            statusGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagpraclaims_common.statusGroup.fullName',
                    defaultMessage: 'Claim status group',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.statusGroup.name',
                    defaultMessage: 'Group',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            statusIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagpraclaims_common.statusIndividual.fullName',
                    defaultMessage: 'Claim status individual',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.statusIndividual.name',
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
                    id: 'field.nagpraclaims_common.status.fullName',
                    defaultMessage: 'Claim status state',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.status.name',
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
                    id: 'field.nagpraclaims_common.statusDate.fullName',
                    defaultMessage: 'Claim status date',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.statusDate.name',
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
                    id: 'field.nagpraclaims_common.statusNote.fullName',
                    defaultMessage: 'Claim status note',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.statusNote.name',
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
        nagpraDocumentationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          nagpraDocumentationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.nagpraclaims_common.nagpraDocumentationGroup.name',
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
                    id: 'field.nagpraclaims_common.documentationNote.fullName',
                    defaultMessage: 'Claim documentation note',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.documentationNote.name',
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
                    id: 'field.nagpraclaims_common.documentationDate.fullName',
                    defaultMessage: 'Claim documentation date',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.documentationDate.name',
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
                    id: 'field.nagpraclaims_common.documentationStatus.fullName',
                    defaultMessage: 'Claim documentation status',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.documentationStatus.name',
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
                    id: 'field.nagpraclaims_common.documentationIndividual.fullName',
                    defaultMessage: 'Claim documentation individual',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.documentationIndividual.name',
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
            documentationGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagpraclaims_common.documentationGroup.fullName',
                    defaultMessage: 'Claim documentation group',
                  },
                  name: {
                    id: 'field.nagpraclaims_common.documentationGroup.name',
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
