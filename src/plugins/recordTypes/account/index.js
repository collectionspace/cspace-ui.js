import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import optionLists from './optionLists';
import serviceConfig from './serviceConfig';
import prepareForSending from './prepareForSending';
import title from './title';

export default () => pluginContext => ({
  optionLists,
  recordTypes: {
    account: {
      messages,
      prepareForSending,
      serviceConfig,
      columns: columns(pluginContext),
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
    },
  },
});
