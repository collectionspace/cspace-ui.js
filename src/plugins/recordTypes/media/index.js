import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import idGenerators from './idGenerators';
import messages from './messages';
import optionLists from './optionLists';
import serviceConfig from './serviceConfig';
import title from './title';

import { isNewRecord } from '../../../helpers/recordDataHelpers';

export default () => pluginContext => ({
  idGenerators,
  optionLists,
  recordTypes: {
    media: {
      advancedSearch,
      columns,
      messages,
      serviceConfig,
      defaultForm: 'complete',
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      subrecords: {
        blob: {
          recordType: 'blob',
          csidField: ['document', 'ns2:media_common', 'blobCsid'],
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
      },
      title: title(pluginContext),
    },
  },
});
