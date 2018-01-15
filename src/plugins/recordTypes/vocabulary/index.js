import columns from './columns';
import fields from './fields';
import forms from './forms';
import optionLists from './optionLists';
import messages from './messages';
import prepareForSending from './prepareForSending';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => pluginContext => ({
  optionLists,
  recordTypes: {
    vocabulary: {
      messages,
      prepareForSending,
      serviceConfig,
      columns: columns(),
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
    },
  },
});
