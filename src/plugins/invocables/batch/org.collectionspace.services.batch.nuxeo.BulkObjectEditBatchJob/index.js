import fields from './fields';
import forms from './forms';

export default () => (configContext) => ({
  invocables: {
    batch: {
      'org.collectionspace.services.batch.nuxeo.BulkObjectEditBatchJob': {
        fields: fields(configContext),
        forms: forms(configContext),
      },
    },
  },
});
