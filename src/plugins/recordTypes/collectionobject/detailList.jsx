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
    React,
    Immutable,
    FormattedDate,
    FormattedMessage,
    FormattedRelative,
  } = configContext.lib;

  const {
    formatNameRole,
    formatRefNameWithDefault,
  } = configContext.formatHelpers;

  /**
   * This should return iff the agentWithRole or productionPlace exist, e.g.
   * agentWithRole, place, date
   * agentWithRole, date
   * place, date
   */
  const formatAgentWithProductionData = (data, separator) => {
    const agent = formatRefNameWithDefault(data.get('agent'));
    const agentRole = formatRefNameWithDefault(data.get('agentRole'));
    const agentWithRole = formatNameRole(agent, agentRole);

    const productionPlace = formatRefNameWithDefault(data.get('objectProductionPlace'));
    const productionDate = data.get('objectProductionDate');

    const prefix = [
      agentWithRole,
      productionPlace,
    ].filter((value) => !!value).join(separator);

    let formatted = null;
    if (prefix && productionDate) {
      formatted = `${prefix}${separator}${productionDate}`;
    } else if (prefix) {
      formatted = prefix;
    }
    return formatted;
  };

  /**
   * This follows the same rules as the agent with fieldCollectionDate, but using
   * fieldCollectionSite in addition to fieldCollectionPlace.
   */
  const fieldCollectorData = (data, separator) => {
    const fieldCollector = formatRefNameWithDefault(data.get('fieldCollector'));
    const fieldCollectorRole = formatRefNameWithDefault(data.get('fieldCollectorRole'));
    const fieldCollectorWithRole = formatNameRole(fieldCollector, fieldCollectorRole);

    const fieldCollectionSite = formatRefNameWithDefault(data.get('fieldCollectionSite'));
    const fieldCollectionPlace = formatRefNameWithDefault(data.get('fieldCollectionPlace'));
    const fieldCollectionDate = data.get('fieldCollectionDate');

    const prefix = [
      fieldCollectorWithRole,
      fieldCollectionPlace,
      fieldCollectionSite,
    ].filter((value) => !!value).join(separator);

    let formatted = null;
    if (prefix && fieldCollectionDate) {
      formatted = `${prefix}${separator}${fieldCollectionDate}`;
    } else if (prefix) {
      formatted = prefix;
    }
    return formatted;
  };

  const formatTaxonWithForm = (taxon, form) => {
    if (taxon && form) {
      return `${taxon}, ${form}`;
    }

    return taxon;
  };

  return {
    title: {
      formatter: (data, separator = ' ') => {
        const objectNumber = data.get('objectNumber');
        const title = data.get('title');

        const objectName = [
          formatRefNameWithDefault(data.get('objectNameControlled')),
          formatRefNameWithDefault(data.get('objectName')),
        ].filter((name) => !!name).join(', ');

        const taxon = formatRefNameWithDefault(data.get('taxon'));
        const form = formatRefNameWithDefault(data.get('form'));
        const taxonWithForm = formatTaxonWithForm(taxon, form);

        const adjacent = title || objectName || taxonWithForm;

        return (
          <h2>
            {objectNumber}
            {adjacent ? `${separator}${adjacent}` : null}
          </h2>
        );
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
        return briefDescription ? <p>{briefDescription}</p> : null;
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
              .map((concept) => formatRefNameWithDefault(concept))
              .join(separator);
          } else {
            conceptTags = formatRefNameWithDefault(contentConcept);
          }
        }

        const prefix = (
          <FormattedMessage
            id="detailList.collectionobject.concepts"
            description="The prefix for content concept tags in the search detail view"
            defaultMessage="CONCEPT TAGS: "
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
        const locationData = formatRefNameWithDefault(data.get('computedCurrentLocation'));
        const responsibleDepartmentData = data.get('responsibleDepartment');

        const currentLocationPrefix = (
          <FormattedMessage
            id="detailList.collectionobject.currentLocation"
            description="The prefix for current location in the search detail view"
            defaultMessage="Current Storage Location:"
          />
        );

        const locationNotFound = (
          <FormattedMessage
            id="detailList.collectionobject.locationNotFound"
            description="The text when the computedCurrentLocation is null or empty"
            defaultMessage="Storage Location not assigned"
          />
        );

        const location = locationData ? (
          <div>
            {currentLocationPrefix}
            <p>{locationData}</p>
          </div>
        ) : <div>{locationNotFound}</div>;

        const responsibleDepartmentPrefix = (
          <FormattedMessage
            id="detailList.collectionobject.responsibleDepartment"
            description="The prefix for responsible department in the search detail view"
            defaultMessage="Responsible Department:"
          />
        );

        const responsibleDepartment = responsibleDepartmentData ? (
          <div>
            {responsibleDepartmentPrefix}
            <p>{responsibleDepartmentData}</p>
          </div>
        ) : null;

        return (
          <>
            {location}
            {responsibleDepartment}
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
