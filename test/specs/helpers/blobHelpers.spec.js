import BlobImage from '../../../src/components/image/BlobImage';

import {
  derivativeImage,
  thumbnailImage,
  smallImage,
  mediumImage,
  originalJpegImage,
} from '../../../src/helpers/blobHelpers';

describe('blobHelpers', function moduleSuite() {
  describe('derivativeImage', function suite() {
    it('should return a BlobImage with the given csid and derivative', function test() {
      const csid = '1234';
      const derivative = 'SomeDerivativeName';

      const component = derivativeImage(csid, derivative);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal(derivative);
    });
  });

  describe('thumbnailImage', function suite() {
    it('should return a BlobImage with the given csid and the thumbnail derivative', function test() {
      const csid = '1234';

      const component = thumbnailImage(csid);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal('Thumbnail');
    });
  });

  describe('smallImage', function suite() {
    it('should return a BlobImage with the given csid and the small derivative', function test() {
      const csid = '1234';

      const component = smallImage(csid);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal('Small');
    });
  });

  describe('mediumImage', function suite() {
    it('should return a BlobImage with the given csid and the medium derivative', function test() {
      const csid = '1234';

      const component = mediumImage(csid);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal('Medium');
    });
  });

  describe('originalJpegImage', function suite() {
    it('should return a BlobImage with the given csid and the original jpeg derivative', function test() {
      const csid = '1234';

      const component = originalJpegImage(csid);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal('OriginalJpeg');
    });
  });
});
