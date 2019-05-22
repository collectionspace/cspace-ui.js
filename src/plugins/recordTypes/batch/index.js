import columns from './columns';
import invocableName from './invocableName';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => configContext => ({
  recordTypes: {
    batch: {
      messages,
      serviceConfig,
      columns: columns(configContext),
      invocableName: invocableName(configContext),
      title: title(configContext),
    },
  },
});
