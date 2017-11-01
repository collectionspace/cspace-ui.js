import completeForm from './complete';

export default pluginContext => ({
  complete: completeForm(pluginContext),
});
