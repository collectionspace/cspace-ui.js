import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/media/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('media record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the identification number and title', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:media_common': {
          identificationNumber: 'MR2017.1.1',
          title: 'Media Title',
        },
      },
    });

    title(data).should.equal('MR2017.1.1 – Media Title');
  });

  it('should return the identificatino number when title is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:media_common': {
          identificationNumber: 'MR2017.1.1',
          title: '',
        },
      },
    });

    title(data).should.equal('MR2017.1.1');
  });

  it('should return the title when identification number is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:media_common': {
          identificationNumber: '',
          title: 'Media Title',
        },
      },
    });

    title(data).should.equal('Media Title');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:media_extension': {
          foo: 'bar',
        },
      },
    });

    title(data).should.equal('');
  });
});
