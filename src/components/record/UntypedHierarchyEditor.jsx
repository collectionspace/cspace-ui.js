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
  messages: PropTypes.object,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  value: PropTypes.instanceOf(Immutable.Map),
  readOnly: PropTypes.bool,
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

  filterMatch(item) {
    return (item.csid !== this.props.csid);
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

  renderParent() {
    const {
      intl,
      messages,
      recordType,
      vocabulary,
      value,
      readOnly,
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
      showChildren,
    } = this.props;

    if (!showChildren) {
      return undefined;
    }

    const source = [recordType, vocabulary].join('/');

    const childRefNames =
      value.get('children').map(child => child.get('refName'));

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
