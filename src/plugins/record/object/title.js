import { getPart } from '../../../helpers/recordDataHelpers';

export default pluginContext => (cspaceDocument) => {
  if (!cspaceDocument) {
    return '';
  }

  const {
    Immutable,
  } = pluginContext;

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
