import Immutable from 'immutable';
import form from '../../../../../../src/plugins/recordTypes/blob/forms/default';
import createPluginContext from '../../../../../../src/helpers/createPluginContext';

const expect = chai.expect;

chai.should();

describe('blob record default form', function suite() {
  it('should have a template function', function test() {
    const pluginContext = createPluginContext();
    const { template } = form(pluginContext);

    template.should.be.a('function');
  });

  context('template', () => {
    it('should return \'upload\' when the data represents a new record', () => {
      const pluginContext = createPluginContext();
      const { template } = form(pluginContext);

      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            // No uri
          },
        },
      });

      const templateName = template(data);

      templateName.should.equal('upload');
    });

    it('should return \'view\' when the data represents an existing record', () => {
      const pluginContext = createPluginContext();
      const { template } = form(pluginContext);

      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: 'something',
          },
        },
      });

      const templateName = template(data);

      templateName.should.equal('view');
    });

    it('should return null when no data is supplied', () => {
      const pluginContext = createPluginContext();
      const { template } = form(pluginContext);

      const templateName = template();

      expect(templateName).to.equal(null);
    });

    it('should return null when the data does not contain a document', () => {
      const pluginContext = createPluginContext();
      const { template } = form(pluginContext);

      const data = Immutable.fromJS({
        // No document
      });

      const templateName = template(data);

      expect(templateName).to.equal(null);
    });
  });
});
