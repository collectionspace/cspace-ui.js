import fields from './fields';
import forms from './forms';
import messages from './messages';
import optionLists from './optionLists';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => (configContext) => ({
  optionLists,
  recordTypes: {
    contact: {
      messages,
      serviceConfig,
      fields: fields(configContext),
      forms: forms(configContext),
      title: title(configContext),
    },
  },
});
