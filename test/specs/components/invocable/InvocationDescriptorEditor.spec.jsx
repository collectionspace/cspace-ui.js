import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import InvocationDescriptorEditor from '../../../../src/components/invocable/InvocationDescriptorEditor';
import ModePickerInput from '../../../../src/components/invocable/ModePickerInput';
import InvocationTargetInput from '../../../../src/components/invocable/InvocationTargetInput';
import SearchToSelectModalContainer from '../../../../src/containers/search/SearchToSelectModalContainer';

chai.use(chaiImmutable);
chai.should();

describe('InvocationDescriptorEditor', function suite() {
  it('should render a div containing a ModePickerInput, an InvocationTargetInput, and SearchToSelectModal', function test() {
    const invocationDescriptor = Immutable.Map({
      mode: 'single',
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationDescriptorEditor
        invocationDescriptor={invocationDescriptor}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');

    const modePickerInput = findWithType(result, ModePickerInput);

    modePickerInput.should.not.equal(null);

    const invocationTargetInput = findWithType(result, InvocationTargetInput);

    invocationTargetInput.should.not.equal(null);

    const searchToSelectModal = findWithType(result, SearchToSelectModalContainer);

    searchToSelectModal.should.not.equal(null);
  });

  it('should set the allowed search to select record types to group records if the mode is group', function test() {
    const invocationDescriptor = Immutable.Map({
      mode: 'group',
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationDescriptorEditor
        invocationDescriptor={invocationDescriptor}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const searchToSelectModalContainer = findWithType(result, SearchToSelectModalContainer);

    searchToSelectModalContainer.props.allowedRecordTypes.should.deep.equal(['group']);
  });

  it('should set the allowed search to select record types to the specified record types if mode is not group', function test() {
    const invocationDescriptor = Immutable.Map({
      mode: 'single',
    });

    const recordTypes = ['loanin', 'person'];

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationDescriptorEditor
        invocationDescriptor={invocationDescriptor}
        recordTypes={recordTypes}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const searchToSelectModalContainer = findWithType(result, SearchToSelectModalContainer);

    searchToSelectModalContainer.props.allowedRecordTypes.should.deep.equal(recordTypes);
  });

  it('should only allow a single selection in the search to select modal when the mode is group', function test() {
    const invocationDescriptor = Immutable.Map({
      mode: 'group',
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationDescriptorEditor
        invocationDescriptor={invocationDescriptor}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const searchToSelectModalContainer = findWithType(result, SearchToSelectModalContainer);

    searchToSelectModalContainer.props.singleSelect.should.equal(true);
  });

  it('should only allow a single selection in the search to select modal when the mode is single', function test() {
    const invocationDescriptor = Immutable.Map({
      mode: 'single',
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationDescriptorEditor
        invocationDescriptor={invocationDescriptor}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const searchToSelectModalContainer = findWithType(result, SearchToSelectModalContainer);

    searchToSelectModalContainer.props.singleSelect.should.equal(true);
  });

  it('should update the invocation descriptor and close the search to select modal when the selection is accepted', function test() {
    const invocationDescriptor = Immutable.Map({
      mode: 'list',
    });

    let committedInvocationDescriptor;

    const handleCommit = (invocationDescriptorArg) => {
      committedInvocationDescriptor = invocationDescriptorArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationDescriptorEditor
        invocationDescriptor={invocationDescriptor}
        onCommit={handleCommit}
      />
    );

    let result = shallowRenderer.getRenderOutput();
    let searchToSelectModal = findWithType(result, SearchToSelectModalContainer);
    let invocationTargetInput = findWithType(result, InvocationTargetInput);

    searchToSelectModal.props.isOpen.should.equal(false);

    invocationTargetInput.props.openSearchModal();

    result = shallowRenderer.getRenderOutput();
    searchToSelectModal = findWithType(result, SearchToSelectModalContainer);
    invocationTargetInput = findWithType(result, InvocationTargetInput);

    searchToSelectModal.props.isOpen.should.equal(true);

    const selectedItems = Immutable.List([
      { csid: '1234' },
      { csid: 'abcd' },
    ]);

    const searchDescriptor = Immutable.Map({
      recordType: 'loanin',
    });

    searchToSelectModal.props.onAccept(selectedItems, searchDescriptor);

    result = shallowRenderer.getRenderOutput();
    searchToSelectModal = findWithType(result, SearchToSelectModalContainer);

    searchToSelectModal.props.isOpen.should.equal(false);

    committedInvocationDescriptor.should.equal(Immutable.fromJS({
      items: selectedItems,
      mode: 'list',
      recordType: 'loanin',
    }));
  });

  it('should close the search to select modal when its close button is clicked', function test() {
    const invocationDescriptor = Immutable.Map({
      mode: 'single',
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationDescriptorEditor
        invocationDescriptor={invocationDescriptor}
      />
    );

    let result = shallowRenderer.getRenderOutput();
    let searchToSelectModal = findWithType(result, SearchToSelectModalContainer);
    let invocationTargetInput = findWithType(result, InvocationTargetInput);

    searchToSelectModal.props.isOpen.should.equal(false);

    invocationTargetInput.props.openSearchModal();

    result = shallowRenderer.getRenderOutput();
    searchToSelectModal = findWithType(result, SearchToSelectModalContainer);
    invocationTargetInput = findWithType(result, InvocationTargetInput);

    searchToSelectModal.props.isOpen.should.equal(true);

    searchToSelectModal.props.onCloseButtonClick();

    result = shallowRenderer.getRenderOutput();
    searchToSelectModal = findWithType(result, SearchToSelectModalContainer);

    searchToSelectModal.props.isOpen.should.equal(false);
  });

  it('should set the invocation target input\'s openSearchModal function to open the contained search to select modal', function test() {
    const invocationDescriptor = Immutable.Map({
      mode: 'single',
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationDescriptorEditor
        invocationDescriptor={invocationDescriptor}
      />
    );

    let result = shallowRenderer.getRenderOutput();
    let searchToSelectModal = findWithType(result, SearchToSelectModalContainer);
    let invocationTargetInput = findWithType(result, InvocationTargetInput);

    searchToSelectModal.props.isOpen.should.equal(false);

    invocationTargetInput.props.openSearchModal();

    result = shallowRenderer.getRenderOutput();
    searchToSelectModal = findWithType(result, SearchToSelectModalContainer);
    invocationTargetInput = findWithType(result, InvocationTargetInput);

    searchToSelectModal.props.isOpen.should.equal(true);
  });

  it('should delete the invocation descriptor csid, record type, and items when the mode is changed in the mode picker input', function test() {
    const invocationDescriptor = Immutable.Map({
      mode: 'single',
      csid: '1234',
      recordType: 'group',
      items: Immutable.List(),
    });

    let committedInvocationDescriptor;

    const handleCommit = (invocationDescriptorArg) => {
      committedInvocationDescriptor = invocationDescriptorArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationDescriptorEditor
        invocationDescriptor={invocationDescriptor}
        onCommit={handleCommit}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const modePickerInput = findWithType(result, ModePickerInput);

    modePickerInput.props.onCommit(null, 'list');

    committedInvocationDescriptor.should.equal(Immutable.Map({
      mode: 'list',
    }));
  });
});
