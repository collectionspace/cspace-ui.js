import columns from './columns';
import fields from './fields';
import forms from './forms';
import normalizeRecordData from './normalizeRecordData';
import optionLists from './optionLists';
import messages from './messages';
import prepareForSending from './prepareForSending';
import requestConfig from './requestConfig';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => configContext => ({
  optionLists,
  recordTypes: {
    vocabulary: {
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
