// DRYD-557: Delete the computedCurrentLocation field, so it can't be overwritten.
// Doing this as a quick fix until the services layer supports services read-only fields
// (DRYD-556).

export default data =>
  data.deleteIn(['document', 'ns2:collectionobjects_common', 'computedCurrentLocation']);
