import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => pluginContext => ({
  recordTypes: {
    authrole: {
      columns,
      messages,
      serviceConfig,
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
      requestConfig: (requestType) => {
        if (requestType === 'read') {
          return {
            params: {
              showPerms: true,
            },
          };
        }

        return undefined;
      },
    },
  },
});
