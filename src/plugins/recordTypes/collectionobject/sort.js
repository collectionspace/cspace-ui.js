/**
 * We store a key which is the value of the sort option, then use the 'sortBy' to store
 * the actual field associated with the key. This is to keep some compatibility with how
 * things have previously worked so that we aren't changing too much at once. Maybe it would
 * be better to move off of 'sortBy' now, though.
 */
export default {
  objectNumber: {
    sortBy: 'collectionobjects_common:objectNumber',
  },
  objectName: {
    sortBy: 'collectionobjects_common:objectNameList/0/objectName',
  },
  objectNameControlled: {
    sortBy: 'collectionobjects_common:objectNameList/0/objectNameControlled',
  },
  title: {
    sortBy: 'collectionobjects_common:titleGroupList/0/title',
  },
  updatedAt: {
    sortBy: 'collectionspace_core:updatedAt',
  },
  createdAt: {
    sortBy: 'collectionspace_core:createdAt',
  },
  computedCurrentLocation: {
    sortBy: 'collectionobjects_common:computedCurrentLocation',
  },
};
