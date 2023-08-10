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
        person: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.person.fullName',
                defaultMessage: 'Person associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.person.name',
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
        personType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.personType.fullName',
                defaultMessage: 'Person relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.personType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'chronologypersonrelations',
              },
            },
          },
        },
        personStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.personStructuredDateGroup.fullName',
                defaultMessage: 'Person date',
              },
              name: {
                id: 'field.ext.associatedAuthority.personStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        personCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          personCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.personCitation.fullName',
                  defaultMessage: 'Person citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.personCitation.name',
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
        personNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.personNote.fullName',
                defaultMessage: 'Person note',
              },
              name: {
                id: 'field.ext.associatedAuthority.personNote.name',
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
        people: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.people.fullName',
                defaultMessage: 'People associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.people.name',
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
        peopleType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.peopleType.fullName',
                defaultMessage: 'People relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.peopleType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'chronologypeoplerelations',
              },
            },
          },
        },
        peopleStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.peopleStructuredDateGroup.fullName',
                defaultMessage: 'People date',
              },
              name: {
                id: 'field.ext.associatedAuthority.peopleStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        peopleCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          peopleCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.peopleCitation.fullName',
                  defaultMessage: 'People citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.peopleCitation.name',
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
        peopleNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.peopleNote.fullName',
                defaultMessage: 'People note',
              },
              name: {
                id: 'field.ext.associatedAuthority.peopleNote.name',
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
        organization: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.organization.fullName',
                defaultMessage: 'Organization associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.organization.name',
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
        organizationType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.organizationType.fullName',
                defaultMessage: 'Organization relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.organizationType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'chronologyorganizationrelations',
              },
            },
          },
        },
        organizationStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.organizationStructuredDateGroup.fullName',
                defaultMessage: 'Organization date',
              },
              name: {
                id: 'field.ext.associatedAuthority.organizationStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        organizationCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          organizationCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.organizationCitation.fullName',
                  defaultMessage: 'Organization citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.organizationCitation.name',
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
        organizationNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.organizationNote.fullName',
                defaultMessage: 'Organization note',
              },
              name: {
                id: 'field.ext.associatedAuthority.organizationNote.name',
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
        concept: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.concept.fullName',
                defaultMessage: 'Concept associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.concept.name',
                defaultMessage: 'Associated',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'concept/activity,concept/associated,concept/material,concept/nomenclature,concept/occasion',
              },
            },
          },
        },
        conceptType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.conceptType.fullName',
                defaultMessage: 'Concept relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.conceptType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'chronologyconceptrelations',
              },
            },
          },
        },
        conceptStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.conceptStructuredDateGroup.fullName',
                defaultMessage: 'Concept date',
              },
              name: {
                id: 'field.ext.associatedAuthority.conceptStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        conceptCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          conceptCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.conceptCitation.fullName',
                  defaultMessage: 'Concept citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.conceptCitation.name',
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
        conceptNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.conceptNote.fullName',
                defaultMessage: 'Concept note',
              },
              name: {
                id: 'field.ext.associatedAuthority.conceptNote.name',
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
        place: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.place.fullName',
                defaultMessage: 'Place associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.place.name',
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
        placeType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.placeType.fullName',
                defaultMessage: 'Place relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.placeType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'chronologyplacerelations',
              },
            },
          },
        },
        placeStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.placeStructuredDateGroup.fullName',
                defaultMessage: 'Place date',
              },
              name: {
                id: 'field.ext.associatedAuthority.placeStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        placeCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          placeCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.placeCitation.fullName',
                  defaultMessage: 'Place citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.placeCitation.name',
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
        placeNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.placeNote.fullName',
                defaultMessage: 'Place note',
              },
              name: {
                id: 'field.ext.associatedAuthority.placeNote.name',
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
              defaultMessage: 'Related chronology',
            },
          }),
          repeating: true,
          view: {
            type: CompoundInput,
          },
        },
        chronology: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.chronology.fullName',
                defaultMessage: 'Related chronology associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.chronology.name',
                defaultMessage: 'Associated',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'chronology/era,chronology/event,chronology/fieldcollection',
              },
            },
          },
        },
        chronologyType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.chronologyType.fullName',
                defaultMessage: 'Related chronology relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.chronologyType.name',
                defaultMessage: 'Relationship/Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'chronologyrelations',
              },
            },
          },
        },
        chronologyStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.chronologyStructuredDateGroup.fullName',
                defaultMessage: 'Related chronology date',
              },
              name: {
                id: 'field.ext.associatedAuthority.chronologyStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        chronologyCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          chronologyCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.chronologyCitation.fullName',
                  defaultMessage: 'Related chronology citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.chronologyCitation.name',
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
        chronologyNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.chronologyNote.fullName',
                defaultMessage: 'Related chronology note',
              },
              name: {
                id: 'field.ext.associatedAuthority.chronologyNote.name',
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
  };
};
