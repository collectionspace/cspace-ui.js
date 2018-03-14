import defaultForm from './default';
import uploadForm from './upload';
import viewForm from './view';

export default configContext => ({
  default: defaultForm(configContext),
  upload: uploadForm(configContext),
  view: viewForm(configContext),
});
