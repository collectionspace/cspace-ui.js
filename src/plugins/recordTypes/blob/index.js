import fields from './fields';
import forms from './forms';
import messages from './messages';
import requestConfig from './requestConfig';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => configContext => ({
  recordTypes: {
    blob: {
      messages,
      requestConfig,
      serviceConfig,
      content: {
        full: {
          subresource: 'original',
        },
        preview: {
          subresource: 'derivativeThumbnail',
        },
      },
      fields: fields(configContext),
      forms: forms(configContext),
      title: title(configContext),
    },
  },
});
