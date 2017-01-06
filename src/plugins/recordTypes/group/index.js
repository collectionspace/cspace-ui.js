import columns from './columns';
import defaultForm from './forms/default';
import messageDescriptors from './messageDescriptors';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => pluginContext => ({
  recordTypes: {
    group: {
      columns,
      messageDescriptors,
      serviceConfig,
      forms: {
        default: defaultForm(pluginContext),
      },
      title: title(pluginContext),
    },
  },
});
