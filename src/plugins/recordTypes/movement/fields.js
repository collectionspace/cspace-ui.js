import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    OptionPickerInput,
    TextInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATE,
  } = pluginContext.dataTypes;

  const {
    extensions,
  } = pluginContext.config;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:movements_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:movements_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/movement',
          },
        },
        movementReferenceNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.movementReferenceNumber.name',
                defaultMessage: 'Reference number',
              },
            }),
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'inventory,location,movement',
              },
            },
          },
        },
        normalLocation: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.normalLocation.name',
                defaultMessage: 'Normal location',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'location/local',
              },
            },
          },
        },
        currentLocation: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.currentLocation.name',
                defaultMessage: 'Location',
              },
              fullName: {
                id: 'field.movements_common.currentLocation.fullName',
                defaultMessage: 'Current location',
              },
            }),
            required: true,
            view: {
              type: AutocompleteInput,
              props: {
                source: 'location/local,location/offsite,organization/local,organization/shared',
              },
            },
          },
        },
        currentLocationFitness: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.currentLocationFitness.name',
                defaultMessage: 'Fitness',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'locationFitnesses',
              },
            },
          },
        },
        currentLocationNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.currentLocationNote.name',
                defaultMessage: 'Note',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        locationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.movements_common.locationDate.name',
                defaultMessage: 'Location date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        reasonForMove: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.reasonForMove.name',
                defaultMessage: 'Reason for move',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'moveReasons',
              },
            },
          },
        },
        movementMethods: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          movementMethod: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.movements_common.movementMethod.name',
                  defaultMessage: 'Movement method',
                },
              }),
              repeating: true,
              view: {
                type: OptionPickerInput,
                props: {
                  source: 'moveMethods',
                },
              },
            },
          },
        },
        plannedRemovalDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.movements_common.plannedRemovalDate.name',
                defaultMessage: 'Planned removal date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        removalDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.movements_common.removalDate.name',
                defaultMessage: 'Removal date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        movementContact: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.movementContact.name',
                defaultMessage: 'Contact',
              },
              fullName: {
                id: 'field.movements_common.movementContact.fullName',
                defaultMessage: 'Movement contact',
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
        movementNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.movementNote.name',
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
        inventoryActionRequired: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.inventoryActionRequired.name',
                defaultMessage: 'Inventory action required',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'invActions',
              },
            },
          },
        },
        frequencyForInventory: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.frequencyForInventory.name',
                defaultMessage: 'Inventory frequency',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'invFreqs',
              },
            },
          },
        },
        inventoryDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.movements_common.inventoryDate.name',
                defaultMessage: 'Inventory date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        nextInventoryDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.movements_common.nextInventoryDate.name',
                defaultMessage: 'Next inventory date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        inventoryContactList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          inventoryContact: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.movements_common.inventoryContact.name',
                  defaultMessage: 'Contact',
                },
                fullName: {
                  id: 'field.movements_common.inventoryContact.fullName',
                  defaultMessage: 'Inventory contact',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,person/shared',
                },
              },
            },
          },
        },
        inventoryNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.movements_common.inventoryNote.name',
                defaultMessage: 'Note',
              },
              fullName: {
                id: 'field.movements_common.inventoryNote.fullName',
                defaultMessage: 'Inventory note',
              },
            }),
            searchView: {
              type: TextInput,
            },
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
