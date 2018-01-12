import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => pluginContext => ({
  recordTypes: {
    vocabulary: {
      messages,
      serviceConfig,
      columns: columns(),
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
    },
  },
});
