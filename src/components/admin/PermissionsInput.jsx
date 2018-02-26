import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { helpers as inputHelpers } from 'cspace-input';
import { getRecordTypeConfigByServicePath } from '../../helpers/configHelpers';
import permissionButtonStyles from '../../../styles/cspace-ui/PermissionButton.css';
import styles from '../../../styles/cspace-ui/PermissionsInput.css';

const {
  getPath,
  pathPropType,
} = inputHelpers.pathHelpers;

const permMessages = defineMessages({
  '': {
    id: 'permissionsInput.perm.none',
    description: 'Label of the \'none\' permission level shown when editing permissions.',
    defaultMessage: 'None',
  },
  RL: {
    id: 'permissionsInput.perm.read',
    description: 'Label of the \'read\' permission level shown when editing permissions.',
    defaultMessage: 'Read',
  },
  CRUL: {
    id: 'permissionsInput.perm.write',
    description: 'Label of the \'write\' permission level shown when editing permissions.',
    defaultMessage: 'Write',
  },
  CRUDL: {
    id: 'permissionsInput.perm.delete',
    description: 'Label of the \'delete\' permission level shown when editing permissions.',
    defaultMessage: 'Delete',
  },
});

const serviceTypeMessages = defineMessages({
  object: {
    id: 'permissionsInput.serviceType.object',
    defaultMessage: 'Objects',
  },
  procedure: {
    id: 'permissionsInput.serviceType.procedure',
    defaultMessage: 'Procedures',
  },
  authority: {
    id: 'permissionsInput.serviceType.authority',
    defaultMessage: 'Authorities',
  },
  utility: {
    id: 'permissionsInput.serviceType.utility',
    defaultMessage: 'Utility Resources',
  },
  security: {
    id: 'permissionsInput.serviceType.security',
    defaultMessage: 'Security Resources',
  },
});

const serviceTypes = ['object', 'procedure', 'authority', 'utility', 'security'];

const propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  name: PropTypes.string,
  parentPath: pathPropType,
  subpath: pathPropType,
  /* eslint-enable react/no-unused-prop-types */
  readOnly: PropTypes.bool,
  resourceNames: PropTypes.instanceOf(Immutable.List),
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.instanceOf(Immutable.Map),
  ]),
  readPerms: PropTypes.func,
  onCommit: PropTypes.func,
};

const contextTypes = {
  intl: intlShape,
  config: PropTypes.object,
};

export default class PermissionsInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  componentDidMount() {
    const {
      resourceNames,
      readPerms,
    } = this.props;

    const {
      config,
    } = this.context;

    if (!resourceNames && readPerms) {
      readPerms(config);
    }
  }

  getPermsMap() {
    // The services layer gives us a list of resources and action groups. Build a map of resource
    // names to UI permissions.

    let permissionsList = this.props.value;

    if (!permissionsList) {
      return undefined;
    }

    if (!Immutable.List.isList(permissionsList)) {
      permissionsList = Immutable.List.of(permissionsList);
    }

    const perms = {};

    permissionsList.forEach((permission) => {
      const resourceName = permission.get('resourceName');
      const actionGroup = permission.get('actionGroup');

      perms[resourceName] = actionGroup;
    });

    return perms;
  }

  updatePerms(updates) {
    const perms = this.getPermsMap() || {};

    Object.assign(perms, updates);

    return Immutable.List(
      Object.keys(perms)
        .filter(resourceName => !!perms[resourceName])
        .map(resourceName => Immutable.Map({
          resourceName,
          actionGroup: perms[resourceName],
        }))
    );
  }

  handleRadioChange(event) {
    const {
      name: recordType,
      value: actionGroup,
      checked: selected,
    } = event.target;

    const {
      onCommit,
    } = this.props;

    if (selected && onCommit) {
      const {
        config,
      } = this.context;

      const serviceConfig = get(config, ['recordTypes', recordType, 'serviceConfig']);

      const {
        documentName,
        servicePath,
        serviceType,
      } = serviceConfig;

      const resourceName = servicePath;

      const update = {
        [resourceName]: actionGroup,
      };

      if (
        serviceType === 'object' ||
        serviceType === 'procedure' ||
        serviceType === 'authority' ||
        serviceType === 'utility'
      ) {
        // For object, procedure, authority, and utility types, also set permissions on the delete
        // workflow transition. (Security records do not have soft-delete).

        const workflowDeleteResourceName = `/${resourceName}/*/workflow/delete`;

        if (actionGroup) {
          update[workflowDeleteResourceName] = actionGroup.includes('D') ? 'CRUDL' : 'RL';
        } else {
          update[workflowDeleteResourceName] = '';
        }
      }

      if (serviceType === 'authority') {
        // Permissions on authorities should be set on both the authorities and their items.

        const itemResourceName = documentName;

        update[itemResourceName] = actionGroup;
      }

      if (resourceName === 'authorization/roles') {
        // If the authorization/roles resource can be read, allow permissions to be read and
        // listed. This allows the permissions list to be displayed when viewing the role.

        const permissionsResourceName = 'authorization/permissions';

        update[permissionsResourceName] = actionGroup && actionGroup.includes('R') ? 'RL' : '';
      }

      const updatedPerms = this.updatePerms(update);

      onCommit(getPath(this.props), updatedPerms);
    }
  }

  renderRadioButton(perms, recordType, resourceName, value) {
    const {
      readOnly,
    } = this.props;

    const className = readOnly ? permissionButtonStyles.readOnly : permissionButtonStyles.normal;

    let checked = false;

    if (perms) {
      checked = value ? perms[resourceName] === value : !perms[resourceName];
    }

    return (
      // FIXME: Do I really need for if I'm wrapping the input in the label?
      // eslint-disable-next-line jsx-a11y/label-has-for
      <label className={className}>
        <FormattedMessage {...permMessages[value]} />
        <input
          checked={checked}
          name={recordType}
          type="radio"
          value={value}
          disabled={readOnly}
          onChange={this.handleRadioChange}
        />
        <div />
      </label>
    );
  }

  renderPermRows() {
    const {
      config,
      intl,
    } = this.context;

    const {
      resourceNames,
    } = this.props;

    const perms = this.getPermsMap() || {};

    const recordTypeConfigs = resourceNames
      .map(resourceName => getRecordTypeConfigByServicePath(config, resourceName))
      .filter(recordTypeConfig => (recordTypeConfig && !recordTypeConfig.disabled));

    const sections = [];

    serviceTypes.forEach((serviceType) => {
      const rows = [];

      recordTypeConfigs
        .filter(recordTypeConfig => recordTypeConfig.serviceConfig.serviceType === serviceType)
        .sort((recordTypeConfigA, recordTypeConfigB) => {
          // Primary sort by sortOrder

          let sortOrderA = recordTypeConfigA.sortOrder;
          let sortOrderB = recordTypeConfigB.sortOrder;

          if (typeof sortOrderA !== 'number') {
            sortOrderA = Number.MAX_VALUE;
          }

          if (typeof sortOrderB !== 'number') {
            sortOrderB = Number.MAX_VALUE;
          }

          if (sortOrderA !== sortOrderB) {
            return (sortOrderA > sortOrderB ? 1 : -1);
          }

          // Secondary sort by label

          const labelA = intl.formatMessage(recordTypeConfigA.messages.record.collectionName);
          const labelB = intl.formatMessage(recordTypeConfigB.messages.record.collectionName);

          // FIXME: This should be locale aware
          return labelA.localeCompare(labelB);
        })
        .forEach((recordTypeConfig) => {
          const name = recordTypeConfig.name;
          const resourceName = recordTypeConfig.serviceConfig.servicePath;
          const nameMessage = get(recordTypeConfig, ['messages', 'record', 'collectionName']);

          const formattedName = nameMessage
            ? intl.formatMessage(nameMessage)
            : `[ ${name} ]`;

          rows.push(
            <div key={name}>
              <div>{formattedName}</div>
              <div>
                {this.renderRadioButton(perms, name, resourceName, '')}
                {this.renderRadioButton(perms, name, resourceName, 'RL')}
                {this.renderRadioButton(perms, name, resourceName, 'CRUL')}
                {this.renderRadioButton(perms, name, resourceName, 'CRUDL')}
              </div>
            </div>
          );
        });

      sections.push(
        <section key={serviceType}>
          <header>
            <h3><FormattedMessage {...serviceTypeMessages[serviceType]} /></h3>
            <ul>
              <li><FormattedMessage {...permMessages['']} /></li>
              <li><FormattedMessage {...permMessages.RL} /></li>
              <li><FormattedMessage {...permMessages.CRUL} /></li>
              <li><FormattedMessage {...permMessages.CRUDL} /></li>
            </ul>
          </header>
          {rows}
        </section>
      );
    });

    return sections;
  }

  render() {
    const {
      readOnly,
      resourceNames,
    } = this.props;

    if (!resourceNames) {
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
      <div className={className}>
        {this.renderPermRows()}
      </div>
    );
  }
}

PermissionsInput.propTypes = propTypes;
PermissionsInput.contextTypes = contextTypes;
