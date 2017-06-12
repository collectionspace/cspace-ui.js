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
    // URLInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATETIME,
    DATA_TYPE_LIST,
  } = pluginContext.dataTypes;

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
      // TODO: Define core fields in one place.
      'ns2:collectionspace_core': {
        createdAt: {
          [config]: {
            dataType: DATA_TYPE_DATETIME,
            view: {
              type: DateInput,
            },
          },
        },
        createdBy: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        updatedAt: {
          [config]: {
            dataType: DATA_TYPE_DATETIME,
            messages: defineMessages({
              name: {
                id: 'field.collectionspace_core.updatedAt.name',
                defaultMessage: 'Last updated time',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        updatedBy: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionspace_core.updatedBy.name',
                defaultMessage: 'Last updated by',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
      },
      'ns2:exhibitions_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/exhibition',
          },
        },
        exhibitionNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.exhibitionNumber.name',
                defaultMessage: 'Exhibition number'
              },
            }),
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
                defaultMessage: 'Exhibition type',
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
                defaultMessage: 'Exhibition title',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        sponsors: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.sponsors.name',
                defaultMessage: 'Exhibition sponsors',
              },
            }),
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
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,person/shared,person/ulan,organization/local,organization/shared,organization/ulan',
                  repeating: true,
                },
              },
            },
          },
        },
        organizers: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.organizers.name',
                defaultMessage: 'Exhibition organizers',
              },
            }),
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
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,person/shared,person/ulan,organization/local,organization/shared,organization/ulan',
                  repeating: true,
                },
              },
            },
          },
        },
        venueGroupList: {
          [config]: {
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.venueGroupList.name',
                defaultMessage: 'Venues',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          venueGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            venue: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.venue.name',
                    defaultMessage: 'Venue',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'organization/local,organization/shared,organization/ulan,location/local,location/offsite,place/local,place/shared,place/tgn'
                  },
                },
              },
            },
            venueOpeningDate: {
              [config]: {
                messages: defineMessages({
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
                messages: defineMessages({
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
                    defaultMessage: 'Web address'
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
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.workingGroupList.name',
                defaultMessage: 'Exhibition working group',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          workingGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            workingGroupTitle: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.workingGroupTitle.name',
                    defaultMessage: 'Working group title',
                  },
                }),
                view: {
                  type: TextInput
                },
              },
            },
            workingGroupNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.workingGroupNote.name',
                    defaultMessage: 'Notes',
                  },
                }),
                view: {
                  type: TextInput
                },
              },
            },
            exhibitionPersonGroupList: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionPersonGroupList.name',
                    defaultMessage: 'Working group persons'
                  },
                }),
                view: {
                  type: CompoundInput,
                },
              },
              exhibitionPersonGroup: {
                [config]: {
                  view: {
                    type: CompoundInput,
                    props: {
                      tabular: true,
                      repeating: true,
                    },
                  },
                },
                exhibitionPerson: {
                  [config]: {
                    messages: defineMessages({
                      name: {
                        id: 'field.exhibitions_common.exhibitionPerson.name',
                        defaultMessage: 'Person',
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
                defaultMessage: 'Planning notes',
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
                defaultMessage: 'Curatorial notes',
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
                defaultMessage: 'General notes',
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
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.galleryRotationGroupList.name',
                defaultMessage: 'Gallery rotations',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          galleryRotationGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            galleryRotationName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.galleryRotationName.name',
                    defaultMessage: 'Rotation name',
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
                  name: {
                    id: 'field.exhibitions_common.galleryRotationStartDateGroup.name',
                    defaultMessage: 'Start date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            galleryRotationEndDateGroup: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.galleryRotationEndDateGroup.name',
                    defaultMessage: 'End date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            galleryRotationNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.galleryRotationNote.name',
                    defaultMessage: 'Notes',
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
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.exhibitionReferenceGroupList.name',
                defaultMessage: 'Bibliographic references',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          exhibitionReferenceGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
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
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'citation/local,citation/shared,citation/worldcat'
                  },
                },
              },
            },
            exhibitionReferenceType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionReferenceType.name',
                    defaultMessage: 'Reference type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'exhibitionreferencetype'
                  },
                },
              },
            },
            exhibitionReferenceNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionReferenceNote.name',
                    defaultMessage: 'Reference note',
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
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.exhibitionSectionGroupList.name',
                defaultMessage: 'Exhibition sections',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          exhibitionSectionGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            exhibitionSectionName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionSectionName.name',
                    defaultMessage: 'Section'
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
                    defaultMessage: 'Location'
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
                    defaultMessage: 'Objects'
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
                    defaultMessage: 'Remarks'
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
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.exhibitionStatusGroupList.name',
                defaultMessage: 'Exhibition status',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          exhibitionStatusGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            exhibitionStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionStatus.name',
                    defaultMessage: 'Status'
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'exhibitionstatus'
                  },
                },
              },
            },
            exhibitionStatusDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionStatusDate.name',
                    defaultMessage: 'Status date'
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
                    id: 'field.exhibitions_common.exhibitionSectionNote.name',
                    defaultMessage: 'Remarks'
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
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.exhibitions_common.exhibitionObjectGroupList.name',
                defaultMessage: 'Object checklist',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          exhibitionObjectGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
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
                    source: 'exhibitionObjectConsTreatment',
                  },
                },
              },
            },
            exhibitionObjectMount: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.exhibitions_common.exhibitionObjectMount.name',
                    defaultMessage: 'Mount?',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'exhibitionObjectMount',
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
