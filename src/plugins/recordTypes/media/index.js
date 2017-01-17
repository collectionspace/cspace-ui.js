import columns from './columns';
import defaultForm from './forms/default';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => pluginContext => ({
  recordTypes: {
    media: {
      columns,
      messages,
      serviceConfig,
      forms: {
        default: defaultForm(pluginContext),
      },
      title: title(pluginContext),
    },
  },
});
