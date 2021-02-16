import advancedSearch from './advancedSearch';
import optionLists from './optionLists';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import idGenerators from './idGenerators';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => (configContext) => ({
  idGenerators,
  optionLists,
  recordTypes: {
    transport: {
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
