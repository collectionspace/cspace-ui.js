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

export default () => configContext => ({
  optionLists,
  recordTypes: {
    account: {
      messages,
      prepareForSending,
      requestConfig,
      serviceConfig,
      columns: columns(configContext),
      fields: fields(configContext),
      forms: forms(configContext),
      normalizeRecordData: normalizeRecordData(configContext),
      title: title(configContext),
    },
  },
});
