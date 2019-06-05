import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';
import idGenerators from './idGenerators';
import optionLists from './optionLists';

export default () => (configContext) => ({
  idGenerators,
  optionLists,
  recordTypes: {
    uoc: {
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
