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
      messageDescriptors,
      serviceConfig,
      forms: {
        default: defaultForm(pluginContext),
      },
      title: title(pluginContext),
    },
  },
});
