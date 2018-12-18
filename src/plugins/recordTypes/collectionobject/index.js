import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import idGenerators from './idGenerators';
import messages from './messages';
import optionLists from './optionLists';
import prepareForSending from './prepareForSending';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => configContext => ({
  idGenerators,
  optionLists,
  recordTypes: {
    collectionobject: {
      messages,
      prepareForSending,
      serviceConfig,
      advancedSearch: advancedSearch(configContext),
      columns: columns(configContext),
      defaultForSearch: true, // Is this the default in search dropdowns?
      fields: fields(configContext),
      forms: forms(configContext),
      title: title(configContext),
    },
  },
});
