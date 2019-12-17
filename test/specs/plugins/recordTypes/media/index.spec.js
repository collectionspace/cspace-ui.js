import Immutable from 'immutable';
import mediaRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/media';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('media record plugin', () => {
  const config = {};
  const mediaRecordTypePlugin = mediaRecordTypePluginFactory(config);
  const configContext = createConfigContext();
  const pluginConfigContribution = mediaRecordTypePlugin(configContext);

  context('blob subrecord save condition', () => {
    const { saveCondition } = pluginConfigContribution.recordTypes.media.subrecords.blob;

    it('should return false for existing records', () => {
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

    it('should return true for new records that have a file', () => {
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

    it('should return false for new records that do not have a file', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            // uri is not present, so it's a new record.
          },
        },
      });

      saveCondition(data).should.equal(false);
    });

    it('should return false for new records that have an empty file array', () => {
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
