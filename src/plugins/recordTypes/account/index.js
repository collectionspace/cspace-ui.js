import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import normalizeRecordData from './normalizeRecordData';
import optionLists from './optionLists';
import requestConfig from './requestConfig';
import serviceConfig from './serviceConfig';
import prepareForSending from './prepareForSending';
import title from './title';

export default () => pluginContext => ({
  optionLists,
  recordTypes: {
    account: {
      messages,
      prepareForSending,
      requestConfig,
      serviceConfig,
      columns: columns(pluginContext),
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      normalizeRecordData: normalizeRecordData(pluginContext),
      title: title(pluginContext),
    },
  },
});
