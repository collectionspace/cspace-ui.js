import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import idGenerators from './idGenerators';
import optionLists from './optionLists';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => (configContext) => ({
  idGenerators,
  optionLists,
  recordTypes: {
    movement: {
      messages,
      serviceConfig,
      advancedSearch: advancedSearch(configContext),
      columns: columns(configContext),
      fields: fields(configContext),
      forms: forms(configContext),
      lockable: true,
      lockOnSave: 'prompt', // or true/false boolean
      title: title(configContext),
    },
  },
});
