import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

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
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_FLOAT,
    DATA_TYPE_DATE,
  } = pluginContext.dataTypes;

  const coreFields = getCoreFields(pluginContext);

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
      // Define core fields
      ...coreFields,
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
            messages: defineMessages({
              name: {
                id: 'field.media_common.externalUrl.name',
                defaultMessage: 'External URL',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        // TODO: Define measuredPartGroupList in a shared file (also used in collectionobject).
        measuredPartGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          measuredPartGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.media_common.measuredPartGroup.name',
                  defaultMessage: 'Dimensions',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            measuredPart: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.media_common.measuredPart.name',
                    defaultMessage: 'Part',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'measuredParts',
                  },
                },
              },
            },
            dimensionSummary: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.media_common.dimensionSummary.name',
                    defaultMessage: 'Summary',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            dimensionSubGroupList: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              dimensionSubGroup: {
                [config]: {
                  messages: defineMessages({
                    name: {
                      id: 'field.media_common.dimensionSubGroup.name',
                      defaultMessage: 'Measurements',
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
                dimension: {
                  [config]: {
                    messages: defineMessages({
                      name: {
                        id: 'field.media_common.dimension.name',
                        defaultMessage: 'Dimension',
                      },
                    }),
                    view: {
                      type: OptionPickerInput,
                      props: {
                        source: 'dimensions',
                      },
                    },
                  },
                },
                measuredBy: {
                  [config]: {
                    messages: defineMessages({
                      name: {
                        id: 'field.media_common.measuredBy.name',
                        defaultMessage: 'Measured by',
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
                measurementMethod: {
                  [config]: {
                    messages: defineMessages({
                      name: {
                        id: 'field.media_common.measurementMethod.name',
                        defaultMessage: 'Method',
                      },
                    }),
                    view: {
                      type: OptionPickerInput,
                      props: {
                        source: 'measurementMethods',
                      },
                    },
                  },
                },
                value: {
                  [config]: {
                    dataType: DATA_TYPE_FLOAT,
                    messages: defineMessages({
                      fullName: {
                        id: 'field.media_common.value.fullName',
                        defaultMessage: 'Measurement value',
                      },
                      name: {
                        id: 'field.media_common.value.name',
                        defaultMessage: 'Value',
                      },
                    }),
                    view: {
                      type: TextInput,
                    },
                  },
                },
                measurementUnit: {
                  [config]: {
                    messages: defineMessages({
                      name: {
                        id: 'field.media_common.measurementUnit.name',
                        defaultMessage: 'Unit',
                      },
                    }),
                    view: {
                      type: OptionPickerInput,
                      props: {
                        source: 'measurementUnits',
                      },
                    },
                  },
                },
                valueQualifier: {
                  [config]: {
                    messages: defineMessages({
                      name: {
                        id: 'field.media_common.valueQualifier.name',
                        defaultMessage: 'Qualifier',
                      },
                    }),
                    view: {
                      type: TextInput,
                    },
                  },
                },
                valueDate: {
                  [config]: {
                    dataType: DATA_TYPE_DATE,
                    messages: defineMessages({
                      name: {
                        id: 'field.media_common.valueDate.name',
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
