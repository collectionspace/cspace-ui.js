import formTemplate from './formTemplate';
import messageDescriptors from './messageDescriptors';
import title from './title';

export default config => pluginContext => ({ // eslint-disable-line no-unused-vars
  messageDescriptors,
  serviceConfig: {
    name: 'collectionobjects',
    parts: {
      collectionobjects_common: 'http://collectionspace.org/services/collectionobject',
    },
  },
  title: title(pluginContext),
  formTemplate: formTemplate(pluginContext),
});
