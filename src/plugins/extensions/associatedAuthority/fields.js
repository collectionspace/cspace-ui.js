import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    TextInput,
    TermPickerInput,
    StructuredDateInput,
  } = configContext.inputComponents;

  const {
    DATA_TYPE_STRUCTURED_DATE,
  } = configContext.dataTypes;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    extensions,
  } = configContext.config;

  return {
    assocPersonAuthGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      assocPersonAuthGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.assocPersonAuthGroup.name',
              defaultMessage: 'Person',
            },
          }),
          repeating: true,
          view: {
            type: CompoundInput,
          },
        },
        assocPerson: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPerson.fullName',
                defaultMessage: 'Person associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPerson.name',
                defaultMessage: 'Associated',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/ulan',
              },
            },
          },
        },
        assocPersonType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPersonType.fullName',
                defaultMessage: 'Person relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPersonType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'relationtypetype',
              },
            },
          },
        },
        assocPersonStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPersonStructuredDateGroup.fullName',
                defaultMessage: 'Person date',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPersonStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        assocPersonCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocPersonCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.assocPersonCitation.fullName',
                  defaultMessage: 'Person citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.assocPersonCitation.name',
                  defaultMessage: 'Citation',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'citation/local,citation/worldcat',
                },
              },
            },
          },
        },
        assocPersonNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPersonNote.fullName',
                defaultMessage: 'Person note',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPersonNote.name',
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
    assocPeopleAuthGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      assocPeopleAuthGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.assocPeopleAuthGroup.name',
              defaultMessage: 'People',
            },
          }),
          repeating: true,
          view: {
            type: CompoundInput,
          },
        },
        assocPeople: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPeople.fullName',
                defaultMessage: 'People associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPeople.name',
                defaultMessage: 'Associated',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'concept/associated',
              },
            },
          },
        },
        assocPeopleType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPeopleType.fullName',
                defaultMessage: 'People relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPeopleType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'relationtypetype',
              },
            },
          },
        },
        assocPeopleStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPeopleStructuredDateGroup.fullName',
                defaultMessage: 'People date',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPeopleStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        assocPeopleCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocPeopleCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.assocPeopleCitation.fullName',
                  defaultMessage: 'People citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.assocPeopleCitation.name',
                  defaultMessage: 'Citation',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'citation/local,citation/worldcat',
                },
              },
            },
          },
        },
        assocPeopleNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPeopleNote.fullName',
                defaultMessage: 'People note',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPeopleNote.name',
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
    assocOrganizationAuthGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      assocOrganizationAuthGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.assocOrganizationAuthGroup.name',
              defaultMessage: 'Organization',
            },
          }),
          repeating: true,
          view: {
            type: CompoundInput,
          },
        },
        assocOrganization: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocOrganization.fullName',
                defaultMessage: 'Organization associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocOrganization.name',
                defaultMessage: 'Associated',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'organization/local,organization/ulan',
              },
            },
          },
        },
        assocOrganizationType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocOrganizationType.fullName',
                defaultMessage: 'Organization relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocOrganizationType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'relationtypetype',
              },
            },
          },
        },
        assocOrganizationStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocOrganizationStructuredDateGroup.fullName',
                defaultMessage: 'Organization date',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocOrganizationStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        assocOrganizationCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocOrganizationCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.assocOrganizationCitation.fullName',
                  defaultMessage: 'Organization citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.assocOrganizationCitation.name',
                  defaultMessage: 'Citation',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'citation/local,citation/worldcat',
                },
              },
            },
          },
        },
        assocOrganizationNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocOrganizationNote.fullName',
                defaultMessage: 'Organization note',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocOrganizationNote.name',
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
    assocConceptAuthGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      assocConceptAuthGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.assocConceptAuthGroup.name',
              defaultMessage: 'Concept',
            },
          }),
          repeating: true,
          view: {
            type: CompoundInput,
          },
        },
        assocConcept: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocConcept.fullName',
                defaultMessage: 'Concept associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocConcept.name',
                defaultMessage: 'Associated',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'assocConcept/activity,concept/associated,concept/material,concept/nomenclature,concept/occasion',
              },
            },
          },
        },
        assocConceptType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocConceptType.fullName',
                defaultMessage: 'Concept relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocConceptType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'relationtypetype',
              },
            },
          },
        },
        assocConceptStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocConceptStructuredDateGroup.fullName',
                defaultMessage: 'Concept date',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocConceptStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        assocConceptCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocConceptCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.assocConceptCitation.fullName',
                  defaultMessage: 'Concept citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.assocConceptCitation.name',
                  defaultMessage: 'Citation',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'citation/local,citation/worldcat',
                },
              },
            },
          },
        },
        assocConceptNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocConceptNote.fullName',
                defaultMessage: 'Concept note',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocConceptNote.name',
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
    assocPlaceAuthGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      assocPlaceAuthGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.assocPlaceAuthGroup.name',
              defaultMessage: 'Place',
            },
          }),
          repeating: true,
          view: {
            type: CompoundInput,
          },
        },
        assocPlace: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPlace.fullName',
                defaultMessage: 'Place associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPlace.name',
                defaultMessage: 'Associated',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'place/local,place/tgn',
              },
            },
          },
        },
        assocPlaceType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPlaceType.fullName',
                defaultMessage: 'Place relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPlaceType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'relationtypetype',
              },
            },
          },
        },
        assocPlaceStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPlaceStructuredDateGroup.fullName',
                defaultMessage: 'Place date',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPlaceStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        assocPlaceCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocPlaceCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.assocPlaceCitation.fullName',
                  defaultMessage: 'Place citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.assocPlaceCitation.name',
                  defaultMessage: 'Citation',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'citation/local,citation/worldcat',
                },
              },
            },
          },
        },
        assocPlaceNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocPlaceNote.fullName',
                defaultMessage: 'Place note',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocPlaceNote.name',
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
    assocChronologyAuthGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      assocChronologyAuthGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.assocChronologyAuthGroup.name',
              defaultMessage: 'Event/Era',
            },
          }),
          repeating: true,
          view: {
            type: CompoundInput,
          },
        },
        assocChronology: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocChronology.fullName',
                defaultMessage: 'Event/Era associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocChronology.name',
                defaultMessage: 'Associated',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'chronology/era,chronology/event',
              },
            },
          },
        },
        assocChronologyType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocChronologyType.fullName',
                defaultMessage: 'Event/Era relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocChronologyType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'relationtypetype',
              },
            },
          },
        },
        assocChronologyStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocChronologyStructuredDateGroup.fullName',
                defaultMessage: 'Event/Era date',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocChronologyStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        assocChronologyCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocChronologyCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.assocChronologyCitation.fullName',
                  defaultMessage: 'Event/Era citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.assocChronologyCitation.name',
                  defaultMessage: 'Citation',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'citation/local,citation/worldcat',
                },
              },
            },
          },
        },
        assocChronologyNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.assocChronologyNote.fullName',
                defaultMessage: 'Event/Era note',
              },
              name: {
                id: 'field.ext.associatedAuthority.assocChronologyNote.name',
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
  };
};
