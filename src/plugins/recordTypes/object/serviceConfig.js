export default {
  servicePath: 'servicegroups/object/items',
  serviceType: 'utility',

  // This objectName doesn't correspond to anything in the services tenant bindings config, but
  // it's useful as a string to use in forDocTypes to say that a report/batch job applies to all
  // record types.
  objectName: 'ServiceGroup/Object',
};
