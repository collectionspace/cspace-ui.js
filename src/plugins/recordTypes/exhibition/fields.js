import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    OptionPickerInput,
    StructuredDateInput,
    TermPickerInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_DATE,
    DATA_TYPE_STRUCTURED_DATE,
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
              inUse: {
                id: 'field.exhibitions_common.exhibitionNumber.inUse',
                defaultMessage: 'The exhibition number {value} is in use by another record.',
              },
              name: {
                id: 'field.exhibitions_common.exhibitionNumber.name',
                defaultMessage: 'Exhibition number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'exhibitions_common:exhibitionNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'exhibition',
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
                  fullName: {
                    id: 'field.exhibitions_common.venue.fullName',
                    defaultMessage: 'Venue name',
                  },
                  name: {
                    id: 'field.exhibitions_common.venue.name',
                    defaultMessage: 'Name',
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
                  fullName: {
                    id: 'field.exhibitions_common.venueOpeningDate.fullName',
                    defaultMessage: 'Venue opening date',
                  },
                  name: {
                    id: 'field.exhibitions_common.venueOpeningDate.name',
                    defaultMessage: 'Opening date',
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
                  fullName: {
                    id: 'field.exhibitions_common.venueClosingDate.fullName',
                    defaultMessage: 'Venue closing date',
                  },
                  name: {
                    id: 'field.exhibitions_common.venueClosingDate.name',
                    defaultMessage: 'Closing date',
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
                  fullName: {
                    id: 'field.exhibitions_common.venueAttendance.fullName',
                    defaultMessage: 'Venue attendance',
                  },
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
            venueUrl: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.exhibitions_common.venueUrl.fullName',
                    defaultMessage: 'Venue web address',
                  },
                  name: {
                    id: 'field.exhibitions_common.venueUrl.name',
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
                  fullName: {
                    id: 'field.exhibitions_common.workingGroupTitle.fullName',
                    defaultMessage: 'Working group title',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.workingGroupNote.fullName',
                    defaultMessage: 'Working group note',
                  },
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
                    fullName: {
                      id: 'field.exhibitions_common.exhibitionPersonGroup.fullName',
                      defaultMessage: 'Working group member',
                    },
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
                      fullName: {
                        id: 'field.exhibitions_common.exhibitionPerson.fullName',
                        defaultMessage: 'Working group member name',
                      },
                      name: {
                        id: 'field.exhibitions_common.exhibitionPerson.name',
                        defaultMessage: 'Name',
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
                  fullName: {
                    id: 'field.exhibitions_common.galleryRotationName.fullName',
                    defaultMessage: 'Gallery rotation name',
                  },
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
                dataType: DATA_TYPE_STRUCTURED_DATE,
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
                dataType: DATA_TYPE_STRUCTURED_DATE,
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
                  fullName: {
                    id: 'field.exhibitions_common.galleryRotationNote.fullName',
                    defaultMessage: 'Gallery rotation note',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionReference.fullName',
                    defaultMessage: 'Bibliographic reference',
                  },
                  name: {
                    id: 'field.exhibitions_common.exhibitionReference.name',
                    defaultMessage: 'Reference',
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionReferenceNote.fullName',
                    defaultMessage: 'Bibliographic reference note',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionSectionName.fullName',
                    defaultMessage: 'Exhibition section name',
                  },
                  name: {
                    id: 'field.exhibitions_common.exhibitionSectionName.name',
                    defaultMessage: 'Name',
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionSectionLocation.fullName',
                    defaultMessage: 'Exhibition section location',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionSectionObjects.fullName',
                    defaultMessage: 'Exhibition section objects',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionSectionNote.fullName',
                    defaultMessage: 'Exhibition section note',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionStatus.fullName',
                    defaultMessage: 'Exhibition status',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionStatusDate.fullName',
                    defaultMessage: 'Exhibition status date',
                  },
                  name: {
                    id: 'field.exhibitions_common.exhibitionStatusDate.name',
                    defaultMessage: 'Date',
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionStatusNote.fullName',
                    defaultMessage: 'Exhibition status note',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionObjectNumber.fullName',
                    defaultMessage: 'Object number',
                  },
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectNumber.name',
                    defaultMessage: 'Number',
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionObjectName.fullName',
                    defaultMessage: 'Object name',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionObjectConsCheckDate.fullName',
                    defaultMessage: 'Object cons. check',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionObjectConsTreatment.fullName',
                    defaultMessage: 'Object cons. treatment',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionObjectMount.fullName',
                    defaultMessage: 'Object mount',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionObjectSection.fullName',
                    defaultMessage: 'Object section',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionObjectCase.fullName',
                    defaultMessage: 'Object case',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionObjectSeqNum.fullName',
                    defaultMessage: 'Object seq. #',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionObjectRotation.fullName',
                    defaultMessage: 'Object rotation',
                  },
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
                  fullName: {
                    id: 'field.exhibitions_common.exhibitionObjectNote.fullName',
                    defaultMessage: 'Object note',
                  },
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
