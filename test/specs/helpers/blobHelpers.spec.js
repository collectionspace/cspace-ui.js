import {
  DERIVATIVE_ORIGINAL,
} from '../../../src/constants/derivativeNames';

import {
  getDerivativePath,
  getImageViewerPath,
} from '../../../src/helpers/blobHelpers';

chai.should();

describe('blobHelpers', () => {
  describe('getDerivativePath', () => {
    const csid = '1234';

    it('should return the url of a derivative', () => {
      const derivative = 'SomeDerivativeName';

      getDerivativePath(csid, derivative).should
        .equal(`blobs/${csid}/derivatives/${derivative}/content`);
    });

    it('should return the url of the original image', () => {
      const derivative = DERIVATIVE_ORIGINAL;

      getDerivativePath(csid, derivative).should
        .equal(`blobs/${csid}/content`);
    });

    it('should return a relative url if there is no services url', () => {
      const derivative = 'SomeDerivativeName';

      getDerivativePath(csid, derivative).should
        .equal(`blobs/${csid}/derivatives/${derivative}/content`);
    });
  });

  describe('getImageViewerPath', () => {
    const imagePath = 'foo/bar';

    it('should prepend the basename and \'/view\' to the image path', () => {
      const config = {
        basename: 'base',
      };

      getImageViewerPath(config, imagePath).should.equal(`${config.basename}/view/${imagePath}`);
    });

    it('should not prepend the basename if it is falsy', () => {
      const config = {
        basename: null,
      };

      getImageViewerPath(config, imagePath).should.equal(`/view/${imagePath}`);
    });
  });
});
