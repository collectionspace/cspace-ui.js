import configurePlugin from '../../../../src/plugins/options/default';

chai.should();

describe('default options plugin', function suite() {
  const config = {};
  const pluginFactory = configurePlugin(config);

  let addedOptions = null;
  let addedMessageDescriptors = null;

  const pluginContext = {
    addOptions(options, messageDescriptors) {
      addedOptions = options;
      addedMessageDescriptors = messageDescriptors;
    },
  };

  it('should call pluginContext.addOptions', function test() {
    pluginFactory(pluginContext);

    addedOptions.should.be.an('object');
    addedMessageDescriptors.should.be.an('object');
  });
});
