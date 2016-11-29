import React, { Component, PropTypes } from 'react';
import { defineMessages, intlShape } from 'react-intl';

import {
    baseComponents as inputComponents,
    helpers as inputHelpers,
} from 'cspace-input';

import QuickAdd from './QuickAdd';
import parseAuthoritySpec from '../../helpers/parseAuthoritySpec';
import { getDisplayName } from '../../helpers/refNameHelpers';
import styles from '../../../styles/cspace-ui/AuthorityControlledInput.css';

const pathHelpers = inputHelpers.pathHelpers;
const FilteringDropdownMenuInput = inputComponents.FilteringDropdownMenuInput;

const propTypes = {
  ...FilteringDropdownMenuInput.propTypes,
  addTerm: PropTypes.func,
  intl: intlShape,
  findMatchingTerms: PropTypes.func,
  matches: PropTypes.object,
  minLength: PropTypes.number,
  recordPlugins: PropTypes.object,
};

const defaultProps = {
  // TODO: Make configurable
  minLength: 3,
};

const messages = defineMessages({
  moreCharsRequired: {
    id: 'authorityControlledInput.moreCharsRequired',
    description: 'Message displayed in the authority controlled input dropdown when more characters must be typed in order to begin matching.',
    defaultMessage: 'Continue typing to find matching terms',
  },
  count: {
    id: 'authorityControlledInput.count',
    description: 'Message displayed in the authority controlled input dropdown when filtering options.',
    defaultMessage: `{count, plural,
        =0 {No matches}
        one {# match}
        other {# matches}
    } found`,
  },
});

const getOptions = (authority, matches, partialTerm, recordPlugins) => {
  const authorities = parseAuthoritySpec(authority);
  const options = [];

  if (matches) {
    const partialTermMatch = matches.get(partialTerm);

    if (partialTermMatch) {
      authorities.forEach((authoritySpec) => {
        const {
          authorityName,
          vocabularyName,
        } = authoritySpec;

        const authorityServiceName = recordPlugins[authorityName].serviceConfig.name;
        const authorityMatch = partialTermMatch.getIn([authorityServiceName, vocabularyName]);

        if (authorityMatch) {
          const items = authorityMatch.get('items');

          if (items) {
            const authorityOptions = items.map(item => ({
              value: item.refName,
              label: item.termDisplayName,
            }));

            options.push(...authorityOptions);
          }
        }
      });
    }
  }

  return options;
};

const isPending = (authority, matches, partialTerm, recordPlugins) => {
  const authorities = parseAuthoritySpec(authority);
  let foundPending = false;

  if (matches) {
    const partialTermMatch = matches.get(partialTerm);

    if (partialTermMatch) {
      authorities.forEach((authoritySpec) => {
        const {
          authorityName,
          vocabularyName,
        } = authoritySpec;

        const authorityServiceName = recordPlugins[authorityName].serviceConfig.name;
        const authorityMatch = partialTermMatch.getIn([authorityServiceName, vocabularyName]);

        if (authorityMatch) {
          foundPending = foundPending || authorityMatch.get('isSearchPending') || authorityMatch.get('isAddPending');
        }
      });
    }
  }

  return foundPending;
};

const getNewTerm = (authority, matches, partialTerm, recordPlugins) => {
  const authorities = parseAuthoritySpec(authority);
  let newTerm = null;

  if (matches) {
    const partialTermMatch = matches.get(partialTerm);

    if (partialTermMatch) {
      authorities.forEach((authoritySpec) => {
        const {
          authorityName,
          vocabularyName,
        } = authoritySpec;

        const authorityServiceName = recordPlugins[authorityName].serviceConfig.name;
        const authorityMatch = partialTermMatch.getIn([authorityServiceName, vocabularyName]);

        if (authorityMatch) {
          newTerm = newTerm || authorityMatch.get('newTerm');
        }
      });
    }
  }

  return newTerm;
};

export default class AuthorityControlledInput extends Component {
  constructor(props) {
    super(props);

    this.findMatchingTerms = this.findMatchingTerms.bind(this);
    this.handleDropdownInputCommit = this.handleDropdownInputCommit.bind(this);
    this.handleDropdownInputRef = this.handleDropdownInputRef.bind(this);

    this.state = {
      partialTerm: null,
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const newTerm = getNewTerm(
      nextProps.authority, nextProps.matches, this.state.partialTerm, nextProps.recordPlugins
    );

    const hadNewTerm = getNewTerm(
      this.props.authority, this.props.matches, this.state.partialTerm, this.props.recordPlugins
    );

    if (newTerm && !hadNewTerm) {
      this.commit(newTerm.getIn(['document', 'ns2:collectionspace_core', 'refName']));
      this.dropdownInput.close();
    } else {
      const newState = {
        value: nextProps.value,
      };

      if (!isPending(
        nextProps.authority, nextProps.matches, this.state.partialTerm, nextProps.recordPlugins
      )) {
        newState.options = getOptions(
          nextProps.authority, nextProps.matches, this.state.partialTerm, nextProps.recordPlugins
        );
      }

      this.setState(newState);
    }
  }

  commit(value) {
    this.setState({
      options: [],
      partialTerm: null,
      value,
    });

    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(pathHelpers.getPath(this.props), value);
    }
  }

  findMatchingTerms(partialTerm) {
    const {
      authority,
      findMatchingTerms,
      matches,
      minLength,
      recordPlugins,
    } = this.props;

    const newState = {
      partialTerm,
    };

    const searchNeeded =
      findMatchingTerms && partialTerm
      && partialTerm.length >= minLength
      && (!matches || !matches.has(partialTerm));

    if (searchNeeded) {
      // TODO: Pause to debounce
      findMatchingTerms(partialTerm);
    } else {
      newState.options = getOptions(authority, matches, partialTerm, recordPlugins);
    }

    this.setState(newState);
  }

  handleDropdownInputCommit(path, value) {
    this.commit(value);
  }

  handleDropdownInputRef(ref) {
    this.dropdownInput = ref;
  }

  renderQuickAdd() {
    const {
      addTerm,
      authority,
      minLength,
      recordPlugins,
    } = this.props;

    const {
      partialTerm,
    } = this.state;

    if (partialTerm && partialTerm.length >= minLength) {
      return (
        <QuickAdd
          add={addTerm}
          authority={authority}
          displayName={partialTerm}
          recordPlugins={recordPlugins}
        />
      );
    }

    return null;
  }

  render() {
    const {
      intl,
      authority,
      matches,
      minLength,
      recordPlugins,
      /* eslint-disable no-unused-vars */
      addTerm,
      findMatchingTerms,
      /* eslint-enable no-unused-vars */
      ...remainingProps
    } = this.props;

    const {
      options,
      partialTerm,
      value,
    } = this.state;

    const moreCharsRequired = (
      typeof partialTerm !== 'undefined' &&
      partialTerm !== null &&
      partialTerm.length < minLength
    );

    const formatStatusMessage = moreCharsRequired
      ? () => intl.formatMessage(messages.moreCharsRequired)
      : count => intl.formatMessage(messages.count, { count });

    const className = isPending(authority, matches, partialTerm, recordPlugins)
      ? styles.searching
      : styles.normal;

    return (
      <FilteringDropdownMenuInput
        {...remainingProps}
        className={className}
        filter={this.findMatchingTerms}
        formatStatusMessage={formatStatusMessage}
        menuFooter={this.renderQuickAdd()}
        options={options}
        ref={this.handleDropdownInputRef}
        value={value}
        valueLabel={getDisplayName(value)}
        onCommit={this.handleDropdownInputCommit}
      />
    );
  }
}

AuthorityControlledInput.propTypes = propTypes;
AuthorityControlledInput.defaultProps = defaultProps;
