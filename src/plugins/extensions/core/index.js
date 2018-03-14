import advancedSearch from './advancedSearch';
import fields from './fields';

export default () => configContext => ({
  extensions: {
    core: {
      advancedSearch: advancedSearch(configContext),
      fields: fields(configContext),
    },
  },
});
