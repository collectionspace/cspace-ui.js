import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/contact/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('contact record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should return the primary email', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:contacts_common': {
        emailGroupList: {
          emailGroup: [{
            email: 'email1@foo.org',
          }, {
            email: 'email2@foo.org',
          }],
        },
      },
    });

    title(cspaceDocument).should.equal('email1@foo.org');
  });

  it('should return empty string if no document is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:contact_extension': {
        foo: 'bar',
      },
    });

    title(cspaceDocument).should.equal('');
  });
});
