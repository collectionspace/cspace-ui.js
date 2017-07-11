import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';
// import optionLists from './optionLists';
import idGenerators from './idGenerators';

export default () => pluginContext => ({
  idGenerators,
  recordTypes: {
    loanin: {
      advancedSearch,
      columns,
      messages,
      serviceConfig,
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
    },
  },
});
