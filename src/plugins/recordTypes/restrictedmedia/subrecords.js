export default (configContext) => {
  const {
    isNewRecord,
  } = configContext.recordDataHelpers;

  return {
    blob: {
      recordType: 'blob',
      csidField: ['document', 'ns2:restrictedmedia_common', 'blobCsid'],
      saveStage: 'before',
      saveCondition: (data) => {
        // Only save new records that have the file field set.

        if (!isNewRecord(data)) {
          return false;
        }

        const file = data.getIn(['document', 'ns2:blobs_common', 'file']);

        if (!file) {
          return false;
        }

        return ((file instanceof Array && file.length > 0) || typeof file === 'string');
      },
    },
  };
};
