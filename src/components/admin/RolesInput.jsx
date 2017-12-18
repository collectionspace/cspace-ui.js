import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { baseComponents as inputComponents, helpers as inputHelpers } from 'cspace-input';
import styles from '../../../styles/cspace-ui/RolesInput.css';

const {
  CheckboxInput,
} = inputComponents;

const {
  getPath,
  pathPropType,
} = inputHelpers.pathHelpers;

const propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  name: PropTypes.string,
  parentPath: pathPropType,
  subpath: pathPropType,
  /* eslint-enable react/no-unused-prop-types */
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.instanceOf(Immutable.Map),
  ]),
  roles: PropTypes.instanceOf(Immutable.List),
  readRoles: PropTypes.func,
  onCommit: PropTypes.func,
};

export default class RolesInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentDidMount() {
    const {
      roles,
      readRoles,
    } = this.props;

    if (!roles && readRoles) {
      readRoles();
    }
  }

  getRolesMap() {
    let rolesList = this.props.value;

    if (!rolesList) {
      return undefined;
    }

    if (!Immutable.List.isList(rolesList)) {
      rolesList = Immutable.List.of(rolesList);
    }

    const roles = {};

    rolesList.forEach((role) => {
      const roleName = role.get('roleName');

      roles[roleName] = true;
    });

    return roles;
  }

  handleCheckboxChange(event) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      const {
        checked,
        id,
      } = event.target;

      const membership = this.getRolesMap() || {};

      if (checked) {
        membership[id] = true;
      } else {
        delete membership[id];
      }

      const newValue = Immutable.List(Object.keys(membership).map(roleName => Immutable.Map({
        roleName,
      })));

      onCommit(getPath(this.props), newValue);
    }
  }

  renderRoleRows() {
    const {
      readOnly,
      roles,
    } = this.props;

    const membership = this.getRolesMap() || {};

    const rows = roles.map((role) => {
      const displayName = role.get('displayName');
      const name = role.get('roleName');

      return (
        <li key={name}>
          <CheckboxInput
            checked={!!membership[name]}
            embedded
            id={name}
            readOnly={readOnly}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor={name}>{displayName}</label>
        </li>
      );
    });

    return rows.toJS();
  }

  render() {
    const {
      readOnly,
      roles,
    } = this.props;

    if (!roles || roles.size === 0) {
      return null;
    }

    let {
      value,
    } = this.props;

    if (value && !Immutable.List.isList(value)) {
      value = Immutable.List.of(value);
    }

    const className = readOnly ? styles.readOnly : styles.common;

    return (
      <ul className={className}>
        {this.renderRoleRows()}
      </ul>
    );
  }
}

RolesInput.propTypes = propTypes;
