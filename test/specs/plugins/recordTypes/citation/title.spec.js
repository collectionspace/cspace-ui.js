import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/citation/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('citation record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the primary display name', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:citations_common': {
          citationTermGroupList: {
            citationTermGroup: [{
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

  it('should return empty string if no document is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      data: {
        'ns2:citations_extension': {
          citationTermGroupList: {
            citationTermGroup: [{
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
