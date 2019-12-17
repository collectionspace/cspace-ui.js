import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => (configContext) => ({
  recordTypes: {
    procedure: {
      messages,
      serviceConfig,
      advancedSearch: advancedSearch(configContext),
      columns: columns(configContext),
      fields: fields(configContext),
    },
  },
});
