import { defineMessages } from 'react-intl';

/**
 * We store a key which is the value of the sort option, then use the 'sortBy' to store
 * the actual field associated with the key. This is to keep some compatibility with how
 * things have previously worked so that we aren't changing too much at once. Maybe it would
 * be better to move off of 'sortBy' now, though.
 */
export default {
  objectNumber: {
    messages: defineMessages({
      label: {
        id: 'sortBy.collectionobjects.objectNumber',
        defaultMessage: 'Identification number',
      },
    }),
    sortBy: 'collectionobjects_common:objectNumber',
  },
  objectName: {
    messages: defineMessages({
      label: {
        id: 'sortBy.collectionobjects.objectName',
        defaultMessage: 'Object name',
      },
    }),
    sortBy: 'collectionobjects_common:objectNameList/0/objectName',
  },
  objectNameControlled: {
    messages: defineMessages({
      label: {
        id: 'sortBy.collectionobjects.objectNameControlled',
        defaultMessage: 'Object name controlled',
      },
    }),
    sortBy: 'collectionobjects_common:objectNameList/0/objectNameControlled',
  },
  title: {
    messages: defineMessages({
      label: {
        id: 'sortBy.collectionobjects.title',
        defaultMessage: 'Title',
      },
    }),
    sortBy: 'collectionobjects_common:titleGroupList/0/title',
  },
  updatedAt: {
    messages: defineMessages({
      label: {
        id: 'sortBy.collectionobjects.updatedAt',
        defaultMessage: 'Updated at',
      },
    }),
    sortBy: 'collectionspace_core:updatedAt',
  },
  createdAt: {
    messages: defineMessages({
      label: {
        id: 'sortBy.collectionobjects.createdAt',
        defaultMessage: 'Created at',
      },
    }),
    sortBy: 'collectionspace_core:createdAt',
  },
  computedCurrentLocation: {
    messages: defineMessages({
      label: {
        id: 'sortBy.collectionobjects.computedCurrentLocation',
        defaultMessage: 'Computed current location',
      },
    }),
    sortBy: 'collectionobjects_common:computedCurrentLocation',
  },
  defaultSortBy: 'updatedAt',
  defaultSortDirection: 'desc',
};
