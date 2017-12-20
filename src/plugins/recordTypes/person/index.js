import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import optionLists from './optionLists';
import serviceConfig from './serviceConfig';
import title from './title';
import vocabularies from './vocabularies';

export default () => pluginContext => ({
  optionLists,
  recordTypes: {
    person: {
      advancedSearch,
      columns,
      messages,
      serviceConfig,
      vocabularies,
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
      subrecords: {
        contact: {
          recordType: 'contact',
          subresource: 'contacts',
          saveStage: 'after',
        },
      },
    },
  },
});
