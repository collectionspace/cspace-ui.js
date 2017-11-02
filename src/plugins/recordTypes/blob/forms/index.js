import defaultForm from './default';
import uploadForm from './upload';
import viewForm from './view';

export default pluginContext => ({
  default: defaultForm(pluginContext),
  upload: uploadForm(pluginContext),
  view: viewForm(pluginContext),
});
