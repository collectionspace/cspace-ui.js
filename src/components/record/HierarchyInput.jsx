import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { getDisplayName } from 'cspace-refname';
import { helpers as inputHelpers } from 'cspace-input';
import { Row } from 'cspace-layout';
import HierarchySiblingListContainer from '../../containers/record/HierarchySiblingListContainer';
import HierarchyReparentNotifierContainer from '../../containers/record/HierarchyReparentNotifierContainer';
import UntypedHierarchyEditor from './UntypedHierarchyEditor';
import TypedHierarchyEditor from './TypedHierarchyEditor';

import {
  placeholderCsid,
  normalizeRelationList,
  findBroaderRelation,
  findNarrowerRelations,
} from '../../helpers/relationListHelpers';

const {
  getPath,
  pathPropType,
} = inputHelpers.pathHelpers;

const findParent = (csid, relations) => {
  const broaderRelation = findBroaderRelation(csid, relations);

  if (broaderRelation) {
    return Immutable.Map({
      relCsid: broaderRelation.get('csid'),
      csid: broaderRelation.getIn(['object', 'csid']),
      refName: broaderRelation.getIn(['object', 'refName']),
      type: broaderRelation.get('relationshipMetaType'),
    });
  }

  return null;
};

const findChildren = (csid, relations) => findNarrowerRelations(csid, relations)
  .sort((relationA, relationB) => {
    const displayNameA = getDisplayName(relationA.getIn(['subject', 'refName'])) || '';
    const displayNameB = getDisplayName(relationB.getIn(['subject', 'refName'])) || '';

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
  .map((relation) => Immutable.Map({
    relCsid: relation.get('csid'),
    refName: relation.getIn(['subject', 'refName']),
    type: relation.get('relationshipMetaType'),
  }));

function createHierarchy(csid, value) {
  const relations = normalizeRelationList(value);

  return Immutable.fromJS({
    parent: findParent(csid, relations) || Immutable.Map(),
    children: findChildren(csid, relations),
  });
}

const propTypes = {
  csid: PropTypes.string,
  messages: PropTypes.shape({
    siblings: PropTypes.object,
  }),
  /* eslint-disable react/no-unused-prop-types */
  name: PropTypes.string,
  parentPath: pathPropType,
  subpath: pathPropType,
  readOnly: PropTypes.bool,
  /* eslint-enable react/no-unused-prop-types */
  isRecordModified: PropTypes.bool,
  showParent: PropTypes.bool,
  showChildren: PropTypes.bool,
  showSiblings: PropTypes.bool,
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

const defaultProps = {
  showParent: true,
  showChildren: true,
  showSiblings: true,
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
};

export default class HierarchyInput extends Component {
  constructor(props) {
    super(props);

    const {
      csid,
      value,
    } = props;

    this.state = {
      csid,
      value,
      hierarchy: createHierarchy(csid, value),
    };

    this.handleAddChild = this.handleAddChild.bind(this);
    this.handleRemoveChild = this.handleRemoveChild.bind(this);
    this.handleCommit = this.handleCommit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const {
      csid,
      value,
    } = props;

    const {
      csid: oldCsid,
      value: oldValue,
    } = state;

    if (oldCsid !== csid || oldValue !== value) {
      return {
        csid,
        value,
        hierarchy: createHierarchy(csid, value),
      };
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

      let children = hierarchy.get('children');

      if (children.size === 0) {
        // The UI renders a single blank input event if there are no children, so adding a child
        // should result in two children, not one.

        children = children.push(Immutable.Map());
      }

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

  getRelationItems(hierarchy) {
    const {
      csid,
    } = this.props;

    const children = hierarchy.get('children');

    const childRelationItems = children.map((child) => Immutable.fromJS({
      csid: child.get('relCsid'),
      predicate: 'hasBroader',
      relationshipMetaType: child.get('type'),
      subject: {
        refName: child.get('refName'),
      },
      object: {
        csid: csid || placeholderCsid,
      },
    }));

    const parent = hierarchy.get('parent');

    const parentRelationItem = Immutable.fromJS({
      csid: parent.get('relCsid'),
      predicate: 'hasBroader',
      relationshipMetaType: parent.get('type'),
      subject: {
        csid: csid || placeholderCsid,
      },
      object: {
        csid: parent.get('csid'),
        refName: parent.get('refName'),
      },
    });

    return childRelationItems.push(parentRelationItem);
  }

  renderHierarchy() {
    const {
      csid,
      messages,
      parentTypeOptionListName,
      childTypeOptionListName,
      isRecordModified,
      readOnly,
      showParent,
      showChildren,
    } = this.props;

    if (!showParent && !showChildren) {
      return undefined;
    }

    const {
      config,
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
      <HierarchyEditor
        csid={csid}
        messages={messages}
        parentTypeOptionListName={parentTypeOptionListName}
        childTypeOptionListName={childTypeOptionListName}
        recordType={recordType}
        vocabulary={vocabulary}
        value={hierarchy}
        readOnly={readOnly}
        isRecordModified={isRecordModified}
        showParent={showParent}
        showChildren={showChildren}
        onCommit={this.handleCommit}
        onAddChild={this.handleAddChild}
        onRemoveChild={this.handleRemoveChild}
      />
    );
  }

  renderReparentNotifier() {
    const {
      csid,
    } = this.props;

    const {
      hierarchy,
    } = this.state;

    const {
      config,
    } = this.context;

    const newChildRefNames = hierarchy.get('children')
      .filter((child) => !child.get('relCsid'))
      .map((child) => child.get('refName'));

    return (
      <HierarchyReparentNotifierContainer
        config={config}
        csid={csid}
        childRefNames={newChildRefNames}
      />
    );
  }

  renderSiblings() {
    const {
      csid,
      messages,
      showSiblings,
    } = this.props;

    if (!showSiblings) {
      return undefined;
    }

    const {
      config,
      recordType,
    } = this.context;

    const {
      hierarchy,
    } = this.state;

    return (
      <HierarchySiblingListContainer
        config={config}
        csid={csid}
        parentCsid={hierarchy.getIn(['parent', 'csid'])}
        recordType={recordType}
        title={<FormattedMessage {...messages.siblings} />}
      />
    );
  }

  render() {
    return (
      <Row>
        {this.renderHierarchy()}
        {this.renderSiblings()}
        {this.renderReparentNotifier()}
      </Row>
    );
  }
}

HierarchyInput.propTypes = propTypes;
HierarchyInput.defaultProps = defaultProps;
HierarchyInput.contextTypes = contextTypes;
