import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { getDisplayName } from 'cspace-refname';
import { helpers as inputHelpers } from 'cspace-input';
import { Row } from 'cspace-layout';
import HierarchySiblingListContainer from '../../containers/record/HierarchySiblingListContainer';
import UntypedHierarchyEditor from './UntypedHierarchyEditor';
import TypedHierarchyEditor from './TypedHierarchyEditor';

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
  readOnly: PropTypes.bool,
  /* eslint-enable react/no-unused-prop-types */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.instanceOf(Immutable.Map),
    PropTypes.array,
    PropTypes.object,
  ]),
  parentTypeOptionListName: PropTypes.string,
  childTypeOptionListName: PropTypes.string,
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

    const childRelationItems = children.map(child => Immutable.fromJS({
      predicate: 'hasBroader',
      relationshipMetaType: child.get('type'),
      subject: {
        refName: child.get('refName'),
      },
      object: {
        csid,
      },
    }));

    const parent = hierarchy.get('parent');

    const parentRelationItem = Immutable.fromJS({
      predicate: 'hasBroader',
      relationshipMetaType: parent.get('type'),
      subject: {
        csid,
      },
      object: {
        csid: parent.get('csid'),
        refName: parent.get('refName'),
      },
    });

    return childRelationItems.push(parentRelationItem);
  }

  initHierarchy(value) {
    const relations = normalizeValue(value);
    const parent = this.findParent(relations) || Immutable.Map();
    const children = this.findChildren(relations);

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
    return this.findNarrowerRelations(relations)
      .sort((relationA, relationB) => {
        const displayNameA = getDisplayName(relationA.getIn(['subject', 'refName']));
        const displayNameB = getDisplayName(relationB.getIn(['subject', 'refName']));

        if (displayNameA && displayNameB) {
          return displayNameA.localeCompare(displayNameB);
        }

        if (!displayNameA && !displayNameB) {
          return 0;
        }

        if (displayNameA) {
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
      parentTypeOptionListName,
      childTypeOptionListName,
      readOnly,
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

    const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);

    const HierarchyEditor = (serviceType === 'object')
      ? TypedHierarchyEditor
      : UntypedHierarchyEditor;

    return (
      <Row>
        <HierarchyEditor
          csid={csid}
          messages={messages}
          parentTypeOptionListName={parentTypeOptionListName}
          childTypeOptionListName={childTypeOptionListName}
          recordType={recordType}
          vocabulary={vocabulary}
          value={hierarchy}
          readOnly={readOnly}
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
