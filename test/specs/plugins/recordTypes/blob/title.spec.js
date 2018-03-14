import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/blob/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('blob record title', function suite() {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the name', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:blobs_common': {
          name: 'foo.jpg',
        },
      },
    });

    title(data).should.equal('foo.jpg');
  });

  it('should return empty string if no data is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:blob_extension': {
          foo: 'bar',
        },
      },
    });

    title(data).should.equal('');
  });
});
