import {
  OP_OR,
  OP_EQ,
  OP_MATCH,
  OP_RANGE,
} from '../../../constants/searchOperators';

export default {
  op: OP_OR,
  value: [
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/objectNumber',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/responsibleDepartments/responsibleDepartment',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/collection',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/recordStatus',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/titleGroupList/titleGroup/title',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/objectNameList/objectNameGroup/objectName',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectStatusList/objectStatus',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/sex',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/phase',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/forms/form',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/editionNumber',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/styles/style',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/materialGroupList/materialGroup/material',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectComponentGroupList/objectComponentGroup/objectComponentName',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/technicalAttributeGroupList/technicalAttributeGroup/technicalAttribute',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/nonTextualInscriptionGroupList/nonTextualInscriptionGroup/inscriptionDescriptionInscriber',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/nonTextualInscriptionGroupList/nonTextualInscriptionGroup/inscriptionDescriptionMethod',
    },
    /* eslint-disable max-len */
    // {
    //   op: OP_RANGE,
    //   path: 'ns2:collectionobjects_common/objectProductionDateGroupList/objectProductionDateGroup',
    // },
    /* eslint-enable max-len */
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/techniqueGroupList/techniqueGroup/technique',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/objectProductionPlaceGroupList/objectProductionPlaceGroup/objectProductionPlace',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/objectProductionPeopleGroupList/objectProductionPeopleGroup/objectProductionPeople',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectProductionPersonGroupList/objectProductionPersonGroup/objectProductionPerson',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectProductionOrganizationGroupList/objectProductionOrganizationGroup/objectProductionOrganization',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/fieldColEventNames/fieldColEventName',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionspace_core/updatedBy',
    },
    {
      op: OP_RANGE,
      path: 'ns2:collectionspace_core/updatedAt',
    },
  ],
};
