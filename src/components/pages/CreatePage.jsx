import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import TitleBar from '../sections/TitleBar';
import { canCreate } from '../../helpers/permissionHelpers';
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

const getRecordTypesByServiceType = (recordTypes, perms, intl) => {
  const recordTypesByServiceType = {};

  serviceTypes.forEach((serviceType) => {
    const recordTypeNames = Object.keys(recordTypes)
      .filter((recordTypeName) => {
        const recordTypeConfig = recordTypes[recordTypeName];

        return (
          recordTypeConfig.serviceConfig.serviceType === serviceType &&
          !recordTypeConfig.disabled &&
          canCreate(recordTypeName, perms)
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

const getVocabularies = (recordTypeConfig, intl) => {
  const { vocabularies } = recordTypeConfig;

  let vocabularyNames;

  if (vocabularies) {
    vocabularyNames = Object.keys(vocabularies)
      .filter(
        vocabularyName => (vocabularyName !== 'all' && !vocabularies[vocabularyName].disabled)
      )
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

const contextTypes = {
  config: PropTypes.object,
};

const propTypes = {
  intl: intlShape,
  perms: PropTypes.instanceOf(Immutable.Map),
};

export default function CreatePage(props, context) {
  const {
    intl,
    perms,
  } = props;

  const {
    config,
  } = context;

  const {
    recordTypes,
  } = config;

  const itemsByServiceType = {};
  const lists = [];

  if (recordTypes) {
    const recordTypesByServiceType = getRecordTypesByServiceType(recordTypes, perms, intl);

    serviceTypes.forEach((serviceType) => {
      itemsByServiceType[serviceType] = recordTypesByServiceType[serviceType].map((recordType) => {
        const recordTypeConfig = recordTypes[recordType];
        const vocabularies = getVocabularies(recordTypeConfig, intl);

        let vocabularyList;

        if (vocabularies && vocabularies.length > 0) {
          const vocabularyItems = vocabularies.map(vocabulary =>
            <li key={vocabulary}>
              <Link id={`${recordType}/${vocabulary}`} to={`record/${recordType}/${vocabulary}`}>
                <FormattedMessage {...recordTypeConfig.vocabularies[vocabulary].messages.name} />
              </Link>
            </li>
          );

          vocabularyList = <ul>{vocabularyItems}</ul>;
        }

        if (recordTypeConfig.vocabularies && !vocabularyList) {
          // The record type is an authority, but no vocabularies are enabled. Don't render
          // anything.

          return null;
        }

        const recordDisplayName = <FormattedMessage {...recordTypeConfig.messages.record.name} />;

        let recordLink;

        if (vocabularyList) {
          recordLink = <h3 id={recordType}>{recordDisplayName}</h3>;
        } else {
          recordLink = <Link id={recordType} to={`record/${recordType}`}>{recordDisplayName}</Link>;
        }

        return (
          <li key={recordType}>
            {recordLink}
            {vocabularyList}
          </li>
        );
      });
    });

    serviceTypes.forEach((serviceType) => {
      const items = itemsByServiceType[serviceType].filter(item => !!item);

      if (items && items.length > 0) {
        lists.push(
          <div className={panelStyles[serviceType]} key={serviceType}>
            <h2><FormattedMessage {...messages[serviceType]} /></h2>
            <ul>
              {items}
            </ul>
          </div>
        );
      }
    });
  }

  const title = <FormattedMessage {...messages.title} />;

  return (
    <div className={styles.common}>
      <TitleBar title={title} />

      <div>
        {lists}
      </div>
    </div>
  );
}

CreatePage.propTypes = propTypes;
CreatePage.contextTypes = contextTypes;
