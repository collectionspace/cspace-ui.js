import mergeAuthorityItemsBatchJob from './org.collectionspace.services.batch.nuxeo.MergeAuthorityItemsBatchJob';
import updateInventoryStatusBatchJob from './org.collectionspace.services.batch.nuxeo.UpdateInventoryStatusBatchJob';
import grouperBatchJob from './org.collectionspace.services.batch.nuxeo.GrouperBatchJob';
import bulkObjectEditBatchJob from './org.collectionspace.services.batch.nuxeo.BulkObjectEditBatchJob';

export default [
  mergeAuthorityItemsBatchJob,
  updateInventoryStatusBatchJob,
  grouperBatchJob,
  bulkObjectEditBatchJob,
];
