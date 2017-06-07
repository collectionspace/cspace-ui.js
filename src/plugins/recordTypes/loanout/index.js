import advancedSearch from './advancedSearch';
import columns from './columns';
import defaultForm from './forms/default';
import fields from './fields';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';
// import optionLists from './optionLists';
import idGenerators from './idGenerators';

export default () => pluginContext => ({
  idGenerators,
  recordTypes: {
    loanout: {
      advancedSearch,
      columns,
      messages,
      serviceConfig,
      fields: fields(pluginContext),
      forms: {
        default: defaultForm(pluginContext),
      },
      title: title(pluginContext),
    },
  },
});
