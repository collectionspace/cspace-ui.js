import { defineMessages } from 'react-intl';

import {
  getVocabularyShortID,
} from 'cspace-refname';

import {
  getRecordTypeConfigByServiceObjectName,
  getVocabularyConfigByShortID,
} from '../../helpers/configHelpers';

export default () => ({
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
      messages: defineMessages({
        resultCount: {
          id: 'list.common.resultCount',
          defaultMessage: `{totalItems, plural,
            =0 {No records}
            one {1 record}
            other {{startNum, number}–{endNum, number} of {totalItems, number} records}
          } found`,
        },
        searching: {
          id: 'list.common.searching',
          defaultMessage: 'Finding records...',
        },
      }),
      getItemLocationPath: (item, { config, searchDescriptor }) => {
        const docType = item.get('docType');
        const refName = item.get('refName');
        const csid = item.get('csid');

        let recordTypeConfig;

        if (docType) {
          // This is a search on multiple record types, which will contain the record type of each
          // item in the result.

          recordTypeConfig = getRecordTypeConfigByServiceObjectName(config, docType);
        } else {
          // This is a search on a single record type, so the record type of all items is in the
          // search descriptor.

          recordTypeConfig = config.recordTypes[searchDescriptor.get('recordType')];
        }

        if (recordTypeConfig) {
          if (recordTypeConfig.serviceConfig.serviceType === 'authority') {
            const vocabularyShortID = getVocabularyShortID(refName);

            const vocabularyConfig = getVocabularyConfigByShortID(
              recordTypeConfig,
              vocabularyShortID,
            );

            if (vocabularyConfig) {
              return `/record/${recordTypeConfig.name}/${vocabularyConfig.name}/${csid}`;
            }
          } else {
            return `/record/${recordTypeConfig.name}/${csid}`;
          }
        }

        return null;
      },
    },
  },
});
