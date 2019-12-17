import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/organization/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('organization record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the primary display name', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:organizations_common': {
          orgTermGroupList: {
            orgTermGroup: [{
              termDisplayName: 'Primary Display Name',
            }, {
              termDisplayName: 'Alternate Display Name',
            }],
          },
        },
      },
    });

    title(data).should.equal('Primary Display Name');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      'ns2:organizations_extension': {
        document: {
          orgTermGroupList: {
            orgTermGroup: [{
              termDisplayName: 'Primary Display Name',
            }, {
              termDisplayName: 'Alternate Display Name',
            }],
          },
        },
      },
    });

    title(data).should.equal('');
  });
});
