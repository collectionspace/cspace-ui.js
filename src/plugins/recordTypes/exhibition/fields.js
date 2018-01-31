import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
    TermPickerInput,
    StructuredDateInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATE,
  } = pluginContext.dataTypes;

  const {
    extensions,
  } = pluginContext.config;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:exhibitions_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:exhibitions_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/exhibition',
          },
        },
        exhibitionNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.exhibitionNumber.name',
                defaultMessage: 'Exhibition number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'exhibition',
              },
            },
          },
        },
        type: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.type.name',
                defaultMessage: 'Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'exhibitiontype',
              },
            },
          },
        },
        title: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.title.name',
                defaultMessage: 'Title',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        sponsors: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          sponsor: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exhibitions_common.sponsor.name',
                  defaultMessage: 'Sponsor',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,person/shared,person/ulan,organization/local,organization/shared,organization/ulan',
                },
              },
            },
          },
        },
        organizers: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          organizer: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exhibitions_common.organizer.name',
                  defaultMessage: 'Organizer',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,person/shared,person/ulan,organization/local,organization/shared,organization/ulan',
                },
              },
            },
          },
        },
        venueGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          venueGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exhibitions_common.venueGroup.name',
                  defaultMessage: 'Venue',
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
            venue: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.venue.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.exhibitions_common.venue.fullName',
                    defaultMessage: 'Venue name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'organization/local,organization/shared,organization/ulan,location/local,location/offsite,place/local,place/shared,place/tgn',
                  },
                },
              },
            },
            venueOpeningDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.venueOpeningDate.name',
                    defaultMessage: 'Opening date',
                  },
                  fullName: {
                    id: 'field.exhibitions_common.venueOpeningDate.fullName',
                    defaultMessage: 'Venue opening date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            venueClosingDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.venueClosingDate.name',
                    defaultMessage: 'Closing date',
                  },
                  fullName: {
                    id: 'field.exhibitions_common.venueClosingDate.fullName',
                    defaultMessage: 'Venue closing date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            venueAttendance: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.venueAttendance.name',
                    defaultMessage: 'Attendance',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            venueURL: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.venueURL.name',
                    defaultMessage: 'Web address',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        workingGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          workingGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exhibitions_common.workingGroup.name',
                  defaultMessage: 'Working group',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            workingGroupTitle: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.workingGroupTitle.name',
                    defaultMessage: 'Title',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            workingGroupNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.workingGroupNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionPersonGroupList: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              exhibitionPersonGroup: {
                [config]: {
                  messages: defineMessages({
                    name: {
                      id: 'field.exhibitions_common.exhibitionPersonGroup.name',
                      defaultMessage: 'Member',
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
                exhibitionPerson: {
                  [config]: {
                    messages: defineMessages({
                      name: {
                        id: 'field.exhibitions_common.exhibitionPerson.name',
                        defaultMessage: 'Name',
                      },
                      fullName: {
                        id: 'field.exhibitions_common.exhibitionPerson.fullName',
                        defaultMessage: 'Working group member name',
                      },
                    }),
                    view: {
                      type: AutocompleteInput,
                      props: {
                        source: 'person/local,person/shared,person/ulan,organization/local,organization/shared,organization/ulan',
                      },
                    },
                  },
                },
                exhibitionPersonRole: {
                  [config]: {
                    messages: defineMessages({
                      fullName: {
                        id: 'field.exhibitions_common.exhibitionPersonRole.fullName',
                        defaultMessage: 'Working group member role',
                      },
                      name: {
                        id: 'field.exhibitions_common.exhibitionPersonRole.name',
                        defaultMessage: 'Role',
                      },
                    }),
                    view: {
                      type: TermPickerInput,
                      props: {
                        source: 'exhibitionpersonrole',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        planningNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.planningNote.name',
                defaultMessage: 'Planning note',
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
        curatorialNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.curatorialNote.name',
                defaultMessage: 'Curatorial note',
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
        generalNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.generalNote.name',
                defaultMessage: 'General note',
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
        boilerplateText: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.boilerplateText.name',
                defaultMessage: 'Boilerplate text',
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
        galleryRotationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          galleryRotationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exhibitions_common.galleryRotationGroup.name',
                  defaultMessage: 'Gallery rotation',
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
            galleryRotationName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.galleryRotationName.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            galleryRotationStartDateGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.exhibitions_common.galleryRotationStartDateGroup.fullName',
                    defaultMessage: 'Gallery rotation start date',
                  },
                  name: {
                    id: 'field.exhibitions_common.galleryRotationStartDateGroup.name',
                    defaultMessage: 'Start date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
            galleryRotationEndDateGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.exhibitions_common.galleryRotationEndDateGroup.fullName',
                    defaultMessage: 'Gallery rotation end date',
                  },
                  name: {
                    id: 'field.exhibitions_common.galleryRotationEndDateGroup.name',
                    defaultMessage: 'End date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
            galleryRotationNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.galleryRotationNote.name',
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
        exhibitionReferenceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          exhibitionReferenceGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exhibitions_common.exhibitionReferenceGroup.name',
                  defaultMessage: 'Bibliographic reference',
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
            exhibitionReference: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionReference.name',
                    defaultMessage: 'Reference',
                  },
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionReference.fullName',
                    defaultMessage: 'Bibliographic reference',
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
            exhibitionReferenceType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionReferenceType.fullName',
                    defaultMessage: 'Bibliographic reference type',
                  },
                  name: {
                    id: 'field.exhibitions_common.exhibitionReferenceType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'exhibitionreferencetype',
                  },
                },
              },
            },
            exhibitionReferenceNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionReferenceNote.name',
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
        exhibitionSectionGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          exhibitionSectionGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exhibitions_common.exhibitionSectionGroup.name',
                  defaultMessage: 'Exhibition section',
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
            exhibitionSectionName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionSectionName.name',
                    defaultMessage: 'Section',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionSectionLocation: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionSectionLocation.name',
                    defaultMessage: 'Location',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionSectionObjects: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionSectionObjects.name',
                    defaultMessage: 'Objects',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionSectionNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionSectionNote.name',
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
        exhibitionStatusGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          exhibitionStatusGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exhibitions_common.exhibitionStatusGroup.name',
                  defaultMessage: 'Exhibition status',
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
            exhibitionStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'exhibitionstatus',
                  },
                },
              },
            },
            exhibitionStatusDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionStatusDate.name',
                    defaultMessage: 'Date',
                  },
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionStatusDate.fullName',
                    defaultMessage: 'Exhibition status date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            exhibitionStatusNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionStatusNote.name',
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
        exhibitionObjectGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          exhibitionObjectGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exhibitions_common.exhibitionObjectGroup.name',
                  defaultMessage: 'Object checklist',
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
            exhibitionObjectNumber: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectNumber.name',
                    defaultMessage: 'Object',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionObjectName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectName.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionObjectConsCheckDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectConsCheckDate.name',
                    defaultMessage: 'Cons. check',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            exhibitionObjectConsTreatment: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectConsTreatment.name',
                    defaultMessage: 'Cons. treatment',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'exhibitionConsTreatmentStatuses',
                  },
                },
              },
            },
            exhibitionObjectMount: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectMount.name',
                    defaultMessage: 'Mount',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'exhibitionMountStatuses',
                  },
                },
              },
            },
            exhibitionObjectSection: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectSection.name',
                    defaultMessage: 'Section',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionObjectCase: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectCase.name',
                    defaultMessage: 'Case',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionObjectSeqNum: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectSeqNum.name',
                    defaultMessage: 'Seq. #',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionObjectRotation: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectRotation.name',
                    defaultMessage: 'Rotation',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionObjectNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectNote.name',
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
