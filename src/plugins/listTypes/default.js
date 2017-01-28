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
  },
});
