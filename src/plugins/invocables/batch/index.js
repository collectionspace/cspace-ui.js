import mergeAuthorityItemsStatusBatchJob from './org.collectionspace.services.batch.nuxeo.MergeAuthorityItemsBatchJob';
import updateInventoryStatusBatchJob from './org.collectionspace.services.batch.nuxeo.UpdateInventoryStatusBatchJob';
import grouperBatchJob from './org.collectionspace.services.batch.nuxeo.GrouperBatchJob';

export default [
  mergeAuthorityItemsStatusBatchJob,
  updateInventoryStatusBatchJob,
  grouperBatchJob,
];
