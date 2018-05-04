import content from './content';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import requestConfig from './requestConfig';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => configContext => ({
  recordTypes: {
    blob: {
      content,
      messages,
      requestConfig,
      serviceConfig,
      fields: fields(configContext),
      forms: forms(configContext),
      title: title(configContext),
    },
  },
});
