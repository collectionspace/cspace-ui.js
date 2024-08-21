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
            defaultChildSubpath: 'ns2:summarydocumentations_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:summarydocumentations_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/summarydocumentation',
          },
        },
        documentationNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.summarydocumentations_common.documentationNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.summarydocumentations_common.documentationNumber.name',
                defaultMessage: 'Summary/documentation number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'summarydocumentations_common:documentationNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'summarydocumentation',
              },
            },
          },
        },
        originationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.summarydocumentations_common.originationDate.name',
                defaultMessage: 'Origination date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        titles: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          title: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.summarydocumentations_common.title.name',
                  defaultMessage: 'Title',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
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
                  id: 'field.summarydocumentations_common.type.name',
                  defaultMessage: 'Type',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'summarydocumentationtype',
                },
              },
            },
          },
        },
        consultationNotes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          consultationNote: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.summarydocumentations_common.consultationNote.name',
                  defaultMessage: 'Consultation note',
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
                  id: 'field.summarydocumentations_common.treatmentNote.name',
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
                  id: 'field.summarydocumentations_common.partiesInvolvedGroup.name',
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
                    id: 'field.summarydocumentations_common.involvedParty.fullName',
                    defaultMessage: 'Party involved person',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.involvedParty.name',
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
                    id: 'field.summarydocumentations_common.involvedOnBehalfOf.fullName',
                    defaultMessage: 'Party involved on behalf of',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.involvedOnBehalfOf.name',
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
                    id: 'field.summarydocumentations_common.involvedRole.fullName',
                    defaultMessage: 'Party involved role',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.involvedRole.name',
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
        affiliationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          affiliationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.summarydocumentations_common.affiliationGroup.name',
                  defaultMessage: 'Summary affiliation',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            tribeOrNation: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.summarydocumentations_common.tribeOrNation.fullName',
                    defaultMessage: 'Summary affiliation tribe/nation',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.tribeOrNation.name',
                    defaultMessage: 'Tribe/Nation',
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
            includeInNotice: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.summarydocumentations_common.includeInNotice.fullName',
                    defaultMessage: 'Summary affiliation include in notice',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.includeInNotice.name',
                    defaultMessage: 'Include in notice',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'nagpranotice',
                  },
                },
              },
            },
            determinedByList: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              determinedBy: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.summarydocumentations_common.determinedBy.fullName',
                      defaultMessage: 'Summary affiliation determined by',
                    },
                    name: {
                      id: 'field.summarydocumentations_common.determinedBy.name',
                      defaultMessage: 'Determined by',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: AutocompleteInput,
                    props: {
                      source: 'person/local,organization/local',
                    },
                  },
                },
              },
            },
            determinationDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.summarydocumentations_common.determinationDate.fullName',
                    defaultMessage: 'Summary affiliation determination date',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.determinationDate.name',
                    defaultMessage: 'Determination date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            basisOfDetermination: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.summarydocumentations_common.basisOfDetermination.fullName',
                    defaultMessage: 'Summary affiliation basis of determination',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.basisOfDetermination.name',
                    defaultMessage: 'Basis of determination',
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
            determinationNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.summarydocumentations_common.determinationNote.fullName',
                    defaultMessage: 'Summary affiliation determination note',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.determinationNote.name',
                    defaultMessage: 'Determination note',
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
                name: {
                  id: 'field.summarydocumentations_common.statusGroup.name',
                  defaultMessage: 'Summary status',
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
                    id: 'field.summarydocumentations_common.statusGroupType.fullName',
                    defaultMessage: 'Summary status group',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.statusGroupType.name',
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
                    id: 'field.summarydocumentations_common.statusIndividual.fullName',
                    defaultMessage: 'Summary status individual',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.statusIndividual.name',
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
                    id: 'field.summarydocumentations_common.status.fullName',
                    defaultMessage: 'Summary status',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.status.name',
                    defaultMessage: 'Status',
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
                    id: 'field.summarydocumentations_common.statusDate.fullName',
                    defaultMessage: 'Summary status date',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.statusDate.name',
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
                    id: 'field.summarydocumentations_common.statusNote.fullName',
                    defaultMessage: 'Summary status note',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.statusNote.name',
                    defaultMessage: 'Note',
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
                  id: 'field.summarydocumentations_common.geographicPlaceGroup.name',
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
                    id: 'field.summarydocumentations_common.geographicPlace.fullName',
                    defaultMessage: 'Place represented name',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.geographicPlace.name',
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
                    id: 'field.summarydocumentations_common.geographicPlaceNote.fullName',
                    defaultMessage: 'Place represented note',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.geographicPlaceNote.name',
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
                  id: 'field.summarydocumentations_common.timePeriodGroup.name',
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
                    id: 'field.summarydocumentations_common.timePeriod.fullName',
                    defaultMessage: 'Time period era',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.timePeriod.name',
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
                    id: 'field.summarydocumentations_common.timePeriodNote.fullName',
                    defaultMessage: 'Time period note',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.timePeriodNote.name',
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
                  id: 'field.summarydocumentations_common.culturalGroup.name',
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
                    id: 'field.summarydocumentations_common.culture.fullName',
                    defaultMessage: 'Cultural group name',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.culture.name',
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
                    id: 'field.summarydocumentations_common.cultureNote.fullName',
                    defaultMessage: 'Cultural group note',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.cultureNote.name',
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
                  id: 'field.summarydocumentations_common.archaeologicalSiteGroup.name',
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
                    id: 'field.summarydocumentations_common.archaeologicalSite.fullName',
                    defaultMessage: 'Archaeological site name',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.archaeologicalSite.name',
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
                    id: 'field.summarydocumentations_common.archaeologicalSiteNote.fullName',
                    defaultMessage: 'Archaeological site note',
                  },
                  name: {
                    id: 'field.summarydocumentations_common.archaeologicalSiteNote.name',
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
      },
    },
  };
};
