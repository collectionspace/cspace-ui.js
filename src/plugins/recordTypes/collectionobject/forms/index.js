import defaultForm from './default';
import inventoryForm from './inventory';
import miniForm from './mini';
import photoForm from './photo';

export default pluginContext => ({
  default: defaultForm(pluginContext),
  inventory: inventoryForm(pluginContext),
  mini: miniForm(pluginContext),
  photo: photoForm(pluginContext),
});
