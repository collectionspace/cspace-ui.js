import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    DateInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
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
            defaultChildSubpath: 'ns2:nagprainventories_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:nagprainventories_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/nagprainventory',
          },
        },
        inventoryNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.nagprainventories_common.inventoryNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.nagprainventories_common.inventoryNumber.name',
                defaultMessage: 'Inventory/documentation Number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'nagprainventories_common:inventoryNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'nagprainventory',
              },
            },
          },
        },
        originationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.nagprainventories_common.originationDate.name',
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
                  id: 'field.nagprainventories_common.title.name',
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
        noticeTypes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          noticeType: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.nagprainventories_common.noticeType.name',
                  defaultMessage: 'Notice type',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'nagpranoticetype',
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
                  id: 'field.nagprainventories_common.consultationNote.name',
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
                  id: 'field.nagprainventories_common.treatmentNote.name',
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
                  id: 'field.nagprainventories_common.partiesInvolvedGroup.name',
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
                    id: 'field.nagprainventories_common.involvedParty.fullName',
                    defaultMessage: 'Parties involved person',
                  },
                  name: {
                    id: 'field.nagprainventories_common.involvedParty.name',
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
                    id: 'field.nagprainventories_common.involvedOnBehalfOf.fullName',
                    defaultMessage: 'Parties involved on behalf of',
                  },
                  name: {
                    id: 'field.nagprainventories_common.involvedOnBehalfOf.name',
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
                    id: 'field.nagprainventories_common.involvedRole.fullName',
                    defaultMessage: 'Parties involved role',
                  },
                  name: {
                    id: 'field.nagprainventories_common.involvedRole.name',
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
        culturalAffiliationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          culturalAffiliationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.nagprainventories_common.culturalAffiliationGroup.name',
                  defaultMessage: 'Inventory cultural affiliation',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: false,
                },
              },
            },
            tribeOrNation: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagprainventories_common.tribeOrNation.fullName',
                    defaultMessage: 'Inventory cultural affiliation tribe/nation',
                  },
                  name: {
                    id: 'field.nagprainventories_common.tribeOrNation.name',
                    defaultMessage: 'Tribe/nation',
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
                    id: 'field.nagprainventories_common.includeInNotice.fullName',
                    defaultMessage: 'Inventory cultural affiliation include in notice',
                  },
                  name: {
                    id: 'field.nagprainventories_common.includeInNotice.name',
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
                      id: 'field.nagprainventories_common.determinedBy.fullName',
                      defaultMessage: 'Inventory cultural affiliation determined by',
                    },
                    name: {
                      id: 'field.nagprainventories_common.determinedBy.name',
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
                    id: 'field.nagprainventories_common.determinationDate.fullName',
                    defaultMessage: 'Inventory cultural affiliation determination date',
                  },
                  name: {
                    id: 'field.nagprainventories_common.determinationDate.name',
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
                    id: 'field.nagprainventories_common.basisOfDetermination.fullName',
                    defaultMessage: 'Inventory cultural affiliation basis of determination',
                  },
                  name: {
                    id: 'field.nagprainventories_common.basisOfDetermination.name',
                    defaultMessage: 'Basis of determination',
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
            determinationNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagprainventories_common.determinationNote.fullName',
                    defaultMessage: 'Inventory cultural affiliation determination note',
                  },
                  name: {
                    id: 'field.nagprainventories_common.determinationNote.name',
                    defaultMessage: 'Determination note',
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
        inventoryStatusGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          inventoryStatusGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.nagprainventories_common.inventoryStatusGroup.name',
                  defaultMessage: 'Inventory status',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: false,
                },
              },
            },
            inventoryGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagprainventories_common.inventoryGroup.fullName',
                    defaultMessage: 'Inventory status group',
                  },
                  name: {
                    id: 'field.nagprainventories_common.inventoryGroup.name',
                    defaultMessage: 'Group',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            inventoryIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagprainventories_common.inventoryIndividual.fullName',
                    defaultMessage: 'Inventory status individual',
                  },
                  name: {
                    id: 'field.nagprainventories_common.inventoryIndividual.name',
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
            inventoryStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagprainventories_common.inventoryStatus.fullName',
                    defaultMessage: 'Inventory status',
                  },
                  name: {
                    id: 'field.nagprainventories_common.inventoryStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'nagprainvstate',
                  },
                },
              },
            },
            inventoryDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagprainventories_common.inventoryDate.fullName',
                    defaultMessage: 'Inventory status date',
                  },
                  name: {
                    id: 'field.nagprainventories_common.inventoryDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            inventoryNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.nagprainventories_common.inventoryNote.fullName',
                    defaultMessage: 'Inventory status note',
                  },
                  name: {
                    id: 'field.nagprainventories_common.inventoryNote.name',
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
                  id: 'field.nagprainventories_common.geographicPlaceGroup.name',
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
                    id: 'field.nagprainventories_common.geographicPlace.fullName',
                    defaultMessage: 'Place represented name',
                  },
                  name: {
                    id: 'field.nagprainventories_common.geographicPlace.name',
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
                    id: 'field.nagprainventories_common.geographicPlaceNote.fullName',
                    defaultMessage: 'Place represented note',
                  },
                  name: {
                    id: 'field.nagprainventories_common.geographicPlaceNote.name',
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
                  id: 'field.nagprainventories_common.culturalGroup.name',
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
                    id: 'field.nagprainventories_common.culture.fullName',
                    defaultMessage: 'Cultural group name',
                  },
                  name: {
                    id: 'field.nagprainventories_common.culture.name',
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
                    id: 'field.nagprainventories_common.cultureNote.fullName',
                    defaultMessage: 'Cultural group note',
                  },
                  name: {
                    id: 'field.nagprainventories_common.cultureNote.name',
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
                  id: 'field.nagprainventories_common.archaeologicalSiteGroup.name',
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
                    id: 'field.nagprainventories_common.archaeologicalSite.fullName',
                    defaultMessage: 'Archaeological site name',
                  },
                  name: {
                    id: 'field.nagprainventories_common.archaeologicalSite.name',
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
                    id: 'field.nagprainventories_common.archaeologicalSiteNote.fullName',
                    defaultMessage: 'Archaeological site note',
                  },
                  name: {
                    id: 'field.nagprainventories_common.archaeologicalSiteNote.name',
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
                  id: 'field.nagprainventories_common.timePeriodGroup.name',
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
                    id: 'field.nagprainventories_common.timePeriod.fullName',
                    defaultMessage: 'Time period name',
                  },
                  name: {
                    id: 'field.nagprainventories_common.timePeriod.name',
                    defaultMessage: 'Name',
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
                    id: 'field.nagprainventories_common.timePeriodNote.fullName',
                    defaultMessage: 'Time period note',
                  },
                  name: {
                    id: 'field.nagprainventories_common.timePeriodNote.name',
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
