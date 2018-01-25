import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import idGenerators from './idGenerators';
import messages from './messages';
import optionLists from './optionLists';
import serviceConfig from './serviceConfig';
import subrecords from './subrecords';
import title from './title';

export default () => pluginContext => ({
  idGenerators,
  optionLists,
  recordTypes: {
    media: {
      messages,
      serviceConfig,
      advancedSearch: advancedSearch(pluginContext),
      columns: columns(pluginContext),
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      subrecords: subrecords(pluginContext),
      title: title(pluginContext),
    },
  },
});
