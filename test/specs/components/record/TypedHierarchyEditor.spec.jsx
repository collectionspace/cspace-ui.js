import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findAllWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { components as inputComponents } from 'cspace-input';
import MiniViewPopupAutocompleteInputContainer from '../../../../src/containers/record/MiniViewPopupAutocompleteInputContainer';
import OptionPickerInputContainer from '../../../../src/containers/record/OptionPickerInputContainer';
import { BaseTypedHierarchyEditor as TypedHierarchyEditor } from '../../../../src/components/record/TypedHierarchyEditor';

const {
  CompoundInput,
} = inputComponents;

chai.use(chaiImmutable);
chai.should();

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: () => null,
  formatHTMLMessage: () => null,
  now: () => null,
};

const messages = {
};

const hierarchy = Immutable.fromJS({
  parent: {
    refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Parent)\'Parent\'',
    type: 'set',
  },
  children: [
    {
      refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Child1)\'Child 1\'',
    },
    {
      refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Child2)\'Child 2\'',
    },
  ],
});

describe('TypedHierarchyEditor', function suite() {
  it('should render inputs for the parent and nested repeating inputs for the children', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TypedHierarchyEditor
        intl={intl}
        messages={messages}
        value={hierarchy}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const refNameInputs = findAllWithType(result, MiniViewPopupAutocompleteInputContainer);

    refNameInputs.should.have.lengthOf(2);

    refNameInputs[0].props.value.should.equal(hierarchy.getIn(['parent', 'refName']));

    const typeInputs = findAllWithType(result, OptionPickerInputContainer);

    typeInputs.should.have.lengthOf(2);

    typeInputs[0].props.value.should.equal(hierarchy.getIn(['parent', 'type']));

    const compoundInputs = findAllWithType(result, CompoundInput);

    compoundInputs.should.have.lengthOf(2);

    compoundInputs[0].props.value.should.equal(hierarchy.get('children'));
    compoundInputs[1].props.repeating.should.equal(true);
  });

  it('should render an input for the parent if showParent is false', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TypedHierarchyEditor
        intl={intl}
        messages={messages}
        value={hierarchy}
        showParent={false}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const refNameInputs = findAllWithType(result, MiniViewPopupAutocompleteInputContainer);

    refNameInputs.should.have.lengthOf(1);

    const typeInputs = findAllWithType(result, OptionPickerInputContainer);

    typeInputs.should.have.lengthOf(1);

    const compoundInputs = findAllWithType(result, CompoundInput);

    compoundInputs.should.have.lengthOf(2);

    compoundInputs[0].props.value.should.equal(hierarchy.get('children'));
    compoundInputs[1].props.repeating.should.equal(true);
  });

  it('should not render inputs for the children if showChildren is false', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TypedHierarchyEditor
        intl={intl}
        messages={messages}
        value={hierarchy}
        showChildren={false}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const refNameInputs = findAllWithType(result, MiniViewPopupAutocompleteInputContainer);

    refNameInputs.should.have.lengthOf(1);

    refNameInputs[0].props.value.should.equal(hierarchy.getIn(['parent', 'refName']));

    const typeInputs = findAllWithType(result, OptionPickerInputContainer);

    typeInputs.should.have.lengthOf(1);

    typeInputs[0].props.value.should.equal(hierarchy.getIn(['parent', 'type']));

    const compoundInputs = findAllWithType(result, CompoundInput);

    compoundInputs.should.have.lengthOf(0);
  });

  it('should filter the current record out of term matches', function test() {
    const csid = '1111';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TypedHierarchyEditor
        csid={csid}
        intl={intl}
        messages={messages}
        value={hierarchy}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const inputs = findAllWithType(result, MiniViewPopupAutocompleteInputContainer);

    inputs.should.have.lengthOf(2);

    const matchFilter = inputs[0].props.matchFilter;

    inputs[1].props.matchFilter.should.equal(matchFilter);

    matchFilter({ csid }).should.equal(false);
    matchFilter({ csid: '1234' }).should.equal(true);
  });

  it('should call onCommit when a parent ref name value is committed', function test() {
    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TypedHierarchyEditor
        intl={intl}
        messages={messages}
        value={hierarchy}
        onCommit={handleCommit}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const inputs = findAllWithType(result, MiniViewPopupAutocompleteInputContainer);

    const newValue = 'newValue';
    const newCsid = '1111';

    inputs[0].props.onCommit(undefined, newValue, newCsid);

    committedPath.should.deep.equal(['parent']);

    committedValue.should.equal(
      hierarchy.get('parent').set('csid', newCsid).set('refName', newValue)
    );
  });

  it('should call onCommit when a parent type value is committed', function test() {
    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TypedHierarchyEditor
        intl={intl}
        messages={messages}
        value={hierarchy}
        onCommit={handleCommit}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const inputs = findAllWithType(result, OptionPickerInputContainer);

    const newValue = 'newValue';

    inputs[0].props.onCommit(undefined, newValue);

    committedPath.should.deep.equal(['parent', 'type']);

    committedValue.should.equal(newValue);
  });

  it('should call onCommit when a child ref name value is committed', function test() {
    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TypedHierarchyEditor
        intl={intl}
        messages={messages}
        value={hierarchy}
        onCommit={handleCommit}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const inputs = findAllWithType(result, MiniViewPopupAutocompleteInputContainer);

    const newValue = 'newValue';

    inputs[1].props.onCommit(['1'], newValue);

    committedPath.should.deep.equal(['children', '1', 'refName']);
    committedValue.should.equal(newValue);
  });

  it('should call onCommit when a child type value is committed', function test() {
    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TypedHierarchyEditor
        intl={intl}
        messages={messages}
        value={hierarchy}
        onCommit={handleCommit}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const inputs = findAllWithType(result, OptionPickerInputContainer);

    const newValue = 'newValue';

    inputs[1].props.onCommit(['1'], newValue);

    committedPath.should.deep.equal(['children', '1', 'type']);

    committedValue.should.equal(newValue);
  });

  it('should call onAddChild when a child value is added', function test() {
    let handlerCalled = null;

    const handleAddChild = () => {
      handlerCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TypedHierarchyEditor
        intl={intl}
        messages={messages}
        value={hierarchy}
        onAddChild={handleAddChild}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const compoundInputs = findAllWithType(result, CompoundInput);

    compoundInputs[1].props.onAddInstance();

    handlerCalled.should.equal(true);
  });

  it('should call onRemoveChild when a child value is removed', function test() {
    let removedPosition = null;

    const handleRemoveChild = (positionArg) => {
      removedPosition = positionArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TypedHierarchyEditor
        intl={intl}
        messages={messages}
        value={hierarchy}
        onRemoveChild={handleRemoveChild}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const compoundInputs = findAllWithType(result, CompoundInput);

    compoundInputs[1].props.onRemoveInstance(['1']);

    removedPosition.should.equal(1);
  });
});
