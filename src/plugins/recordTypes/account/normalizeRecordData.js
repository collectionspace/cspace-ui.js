export default () => (data, recordTypeConfig) => {
  // Make namespace prefixes consistent. accounts-common-list is sometimes ns2 and sometimes
  // ns3. The other prefix is used for jaxb, but it's not needed.

  const [docNodeNsPrefix, docNodeName] = Object.keys(recordTypeConfig.fields)[0].split(':', 2);
  const [rootNodeFullName, rootNodeData] = data.entrySeq().first();
  const [rootNodeNsPrefix, rootNodeName] = rootNodeFullName.split(':', 2);

  if (rootNodeName === docNodeName && rootNodeNsPrefix !== docNodeNsPrefix) {
    const rootNodeNsUri = rootNodeData.get(`@xmlns:${rootNodeNsPrefix}`);

    const updatedRootNodeData =
      rootNodeData
        .delete(`@xmlns:${rootNodeNsPrefix}`)
        .set(`@xmlns:${docNodeNsPrefix}`, rootNodeNsUri);

    const updatedData =
      data
        .delete(`${rootNodeNsPrefix}:${rootNodeName}`)
        .set(`${docNodeNsPrefix}:${docNodeName}`, updatedRootNodeData);

    return updatedData;
  }

  return data;
};
