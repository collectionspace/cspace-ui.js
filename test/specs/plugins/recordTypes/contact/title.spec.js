import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/contact/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('contact record title', function suite() {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the primary email', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:contacts_common': {
          emailGroupList: {
            emailGroup: [{
              email: 'email1@foo.org',
            }, {
              email: 'email2@foo.org',
            }],
          },
        },
      },
    });

    title(data).should.equal('email1@foo.org');
  });

  it('should return empty string if no data is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:contact_extension': {
          foo: 'bar',
        },
      },
    });

    title(data).should.equal('');
  });
});
