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
        ...extensions.authItem.fields,
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
                  fullName: {
                    id: 'field.persons_common.termDisplayName.fullName',
                    defaultMessage: 'Term display name',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termFormattedDisplayName.fullName',
                    defaultMessage: 'Term formatted display name',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termName.fullName',
                    defaultMessage: 'Term name',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termQualifier.fullName',
                    defaultMessage: 'Term qualifier',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termStatus.fullName',
                    defaultMessage: 'Term status',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termPrefForLang.fullName',
                    defaultMessage: 'Term preferred for lang',
                  },
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
                  fullName: {
                    id: 'field.persons_common.salutation.fullName',
                    defaultMessage: 'Term salutation',
                  },
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
                  fullName: {
                    id: 'field.persons_common.title.fullName',
                    defaultMessage: 'Term title',
                  },
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
                  fullName: {
                    id: 'field.persons_common.foreName.fullName',
                    defaultMessage: 'Term forename',
                  },
                  name: {
                    id: 'field.persons_common.foreName.name',
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
                  fullName: {
                    id: 'field.persons_common.middleName.fullName',
                    defaultMessage: 'Term middle name',
                  },
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
                  fullName: {
                    id: 'field.persons_common.surName.fullName',
                    defaultMessage: 'Term surname',
                  },
                  name: {
                    id: 'field.persons_common.surName.name',
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
                  fullName: {
                    id: 'field.persons_common.nameAdditions.fullName',
                    defaultMessage: 'Term name addition',
                  },
                  groupName: {
                    id: 'field.persons_common.nameAdditions.groupName',
                    defaultMessage: 'Name addition',
                  },
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
                  fullName: {
                    id: 'field.persons_common.initials.fullName',
                    defaultMessage: 'Term initials',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termSource.fullName',
                    defaultMessage: 'Term source name',
                  },
                  groupName: {
                    id: 'field.persons_common.termSource.groupName',
                    defaultMessage: 'Source name',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termSourceDetail.fullName',
                    defaultMessage: 'Term source detail',
                  },
                  groupName: {
                    id: 'field.persons_common.termSourceDetail.groupName',
                    defaultMessage: 'Source detail',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termSourceID.fullName',
                    defaultMessage: 'Term source ID',
                  },
                  groupName: {
                    id: 'field.persons_common.termSourceID.groupName',
                    defaultMessage: 'Source ID',
                  },
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
                  fullName: {
                    id: 'field.persons_common.termSourceNote.fullName',
                    defaultMessage: 'Term source note',
                  },
                  groupName: {
                    id: 'field.persons_common.termSourceNote.groupName',
                    defaultMessage: 'Source note',
                  },
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
              type: TermPickerInput,
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
        pronounGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          pronounGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.pronounGroup.name',
                  defaultMessage: 'Pronoun',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            declinedToAnswerPronoun: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.declinedToAnswerPronoun.fullName',
                    defaultMessage: 'Pronoun declined to answer',
                  },
                  name: {
                    id: 'field.persons_common.declinedToAnswerPronoun.name',
                    defaultMessage: 'Declined to answer',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            suppliedPronouns: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              suppliedPronoun: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.persons_common.suppliedPronoun.fullName',
                      defaultMessage: 'Pronoun supplied',
                    },
                    name: {
                      id: 'field.persons_common.suppliedPronoun.name',
                      defaultMessage: 'Supplied',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: TermPickerInput,
                    props: {
                      source: 'suppliedpronoun',
                    },
                  },
                },
              },
            },
            useRestrictionPronoun: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.useRestrictionPronoun.fullName',
                    defaultMessage: 'Pronoun use restriction',
                  },
                  name: {
                    id: 'field.persons_common.useRestrictionPronoun.name',
                    defaultMessage: 'Use restriction',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'userestriction',
                  },
                },
              },
            },
          },
        },
        genderGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          genderGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.genderGroup.name',
                  defaultMessage: 'Gender',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            declinedToAnswerGender: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.declinedToAnswerGender.fullName',
                    defaultMessage: 'Gender declined to answer',
                  },
                  name: {
                    id: 'field.persons_common.declinedToAnswerGender.name',
                    defaultMessage: 'Declined to answer',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            suppliedGenders: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              suppliedGender: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.persons_common.suppliedGender.fullName',
                      defaultMessage: 'Gender supplied',
                    },
                    name: {
                      id: 'field.persons_common.suppliedGender.name',
                      defaultMessage: 'Supplied',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: TermPickerInput,
                    props: {
                      source: 'suppliedgender',
                    },
                  },
                },
              },
            },
            useRestrictionGender: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.useRestrictionGender.fullName',
                    defaultMessage: 'Gender use restriction',
                  },
                  name: {
                    id: 'field.persons_common.useRestrictionGender.name',
                    defaultMessage: 'Use restriction',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'userestriction',
                  },
                },
              },
            },
          },
        },
        raceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          raceGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.raceGroup.name',
                  defaultMessage: 'Race',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            declinedToAnswerRace: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.declinedToAnswerRace.fullName',
                    defaultMessage: 'Race declined to answer',
                  },
                  name: {
                    id: 'field.persons_common.declinedToAnswerRace.name',
                    defaultMessage: 'Declined to answer',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            suppliedRaces: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              suppliedRace: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.persons_common.suppliedRace.fullName',
                      defaultMessage: 'Race supplied',
                    },
                    name: {
                      id: 'field.persons_common.suppliedRace.name',
                      defaultMessage: 'Supplied',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: TermPickerInput,
                    props: {
                      source: 'suppliedrace',
                    },
                  },
                },
              },
            },
            useRestrictionRace: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.useRestrictionRace.fullName',
                    defaultMessage: 'Race use restriction',
                  },
                  name: {
                    id: 'field.persons_common.useRestrictionRace.name',
                    defaultMessage: 'Use restriction',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'userestriction',
                  },
                },
              },
            },
          },
        },
        ethnicityGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          ethnicityGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.ethnicityGroup.name',
                  defaultMessage: 'Ethnicity',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            declinedToAnswerEthnicity: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.declinedToAnswerEthnicity.fullName',
                    defaultMessage: 'Ethnicity declined to answer',
                  },
                  name: {
                    id: 'field.persons_common.declinedToAnswerEthnicity.name',
                    defaultMessage: 'Declined to answer',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            suppliedEthnicities: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              suppliedEthnicity: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.persons_common.suppliedEthnicity.fullName',
                      defaultMessage: 'Ethnicity supplied',
                    },
                    name: {
                      id: 'field.persons_common.suppliedEthnicity.name',
                      defaultMessage: 'Supplied',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: TermPickerInput,
                    props: {
                      source: 'suppliedethnicity',
                    },
                  },
                },
              },
            },
            useRestrictionEthnicity: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.useRestrictionEthnicity.fullName',
                    defaultMessage: 'Ethnicity use restriction',
                  },
                  name: {
                    id: 'field.persons_common.useRestrictionEthnicity.name',
                    defaultMessage: 'Use restriction',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'userestriction',
                  },
                },
              },
            },
          },
        },
        sexualityGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          sexualityGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.sexualityGroup.name',
                  defaultMessage: 'Sexuality',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            declinedToAnswerSexuality: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.declinedToAnswerSexuality.fullName',
                    defaultMessage: 'Sexuality declined to answer',
                  },
                  name: {
                    id: 'field.persons_common.declinedToAnswerSexuality.name',
                    defaultMessage: 'Declined to answer',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            suppliedSexualities: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              suppliedSexuality: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.persons_common.suppliedSexuality.fullName',
                      defaultMessage: 'Sexuality supplied',
                    },
                    name: {
                      id: 'field.persons_common.suppliedSexuality.name',
                      defaultMessage: 'Supplied',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: TermPickerInput,
                    props: {
                      source: 'suppliedsexuality',
                    },
                  },
                },
              },
            },
            useRestrictionSexuality: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.useRestrictionSexuality.fullName',
                    defaultMessage: 'Sexuality use restriction',
                  },
                  name: {
                    id: 'field.persons_common.useRestrictionSexuality.name',
                    defaultMessage: 'Use restriction',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'userestriction',
                  },
                },
              },
            },
          },
        },
        birthPlaceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          birthPlaceGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.birthPlaceGroup.name',
                  defaultMessage: 'Birth place',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            declinedToAnswerBirthPlace: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.declinedToAnswerBirthPlace.fullName',
                    defaultMessage: 'Birth place declined to answer',
                  },
                  name: {
                    id: 'field.persons_common.declinedToAnswerBirthPlace.name',
                    defaultMessage: 'Declined to answer',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            suppliedBirthPlace: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.suppliedBirthPlace.fullName',
                    defaultMessage: 'Birth place supplied',
                  },
                  name: {
                    id: 'field.persons_common.suppliedBirthPlace.name',
                    defaultMessage: 'Supplied',
                  },
                }),
                repeating: true,
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'place/local,place/shared',
                  },
                },
              },
            },
            useRestrictionBirthPlace: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.useRestrictionBirthPlace.fullName',
                    defaultMessage: 'Birth place use restriction',
                  },
                  name: {
                    id: 'field.persons_common.useRestrictionBirthPlace.name',
                    defaultMessage: 'Use restriction',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'userestriction',
                  },
                },
              },
            },
          },
        },
        birthDateGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
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
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            declinedToAnswerBirthDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.declinedToAnswerBirthDate.fullName',
                    defaultMessage: 'Birth date declined to answer',
                  },
                  name: {
                    id: 'field.persons_common.declinedToAnswerBirthDate.name',
                    defaultMessage: 'Declined to answer',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            suppliedBirthDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.suppliedBirthDate.fullName',
                    defaultMessage: 'Birth date supplied',
                  },
                  name: {
                    id: 'field.persons_common.suppliedBirthDate.name',
                    defaultMessage: 'Supplied',
                  },
                }),
                repeating: true,
                view: {
                  type: StructuredDateInput,
                },
                ...extensions.structuredDate.fields,
              },
            },
            useRestrictionBirthDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.useRestrictionBirthDate.fullName',
                    defaultMessage: 'Birth date use restriction',
                  },
                  name: {
                    id: 'field.persons_common.useRestrictionBirthDate.name',
                    defaultMessage: 'Use restriction',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'userestriction',
                  },
                },
              },
            },
          },
        },
        otherGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          otherGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.otherGroup.name',
                  defaultMessage: 'Other information',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            informationAuthor: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.informationAuthor.fullName',
                    defaultMessage: 'Other information author',
                  },
                  name: {
                    id: 'field.persons_common.informationAuthor.name',
                    defaultMessage: 'Author',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/shared',
                  },
                },
              },
            },
            informationDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.informationDate.fullName',
                    defaultMessage: 'Other information date',
                  },
                  name: {
                    id: 'field.persons_common.informationDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            informationUseRestriction: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.informationUseRestriction.fullName',
                    defaultMessage: 'Other information use restriction',
                  },
                  name: {
                    id: 'field.persons_common.informationUseRestriction.name',
                    defaultMessage: 'Use restriction',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'userestriction',
                  },
                },
              },
            },
            otherInformation: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.persons_common.otherInformation.fullName',
                    defaultMessage: 'Other information note',
                  },
                  name: {
                    id: 'field.persons_common.otherInformation.name',
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
