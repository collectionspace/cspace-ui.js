import defaultForm from './default';
import doorstepForm from './doorstep';

export default configContext => ({
  default: defaultForm(configContext),
  doorstep: doorstepForm(configContext),
});
