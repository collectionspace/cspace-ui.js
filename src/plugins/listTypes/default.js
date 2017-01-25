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

        let recordTypeName;

        if (docType) {
          const recordTypeConfig = getRecordTypeConfigByServiceObjectName(config, docType);

          if (recordTypeConfig) {
            recordTypeName = recordTypeConfig.name;
          }
        }

        if (!recordTypeName) {
          recordTypeName = searchDescriptor.recordType;
        }

        if (recordTypeName) {
          const csid = item.get('csid');

          return `/record/${recordTypeName}/${csid}`;
        }

        return null;
      },
    },
    authRef: {
      listNodeName: 'ns3:authority-ref-list',
      itemNodeName: 'authority-ref-item',

      getItemLocation: (item, { config }) => {
        let location = null;

        const refName = item.get('refName');

        if (refName) {
          const servicePath = getServicePath(refName);
          const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);

          if (recordTypeConfig) {
            const vocabularyShortID = getVocabularyShortID(refName);

            const vocabularyConfig =
              getVocabularyConfigByShortID(recordTypeConfig, vocabularyShortID);

            if (vocabularyConfig) {
              const itemShortID = getItemShortID(refName);

              if (itemShortID) {
                location = `/record/${recordTypeConfig.name}/${vocabularyConfig.name}/urn:cspace:name(${itemShortID})`;
              }
            }
          }
        }

        return location;
      },
    },
  },
});
