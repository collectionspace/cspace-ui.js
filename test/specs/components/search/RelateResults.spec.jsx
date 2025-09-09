import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import RelateResults from '../../../../src/components/search/RelateResults';
import RelateButton from '../../../../src/components/record/RelateButton';
import SearchToRelateModalContainer from '../../../../src/containers/search/SearchToRelateModalContainer';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

const config = {
  recordTypes: {
    collectionobject: {
      serviceConfig: { serviceType: 'object' },
      messages: {
        record: {
          name: { id: 'name', defaultMessage: 'Object' },
          collectionName: { id: 'collectionName', defaultMessage: 'Objects' },
        },
      },
    },
  },
};

const perms = Immutable.fromJS({
  collectionobject: { data: 'CRUDL' },
});

const searchDescriptor = Immutable.fromJS({
  recordType: 'collectionobject',
});

describe('RelateResults', () => {
  it('should render null if the result is not relatable', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelateResults
        config={{}}
        selectedItems={Immutable.Map()}
        searchDescriptor={Immutable.fromJS({ recordType: 'nonRelatableType' })}
        perms={perms}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    expect(result).to.equal(null);
  });

  it('should disable the RelateButton if no items are selected', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelateResults
        config={config}
        selectedItems={Immutable.Map()}
        searchDescriptor={searchDescriptor}
        perms={perms}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const relateButton = findWithType(result, RelateButton);

    relateButton.props.disabled.should.equal(true);
  });

  it('should close the modal when the cancel or close button is clicked', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelateResults
        config={config}
        selectedItems={Immutable.Map()}
        searchDescriptor={searchDescriptor}
        perms={perms}
      />,
    );

    let result = shallowRenderer.getRenderOutput();
    const relateButton = findWithType(result, RelateButton);

    relateButton.props.onClick();

    result = shallowRenderer.getRenderOutput();
    const modal = findWithType(result, SearchToRelateModalContainer);

    modal.props.isOpen.should.equal(true);

    modal.props.onCancelButtonClick();

    result = shallowRenderer.getRenderOutput();
    const updatedModal = findWithType(result, SearchToRelateModalContainer);

    updatedModal.props.isOpen.should.equal(false);
  });

  it('should set a validation error for locked or unauthorized items', () => {
    const shallowRenderer = createRenderer();

    const selectedItems = Immutable.fromJS({
      2222: { csid: '2222', uri: '/collectionobjects/2222', workflowState: 'locked' },
    });

    shallowRenderer.render(
      <RelateResults
        config={config}
        selectedItems={selectedItems}
        searchDescriptor={searchDescriptor}
        perms={perms}
      />,
    );

    let result = shallowRenderer.getRenderOutput();
    const relateButton = findWithType(result, RelateButton);

    relateButton.props.onClick();

    result = shallowRenderer.getRenderOutput();
    const modal = findWithType(result, SearchToRelateModalContainer);

    modal.props.error.should.deep.equal({ code: 'locked' });
  });
});
