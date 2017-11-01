import completeForm from './complete';
import doorstepForm from './doorstep';

export default pluginContext => ({
  complete: completeForm(pluginContext),
  doorstep: doorstepForm(pluginContext),
});
