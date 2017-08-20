import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    AutocompleteInput,
    CheckboxInput,
    CompoundInput,
    HierarchyInput,
    OptionPickerInput,
    StructuredDateInput,
    TextInput,
    TermPickerInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:persons_common',
          },
        },
      },
      'ns2:relations-common-list': {
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
                    id: 'hierarchyInput.person.parent',
                    defaultMessage: 'Broader person',
                  },
                  children: {
                    id: 'hierarchyInput.person.children',
                    defaultMessage: 'Narrower persons',
                  },
                  siblings: {
                    id: 'hierarchyInput.person.siblings',
                    defaultMessage: 'Adjacent persons',
                  },
                }),
              },
            },
          },
        },
      },
      'ns2:persons_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/person',
          },
        },
        inAuthority: {
          [config]: {
            cloneable: false,
          },
        },
        shortIdentifier: {
          [config]: {
            cloneable: false,
          },
        },
        personTermGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.personTermGroupList.name',
                defaultMessage: 'Term',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          personTermGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            termDisplayName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.termDisplayName.name',
                    defaultMessage: 'Display name',
                  },
                }),
                required: true,
                view: {
                  type: TextInput,
                },
              },
            },
            termFormattedDisplayName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.termFormattedDisplayName.name',
                    defaultMessage: 'Formatted display name',
                  },
                }),
                view: {
                  // TODO: Change to RichTextInput when it's implemented
                  type: TextInput,
                },
              },
            },
            termName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.termName.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termQualifier: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.termQualifier.name',
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
                  name: {
                    id: 'field.persons_common.termStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'personTermStatus',
                  },
                },
              },
            },
            termType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.termType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'persontermtype',
                  },
                },
              },
            },
            termFlag: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.termFlag.name',
                    defaultMessage: 'Flag',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'persontermflag',
                  },
                },
              },
            },
            termLanguage: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.termLanguage.name',
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
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.termPrefForLang.name',
                    defaultMessage: 'Preferred for language',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            salutation: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.salutation.name',
                    defaultMessage: 'Salutation',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'salutation',
                  },
                },
              },
            },
            title: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.title.name',
                    defaultMessage: 'Title',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'personTitle',
                  },
                },
              },
            },
            foreName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.forename.name',
                    defaultMessage: 'Forename',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            middleName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.middleName.name',
                    defaultMessage: 'Middle name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            surName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.surname.name',
                    defaultMessage: 'Surname',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            nameAdditions: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.nameAdditions.name',
                    defaultMessage: 'Addition',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            initials: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.initials.name',
                    defaultMessage: 'Initials',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termSource: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.termSource.name',
                    defaultMessage: 'Name',
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
                    id: 'field.persons_common.termSourceDetail.name',
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
                    id: 'field.persons_common.termSourceID.name',
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
                    id: 'field.persons_common.termSourceNote.name',
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
        gender: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.gender.name',
                defaultMessage: 'Gender',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'gender',
              },
            },
          },
        },
        occupations: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.occupations.name',
                defaultMessage: 'Occupation',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          occupation: {
            [config]: {
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        schoolsOrStyles: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.schoolsOrStyles.name',
                defaultMessage: 'School/style',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          schoolOrStyle: {
            [config]: {
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        groups: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.groups.name',
                defaultMessage: 'Group',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          group: {
            [config]: {
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        nationalities: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.nationalities.name',
                defaultMessage: 'Nationality',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          nationality: {
            [config]: {
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        nameNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.nameNote.name',
                defaultMessage: 'Name note',
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
        birthDateGroup: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.birthDateGroup.name',
                defaultMessage: 'Birth date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
        },
        birthPlace: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.birthPlace.name',
                defaultMessage: 'Place of birth',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        deathDateGroup: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.deathDateGroup.name',
                defaultMessage: 'Death date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
        },
        deathPlace: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.deathPlace.name',
                defaultMessage: 'Place of death',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        bioNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.bioNote.name',
                defaultMessage: 'Biographical note',
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
  };
};
