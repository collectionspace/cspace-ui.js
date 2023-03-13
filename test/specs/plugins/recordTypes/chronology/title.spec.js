import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/chronology/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('chronology record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the primary display name', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:chronologies_common': {
          chronologyTermGroupList: {
            chronologyTermGroup: [{
              termDisplayName: 'Primary Chronology',
            }, {
              termDisplayName: 'Alternative Chronology',
            }],
          },
        },
      },
    });

    title(data).should.equal('Primary Chronology');
  });

  it('should return an empty string if no document is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return an empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:chronologies_extension': {
          chronologyTermGroupList: {
            chronologyTermGroup: [{
              termDisplayName: 'Primary Chronology',
            }, {
              termDisplayName: 'Alternative Chronology',
            }],
          },
        },
      },
    });

    title(data).should.equal('');
  });
});
