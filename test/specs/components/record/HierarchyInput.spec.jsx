import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findAllWithType, findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import UntypedHierarchyEditor from '../../../../src/components/record/UntypedHierarchyEditor';
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

const csid = '1111';
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

    findWithType(result, UntypedHierarchyEditor).should.not.equal(null);
  });

  it('should not render a hierarchy editor if both showParent and showChildren are false', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        showParent={false}
        showChildren={false}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    findAllWithType(result, UntypedHierarchyEditor).length.should.equal(0);
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

  it('should not render a hierarchy sibling list if showSiblings is false', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        messages={messages}
        showSiblings={false}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    findAllWithType(result, HierarchySiblingListContainer).length.should.equal(0);
  });

  it('should convert a relation list to a hierarchy descriptor, and pass it to the hierarchy editor', function test() {
    const relations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          csid,
        },
        object: {
          csid: 'abcd',
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child1)',
        },
        object: {
          csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child2)',
        },
        object: {
          csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child3)',
        },
        object: {
          csid,
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        csid={csid}
        messages={messages}
        value={relations}
      />);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: {
        csid: 'abcd',
        refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        relCsid: undefined,
        type: undefined,
      },
      children: [
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child1)',
          type: undefined,
          relCsid: undefined,
        },
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child2)',
          relCsid: undefined,
          type: undefined,
        },
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child3)',
          relCsid: undefined,
          type: undefined,
        },
      ],
    }));
  });

  it('should find broader relations using a urn-style csid', function test() {
    const urnCsid = 'urn:cspace:name(1234)';

    const relations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(1234)',
        },
        object: {
          csid: 'abcd',
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        csid={urnCsid}
        messages={messages}
        value={relations}
      />);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: {
        csid: 'abcd',
        refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        relCsid: undefined,
        type: undefined,
      },
      children: [],
    }));
  });

  it('should accept a single-item (non-list) relation', function test() {
    const relCsid = 'aaaa';

    const relations = Immutable.fromJS({
      csid: relCsid,
      predicate: 'hasBroader',
      subject: {
        csid,
      },
      object: {
        csid: 'abcd',
        refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        csid={csid}
        messages={messages}
        value={relations}
      />);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: {
        relCsid,
        csid: 'abcd',
        refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        type: undefined,
      },
      children: [],
    }));
  });

  it('should render no hierarchy when non-immutable relations are supplied', function test() {
    const relations = {
      predicate: 'hasBroader',
      subject: {
        csid,
      },
      object: {
        csid: 'abcd',
        refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        csid={csid}
        messages={messages}
        value={relations}
      />);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: {},
      children: [],
    }));
  });

  it('should pass a new hierarchy descriptor to the hierarchy editor when a new relation list is received via props', function test() {
    const relations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          csid,
        },
        object: {
          csid: 'abcd',
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child1)',
        },
        object: {
          csid,
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        csid={csid}
        messages={messages}
        value={relations}
      />);

    let result;
    let hierarchyEditor;

    result = shallowRenderer.getRenderOutput();
    hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: {
        csid: 'abcd',
        refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        relCsid: undefined,
        type: undefined,
      },
      children: [
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child1)',
          relCsid: undefined,
          type: undefined,
        },
      ],
    }));

    const newRelations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(newChild1)',
        },
        object: {
          csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(newChild2)',
        },
        object: {
          csid,
        },
      },
    ]);

    shallowRenderer.render(
      <HierarchyInput
        csid={csid}
        messages={messages}
        value={newRelations}
      />);

    result = shallowRenderer.getRenderOutput();
    hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: {},
      children: [
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(newChild1)',
          relCsid: undefined,
          type: undefined,
        },
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(newChild2)',
          relCsid: undefined,
          type: undefined,
        },
      ],
    }));
  });

  it('should sort children by display name, with nulls at the end', function test() {
    const relations = Immutable.fromJS([
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child3)',
        },
        object: {
          csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child1)\'Wilma\'',
        },
        object: {
          csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child2)\'Barney\'',
        },
        object: {
          csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child4)\'Fred\'',
        },
        object: {
          csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child5)\'Betty\'',
        },
        object: {
          csid,
        },
      },
      {
        predicate: 'hasBroader',
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child6)',
        },
        object: {
          csid,
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        csid={csid}
        messages={messages}
        name={name}
        value={relations}
      />);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

    hierarchyEditor.props.value.should.equal(Immutable.fromJS({
      parent: {},
      children: [
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child2)\'Barney\'',
          relCsid: undefined,
          type: undefined,
        },
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child5)\'Betty\'',
          relCsid: undefined,
          type: undefined,
        },
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child4)\'Fred\'',
          relCsid: undefined,
          type: undefined,
        },
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child1)\'Wilma\'',
          relCsid: undefined,
          type: undefined,
        },
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child3)',
          relCsid: undefined,
          type: undefined,
        },
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child6)',
          relCsid: undefined,
          type: undefined,
        },
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
        relCsid: 'aaaa',
        csid: 'abcd',
        refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        type: 'set',
      },
      children: [
        {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child)',
          type: 'recto',
        },
      ],
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        csid={csid}
        messages={messages}
        name={name}
        onCommit={handleCommit}
      />);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

    hierarchyEditor.props.onCommit([], hierarchy);

    committedPath.should.deep.equal([name]);

    committedValue.should.equal(Immutable.fromJS([
      {
        csid: undefined,
        predicate: 'hasBroader',
        relationshipMetaType: 'recto',
        subject: {
          refName: hierarchy.getIn(['children', 0, 'refName']),
        },
        object: {
          csid,
        },
      },
      {
        csid: 'aaaa',
        predicate: 'hasBroader',
        relationshipMetaType: 'set',
        subject: {
          csid,
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
        csid: undefined,
        predicate: 'hasBroader',
        relationshipMetaType: undefined,
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child1)',
        },
        object: {
          csid,
        },
      },
      {
        csid: undefined,
        predicate: 'hasBroader',
        relationshipMetaType: undefined,
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child2)',
        },
        object: {
          csid,
        },
      },
      {
        csid: undefined,
        predicate: 'hasBroader',
        relationshipMetaType: undefined,
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child3)',
        },
        object: {
          csid,
        },
      },
      {
        csid: undefined,
        predicate: 'hasBroader',
        relationshipMetaType: undefined,
        subject: {
          csid,
        },
        object: {
          csid: 'abcd',
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        csid={csid}
        messages={messages}
        name={name}
        value={relations}
        onCommit={handleCommit}
      />);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

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
        csid: undefined,
        predicate: 'hasBroader',
        relationshipMetaType: undefined,
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child1)',
        },
        object: {
          csid,
        },
      },
      {
        csid: undefined,
        predicate: 'hasBroader',
        relationshipMetaType: undefined,
        subject: {
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(child2)',
        },
        object: {
          csid,
        },
      },
      {
        csid: undefined,
        predicate: 'hasBroader',
        relationshipMetaType: undefined,
        subject: {
          csid,
        },
        object: {
          csid: 'abcd',
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        csid={csid}
        messages={messages}
        name={name}
        value={relations}
        onCommit={handleCommit}
      />);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

    hierarchyEditor.props.onAddChild();

    committedPath.should.deep.equal([name]);

    committedValue.should.equal(relations.insert(2, Immutable.fromJS({
      csid: undefined,
      predicate: 'hasBroader',
      relationshipMetaType: undefined,
      subject: {
        refName: undefined,
      },
      object: {
        csid,
      },
    })));
  });

  it('should commit two children when a child instance is added in the hierarchy editor and there are no children', function test() {
    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const relations = Immutable.fromJS([
      {
        csid: undefined,
        predicate: 'hasBroader',
        relationshipMetaType: undefined,
        subject: {
          csid,
        },
        object: {
          csid: 'abcd',
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(parent)',
        },
      },
    ]);

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInput
        csid={csid}
        messages={messages}
        name={name}
        value={relations}
        onCommit={handleCommit}
      />);

    const result = shallowRenderer.getRenderOutput();
    const hierarchyEditor = findWithType(result, UntypedHierarchyEditor);

    hierarchyEditor.props.onAddChild();

    committedPath.should.deep.equal([name]);

    committedValue.should.equal(
      relations
        .unshift(Immutable.fromJS({
          csid: undefined,
          predicate: 'hasBroader',
          relationshipMetaType: undefined,
          subject: {
            refName: undefined,
          },
          object: {
            csid,
          },
        }))
        .unshift(Immutable.fromJS({
          csid: undefined,
          predicate: 'hasBroader',
          relationshipMetaType: undefined,
          subject: {
            refName: undefined,
          },
          object: {
            csid,
          },
        }))
    );
  });
});
