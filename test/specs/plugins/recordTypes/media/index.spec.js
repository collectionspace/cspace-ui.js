import Immutable from 'immutable';
import mediaRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/media';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('media record plugin', function suite() {
  const config = {};
  const mediaRecordTypePlugin = mediaRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();
  const pluginConfigContribution = mediaRecordTypePlugin(pluginContext);

  context('blob subrecord save condition', () => {
    const saveCondition = pluginConfigContribution.recordTypes.media.subrecords.blob.saveCondition;

    it('should return false for existing records', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            // uri is present, so it's an existing record.
            uri: 'something',
          },
        },
      });

      saveCondition(data).should.equal(false);
    });

    it('should return true for new records that have a file', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            // uri is not present, so it's a new record.
          },
          'ns2:blobs_common': {
            file: 'something',
          },
        },
      });

      saveCondition(data).should.equal(true);
    });

    it('should return false for new records that do not have a file', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            // uri is not present, so it's a new record.
          },
        },
      });

      saveCondition(data).should.equal(false);
    });

    it('should return false for new records that have an empty file array', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            // uri is not present, so it's a new record.
          },
          'ns2:blobs_common': {
            file: [],
          },
        },
      });

      saveCondition(data).should.equal(false);
    });
  });
});
