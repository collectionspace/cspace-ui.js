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
    personGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      personGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.personGroup.name',
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
    peopleGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      peopleGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.peopleGroup.name',
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
    organizationGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      organizationGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.organizationGroup.name',
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
    conceptGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      conceptGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.conceptGroup.name',
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
    placeGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      placeGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.placeGroup.name',
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
    relatedPeriodGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      relatedPeriodGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.associatedAuthority.relatedPeriodGroup.name',
              defaultMessage: 'Related period',
            },
          }),
          repeating: true,
          view: {
            type: CompoundInput,
          },
        },
        relatedPeriod: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.relatedPeriod.fullName',
                defaultMessage: 'Related period associated',
              },
              name: {
                id: 'field.ext.associatedAuthority.relatedPeriod.name',
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
        relatedPeriodType: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.relatedPeriodType.fullName',
                defaultMessage: 'Related period relationship/type',
              },
              name: {
                id: 'field.ext.associatedAuthority.relatedPeriodType.name',
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
        relatedPeriodStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.relatedPeriodStructuredDateGroup.fullName',
                defaultMessage: 'Related period date',
              },
              name: {
                id: 'field.ext.associatedAuthority.relatedPeriodStructuredDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        relatedPeriodCitations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          relatedPeriodCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.ext.associatedAuthority.relatedPeriodCitation.fullName',
                  defaultMessage: 'Related period citation',
                },
                name: {
                  id: 'field.ext.associatedAuthority.relatedPeriodCitation.name',
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
        relatedPeriodNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.associatedAuthority.relatedPeriodNote.fullName',
                defaultMessage: 'Related period note',
              },
              name: {
                id: 'field.ext.associatedAuthority.relatedPeriodNote.name',
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
