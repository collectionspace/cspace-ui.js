import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import ExportResults from '../../../../src/components/search/ExportResults';
import ExportButton from '../../../../src/components/search/ExportButton';
import ExportModalContainer from '../../../../src/containers/search/ExportModalContainer';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

const config = {
  recordTypes: {
    collectionobject: {
      serviceConfig: { serviceType: 'object' },
    },
  },
};

const searchDescriptor = Immutable.fromJS({
  recordType: 'collectionobject',
});

describe('ExportResults', () => {
  it('should render null if the result is not exportable', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportResults
        config={{}}
        selectedItems={Immutable.Map()}
        searchDescriptor={Immutable.fromJS({ recordType: 'nonExportableType' })}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    expect(result).to.equal(null);
  });

  it('should disable the ExportButton if no items are selected', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportResults
        config={config}
        selectedItems={Immutable.Map()}
        searchDescriptor={searchDescriptor}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const exportButton = findWithType(result, ExportButton);

    exportButton.props.disabled.should.equal(true);
  });

  it('should open the modal when the ExportButton is clicked', () => {
    const shallowRenderer = createRenderer();

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', uri: '/collectionobjects/1111' },
    });

    shallowRenderer.render(
      <ExportResults
        config={config}
        selectedItems={selectedItems}
        searchDescriptor={searchDescriptor}
      />,
    );

    let result = shallowRenderer.getRenderOutput();
    const exportButton = findWithType(result, ExportButton);

    exportButton.props.onClick();

    result = shallowRenderer.getRenderOutput();
    const modal = findWithType(result, ExportModalContainer);

    modal.props.isOpen.should.equal(true);
  });

  it('should close the modal when the cancel or close button is clicked', () => {
    const shallowRenderer = createRenderer();

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', uri: '/collectionobjects/1111' },
    });

    shallowRenderer.render(
      <ExportResults
        config={config}
        selectedItems={selectedItems}
        searchDescriptor={searchDescriptor}
      />,
    );

    let result = shallowRenderer.getRenderOutput();
    const exportButton = findWithType(result, ExportButton);

    exportButton.props.onClick();

    result = shallowRenderer.getRenderOutput();
    const modal = findWithType(result, ExportModalContainer);

    modal.props.isOpen.should.equal(true);

    modal.props.onCancelButtonClick();

    result = shallowRenderer.getRenderOutput();
    const updatedModal = findWithType(result, ExportModalContainer);

    updatedModal.props.isOpen.should.equal(false);
  });

  it('should close the modal when the export is completed', () => {
    const shallowRenderer = createRenderer();

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', uri: '/collectionobjects/1111' },
    });

    shallowRenderer.render(
      <ExportResults
        config={config}
        selectedItems={selectedItems}
        searchDescriptor={searchDescriptor}
      />,
    );

    let result = shallowRenderer.getRenderOutput();
    const exportButton = findWithType(result, ExportButton);

    exportButton.props.onClick();

    result = shallowRenderer.getRenderOutput();
    const modal = findWithType(result, ExportModalContainer);

    modal.props.isOpen.should.equal(true);

    modal.props.onExportOpened();

    result = shallowRenderer.getRenderOutput();
    const updatedModal = findWithType(result, ExportModalContainer);

    updatedModal.props.isOpen.should.equal(false);
  });
});
