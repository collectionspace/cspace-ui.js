import fields from './fields';
import forms from './forms';

export default () => configContext => ({
  invocables: {
    batch: {
      'org.collectionspace.services.batch.nuxeo.GrouperBatchJob': {
        fields: fields(configContext),
        forms: forms(configContext),
      },
    },
  },
});
