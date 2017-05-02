import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { helpers as inputHelpers } from 'cspace-input';
import { Row } from 'cspace-layout';
import HierarchySiblingListContainer from '../../containers/record/HierarchySiblingListContainer';
import AuthorityHierarchyEditor from './AuthorityHierarchyEditor';

const {
  getPath,
  pathPropType,
} = inputHelpers.pathHelpers;

const normalizeValue = (value) => {
  if (!value) {
    return null;
  }

  if (Immutable.List.isList(value)) {
    return value;
  }

  if (Immutable.Map.isMap(value)) {
    return Immutable.List.of(value);
  }

  return null;
};

const propTypes = {
  messages: PropTypes.object,
  /* eslint-disable react/no-unused-prop-types */
  name: PropTypes.string,
  parentPath: pathPropType,
  subpath: pathPropType,
  /* eslint-enable react/no-unused-prop-types */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.instanceOf(Immutable.Map),
    PropTypes.array,
    PropTypes.object,
  ]),
  onCommit: PropTypes.func,
};

const contextTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
};

export default class HierarchyInput extends Component {
  constructor() {
    super();

    this.handleAddChild = this.handleAddChild.bind(this);
    this.handleRemoveChild = this.handleRemoveChild.bind(this);
    this.handleCommit = this.handleCommit.bind(this);

    this.state = {};
  }

  componentWillMount() {
    const {
      value,
    } = this.props;

    this.initHierarchy(value);
  }

  componentWillReceiveProps(nextProps) {
    const {
      value,
    } = this.props;

    const {
      value: nextValue,
    } = nextProps;

    if (nextValue !== value) {
      this.initHierarchy(nextValue);
    }
  }

  getRelationItems(hierarchy) {
    const {
      csid,
    } = this.context;

    const children = hierarchy.get('children');

    let relationItems = children.map((child) => {
      const childRefName = child.get('refName');

      if (childRefName) {
        return Immutable.fromJS({
          predicate: 'hasBroader',
          // relationshipMetaType: '',
          subject: {
            refName: child.get('refName'),
          },
          object: {
            csid,
          },
        });
      }

      // If there is no refname entered for this child, create a relation item with empty subject
      // and object. The services layer will accept this item, and not do anything with it. This
      // is done rather than omitting the relation item altogether, so that the blank item will
      // continue to be rendered in the UI -- it may be the case that a new child instance was just
      // added, and hasn't been fully filled in yet.

      return Immutable.fromJS({
        predicate: '',
        // relationshipMetaType: '',
        subject: {},
        object: {},
      });
    });

    const parent = hierarchy.get('parent');
    const parentCsid = parent.get('csid');
    const parentRefName = parent.get('refName');

    if (parentRefName) {
      const parentRelationItem = Immutable.fromJS({
        predicate: 'hasBroader',
        // relationshipMetaType: '',
        subject: {
          csid,
        },
        object: {
          csid: parentCsid,
          refName: parentRefName,
        },
      });

      relationItems = relationItems.push(parentRelationItem);
    }

    return relationItems;
  }

  initHierarchy(value) {
    const relations = normalizeValue(value);
    const parent = this.findParent(relations) || Immutable.Map();

    let children = this.findChildren(relations);

    if (children.size === 0) {
      // Initialize to one empty child.

      children = children.push(Immutable.Map({
        refName: undefined,
        type: undefined,
      }));
    }

    const hierarchy = Immutable.fromJS({
      parent,
      children,
    });

    this.setState({
      hierarchy,
    });
  }

  findBroaderRelation(relations) {
    if (!relations) {
      return null;
    }

    const {
      csid,
    } = this.context;

    return relations.find(
      relation =>
        relation.get('predicate') === 'hasBroader' &&
        relation.getIn(['subject', 'csid']) === csid
    );
  }

  findNarrowerRelations(relations) {
    const {
      csid,
    } = this.context;

    if (!relations) {
      return Immutable.List();
    }

    return relations.filter(
      relation =>
        (relation.get('predicate') === '') ||
        (relation.get('predicate') === 'hasBroader' && relation.getIn(['object', 'csid']) === csid)
    );
  }

  findChildren(relations) {
    // TODO: Resort children alphabetically on save.

    return this.findNarrowerRelations(relations)
      .sort((relationA, relationB) => {
        const numberA = relationA.getIn(['subject', 'number']);
        const numberB = relationB.getIn(['subject', 'number']);

        if (numberA && numberB) {
          return numberA.localeCompare(numberB);
        }

        if (!numberA && !numberB) {
          return 0;
        }

        if (numberA) {
          return -1;
        }

        return 1;
      })
      .map(relation => Immutable.Map({
        refName: relation.getIn(['subject', 'refName']),
        type: relation.get('relationshipMetaType'),
      }));
  }

  findParent(relations) {
    const broaderRelation = this.findBroaderRelation(relations);

    if (broaderRelation) {
      return Immutable.Map({
        csid: broaderRelation.getIn(['object', 'csid']),
        refName: broaderRelation.getIn(['object', 'refName']),
        type: broaderRelation.get('relationshipMetaType'),
      });
    }

    return null;
  }

  handleAddChild() {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      const {
        hierarchy,
      } = this.state;

      const children = hierarchy.get('children');
      const updatedHierarchy = hierarchy.set('children', children.push(Immutable.Map()));

      onCommit(getPath(this.props), this.getRelationItems(updatedHierarchy));
    }
  }

  handleRemoveChild(position) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      const {
        hierarchy,
      } = this.state;

      const children = hierarchy.get('children');
      const updatedHierarchy = hierarchy.set('children', children.delete(position));

      onCommit(getPath(this.props), this.getRelationItems(updatedHierarchy));
    }
  }

  handleCommit(path, value) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      const {
        hierarchy,
      } = this.state;

      const updatedHierarchy = hierarchy.setIn(path, value);

      onCommit(getPath(this.props), this.getRelationItems(updatedHierarchy));
    }
  }

  render() {
    const {
      messages,
    } = this.props;

    const {
      config,
      csid,
      recordType,
      vocabulary,
    } = this.context;

    const {
      hierarchy,
    } = this.state;

    return (
      <Row>
        <AuthorityHierarchyEditor
          csid={csid}
          messages={messages}
          recordType={recordType}
          vocabulary={vocabulary}
          value={hierarchy}
          onCommit={this.handleCommit}
          onAddChild={this.handleAddChild}
          onRemoveChild={this.handleRemoveChild}
        />
        <HierarchySiblingListContainer
          config={config}
          csid={csid}
          parentCsid={hierarchy.getIn(['parent', 'csid'])}
          recordType={recordType}
          title={<FormattedMessage {...messages.siblings} />}
        />
      </Row>
    );
  }
}

HierarchyInput.propTypes = propTypes;
HierarchyInput.contextTypes = contextTypes;
