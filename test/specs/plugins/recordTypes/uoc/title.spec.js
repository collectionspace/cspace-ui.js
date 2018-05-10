import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/uoc/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('uoc record title', function suite() {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the reference number and title', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:uoc_common': {
          referenceNumber: 'LI.2017.2',
          title: 'All Day Long',
        },
      },
    });

    title(data).should.equal('LI.2017.2 – All Day Long');
  });

  it('should return the reference number when title is empty', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:uoc_common': {
          referenceNumber: 'LI.2017.2',
          title: '',
        },
      },
    });

    title(data).should.equal('LI.2017.2');
  });

  it('should return the title when reference number is empty', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:uoc_common': {
          referenceNumber: '',
          title: 'All Day Long',
        },
      },
    });

    title(data).should.equal('All Day Long');
  });

  it('should return empty string if no data is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:uoc_extension': {
          referenceNumber: 'Something',
          title: 'Something else',
        },
      },
    });

    title(data).should.equal('');
  });
});
