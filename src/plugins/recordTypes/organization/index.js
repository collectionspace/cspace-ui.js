import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import optionLists from './optionLists';
import serviceConfig from './serviceConfig';
import subrecords from './subrecords';
import title from './title';
import vocabularies from './vocabularies';

export default () => pluginContext => ({
  optionLists,
  recordTypes: {
    organization: {
      messages,
      serviceConfig,
      subrecords,
      vocabularies,
      advancedSearch: advancedSearch(pluginContext),
      columns: columns(pluginContext),
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
    },
  },
});
