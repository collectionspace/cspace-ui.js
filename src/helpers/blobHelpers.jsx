import React from 'react';
import BlobImage from '../components/image/BlobImage';

export const derivativeImage = (blobCsid, derivative) =>
  (blobCsid ? <BlobImage csid={blobCsid} derivative={derivative} /> : null);

export const thumbnailImage = blobCsid => derivativeImage(blobCsid, 'Thumbnail');

export const smallImage = blobCsid => derivativeImage(blobCsid, 'Small');

export const mediumImage = blobCsid => derivativeImage(blobCsid, 'Medium');

export const originalJpegImage = blobCsid => derivativeImage(blobCsid, 'OriginalJpeg');
