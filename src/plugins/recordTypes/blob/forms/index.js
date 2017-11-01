import completeForm from './complete';
import uploadForm from './upload';
import viewForm from './view';

export default pluginContext => ({
  complete: completeForm(pluginContext),
  upload: uploadForm(pluginContext),
  view: viewForm(pluginContext),
});
