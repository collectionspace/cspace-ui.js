import columns from './columns';
import defaultForm from './forms/default';
import fields from './fields';
import idGenerators from './idGenerators';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';
import optionLists from './optionLists';

export default () => pluginContext => ({
  idGenerators,
  optionLists,
  recordTypes: {
    collectionobject: {
      columns,
      messages,
      serviceConfig,
      defaultForSearch: true, // Is this the default in search dropdowns?
      fields: fields(pluginContext),
      forms: {
        default: defaultForm(pluginContext),
      },
      sortOrder: null, // Ordering among record types of the same type
      title: title(pluginContext),
    },
  },
});
