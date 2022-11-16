import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    DateInput,
    TextInput,
    CompoundInput,
    IDGeneratorInput,
    TermPickerInput,
    AutocompleteInput,
    OptionPickerInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    extensions,
  } = configContext.config;

  const {
    validateNotInUse,
  } = configContext.validationHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:iterationreports_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:iterationreports_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/iterationreport',
          },
        },
        iterationIdentificationNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.iterationreports_common.iterationIdentificationNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.iterationreports_common.iterationIdentificationNumber.name',
                defaultMessage: 'Iteration identification number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'iterationreports_common:iterationIdentificationNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'iterationreport',
              },
            },
          },
        },
        iterationActionGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          iterationActionGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.iterationActionGroup.name',
                  defaultMessage: 'Iteration action',
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
            action: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.action.fullName',
                    defaultMessage: 'Iteration action type',
                  },
                  name: {
                    id: 'field.iterationreports_common.action.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'installationType',
                  },
                },
              },
            },
            actionStartDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.actionStartDate.fullName',
                    defaultMessage: 'Iteration action earliest/start date',
                  },
                  name: {
                    id: 'field.iterationreports_common.actionStartDate.name',
                    defaultMessage: 'Earliest/start date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            actionEndDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.actionEndDate.fullName',
                    defaultMessage: 'Iteration action end date',
                  },
                  name: {
                    id: 'field.iterationreports_common.actionEndDate.name',
                    defaultMessage: 'End date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
          },
        },
        iterationCreatorGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          iterationCreatorGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.iterationCreatorGroup.name',
                  defaultMessage: 'Iteration creator/supervisor',
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
            iterationCreator: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.iterationCreator.fullName',
                    defaultMessage: 'Iteration creator/supervisor name',
                  },
                  name: {
                    id: 'field.iterationreports_common.iterationCreator.name',
                    defaultMessage: 'Name',
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
            iterationCreatorRole: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.iterationCreatorRole.fullName',
                    defaultMessage: 'Iteration creator/supervisor role',
                  },
                  name: {
                    id: 'field.iterationreports_common.iterationCreatorRole.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'iterationrole',
                  },
                },
              },
            },
          },
        },
        installerGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          installerGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.installerGroup.name',
                  defaultMessage: 'Installer',
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
            installer: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.installer.fullName',
                    defaultMessage: 'Installer name',
                  },
                  name: {
                    id: 'field.iterationreports_common.installer.name',
                    defaultMessage: 'Name',
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
            installerRole: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.installerRole.fullName',
                    defaultMessage: 'Installer role/skillset',
                  },
                  name: {
                    id: 'field.iterationreports_common.installerRole.name',
                    defaultMessage: 'Role/skillset',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'installerrole',
                  },
                },
              },
            },
            installerExtent: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.installerExtent.fullName',
                    defaultMessage: 'Installer time spent',
                  },
                  name: {
                    id: 'field.iterationreports_common.installerExtent.name',
                    defaultMessage: 'Time spent',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        presenceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          presenceGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.presenceGroup.name',
                  defaultMessage: 'Artist present/represented',
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
            installDeinstall: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.installDeinstall.fullName',
                    defaultMessage: 'Artist present/represented install/deinstall',
                  },
                  name: {
                    id: 'field.iterationreports_common.installDeinstall.name',
                    defaultMessage: 'Install/deinstall',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'installationType',
                  },
                },
              },
            },
            artistOrRepresentative: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.iterationreports_common.artistOrRepresentative.name',
                    defaultMessage: 'Artist or representative',
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
            artistPresent: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.artistPresent.fullName',
                    defaultMessage: 'Artist present/represented presence',
                  },
                  name: {
                    id: 'field.iterationreports_common.artistPresent.name',
                    defaultMessage: 'Presence',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'artistpresence',
                  },
                },
              },
            },
            presentExtent: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.presentExtent.fullName',
                    defaultMessage: 'Artist present/represented extent',
                  },
                  name: {
                    id: 'field.iterationreports_common.presentExtent.name',
                    defaultMessage: 'Extent',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        evaluationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          evaluationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.evaluationGroup.name',
                  defaultMessage: 'Iteration evaluation',
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
            iterationSuccessful: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.iterationSuccessful.fullName',
                    defaultMessage: 'Iteration evaluation successful',
                  },
                  name: {
                    id: 'field.iterationreports_common.iterationSuccessful.name',
                    defaultMessage: 'Successful',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'iterationSuccess',
                  },
                },
              },
            },
            iterationEvaluator: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.iterationEvaluator.fullName',
                    defaultMessage: 'Iteration evaluation evaluator',
                  },
                  name: {
                    id: 'field.iterationreports_common.iterationEvaluator.name',
                    defaultMessage: 'Evaluator',
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
          },
        },
        iterationViewed: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.iterationreports_common.iterationViewed.fullName',
                defaultMessage: 'Iteration viewed by artist',
              },
              name: {
                id: 'field.iterationreports_common.iterationViewed.name',
                defaultMessage: 'Viewed by artist',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'iterationSuccess',
              },
            },
          },
        },
        iterationApproved: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.iterationreports_common.iterationApproved.fullName',
                defaultMessage: 'Iteration approved by artist',
              },
              name: {
                id: 'field.iterationreports_common.iterationApproved.name',
                defaultMessage: 'Approved by artist',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'iterationSuccess',
              },
            },
          },
        },
        iterationEvaluationNotes: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.iterationreports_common.iterationEvaluationNotes.name',
                defaultMessage: 'Iteration evaluation notes',
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
        spaceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          spaceGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.spaceGroup.name',
                  defaultMessage: 'Space, as installed',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            descriptionType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.descriptionType.fullName',
                    defaultMessage: 'Space, as installed type',
                  },
                  name: {
                    id: 'field.iterationreports_common.descriptionType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'iterationspacetype',
                  },
                },
              },
            },
            approvalEntity: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.approvalEntity.fullName',
                    defaultMessage: 'Space, as installed approval entity',
                  },
                  name: {
                    id: 'field.iterationreports_common.approvalEntity.name',
                    defaultMessage: 'Approval entity',
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
            approvalDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.approvalDate.fullName',
                    defaultMessage: 'Space, as installed approval date',
                  },
                  name: {
                    id: 'field.iterationreports_common.approvalDate.name',
                    defaultMessage: 'Approval date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            spaceDescription: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.spaceDescription.fullName',
                    defaultMessage: 'Space, as installed description',
                  },
                  name: {
                    id: 'field.iterationreports_common.spaceDescription.name',
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
        exhibitionGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          exhibitionGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.exhibitionGroup.name',
                  defaultMessage: 'Exhibition',
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
            exhibitionCopyIdentificationNumber: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.exhibitionCopyIdentificationNumber.fullName',
                    defaultMessage: 'Exhibition copy ID',
                  },
                  name: {
                    id: 'field.iterationreports_common.exhibitionCopyIdentificationNumber.name',
                    defaultMessage: 'Copy ID',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            exhibitionApprovalEntity: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.exhibitionApprovalEntity.fullName',
                    defaultMessage: 'Exhibition approval entity',
                  },
                  name: {
                    id: 'field.iterationreports_common.exhibitionApprovalEntity.name',
                    defaultMessage: 'Approval entity',
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
            exhibitionApprovalDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.exhibitionApprovalDate.fullName',
                    defaultMessage: 'Exhibition approval date',
                  },
                  name: {
                    id: 'field.iterationreports_common.exhibitionApprovalDate.name',
                    defaultMessage: 'Approval date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
          },
        },
        installedEquipmentGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          installedEquipmentGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.installedEquipmentGroup.name',
                  defaultMessage: 'Installed equipment',
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
            installedEquipmentDescription: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.installedEquipmentDescription.fullName',
                    defaultMessage: 'Installed equipment description',
                  },
                  name: {
                    id: 'field.iterationreports_common.installedEquipmentDescription.name',
                    defaultMessage: 'Description',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            installedEquipmentApprovalEntity: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.installedEquipmentApprovalEntity.fullName',
                    defaultMessage: 'Installed equipment approval entity',
                  },
                  name: {
                    id: 'field.iterationreports_common.installedEquipmentApprovalEntity.name',
                    defaultMessage: 'Approval entity',
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
            installedEquipmentApprovalDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.installedEquipmentApprovalDate.fullName',
                    defaultMessage: 'Installed equipment approval date',
                  },
                  name: {
                    id: 'field.iterationreports_common.installedEquipmentApprovalDate.name',
                    defaultMessage: 'Approval date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
          },
        },
        technicalSetupGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          technicalSetupGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.technicalSetupGroup.name',
                  defaultMessage: 'Technical setup',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            technicalSetupType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.technicalSetupType.fullName',
                    defaultMessage: 'Technical setup type',
                  },
                  name: {
                    id: 'field.iterationreports_common.technicalSetupType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'techsetuptype',
                  },
                },
              },
            },
            technicalSetupApprovalEntity: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.technicalSetupApprovalEntity.fullName',
                    defaultMessage: 'Technical setup approval entity',
                  },
                  name: {
                    id: 'field.iterationreports_common.technicalSetupApprovalEntity.name',
                    defaultMessage: 'Approval entity',
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
            technicalSetupApprovalDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.technicalSetupApprovalDate.fullName',
                    defaultMessage: 'Technical setup approval date',
                  },
                  name: {
                    id: 'field.iterationreports_common.technicalSetupApprovalDate.name',
                    defaultMessage: 'Approval date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            technicalSetupDescription: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.technicalSetupDescription.fullName',
                    defaultMessage: 'Technical setup description',
                  },
                  name: {
                    id: 'field.iterationreports_common.technicalSetupDescription.name',
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
        iterationSpecificGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          iterationSpecificGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.iterationSpecificGroup.name',
                  defaultMessage: 'Iteration-specific modification',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            modificationApprovalEntity: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.modificationApprovalEntity.fullName',
                    defaultMessage: 'Iteration-specific modification approval entity',
                  },
                  name: {
                    id: 'field.iterationreports_common.modificationApprovalEntity.name',
                    defaultMessage: 'Approval entity',
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
            modificationApprovalDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.modificationApprovalDate.fullName',
                    defaultMessage: 'Iteration-specific modification approval date',
                  },
                  name: {
                    id: 'field.iterationreports_common.modificationApprovalDate.name',
                    defaultMessage: 'Approval date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            modificationDescription: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.modificationDescription.fullName',
                    defaultMessage: 'Iteration-specific modification description',
                  },
                  name: {
                    id: 'field.iterationreports_common.modificationDescription.name',
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
        installationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          installationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.installationGroup.name',
                  defaultMessage: 'Further installation detail',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            installationApprovalEntity: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.installationApprovalEntity.fullName',
                    defaultMessage: 'Further installation detail approval entity',
                  },
                  name: {
                    id: 'field.iterationreports_common.installationApprovalEntity.name',
                    defaultMessage: 'Approval entity',
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
            installationApprovalDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.installationApprovalDate.fullName',
                    defaultMessage: 'Further installation detail approval date',
                  },
                  name: {
                    id: 'field.iterationreports_common.installationApprovalDate.name',
                    defaultMessage: 'Approval date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            installationDescription: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.installationDescription.fullName',
                    defaultMessage: 'Further installation detail description',
                  },
                  name: {
                    id: 'field.iterationreports_common.installationDescription.name',
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
        maintenanceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          maintenanceGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.maintenanceGroup.name',
                  defaultMessage: 'Maintenance',
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
            maintenanceType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.maintenanceType.fullName',
                    defaultMessage: 'Maintenance type',
                  },
                  name: {
                    id: 'field.iterationreports_common.maintenanceType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'maintenancetype',
                  },
                },
              },
            },
            maintenanceContact: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.maintenanceContact.fullName',
                    defaultMessage: 'Maintenance contact',
                  },
                  name: {
                    id: 'field.iterationreports_common.maintenanceContact.name',
                    defaultMessage: 'Contact',
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
            maintenanceDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.maintenanceDate.fullName',
                    defaultMessage: 'Maintenance date',
                  },
                  name: {
                    id: 'field.iterationreports_common.maintenanceDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            maintenanceExtent: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.maintenanceExtent.fullName',
                    defaultMessage: 'Maintenance extent',
                  },
                  name: {
                    id: 'field.iterationreports_common.maintenanceExtent.name',
                    defaultMessage: 'Extent',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        securityGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          securityGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.iterationreports_common.securityGroup.name',
                  defaultMessage: 'Security',
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
            securityRequirements: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.securityRequirements.fullName',
                    defaultMessage: 'Security requirements',
                  },
                  name: {
                    id: 'field.iterationreports_common.securityRequirements.name',
                    defaultMessage: 'Requirements',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'securityrequirements',
                  },
                },
              },
            },
            securityApprovalEntity: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.securityApprovalEntity.fullName',
                    defaultMessage: 'Security approval entity',
                  },
                  name: {
                    id: 'field.iterationreports_common.securityApprovalEntity.name',
                    defaultMessage: 'Approval entity',
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
            securityApprovalDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.iterationreports_common.securityApprovalDate.fullName',
                    defaultMessage: 'Security approval date',
                  },
                  name: {
                    id: 'field.iterationreports_common.securityApprovalDate.name',
                    defaultMessage: 'Approval date',
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
