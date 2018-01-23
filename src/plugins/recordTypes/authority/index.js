import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => pluginContext => ({
  recordTypes: {
    authority: {
      messages,
      serviceConfig,
      advancedSearch: advancedSearch(pluginContext),
      columns: columns(pluginContext),
      fields: fields(pluginContext),
    },
  },
});
