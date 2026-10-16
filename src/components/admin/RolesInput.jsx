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

const {
  labelToLegend,
} = inputHelpers;

const propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  name: PropTypes.string,
  parentPath: pathPropType,
  subpath: pathPropType,
  /* eslint-enable react/no-unused-prop-types */
  label: PropTypes.node,
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
  constructor(props) {
    super(props);

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

      const newValue = Immutable.List(Object.keys(membership).map((roleId) => Immutable.Map({
        roleId,
      })));

      onCommit(getPath(this.props), newValue);
    }
  }

  getRolesMap() {
    const {
      value,
    } = this.props;

    let rolesList = value;

    if (!rolesList) {
      return undefined;
    }

    if (!Immutable.List.isList(rolesList)) {
      rolesList = Immutable.List.of(rolesList);
    }

    const roles = {};

    rolesList.forEach((role) => {
      const roleId = role.get('roleId');

      roles[roleId] = true;
    });

    return roles;
  }

  renderRoleRows() {
    const {
      readOnly,
      roles,
    } = this.props;

    const membership = this.getRolesMap() || {};

    const rows = roles
      .map((role) => {
        const displayName = role.get('displayName');
        const id = role.get('@csid');
        const isMember = !!membership[id];

        if (readOnly && !isMember) {
          return null;
        }

        return (
          <li key={id}>
            <CheckboxInput
              checked={isMember}
              embedded
              id={id}
              readOnly={readOnly}
              onChange={this.handleCheckboxChange}
            />
            <label htmlFor={id}>{displayName}</label>
          </li>
        );
      })
      .filter((row) => !!row);

    return rows.toJS();
  }

  render() {
    const {
      label,
      readOnly,
      roles,
    } = this.props;

    const legend = labelToLegend(label);
    const rows = (roles && roles.size > 0) ? this.renderRoleRows() : [];

    if (rows.length === 0 && !legend) {
      return null;
    }

    const className = readOnly ? styles.readOnly : styles.common;

    return (
      <fieldset className={className}>
        {legend}
        {rows.length > 0 && <ul>{rows}</ul>}
      </fieldset>
    );
  }
}

RolesInput.propTypes = propTypes;
RolesInput.useLegend = true;
