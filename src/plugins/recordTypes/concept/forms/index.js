import defaultForm from './default';
import miniForm from './mini';

export default pluginContext => ({
  default: defaultForm(pluginContext),
  mini: miniForm(pluginContext),
});
