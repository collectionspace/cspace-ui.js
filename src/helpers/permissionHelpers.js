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

    let canAdmin = false;
    let canCreateNew = false;

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
      } else if (resourceNameParts.length === 2) {
        servicePath = resourceName;
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

            const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

            // Track if any object, authority, or procedure record can be created. This is used to
            // determine if the Create New navigation item should be shown.

            if (
              actionGroup.indexOf('C') >= 0 &&
              (
                serviceType === 'object' ||
                serviceType === 'authority' ||
                serviceType === 'procedure'
              )
            ) {
              canCreateNew = true;
            }

            // Track if any vocabulary or security record can be created or updated. This is used
            // to determine if the Admin navigation item should be shown.

            if (
              (actionGroup.indexOf('C') >= 0 || actionGroup.indexOf('U') >= 0) &&
              (
                serviceType === 'security' ||
                name === 'vocabulary'
              )
            ) {
              canAdmin = true;
            }
          }
        }
      }
    });

    perms.canCreateNew = canCreateNew;
    perms.canAdmin = canAdmin;
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

export const canCreateNew = permissions =>
  permissions && !!permissions.get('canCreateNew');

export const canAdmin = permissions =>
  permissions && !!permissions.get('canAdmin');
