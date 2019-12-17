import Immutable from 'immutable';
import get from 'lodash/get';
import createFields from '../../../../../src/plugins/recordTypes/media/fields';
import { configKey } from '../../../../../src/helpers/configHelpers';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

const { expect } = chai;

chai.should();

describe('media record fields', () => {
  const configContext = createConfigContext();
  const fields = createFields(configContext);

  describe('externalUrl field computation', () => {
    it('should set the value to the value of the blob\'s file field', () => {
      const externalUrlFieldConfig = get(fields, ['document', 'ns2:media_common', 'externalUrl', configKey]);

      externalUrlFieldConfig.should.be.an('object');

      const fileUrl = 'http://some/file/url';

      const subrecordData = Immutable.fromJS({
        blob: {
          document: {
            'ns2:blobs_common': {
              file: fileUrl,
            },
          },
        },
      });

      externalUrlFieldConfig.compute({ subrecordData }).should.equal(fileUrl);
    });

    it('should not set the value (should return undefined) if there is no blob data', () => {
      const externalUrlFieldConfig = get(fields, ['document', 'ns2:media_common', 'externalUrl', configKey]);

      externalUrlFieldConfig.should.be.an('object');

      const subrecordData = Immutable.Map();

      expect(externalUrlFieldConfig.compute({ subrecordData })).to.equal(undefined);
    });

    it('should not set the value (should return undefined) if the blob\'s file field is not a string', () => {
      const externalUrlFieldConfig = get(fields, ['document', 'ns2:media_common', 'externalUrl', configKey]);

      externalUrlFieldConfig.should.be.an('object');

      const subrecordData = Immutable.fromJS({
        blob: {
          document: {
            'ns2:blobs_common': {
              file: {},
            },
          },
        },
      });

      expect(externalUrlFieldConfig.compute({ subrecordData })).to.equal(undefined);
    });
  });
});
