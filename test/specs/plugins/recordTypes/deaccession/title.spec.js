import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/deaccession/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('deaccession record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the deaccession number and deaccessionTitle when both are present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:deaccessions_common': {
          deaccessionNumber: 'DE',
          // deaccessionTitle: 'Title',
        },
      },
    });

    title(data).should.equal('DE – Title');
  });

  it('should return the deaccession number only when the deaccessionTitle is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:deaccessions_common': {
          deaccessionNumber: 'DE',
        },
      },
    });

    title(data).should.equal('DE');
  });

  it('should return the deaccessionTitle only when the deaccession number is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:deaccessions_common': {
          // deaccessionTitle: 'Title',
        },
      },
    });

    title(data).should.equal('');
  });

  it('should return an empty string if no document is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return an empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:deaccessions_extension': {
          deaccessionAltTitle: 'Alt deaccession title',
        },
      },
    });

    title(data).should.equal('');
  });
});
