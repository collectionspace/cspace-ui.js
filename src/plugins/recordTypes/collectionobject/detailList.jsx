import React from 'react';
import Immutable from 'immutable';
import { FormattedDate, FormattedMessage, FormattedRelative } from 'react-intl';

const dayMillis = 24 * 60 * 60 * 1000;

/**
 * Configuration for the Search Result Detail View
 *
 * It has pre-defined formatters for the different detail sections:
 * - title, subtitle, description, tags, footer, aside
 *
 * Each of these takes the data (list item) as well as a separator
 * in the event multiple values are intended for display.
 */
export default (configContext) => {
  const {
    formatRefName,
  } = configContext.formatHelpers;

  const formatNameRole = (name, role) => {
    if (name && role) {
      return `${name} (${role})`;
    }

    return name || role;
  };

  const formatAgentWithProductionData = (data, separator) => {
    const agent = formatRefName(data.get('agent'));
    const agentRole = formatRefName(data.get('agent'));
    const agentWithRole = formatNameRole(agent, agentRole);

    const productionPlace = data.get('objectProductionPlace');
    const productionDate = data.get('objectProductionDate');

    return [
      agentWithRole,
      productionPlace,
      productionDate,
    ].filter((value) => !!value).join(separator);
  };

  const fieldCollectorData = (data) => {
    const fieldCollector = formatRefName(data.get('fieldCollector'));
    const fieldCollectorRole = formatRefName(data.get('fieldCollectorRole'));
    const fieldCollectorWithRole = formatNameRole(fieldCollector, fieldCollectorRole);

    const fieldCollectionSite = formatRefName(data.get('fieldCollectionSite'));
    const fieldCollectionPlace = formatRefName(data.get('fieldCollectionPlace'));
    const fieldCollectionDate = data.get('fieldCollectionDate');

    return [
      fieldCollectorWithRole,
      fieldCollectionPlace,
      fieldCollectionSite,
      fieldCollectionDate,
    ].filter((value) => !!value).join(', ');
  };

  return {
    title: {
      formatter: (data, separator = ' ') => {
        const objectNumber = data.get('objectNumber');
        const title = data.get('title');
        const theTitle = [objectNumber, title].filter((value) => !!value).join(separator);
        return <h2>{theTitle}</h2>;
      },
    },
    subtitle: {
      formatter: (data, separator = ', ') => {
        const agentVal = formatAgentWithProductionData(data, separator);
        const fieldCollectorVal = fieldCollectorData(data, separator);
        return (
          <>
            {agentVal && <h3>{agentVal}</h3>}
            {fieldCollectorVal && <h3>{fieldCollectorVal}</h3>}
          </>
        );
      },
    },
    description: {
      formatter: (data) => {
        const briefDescription = data.get('briefDescription');
        return <p>{briefDescription}</p>;
      },
    },
    tags: {
      formatter: (data, separator = ', ') => {
        let conceptTags;
        const contentConcepts = data.get('contentConcepts');
        if (contentConcepts) {
          const contentConcept = contentConcepts.get('contentConcept');
          if (Immutable.List.isList(contentConcept)) {
            conceptTags = contentConcept.filter((concept) => !!concept)
              .map((concept) => formatRefName(concept))
              .join(separator);
          } else {
            conceptTags = formatRefName(contentConcept);
          }
        }

        const prefix = (
          <FormattedMessage
            id="detailList.collectionobject.concepts"
            description="The prefix for content concept tags in the search detail view"
            defaultMessage="Content Concepts: "
          />
        );

        return conceptTags ? (
          <p>
            {prefix}
            {conceptTags}
          </p>
        ) : undefined;
      },
    },
    aside: {
      formatter: (data) => {
        const location = formatRefName(data.get('computedCurrentLocation'));
        const responsibleDepartment = data.get('responsibleDepartment');

        const currentLocationPrefix = (
          <FormattedMessage
            id="detailList.collectionobject.currentLocation"
            description="The prefix for current location in the search detail view"
            defaultMessage="Current Storage Location"
          />
        );

        const responsibleDepartmentPrefix = (
          <FormattedMessage
            id="detailList.collectionobject.responsibleDepartment"
            description="The prefix for responsible department in the search detail view"
            defaultMessage="Responsible Department"
          />
        );

        return (
          <>
            <div>
              {currentLocationPrefix}
              <p>{location}</p>
            </div>
            <div>
              {responsibleDepartmentPrefix}
              <p>{responsibleDepartment}</p>
            </div>
          </>
        );
      },
    },
    footer: {
      formatter: (data) => {
        const updatedAt = Date.parse(data.get('updatedAt'));
        if (!updatedAt) {
          return undefined;
        }

        const now = Date.now();
        const diff = now - updatedAt;
        const formattedUpdatedAt = diff <= dayMillis
          ? <FormattedRelative value={updatedAt} />
          : <FormattedDate value={updatedAt} />;

        return (
          <FormattedMessage
            id="detailList.collectionobject.updatedAt"
            description="The prefix for the updateAt display"
            defaultMessage="Modified: {value}"
            values={{
              value: formattedUpdatedAt,
            }}
          />
        );
      },
    },
  };
};
