import { defineMessages } from 'react-intl';
import { default as getFirst } from '../../../utils/RecordUtils';

const service = 'collectionobjects';

const messages = defineMessages({
  recordNameTitle: {
    id: `record.${service}.recordNameTitle`,
    description: `The name of the record managed by the ${service} service, when used as a title.`,
    defaultMessage: 'Object',
  },
});

function pageTitle(data) {
  if (!data) {
    return '';
  }

  const common = data.document['ns2:collectionobjects_common'];
  const objectNumber = common.objectNumber;
  const titleGroup = getFirst(common.titleGroupList.titleGroup);
  const title = titleGroup ? titleGroup.title : null;
  const parts = [];

  [objectNumber, title].forEach((part) => {
    if (part) {
      parts.push(part);
    }
  });

  return parts.join(' – ');
}

export default {
  service,
  messages,
  pageTitle,
};
