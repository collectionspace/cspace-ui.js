import advancedSearch from './advancedSearch';
import fields from './fields';

export default () => pluginContext => ({
  extensions: {
    core: {
      advancedSearch: advancedSearch(pluginContext),
      fields: fields(pluginContext),
    },
  },
});
