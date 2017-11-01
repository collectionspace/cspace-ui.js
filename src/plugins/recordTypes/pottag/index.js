import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';
import optionLists from './optionLists';

export default () => pluginContext => ({
  optionLists,
  recordTypes: {
    pottag: {
      advancedSearch,
      columns,
      messages,
      serviceConfig,
      defaultForm: 'complete',
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
    },
  },
});
