import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import TitleBar from '../sections/TitleBar';
import { canCreate } from '../../helpers/permissionHelpers';
import { isLocked } from '../../helpers/workflowStateHelpers';
import styles from '../../../styles/cspace-ui/CreatePage.css';
import panelStyles from '../../../styles/cspace-ui/CreatePagePanel.css';

const serviceTypes = ['object', 'procedure', 'authority'];

const messages = defineMessages({
  title: {
    id: 'createPage.title',
    defaultMessage: 'Create New',
  },
  object: {
    id: 'createPage.object',
    defaultMessage: 'Objects',
  },
  procedure: {
    id: 'createPage.procedure',
    defaultMessage: 'Procedures',
  },
  authority: {
    id: 'createPage.authority',
    defaultMessage: 'Authorities',
  },
});

const tagMessages = defineMessages({
  nagpra: {
    id: 'createPage.tag.nagpra',
    defaultMessage: 'NAGPRA',
  },
  legacy: {
    id: 'createPage.tag.legacy',
    defaultMessage: 'Legacy',
  },
});

const getRecordTypesByServiceType = (recordTypes, perms, intl) => {
  const recordTypesByServiceType = {};

  serviceTypes.forEach((serviceType) => {
    const recordTypeNames = Object.keys(recordTypes)
      .filter((recordTypeName) => {
        const recordTypeConfig = recordTypes[recordTypeName];

        return (
          recordTypeConfig.serviceConfig.serviceType === serviceType
          && !recordTypeConfig.disabled
          && canCreate(recordTypeName, perms)
        );
      })
      .sort((nameA, nameB) => {
        const configA = recordTypes[nameA];
        const configB = recordTypes[nameB];

        // Primary sort by sortOrder

        let sortOrderA = configA.sortOrder;
        let sortOrderB = configB.sortOrder;

        if (typeof sortOrderA !== 'number') {
          sortOrderA = Number.MAX_VALUE;
        }

        if (typeof sortOrderB !== 'number') {
          sortOrderB = Number.MAX_VALUE;
        }

        if (sortOrderA !== sortOrderB) {
          return (sortOrderA > sortOrderB ? 1 : -1);
        }

        // Secondary sort by label

        const labelA = intl.formatMessage(configA.messages.record.name);
        const labelB = intl.formatMessage(configB.messages.record.name);

        // FIXME: This should be locale aware
        return labelA.localeCompare(labelB);
      });

    recordTypesByServiceType[serviceType] = recordTypeNames;
  });

  return recordTypesByServiceType;
};

const getVocabularies = (recordTypeConfig, intl, getAuthorityVocabWorkflowState) => {
  const recordTypeName = recordTypeConfig.name;
  const { vocabularies } = recordTypeConfig;

  let vocabularyNames;

  if (vocabularies) {
    vocabularyNames = Object.keys(vocabularies)
      .filter((vocabularyName) => {
        // Filter out vocabularies that don't exist in the services layer, vocabularies that are
        // locked, and vocabularies that are disabled. Always include the 'all' vocabulary.

        const workflowState = getAuthorityVocabWorkflowState(recordTypeName, vocabularyName);

        return (
          vocabularyName !== 'all'
          && workflowState // Empty workflow state means vocab doesn't exist.
          && !isLocked(workflowState)
          && !vocabularies[vocabularyName].disabled
        );
      })
      .sort((nameA, nameB) => {
        const configA = vocabularies[nameA];
        const configB = vocabularies[nameB];

        // Primary sort by sortOrder

        let sortOrderA = configA.sortOrder;
        let sortOrderB = configB.sortOrder;

        if (typeof sortOrderA !== 'number') {
          sortOrderA = Number.MAX_VALUE;
        }

        if (typeof sortOrderB !== 'number') {
          sortOrderB = Number.MAX_VALUE;
        }

        if (sortOrderA !== sortOrderB) {
          return (sortOrderA > sortOrderB ? 1 : -1);
        }

        // Secondary sort by label

        const labelA = intl.formatMessage(configA.messages.name);
        const labelB = intl.formatMessage(configB.messages.name);

        // FIXME: This should be locale aware
        return labelA.localeCompare(labelB);
      });
  }

  return vocabularyNames;
};

const renderListItem = (recordType, config) => {
  const recordConfig = config[recordType];
  const recordDisplayName = <FormattedMessage {...recordConfig.messages.record.name} />;
  const recordLink = <Link id={recordType} to={`/record/${recordType}`}>{recordDisplayName}</Link>;
  return (
    <li key={recordType}>
      {recordLink}
    </li>
  );
};

/**
 * Render the div for Object records
 *
 * @param {Object} recordTypes the object records
 * @param {Object} config the cspace config
 * @returns the div
 */
const renderObjects = (recordTypes, config) => {
  const serviceType = 'object';

  const items = recordTypes.map((recordType) => renderListItem(recordType, config));

  // todo: validate items exist?
  return (
    <div className={panelStyles[serviceType]} key={serviceType}>
      <h2><FormattedMessage {...messages[serviceType]} /></h2>
      <ul>
        {items}
      </ul>
    </div>
  );
};

/**
 * Render the div for procedure records. The procedures are grouped together by their service tags
 * in order to display similar procedures together. Each tag will have its own header in order to
 * act as a delimiter within the div.
 *
 * @param {Object} recordTypes the procedure record types
 * @param {Object} config the cspace config
 * @param {function} getTagsForRecord function to query the service tag of a record
 * @param {Object} tagConfig the configuration for the service tags containing their sortOrder
 * @returns
 */
const renderProcedures = (recordTypes, config, getTagsForRecord, tagConfig) => {
  const serviceType = 'procedure';

  const grouped = Object.groupBy(recordTypes, (recordType) => getTagsForRecord(recordType) || 'defaultGroup');
  const {
    defaultGroup: defaultRecordTypes,
    ...taggedRecordTypes
  } = grouped;

  const defaultItems = defaultRecordTypes.map((recordType) => renderListItem(recordType, config));

  const taggedItems = Object.keys(taggedRecordTypes).sort((lhs, rhs) => {
    const lhsOrder = tagConfig[lhs].sortOrder || Number.MAX_VALUE;
    const rhsOrder = tagConfig[rhs].sortOrder || Number.MAX_VALUE;

    return lhsOrder > rhsOrder ? 1 : -1;
  }).map((tag) => {
    const tagRecordTypes = taggedRecordTypes[tag];
    const items = tagRecordTypes.map((recordType) => renderListItem(recordType, config));

    return (
      <li className={panelStyles.tag}>
        <h3 id={tag}><FormattedMessage {...tagMessages[tag]} /></h3>
        <ul>
          {items}
        </ul>
      </li>
    );
  });

  return (
    <div className={panelStyles[serviceType]} key={serviceType}>
      <h2><FormattedMessage {...messages[serviceType]} /></h2>
      <ul>
        {defaultItems}
        {taggedItems}
      </ul>
    </div>
  );
};

/**
 * Render the div for creating authority items. Each authority is a header and its vocabulary items
 * are represented as a sub-list.
 *
 * @param {*} recordTypes the authority records
 * @param {Object} config the cspace config
 * @param {intlShape} intl the intl object
 * @param {function} getAuthorityVocabWorkflowState function to get workflow states
 */
const renderAuthorities = (recordTypes, config, intl, getAuthorityVocabWorkflowState) => {
  const authorityItems = recordTypes.map((recordType) => {
    const recordConfig = config[recordType];
    const vocabularies = getVocabularies(
      recordConfig, intl, getAuthorityVocabWorkflowState,
    );

    if (!vocabularies || vocabularies.length === 0) {
      return null;
    }

    const vocabularyItems = vocabularies.map((vocabulary) => (
      <li key={vocabulary}>
        <Link id={`${recordType}/${vocabulary}`} to={`/record/${recordType}/${vocabulary}`}>
          <FormattedMessage {...recordConfig.vocabularies[vocabulary].messages.name} />
        </Link>
      </li>
    ));
    const vocabularyList = <ul>{vocabularyItems}</ul>;

    const recordDisplayName = <FormattedMessage {...recordConfig.messages.record.name} />;
    const recordLink = <h3 id={recordType}>{recordDisplayName}</h3>;

    return (
      <li key={recordType}>
        {recordLink}
        {vocabularyList}
      </li>
    );
  });

  return (
    <div className={panelStyles.authority} key="authority">
      <h2><FormattedMessage {...messages.authority} /></h2>
      <ul>
        {authorityItems}
      </ul>
    </div>
  );
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
};

const propTypes = {
  intl: intlShape,
  perms: PropTypes.instanceOf(Immutable.Map),
  getAuthorityVocabWorkflowState: PropTypes.func,
  getTagsForRecord: PropTypes.func,
};

const defaultProps = {
  getAuthorityVocabWorkflowState: () => null,
};

export default function CreatePage(props, context) {
  const {
    intl,
    perms,
    getAuthorityVocabWorkflowState,
    getTagsForRecord,
  } = props;

  const {
    config,
  } = context;

  const {
    tags: tagConfig,
    recordTypes,
  } = config;

  let objectPanel;
  let procedurePanel;
  let authorityPanel;

  if (recordTypes) {
    const recordTypesByServiceType = getRecordTypesByServiceType(recordTypes, perms, intl);

    objectPanel = renderObjects(recordTypesByServiceType.object, recordTypes);

    procedurePanel = renderProcedures(recordTypesByServiceType.procedure,
      recordTypes,
      getTagsForRecord,
      tagConfig);

    authorityPanel = renderAuthorities(recordTypesByServiceType.authority,
      recordTypes,
      intl,
      getAuthorityVocabWorkflowState);
  }

  const title = <FormattedMessage {...messages.title} />;

  return (
    <div className={styles.common}>
      <TitleBar title={title} updateDocumentTitle />

      <div>
        {objectPanel}
        {procedurePanel}
        {authorityPanel}
      </div>
    </div>
  );
}

CreatePage.propTypes = propTypes;
CreatePage.defaultProps = defaultProps;
CreatePage.contextTypes = contextTypes;
