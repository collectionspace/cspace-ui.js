import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import idGenerators from './idGenerators';
import optionLists from './optionLists';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => pluginContext => ({
  idGenerators,
  optionLists,
  recordTypes: {
    movement: {
      advancedSearch,
      messages,
      serviceConfig,
      columns: columns(pluginContext),
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      lockOnSave: 'prompt', // or true/false boolean
      title: title(pluginContext),
    },
  },
});
