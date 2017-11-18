import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/media/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('media record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should concat the identification number and title', function test() {
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

  it('should return the identificatino number when title is empty', function test() {
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

  it('should return the title when identification number is empty', function test() {
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

  it('should return empty string if no data is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
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
