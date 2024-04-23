import advancedSearch from './advancedSearch';
import columns from './columns';
import idGenerators from './idGenerators';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => (configContext) => ({
  idGenerators,
  recordTypes: {
    nagprainventory: {
      messages,
      serviceConfig,
      advancedSearch: advancedSearch(configContext),
      columns: columns(configContext),
      fields: fields(configContext),
      forms: forms(configContext),
      title: title(configContext),
    },
  },
});
