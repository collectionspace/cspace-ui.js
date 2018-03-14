import defaultForm from './default';
import miniForm from './mini';

export default configContext => ({
  default: defaultForm(configContext),
  mini: miniForm(configContext),
});
