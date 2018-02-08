import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    TextInput,
    OptionPickerInput,
    StructuredDateInput,
    TermPickerInput,
    URLInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    extensions,
  } = pluginContext.config;

  const {
    DATA_TYPE_STRUCTURED_DATE,
  } = pluginContext.dataTypes;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:media_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:media_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/media',
          },
        },
        identificationNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.media_common.identificationNumber.name',
                defaultMessage: 'Identification number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'media',
              },
            },
          },
        },
        title: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.media_common.title.name',
                defaultMessage: 'Title',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        externalUrl: {
          [config]: {
            // FIXME: Computed fields should recalculate when subrecord fields are committed.
            compute: ({ subrecordData }) => {
              const blobData = subrecordData.get('blob');

              if (blobData) {
                const file = blobData.getIn(['document', 'ns2:blobs_common', 'file']);

                if (typeof file === 'string') {
                  return file;
                }
              }

              return undefined;
            },
            messages: defineMessages({
              name: {
                id: 'field.media_common.externalUrl.name',
                defaultMessage: 'External URL',
              },
            }),
            view: {
              type: URLInput,
            },
          },
        },
        ...extensions.dimension.fields,
        contributor: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.media_common.contributor.name',
                defaultMessage: 'Contributor',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared,organization/local,organization/shared',
              },
            },
          },
        },
        creator: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.media_common.creator.name',
                defaultMessage: 'Creator',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared,organization/local,organization/shared',
              },
            },
          },
        },
        languageList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          language: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.media_common.language.name',
                  defaultMessage: 'Language',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'languages',
                },
              },
            },
          },
        },
        publisher: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.media_common.publisher.name',
                defaultMessage: 'Publisher',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared,organization/local,organization/shared',
              },
            },
          },
        },
        relationList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          relation: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.media_common.relation.name',
                  defaultMessage: 'Relation',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        copyrightStatement: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.media_common.copyrightStatement.name',
                defaultMessage: 'Copyright statement',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        typeList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          type: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.media_common.type.name',
                  defaultMessage: 'Type',
                },
              }),
              repeating: true,
              view: {
                type: OptionPickerInput,
                props: {
                  source: 'mediaTypes',
                },
              },
            },
          },
        },
        coverage: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.media_common.coverage.name',
                defaultMessage: 'Coverage',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        dateGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          dateGroup: {
            [config]: {
              dataType: DATA_TYPE_STRUCTURED_DATE,
              messages: defineMessages({
                name: {
                  id: 'field.media_common.dateGroup.name',
                  defaultMessage: 'Date',
                },
              }),
              repeating: true,
              searchView: {
                type: DateInput,
              },
              view: {
                type: StructuredDateInput,
              },
            },
            ...extensions.structuredDate.fields,
          },
        },
        source: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.media_common.source.name',
                defaultMessage: 'Source',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        subjectList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          subject: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.media_common.subject.name',
                  defaultMessage: 'Subject',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        rightsHolder: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.media_common.rightsHolder.name',
                defaultMessage: 'Rights holder',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared,organization/local,organization/shared',
              },
            },
          },
        },
        description: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.media_common.description.name',
                defaultMessage: 'Description',
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
