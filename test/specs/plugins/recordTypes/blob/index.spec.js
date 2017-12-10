import Immutable from 'immutable';
import blobRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/blob';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

const expect = chai.expect;

chai.should();

describe('blob record plugin', function suite() {
  const config = {};
  const blobRecordTypePlugin = blobRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = blobRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('blob');

    const blobRecordType = recordTypes.blob;

    blobRecordType.should.have.property('messages').that.is.an('object');
    blobRecordType.should.have.property('serviceConfig').that.is.an('object');
    blobRecordType.should.have.property('title').that.is.a('function');
    blobRecordType.should.have.property('forms').that.is.an('object');
    blobRecordType.should.have.property('requestConfig').that.is.a('function');
  });

  context('requestConfig', () => {
    const pluginConfigContribution = blobRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('blob');

    const blobRecordType = recordTypes.blob;
    const { requestConfig } = blobRecordType;

    it('should return a multipart/form-data config when the file field contains an array of files', () => {
      const file = {};
      const data = Immutable.Map().setIn(['document', 'ns2:blobs_common', 'file'], [file]);

      requestConfig('save', data).should.deep.equal({
        type: 'multipart/form-data',
        data: {
          file,
          document: null,
        },
      });
    });

    it('should return a blobUri param when the file field contains a string', () => {
      const url = 'http://foo.org';
      const data = Immutable.Map().setIn(['document', 'ns2:blobs_common', 'file'], url);

      requestConfig('save', data).should.deep.equal({
        params: {
          blobUri: url,
        },
      });
    });

    it('should return undefined when the file field contains an empty array', () => {
      const data = Immutable.Map().setIn(['document', 'ns2:blobs_common', 'file'], []);

      expect(requestConfig(data)).to.equal(undefined);
    });

    it('should return undefined when the file field contains another type of value', () => {
      const value = 1;
      const data = Immutable.Map().setIn(['document', 'ns2:blobs_common', 'file'], value);

      expect(requestConfig(data)).to.equal(undefined);
    });
  });
});
