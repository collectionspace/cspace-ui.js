import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { getDisplayName, getItemShortID } from 'cspace-refname';
import { helpers as inputHelpers } from 'cspace-input';
import { Row } from 'cspace-layout';
import { getUrnCsidShortId, isUrnCsid } from '../../helpers/csidHelpers';
import HierarchySiblingListContainer from '../../containers/record/HierarchySiblingListContainer';
import UntypedHierarchyEditor from './UntypedHierarchyEditor';
import TypedHierarchyEditor from './TypedHierarchyEditor';

const {
  getPath,
  pathPropType,
} = inputHelpers.pathHelpers;

// The placeholder csid accepted by the services layer happens to look like a js template.
// eslint-disable-next-line no-template-curly-in-string
const placeholderCsid = '${itemCSID}';

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

const findBroaderRelation = (csid, relations) => {
  if (!relations) {
    return null;
  }

  if (isUrnCsid(csid)) {
    const shortId = getUrnCsidShortId(csid);

    return relations.find(
      relation =>
        relation.get('predicate') === 'hasBroader' &&
        getItemShortID(relation.getIn(['subject', 'refName'])) === shortId
    );
  }

  const subjectCsid = csid || placeholderCsid;

  return relations.find(
    relation =>
      relation.get('predicate') === 'hasBroader' &&
      relation.getIn(['subject', 'csid']) === subjectCsid
  );
};

const findNarrowerRelations = (csid, relations) => {
  if (!relations) {
    return Immutable.List();
  }

  const objectCsid = csid || placeholderCsid;

  return relations.filter(
    relation =>
      (relation.get('predicate') === '') ||
      (
        relation.get('predicate') === 'hasBroader' &&
        relation.getIn(['object', 'csid']) === objectCsid
      )
  );
};

const findParent = (csid, relations) => {
  const broaderRelation = findBroaderRelation(csid, relations);

  if (broaderRelation) {
    return Immutable.Map({
      csid: broaderRelation.getIn(['object', 'csid']),
      refName: broaderRelation.getIn(['object', 'refName']),
      type: broaderRelation.get('relationshipMetaType'),
    });
  }

  return null;
};

const findChildren = (csid, relations) =>
  findNarrowerRelations(csid, relations)
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

const propTypes = {
  csid: PropTypes.string,
  messages: PropTypes.object,
  /* eslint-disable react/no-unused-prop-types */
  name: PropTypes.string,
  parentPath: pathPropType,
  subpath: pathPropType,
  readOnly: PropTypes.bool,
  /* eslint-enable react/no-unused-prop-types */
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
  config: PropTypes.object,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
};

export default class HierarchyInput extends Component {
  constructor() {
    super();

    this.handleAddChild = this.handleAddChild.bind(this);
    this.handleRemoveChild = this.handleRemoveChild.bind(this);
    this.handleCommit = this.handleCommit.bind(this);
  }

  componentWillMount() {
    const {
      csid,
      value,
    } = this.props;

    this.initHierarchy(csid, value);
  }

  componentWillUpdate(nextProps) {
    const {
      csid,
      value,
    } = this.props;

    const {
      csid: nextCsid,
      value: nextValue,
    } = nextProps;

    if (nextCsid !== csid || nextValue !== value) {
      this.initHierarchy(nextCsid, nextValue);
    }
  }

  getRelationItems(hierarchy) {
    const {
      csid,
    } = this.props;

    const children = hierarchy.get('children');

    const childRelationItems = children.map(child => Immutable.fromJS({
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

  initHierarchy(csid, value) {
    const relations = normalizeValue(value);

    const hierarchy = Immutable.fromJS({
      parent: findParent(csid, relations) || Immutable.Map(),
      children: findChildren(csid, relations),
    });

    this.setState({
      hierarchy,
    });
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

  renderHierarchy() {
    const {
      csid,
      messages,
      parentTypeOptionListName,
      childTypeOptionListName,
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
        showParent={showParent}
        showChildren={showChildren}
        onCommit={this.handleCommit}
        onAddChild={this.handleAddChild}
        onRemoveChild={this.handleRemoveChild}
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
      </Row>
    );
  }
}

HierarchyInput.propTypes = propTypes;
HierarchyInput.defaultProps = defaultProps;
HierarchyInput.contextTypes = contextTypes;
