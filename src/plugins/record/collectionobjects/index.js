import getFirst from '../../../utils/RecordUtils';
import formTemplate from './formTemplate';
import messageDescriptors from './messageDescriptors';

function pageTitle(data) {
  if (!data) {
    return '';
  }

  const common = data.document['ns2:collectionobjects_common'];
  const objectNumber = common.objectNumber;
  const titleGroupList = common.titleGroupList;

  let title;

  if (titleGroupList) {
    const titleGroup = getFirst(common.titleGroupList.titleGroup);
    title = titleGroup ? titleGroup.title : null;
  }

  const parts = [];

  [objectNumber, title].forEach((part) => {
    if (part) {
      parts.push(part);
    }
  });

  return parts.join(' – ');
}

export default {
  formTemplate,
  messageDescriptors,
  pageTitle,
};
