// `src/components/search/RelateObjects.jsx`

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import SearchToRelateModalContainer from '../../containers/search/SearchToRelateModalContainer';
import { canRelate } from '../../helpers/permissionHelpers';
import {
  getFirstColumnName,
  getRecordTypeNameByServiceObjectName,
  getRecordTypeNameByUri
} from '../../helpers/configHelpers';
import RelateButton from '../record/RelateButton';
import get from 'lodash/get';

const messages = defineMessages({
  relate: {
    id: 'searchResultPage.relate',
    description: 'Label of the relate button on the search result page.',
    defaultMessage: 'Relate…',
  },
});

const isResultRelatable = (searchDescriptor, config) => {
  const recordType = searchDescriptor.get('recordType');
  const subresource = searchDescriptor.get('subresource');

  const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);

  return (
    subresource !== 'terms'
    && (
      serviceType === 'procedure'
      || serviceType === 'object'
      || recordType === 'procedure'
      || recordType === 'object'
    )
  );
}

export default function RelateObjects({
  config,
  selectedItems,
  searchDescriptor,
  perms,
}) {
  if (!isResultRelatable(searchDescriptor, config)) {
    return null;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState(undefined);

  const handleRelateButtonClick = () => {
    setValidationError(validateSelectedItemsRelatable());
    setIsModalOpen(true);
  };

  const handleRelationsCreated = () => {
    setIsModalOpen(false);
    setValidationError(undefined);
  };

  const validateSelectedItemsRelatable = () => {
    if (selectedItems) {
      let err;

      selectedItems.valueSeq().find((item) => {
        if (item.get('workflowState') === 'locked') {
          err = { code: 'locked' };
          return true;
        }

        const recordType = getRecordTypeNameByUri(config, item.get('uri'));

        if (!canRelate(recordType, perms, config)) {
          const recordMessages = config.recordTypes[recordType]?.messages?.record;

          err = {
            code: 'notPermitted',
            values: {
              name: <FormattedMessage {...recordMessages.name} />,
              collectionName: <FormattedMessage {...recordMessages.collectionName} />,
            },
          };

          return true;
        }

        return false;
      });

      if (err) {
        return err;
      }
    }

    return undefined;
  };

  const getSearchToRelateSubjects = () => {
    if (!selectedItems) {
      return null;
    }

    const recordType = searchDescriptor.get('recordType');
    const serviceType = config.recordTypes[recordType]?.serviceConfig?.serviceType;
    const itemRecordType = serviceType === 'utility' ? undefined : recordType;
    const titleColumnName = getFirstColumnName(config, recordType);

    return selectedItems.valueSeq().map((item) => ({
      csid: item.get('csid'),
      recordType: itemRecordType || getRecordTypeNameByServiceObjectName(config, item.get('docType')),
      title: item.get(titleColumnName),
    })).toJS();
  };

  return (
    <>
      <RelateButton
        disabled={!selectedItems || selectedItems.size < 1}
        key="relate"
        label={<FormattedMessage {...messages.relate} />}
        name="relate"
        onClick={handleRelateButtonClick}
      />
      <SearchToRelateModalContainer
        allowedServiceTypes={['object', 'procedure']}
        subjects={getSearchToRelateSubjects}
        config={config}
        isOpen={isModalOpen}
        defaultRecordTypeValue="collectionobject"
        error={validationError}
        onCancelButtonClick={() => setIsModalOpen(false)}
        onCloseButtonClick={() => setIsModalOpen(false)}
        onRelationsCreated={handleRelationsCreated}
      />
    </>
  );
};

RelateObjects.propTypes = {
  config: PropTypes.object.isRequired,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  searchDescriptor: PropTypes.instanceOf(Immutable.Map).isRequired,
  perms: PropTypes.instanceOf(Immutable.Map).isRequired,
};
