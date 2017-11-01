import completeForm from './complete';
import inventoryForm from './inventory';
import photoForm from './photo';

export default pluginContext => ({
  complete: completeForm(pluginContext),
  inventory: inventoryForm(pluginContext),
  photo: photoForm(pluginContext),
});
