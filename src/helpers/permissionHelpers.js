import Immutable from 'immutable';
import get from 'lodash/get';
import set from 'lodash/set';
import { getRecordTypeConfigByServicePath } from './configHelpers';

export const getPermissions = (config, accountPermsData) => {
  const perms = {};

  let accountPerms = get(accountPermsData, ['ns2:account_permission', 'permission']);

  if (accountPerms) {
    if (!Array.isArray(accountPerms)) {
      accountPerms = [accountPerms];
    }

    let canCreateAnyRecord = false;

    accountPerms.forEach((permission) => {
      const {
        actionGroup,
        resourceName,
      } = permission;

      const resourceNameParts = resourceName.split('/');

      let servicePath;
      let transitionName;

      if (resourceNameParts.length === 1) {
        servicePath = resourceNameParts[0];
      } else if (resourceNameParts.length === 5 && resourceNameParts[3] === 'workflow') {
        servicePath = resourceNameParts[1];
        transitionName = resourceNameParts[4];
      }

      if (servicePath) {
        const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);

        if (recordTypeConfig) {
          const { name } = recordTypeConfig;

          if (transitionName) {
            set(perms, [name, 'transition', transitionName], actionGroup);
          } else {
            set(perms, [name, 'data'], actionGroup);

            if (actionGroup.indexOf('C') >= 0) {
              const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

              if (
                serviceType === 'object' ||
                serviceType === 'authority' ||
                serviceType === 'procedure'
              ) {
                canCreateAnyRecord = true;
              }
            }
          }
        }
      }
    });

    perms.createNew = canCreateAnyRecord;
  }

  return Immutable.fromJS(perms);
};

const can = (recordType, permissions, actionCode) => {
  if (!permissions) {
    return false;
  }
  const actions = permissions.getIn([recordType, 'data']);

  return (!!actions && actions.indexOf(actionCode) >= 0);
};

const canTransition = (recordType, permissions, transitionName) => {
  if (!permissions) {
    return false;
  }

  const actions = permissions.getIn([recordType, 'transition', transitionName]);

  // A transition from the UI is always an update (PUT).

  return (!!actions && actions.indexOf('U') >= 0);
};

export const canCreate = (recordType, permissions) => can(recordType, permissions, 'C');
export const canRead = (recordType, permissions) => can(recordType, permissions, 'R');
export const canUpdate = (recordType, permissions) => can(recordType, permissions, 'U');
export const canDelete = (recordType, permissions) => can(recordType, permissions, 'D');
export const canList = (recordType, permissions) => can(recordType, permissions, 'L');

// The UI requires that a record be editable to create a relation with it. (This is not enforced
// in the services layer).
export const canRelate = (recordType, permissions) => can(recordType, permissions, 'U');

export const canSoftDelete = (recordType, permissions) =>
  canTransition(recordType, permissions, 'delete');

export const canCreateAnyRecord = permissions =>
  permissions && !!permissions.get('createNew');
