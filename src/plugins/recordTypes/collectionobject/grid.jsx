export default (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    formatNameRole,
    formatRefNameWithDefault,
  } = configContext.formatHelpers;

  const formatObjectName = (objectNames) => objectNames.filter((name) => !!name).join(', ');

  const formatTaxon = (taxon, form) => {
    if (taxon && form) {
      return `${taxon}, ${form}`;
    }
    return taxon;
  };

  const formatAgent = (data) => {
    const agent = formatRefNameWithDefault(data.get('agent'));
    const agentRole = formatRefNameWithDefault(data.get('agentRole'));
    return formatNameRole(agent, agentRole);
  };

  const formatFieldCollector = (data) => {
    const fieldCollector = formatRefNameWithDefault(data.get('fieldCollector'));
    const fieldCollectorRole = formatRefNameWithDefault(data.get('fieldCollectorRole'));
    return formatNameRole(fieldCollector, fieldCollectorRole);
  };

  return {
    title: {
      formatter: (data) => {
        const objectNumber = data.get('objectNumber');
        return objectNumber ? <h2>{data.get('objectNumber')}</h2> : null;
      },
    },
    subtitle: {
      formatter: (data) => {
        const title = data.get('title');
        const objectName = formatRefNameWithDefault(data.get('objectName'));
        const objectNameControlled = formatRefNameWithDefault(data.get('objectNameControlled'));
        const taxon = formatRefNameWithDefault(data.get('taxon'));
        const form = formatRefNameWithDefault(data.get('form'));

        const text = title
          || formatObjectName([objectNameControlled, objectName])
          || formatTaxon(taxon, form);

        return text ? <p>{text}</p> : null;
      },
    },
    description: {
      formatter: (data) => {
        const agent = formatAgent(data) || formatFieldCollector(data);
        return agent ? <p>{agent}</p> : null;
      },
    },
    tags: {
      // unused in core
      formatter: () => null,
    },
  };
};
