import { defineMessages } from 'react-intl';

import {
  getServicePath,
  getVocabularyShortID,
} from 'cspace-refname';

import {
  getRecordTypeConfigByServicePath,
  getVocabularyConfigByShortID,
} from '../../helpers/configHelpers';

export default () => ({
  listTypes: {
    refDoc: {
      listNodeName: 'ns3:authority-ref-doc-list',
      itemNodeName: 'authority-ref-doc-item',
      // NB: This is a list of uses, not records: a record may appear multiple times in the list,
      // if it uses the authority item multiple times in different fields (or different instances
      // of a repeating field). The messages reflect this.
      messages: defineMessages({
        resultCount: {
          id: 'list.refDoc.resultCount',
          defaultMessage: `{totalItems, plural,
            =0 {No uses}
            one {1 use}
            other {{startNum, number}–{endNum, number} of {totalItems, number} uses}
          } found`,
        },
        searching: {
          id: 'list.refDoc.searching',
          defaultMessage: 'Finding uses...',
        },
      }),
      getItemLocationPath: (item, { config }) => {
        const refName = item.get('refName');
        const csid = item.get('docId');
        const servicePath = getServicePath(refName);
        const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);

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
