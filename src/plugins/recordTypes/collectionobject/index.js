import advancedSearch from './advancedSearch';
import columns from './columns';
import detailList from './detailList';
import fields from './fields';
import forms from './forms';
import grid from './grid';
import idGenerators from './idGenerators';
import messages from './messages';
import optionLists from './optionLists';
import prepareForSending from './prepareForSending';
import serviceConfig from './serviceConfig';
import sort from './sort';
import title from './title';

export default () => (configContext) => ({
  idGenerators,
  optionLists,
  recordTypes: {
    collectionobject: {
      messages,
      prepareForSending,
      serviceConfig,
      sort,
      advancedSearch: advancedSearch(configContext),
      columns: columns(configContext),
      detailList: detailList(configContext),
      defaultForSearch: true, // Is this the default in search dropdowns?
      fields: fields(configContext),
      forms: forms(configContext),
      grid: grid(configContext),
      title: title(configContext),
    },
  },
});
