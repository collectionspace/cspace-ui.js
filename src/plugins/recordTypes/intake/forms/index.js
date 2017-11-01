import defaultForm from './default';
import doorstepForm from './doorstep';

export default pluginContext => ({
  default: defaultForm(pluginContext),
  doorstep: doorstepForm(pluginContext),
});
