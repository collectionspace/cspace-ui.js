import formTemplate from './formTemplate';
import messageDescriptors from './messageDescriptors';
import pageTitle from './pageTitle';
import serviceConfig from './serviceConfig';

export default config => pluginContext => ({ // eslint-disable-line no-unused-vars
  pageTitle,
  serviceConfig,
  messageDescriptors,
  formTemplate: formTemplate(pluginContext),
});
