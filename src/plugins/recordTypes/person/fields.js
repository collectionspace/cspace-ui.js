import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CheckboxInput,
    CompoundInput,
    DateInput,
    HierarchyInput,
    OptionPickerInput,
    StructuredDateInput,
    TextInput,
    TermPickerInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    extensions,
  } = configContext.config;

  const {
    DATA_TYPE_BOOL,
    DATA_TYPE_STRUCTURED_DATE,
  } = configContext.dataTypes;

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
      ...extensions.core.fields,
      'ns2:persons_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/person',
          },
        },
        csid: {
          [config]: {
            cloneable: false,
          },
        },
        inAuthority: {
          [config]: {
            cloneable: false,
          },
        },
        refName: {
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
              required: {
                id: 'field.persons_common.personTermGroupList.required',
                defaultMessage: 'At least one term display name is required. Please enter a value.',
              },
            }),
            required: true,
            view: {
              type: CompoundInput,
            },
          },
          personTermGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.personTermGroup.name',
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
                    source: 'personTermStatuses',
                  },
                },
              },
            },
            termType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.termType.fullName',
                    defaultMessage: 'Term type',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termFlag.fullName',
                    defaultMessage: 'Term flag',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termLanguage.fullName',
                    defaultMessage: 'Term language',
                  },
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
                dataType: DATA_TYPE_BOOL,
                messages: defineMessages({
                  name: {
                    id: 'field.persons_common.termPrefForLang.name',
                    defaultMessage: 'Preferred for lang',
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
                    source: 'salutations',
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
                    source: 'personTitles',
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
                  props: {
                    // Suppress Chrome autofill
                    autoComplete: 'cspace-name',
                  },
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
                  props: {
                    // Suppress Chrome autofill
                    autoComplete: 'cspace-name',
                  },
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
                  props: {
                    // Suppress Chrome autofill
                    autoComplete: 'cspace-name',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termSource.fullName',
                    defaultMessage: 'Source name',
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
        personRecordTypes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          personRecordType: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.personRecordType.name',
                  defaultMessage: 'Person type',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'persontermtype',
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
                source: 'genders',
              },
            },
          },
        },
        occupations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          occupation: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.occupation.name',
                  defaultMessage: 'Occupation',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        schoolsOrStyles: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          schoolOrStyle: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.schoolOrStyle.name',
                  defaultMessage: 'School/style',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        groups: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          group: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.group.name',
                  defaultMessage: 'Group',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        nationalities: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          nationality: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.nationality.name',
                  defaultMessage: 'Nationality',
                },
              }),
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
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              name: {
                id: 'field.persons_common.birthDateGroup.name',
                defaultMessage: 'Birth date',
              },
            }),
            searchView: {
              type: DateInput,
            },
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
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
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              name: {
                id: 'field.persons_common.deathDateGroup.name',
                defaultMessage: 'Death date',
              },
            }),
            searchView: {
              type: DateInput,
            },
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
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
      // TODO: Use the embedded contacts_common (available as of 5.1) to render contact info,
      // instead of the configured subrecord. For now just make it not cloneable, so that a
      // cloned person doesn't end up with two associated contact records.
      'ns2:contacts_common': {
        [config]: {
          cloneable: false,
        },
      },
    },
  };
};
