import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import AuthorityHierarchyEditor from '../../../../src/components/record/AuthorityHierarchyEditor';
import HierarchySiblingListContainer from '../../../../src/containers/record/HierarchySiblingListContainer';
import HierarchyInput from '../../../../src/components/record/HierarchyInput';

chai.use(chaiImmutable);
chai.should();

const messages = {
  siblings: {
    id: 'hierarchyInput.person.siblings',
    defaultMessage: 'Adjacent persons',
  },
};

const context = {
  csid: '1111',
};

const name = 'relation-list-item';

describe('HierarchyInput', function suite() {
  it('should render a hierarchy editor', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    findWithType(result, AuthorityHierarchyEditor).should.not.equal(null);
  });

  it('should render a hierarchy sibling list', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    findWithType(result, HierarchySiblingListContainer).should.not.equal(null);
  });

  it('should convert a relation list to a hierarchy descriptor, and pass it to the hierarchy editor', function test() {
    const relations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          csid: context.csid,
        },
        object: {
          csid: 'abcd',
          refName: 'urn:cspace:parent',
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child1',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child2',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child3',
        },
        object: {
          csid: context.csid,
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        value={relations}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, AuthorityHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: { csid: 'abcd', refName: 'urn:cspace:parent', type: undefined },
      children: [
        { refName: 'urn:cspace:child1', type: undefined },
        { refName: 'urn:cspace:child2', type: undefined },
        { refName: 'urn:cspace:child3', type: undefined },
      ],
    }));
  });

  it('should accept a single-item (non-list) relation', function test() {
    const relations = Immutable.fromJS({
      predicate: 'hasBroader',
      subject: {
        csid: context.csid,
      },
      object: {
        csid: 'abcd',
        refName: 'urn:cspace:parent',
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        value={relations}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, AuthorityHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: { csid: 'abcd', refName: 'urn:cspace:parent', type: undefined },
      children: [
        { refName: undefined, type: undefined },
      ],
    }));
  });

  it('should render no hierarchy when non-immutable relations are supplied', function test() {
    const relations = {
      predicate: 'hasBroader',
      subject: {
        csid: context.csid,
      },
      object: {
        csid: 'abcd',
        refName: 'urn:cspace:parent',
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        value={relations}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, AuthorityHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: {},
      children: [
        { refName: undefined, type: undefined },
      ],
    }));
  });

  it('should pass a new hierarchy descriptor to the hierarchy editor when a new relation list is received via props', function test() {
    const relations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          csid: context.csid,
        },
        object: {
          csid: 'abcd',
          refName: 'urn:cspace:parent',
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child1',
        },
        object: {
          csid: context.csid,
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        value={relations}
      />, context);

    let result;
    let hierarchyEditor;

    result = shallowRenderer.getRenderOutput();
    hierarchyEditor = findWithType(result, AuthorityHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: { csid: 'abcd', refName: 'urn:cspace:parent', type: undefined },
      children: [
        { refName: 'urn:cspace:child1', type: undefined },
      ],
    }));

    const newRelations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:newChild1',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:newChild2',
        },
        object: {
          csid: context.csid,
        },
      },
    ]);

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        value={newRelations}
      />, context);

    result = shallowRenderer.getRenderOutput();
    hierarchyEditor = findWithType(result, AuthorityHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: {},
      children: [
        { refName: 'urn:cspace:newChild1', type: undefined },
        { refName: 'urn:cspace:newChild2', type: undefined },
      ],
    }));
  });

  it('should sort children by meta-number (display name), with nulls at the end', function test() {
    const relations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          number: 'Wilma',
          refName: 'urn:cspace:child1',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          number: 'Barney',
          refName: 'urn:cspace:child2',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child3',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          number: 'Fred',
          refName: 'urn:cspace:child4',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          number: 'Betty',
          refName: 'urn:cspace:child5',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child6',
        },
        object: {
          csid: context.csid,
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        name={name}
        value={relations}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, AuthorityHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: {},
      children: [
        { refName: 'urn:cspace:child2', type: undefined },
        { refName: 'urn:cspace:child5', type: undefined },
        { refName: 'urn:cspace:child4', type: undefined },
        { refName: 'urn:cspace:child1', type: undefined },
        { refName: 'urn:cspace:child3', type: undefined },
        { refName: 'urn:cspace:child6', type: undefined },
      ],
    }));
  });

  it('should call onCommit when a value is committed in the hierarchy editor', function test() {
    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const hierarchy = Immutable.fromJS({
      parent: {
        csid: 'abcd',
        refName: 'urn:cspace:parent',
      },
      children: [
        {
          refName: 'urn:cspace:child',
        },
      ],
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        name={name}
        onCommit={handleCommit}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, AuthorityHierarchyEditor);

    hierarchyEditor.props.onCommit([], hierarchy);

    committedPath.should.deep.equal([name]);

    committedValue.should.equal(Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          refName: hierarchy.getIn(['children', 0, 'refName']),
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          csid: context.csid,
        },
        object: {
          csid: hierarchy.getIn(['parent', 'csid']),
          refName: hierarchy.getIn(['parent', 'refName']),
        },
      },
    ]));
  });

  it('should call onCommit when a child instance is removed in the hierarchy editor', function test() {
    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const relations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child1',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child2',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child3',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          csid: context.csid,
        },
        object: {
          csid: 'abcd',
          refName: 'urn:cspace:parent',
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        name={name}
        value={relations}
        onCommit={handleCommit}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, AuthorityHierarchyEditor);

    const removedIndex = 1;

    hierarchyEditor.props.onRemoveChild(removedIndex);

    committedPath.should.deep.equal([name]);
    committedValue.should.equal(relations.delete(removedIndex));
  });

  it('should call onCommit when a child instance is added in the hierarchy editor', function test() {
    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const relations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child1',
        },
        object: {
          csid: context.csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:child2',
        },
        object: {
          csid: context.csid,
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        name={name}
        value={relations}
        onCommit={handleCommit}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, AuthorityHierarchyEditor);

    hierarchyEditor.props.onAddChild();

    committedPath.should.deep.equal([name]);

    committedValue.should.equal(relations.push(Immutable.fromJS({
      predicate: '',
      subject: {},
      object: {},
    })));
  });
});
