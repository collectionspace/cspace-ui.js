import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';
import idGenerators from './idGenerators';

export default () => pluginContext => ({
  idGenerators,
  recordTypes: {
    loanout: {
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
