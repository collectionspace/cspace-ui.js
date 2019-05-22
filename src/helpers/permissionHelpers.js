import Immutable from 'immutable';
import get from 'lodash/get';
import set from 'lodash/set';
import { getRecordTypeConfigByServicePath } from './configHelpers';

export const mergeActionGroup = (perms, path, actionGroup) => {
  const existingActionGroup = get(perms, path);

  let mergedActionGroup;

  if (existingActionGroup) {
    const existingActionCodes = new Set(existingActionGroup.split(''));
    const actionCodes = new Set(actionGroup.split(''));

    mergedActionGroup = ['C', 'R', 'U', 'D', 'L'].reduce((merged, actionCode) => (
      (existingActionCodes.has(actionCode) || actionCodes.has(actionCode))
        ? `${merged}${actionCode}`
        : merged
    ), '');
  } else {
    mergedActionGroup = actionGroup;
  }

  set(perms, path, mergedActionGroup);

  return mergedActionGroup;
};

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
            mergeActionGroup(perms, [name, 'transition', transitionName], actionGroup);
          } else {
            const mergedActionGroup = mergeActionGroup(perms, [name, 'data'], actionGroup);
            const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

            // Track if any object, authority, or procedure record can be created. This is used to
            // determine if the Create New navigation item should be shown.

            if (
              mergedActionGroup.indexOf('C') >= 0 &&
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
              mergedActionGroup.indexOf('L') >= 0 &&
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

// In order to create a relation, the UI requires that permissions of some level (by default,
// update) exist on the member records. (This is not enforced in the services layer.)
export const canRelate = (recordType, permissions, config) => {
  if (!canCreate('relation', permissions)) {
    return false;
  }

  const relationMemberPerm = (config && config.relationMemberPerm) || 'U';

  return can(recordType, permissions, relationMemberPerm);
};

export const canUnrelate = (recordType, permissions, config) => {
  if (!canDelete('relation', permissions)) {
    return false;
  }

  const relationMemberPerm = (config && config.relationMemberPerm) || 'U';

  return can(recordType, permissions, relationMemberPerm);
};

export const canSoftDelete = (recordType, permissions) =>
  canTransition(recordType, permissions, 'delete');

export const canCreateNew = permissions =>
  permissions && !!permissions.get('canCreateNew');

export const canAdmin = permissions =>
  permissions && !!permissions.get('canAdmin');

const disallow = (recordType, permissions, actionCode) => {
  if (can(recordType, permissions, actionCode)) {
    const dataPerms = permissions.getIn([recordType, 'data']);

    return permissions.setIn([recordType, 'data'], dataPerms.replace(actionCode, ''));
  }

  return permissions;
};

const disallowTransition = (recordType, permissions, transitionName) => {
  if (canTransition(recordType, permissions, transitionName)) {
    const transitionPerms = permissions.getIn([recordType, 'transition', transitionName]);

    return permissions.setIn([recordType, 'transition', transitionName], transitionPerms.replace('U', ''));
  }

  return permissions;
};

export const disallowCreate = (recordType, permissions) => disallow(recordType, permissions, 'C');
export const disallowUpdate = (recordType, permissions) => disallow(recordType, permissions, 'U');
export const disallowDelete = (recordType, permissions) => disallow(recordType, permissions, 'D');

export const disallowSoftDelete = (recordType, permissions) => disallowTransition(recordType, permissions, 'delete');
