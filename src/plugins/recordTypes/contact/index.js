import fields from './fields';
import forms from './forms';
import messages from './messages';
import optionLists from './optionLists';
import serviceConfig from './serviceConfig';

export default () => pluginContext => ({
  optionLists,
  recordTypes: {
    contact: {
      messages,
      serviceConfig,
      fields: fields(pluginContext),
      forms: forms(pluginContext),
    },
  },
});
