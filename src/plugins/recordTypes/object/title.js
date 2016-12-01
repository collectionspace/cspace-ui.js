export default pluginContext => (cspaceDocument) => {
  const {
    Immutable,
  } = pluginContext.lib;
  
  const {
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'collectionobjects_common');

  if (!common) {
    return '';
  }

  const objectNumber = common.get('objectNumber');
  const titleGroupList = common.get('titleGroupList');

  let title;

  if (titleGroupList) {
    let titleGroup = titleGroupList.get('titleGroup');

    if (Immutable.List.isList(titleGroup)) {
      titleGroup = titleGroup.first();
    }

    title = titleGroup ? titleGroup.get('title') : null;
  }

  const parts = [];

  [objectNumber, title].forEach((part) => {
    if (part) {
      parts.push(part);
    }
  });

  return parts.join(' – ');
};
