import defaultForm from './default';
import inventoryForm from './inventory';
import miniForm from './mini';
import photoForm from './photo';
import publicForm from './public';
import timebasedForm from './timebased';

export default (configContext) => ({
  default: defaultForm(configContext),
  inventory: inventoryForm(configContext),
  mini: miniForm(configContext),
  photo: photoForm(configContext),
  public: publicForm(configContext),
  timebased: timebasedForm(configContext),
});
