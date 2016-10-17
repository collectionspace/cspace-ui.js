import formTemplate from './formTemplate';
import messageDescriptors from './messageDescriptors';
import serviceConfig from './serviceConfig';
import title from './title';

export default config => pluginContext => ({ // eslint-disable-line no-unused-vars
  messageDescriptors,
  serviceConfig,
  title: title(pluginContext),
  formTemplate: formTemplate(pluginContext),
});
