import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    IDGeneratorInput,
    TextInput,
    OptionPickerInput,
    StructuredDateInput,
    TermPickerInput,
    URLInput,
    DateInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    extensions,
  } = configContext.config;

  const {
    DATA_TYPE_STRUCTURED_DATE,
  } = configContext.dataTypes;

  const {
    validateNotInUse,
  } = configContext.validationHelpers;

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
              inUse: {
                id: 'field.media_common.identificationNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.media_common.identificationNumber.name',
                defaultMessage: 'Identification number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'media_common:identificationNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'media',
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
        publishToList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          publishTo: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.media_common.publishTo.name',
                  defaultMessage: 'Publish to',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'publishto',
                },
              },
            },
          },
        },
        altText: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.media_common.altText.name',
                defaultMessage: 'Alt text',
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
        checksumGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          checksumGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.media_common.checksumGroup.name',
                  defaultMessage: 'Checksum',
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
            checksumValue: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.media_common.checksumValue.fullName',
                    defaultMessage: 'Checksum value',
                  },
                  name: {
                    id: 'field.media_common.checksumValue.name',
                    defaultMessage: 'Value',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            checksumType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.media_common.checksumType.fullName',
                    defaultMessage: 'Checksum type',
                  },
                  name: {
                    id: 'field.media_common.checksumType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'checksumtypes',
                  },
                },
              },
            },
            checksumDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.media_common.checksumDate.fullName',
                    defaultMessage: 'Checksum date',
                  },
                  name: {
                    id: 'field.media_common.checksumDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
          },
        },
      },
    },
  };
};
