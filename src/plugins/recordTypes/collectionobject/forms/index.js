import defaultForm from './default';
import inventoryForm from './inventory';
import photoForm from './photo';

export default pluginContext => ({
  default: defaultForm(pluginContext),
  inventory: inventoryForm(pluginContext),
  photo: photoForm(pluginContext),
});
