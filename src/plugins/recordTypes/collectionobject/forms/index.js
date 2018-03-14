import defaultForm from './default';
import inventoryForm from './inventory';
import miniForm from './mini';
import photoForm from './photo';

export default configContext => ({
  default: defaultForm(configContext),
  inventory: inventoryForm(configContext),
  mini: miniForm(configContext),
  photo: photoForm(configContext),
});
