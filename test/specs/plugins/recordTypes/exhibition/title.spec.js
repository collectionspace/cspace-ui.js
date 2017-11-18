import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/exhibition/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('exhibition record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should concat the exhibition number and the title', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:exhibitions_common': {
          exhibitionNumber: 'EX2017.1',
          title: 'Ancient Persia',
        },
      },
    });

    title(data).should.equal('EX2017.1 – Ancient Persia');
  });

  it('should return the exhibition number when the title is empty', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:exhibitions_common': {
          exhibitionNumber: 'EX2017.1',
          title: '',
        },
      },
    });

    title(data).should.equal('EX2017.1');
  });

  it('should return empty string if no data is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const data = Immutable.fromJS({
      data: {
        'ns2:exhibitions_extension': {
          exhibitionNumber: 'Something',
        },
      },
    });

    title(data).should.equal('');
  });
});
