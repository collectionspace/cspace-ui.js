import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import MiniViewPopupAutocompleteInputContainer from '../../containers/record/MiniViewPopupAutocompleteInputContainer';

const {
  CompoundInput,
} = inputComponents;

const propTypes = {
  csid: PropTypes.string,
  intl: intlShape,
  messages: PropTypes.shape({
    parent: PropTypes.object,
    children: PropTypes.object,
  }),
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  value: PropTypes.instanceOf(Immutable.Map),
  readOnly: PropTypes.bool,
  isRecordModified: PropTypes.bool,
  showParent: PropTypes.bool,
  showChildren: PropTypes.bool,
  onCommit: PropTypes.func,
  onAddChild: PropTypes.func,
  onRemoveChild: PropTypes.func,
};

const defaultProps = {
  showParent: true,
  showChildren: true,
};

export class BaseUntypedHierarchyEditor extends Component {
  constructor() {
    super();

    this.filterMatch = this.filterMatch.bind(this);
    this.handleAddChild = this.handleAddChild.bind(this);
    this.handleRemoveChild = this.handleRemoveChild.bind(this);
    this.handleChildCommit = this.handleChildCommit.bind(this);
    this.handleParentCommit = this.handleParentCommit.bind(this);
  }

  handleAddChild() {
    const {
      onAddChild,
    } = this.props;

    if (onAddChild) {
      onAddChild();
    }
  }

  handleRemoveChild(path) {
    const {
      onRemoveChild,
    } = this.props;

    if (onRemoveChild) {
      const position = parseInt(path[path.length - 1], 10);

      onRemoveChild(position);
    }
  }

  handleChildCommit(path, value) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      const index = path[path.length - 1];

      onCommit(['children', index, 'refName'], value);
    }
  }

  handleParentCommit(path, value, csid) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(['parent'], Immutable.Map({
        csid,
        refName: value,
      }));
    }
  }

  filterMatch(item) {
    const {
      csid,
    } = this.props;

    return (item.csid !== csid);
  }

  renderParent() {
    const {
      intl,
      messages,
      recordType,
      vocabulary,
      value,
      readOnly,
      isRecordModified,
      showParent,
    } = this.props;

    if (!showParent) {
      return undefined;
    }

    const source = [recordType, vocabulary].join('/');
    const parentRefName = value.getIn(['parent', 'refName']);

    return (
      <MiniViewPopupAutocompleteInputContainer
        label={intl.formatMessage(messages.parent)}
        source={source}
        value={parentRefName}
        readOnly={readOnly}
        showQuickAddCloneOption
        quickAddCloneOptionDisabled={isRecordModified}
        onCommit={this.handleParentCommit}
        matchFilter={this.filterMatch}
      />
    );
  }

  renderChildren() {
    const {
      intl,
      messages,
      recordType,
      vocabulary,
      value,
      readOnly,
      isRecordModified,
      showChildren,
    } = this.props;

    if (!showChildren) {
      return undefined;
    }

    const source = [recordType, vocabulary].join('/');

    const childRefNames = value.get('children').map((child) => child.get('refName'));

    return (
      <CompoundInput
        label={intl.formatMessage(messages.children)}
        value={{ childRefNames }}
        readOnly={readOnly}
      >
        <MiniViewPopupAutocompleteInputContainer
          name="childRefNames"
          repeating
          reorderable={false}
          source={source}
          showQuickAddCloneOption
          quickAddCloneOptionDisabled={isRecordModified}
          matchFilter={this.filterMatch}
          onCommit={this.handleChildCommit}
          onAddInstance={this.handleAddChild}
          onRemoveInstance={this.handleRemoveChild}
        />
      </CompoundInput>
    );
  }

  render() {
    return (
      <div>
        {this.renderParent()}
        {this.renderChildren()}
      </div>
    );
  }
}

BaseUntypedHierarchyEditor.propTypes = propTypes;
BaseUntypedHierarchyEditor.defaultProps = defaultProps;

export default injectIntl(BaseUntypedHierarchyEditor);
