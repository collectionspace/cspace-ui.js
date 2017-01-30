import { defineMessages } from 'react-intl';

import {
  getServicePath,
  getVocabularyShortID,
  getItemShortID,
} from 'cspace-refname';

import {
  getRecordTypeConfigByServiceObjectName,
  getRecordTypeConfigByServicePath,
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
            other {{startNum}–{endNum} of {totalItems} records}
          } found`,
        },
        searching: {
          id: 'list.common.searching',
          defaultMessage: 'Finding records...',
        },
      }),
      getItemLocation: (item, { config, searchDescriptor }) => {
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

          recordTypeConfig = config.recordTypes[searchDescriptor.recordType];
        }

        if (recordTypeConfig) {
          if (recordTypeConfig.serviceConfig.serviceType === 'authority') {
            const vocabularyShortID = getVocabularyShortID(refName);

            const vocabularyConfig =
              getVocabularyConfigByShortID(recordTypeConfig, vocabularyShortID);

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
    authRef: {
      listNodeName: 'ns3:authority-ref-list',
      itemNodeName: 'authority-ref-item',
      // NB: This is a list of terms, not records: a record may appear multiple times in the list,
      // if multiple synonyms are used by the record. The messages reflect this.
      messages: defineMessages({
        resultCount: {
          id: 'list.authRef.resultCount',
          defaultMessage: `{totalItems, plural,
            =0 {No terms}
            one {1 term}
            other {{startNum}–{endNum} of {totalItems} terms}
          } found`,
        },
        searching: {
          id: 'list.authRef.searching',
          defaultMessage: 'Finding terms...',
        },
      }),
      getItemLocation: (item, { config }) => {
        const refName = item.get('refName');
        const servicePath = getServicePath(refName);
        const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);

        if (recordTypeConfig) {
          const vocabularyShortID = getVocabularyShortID(refName);

          const vocabularyConfig =
            getVocabularyConfigByShortID(recordTypeConfig, vocabularyShortID);

          if (vocabularyConfig) {
            const itemShortID = getItemShortID(refName);

            if (itemShortID) {
              return `/record/${recordTypeConfig.name}/${vocabularyConfig.name}/urn:cspace:name(${itemShortID})`;
            }
          }
        }

        return null;
      },
    },
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
            other {{startNum}–{endNum} of {totalItems} uses}
          } found`,
        },
        searching: {
          id: 'list.refDoc.searching',
          defaultMessage: 'Finding uses...',
        },
      }),
      getItemLocation: (item, { config }) => {
        const refName = item.get('refName');
        const csid = item.get('docId');
        const servicePath = getServicePath(refName);
        const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);

        if (recordTypeConfig) {
          if (recordTypeConfig.serviceConfig.serviceType === 'authority') {
            const vocabularyShortID = getVocabularyShortID(refName);

            const vocabularyConfig =
              getVocabularyConfigByShortID(recordTypeConfig, vocabularyShortID);

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
