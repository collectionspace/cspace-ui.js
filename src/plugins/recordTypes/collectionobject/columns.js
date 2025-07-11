import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      objectNumber: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.default.objectNumber',
            defaultMessage: 'Identification number',
          },
        }),
        order: 10,
        sortBy: 'collectionobjects_common:objectNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.default.title',
            defaultMessage: 'Title',
          },
        }),
        order: 20,
        sortBy: 'collectionobjects_common:titleGroupList/0/title',
        width: 450,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
    narrow: {
      objectNumber: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.narrow.objectNumber',
            defaultMessage: 'ID',
          },
        }),
        order: 10,
        sortBy: 'collectionobjects_common:objectNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.narrow.title',
            defaultMessage: 'Title',
          },
        }),
        order: 20,
        width: 450,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.narrow.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
    list: {
      objectNumber: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.list.objectNumber',
            defaultMessage: 'Object ID',
          },
        }),
        order: 10,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.list.title',
            defaultMessage: 'Object Title',
          },
        }),
        order: 20,
      },
      responsibleDepartment: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.list.responsibleDepartment',
            defaultMessage: 'Responsible Department',
          },
        }),
        order: 30,
      },
      computedCurrentLocation: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.list.computedCurrentLocation',
            defaultMessage: 'Current Location',
          },
        }),
        order: 40,
      },
      briefDescription: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.list.briefDescription',
            defaultMessage: 'Brief Description',
          },
        }),
        order: 50,
        sortBy: 'collectionobjects_common:briefDescriptions/0',
      },
    },
    grid: {
      title: {
        fields: ['objectName', 'title'],
      },
      subtitle: {
        fields: ['updatedAt'],
      },
    },
  };
};
