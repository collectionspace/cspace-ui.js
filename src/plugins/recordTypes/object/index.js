import defaultForm from './forms/default';
import idGenerators from './idGenerators';
import messageDescriptors from './messageDescriptors';
import serviceConfig from './serviceConfig';
import title from './title';
import optionLists from './optionLists';

export default () => pluginContext => ({
  idGenerators,
  optionLists,
  recordTypes: {
    object: {
      defaultForSearch: true, // Is this the default in search dropdowns?
      messageDescriptors,
      serviceConfig,
      forms: {
        default: defaultForm(pluginContext),
      },
      sortOrder: null, // Ordering among record types of the same type
      title: title(pluginContext),
      group: 'object', // 'object', 'procedure', 'authority'
    },
  },
});
