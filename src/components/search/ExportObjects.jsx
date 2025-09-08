import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import ExportModalContainer from '../../containers/search/ExportModalContainer';
import ExportButton from './ExportButton';

export default function ExportObjects({
  config,
  selectedItems,
  searchDescriptor,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recordType = searchDescriptor.get('recordType');
  const vocabulary = searchDescriptor.get('vocabulary');

  const handleExportButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const isResultExportable = () => {
    const subresource = searchDescriptor.get('subresource');

    const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);

    return (
      subresource !== 'terms'
      && subresource !== 'refs'
      && (
        serviceType === 'procedure'
        || serviceType === 'object'
        || serviceType === 'authority'
      )
    );
  };

  return (
    <>
      {isResultExportable() && (
        <>
          <ExportButton
            disabled={!selectedItems || selectedItems.size < 1}
            key="export"
            onClick={handleExportButtonClick}
          />
          <ExportModalContainer
            config={config}
            isOpen={isModalOpen}
            recordType={recordType}
            vocabulary={vocabulary}
            selectedItems={selectedItems}
            onCancelButtonClick={handleModalClose}
            onCloseButtonClick={handleModalClose}
            onExportOpened={handleModalClose}
          />
        </>
      )}
    </>
  );
}

ExportObjects.propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  searchDescriptor: PropTypes.object.isRequired,
};
