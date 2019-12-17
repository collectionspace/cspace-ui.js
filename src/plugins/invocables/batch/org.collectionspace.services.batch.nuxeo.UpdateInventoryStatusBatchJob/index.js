import fields from './fields';
import forms from './forms';

export default () => (configContext) => ({
  invocables: {
    batch: {
      'org.collectionspace.services.batch.nuxeo.UpdateInventoryStatusBatchJob': {
        fields: fields(configContext),
        forms: forms(configContext),
      },
    },
  },
});
