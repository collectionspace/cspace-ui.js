import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  canCreate,
  canRead,
  canUpdate,
  canDelete,
  canList,
  canRelate,
  canSoftDelete,
  getPermissions,
  canCreateNew,
  canAdmin,
  canTool,
  disallowCreate,
  disallowDelete,
  disallowSoftDelete,
  mergeActionGroup,
} from '../../../src/helpers/permissionHelpers';

chai.use(chaiImmutable);
chai.should();

describe('permissionHelpers', function moduleSuite() {
  describe('mergeActionGroup', function suite() {
    it('should merge the given action group into existing permissions', function test() {
      const perms = {
        group: {
          data: 'CL',
        },
      };

      mergeActionGroup(perms, ['group', 'data'], 'RD').should.equal('CRDL');

      perms.should.deep.equal({
        group: {
          data: 'CRDL',
        },
      });
    });

    it('should set the permissions if there are no existing permissions', function test() {
      const perms = {};

      mergeActionGroup(perms, ['group', 'data'], 'CR').should.equal('CR');

      perms.should.deep.equal({
        group: {
          data: 'CR',
        },
      });
    });
  });

  describe('getPermissions', function suite() {
    const config = {
      recordTypes: {
        collectionobject: {
          name: 'collectionobject',
          serviceConfig: {
            servicePath: 'collectionobjects',
            serviceType: 'object',
          },
        },
        group: {
          name: 'group',
          serviceConfig: {
            servicePath: 'groups',
            serviceType: 'procedure',
          },
        },
        authrole: {
          name: 'authrole',
          serviceConfig: {
            servicePath: 'authorization/role',
            serviceType: 'security',
          },
        },
        vocabulary: {
          name: 'vocabulary',
          serviceConfig: {
            servicePath: 'vocabularies',
            serviceType: 'utility',
          },
        },
        report: {
          name: 'report',
          serviceConfig: {
            servicePath: 'reports',
            serviceType: 'utility',
          },
        },
        batch: {
          name: 'batch',
          serviceConfig: {
            servicePath: 'batch',
            serviceType: 'utility',
          },
        },
      },
    };

    it('should retrieve data permissions for configured record types', function test() {
      const data = {
        'ns2:account_permission': {
          permission: [
            {
              resourceName: 'collectionobjects',
              actionGroup: 'RL',
            },
            {
              resourceName: 'groups',
              actionGroup: 'CRUL',
            },
          ],
        },
      };

      getPermissions(config, data).should.equal(Immutable.fromJS({
        collectionobject: {
          data: 'RL',
        },
        group: {
          data: 'CRUL',
        },
        canCreateNew: true,
        canAdmin: false,
        canTool: false,
      }));
    });

    it('should set canCreateNew to false if no object/procedure/authority can be created', function test() {
      const data = {
        'ns2:account_permission': {
          permission: [
            {
              resourceName: 'collectionobjects',
              actionGroup: 'RL',
            },
            {
              resourceName: 'groups',
              actionGroup: 'RL',
            },
          ],
        },
      };

      getPermissions(config, data).should.equal(Immutable.fromJS({
        collectionobject: {
          data: 'RL',
        },
        group: {
          data: 'RL',
        },
        canCreateNew: false,
        canAdmin: false,
        canTool: false,
      }));
    });

    it('should set canAdmin to true if security records can be listed', function test() {
      const data = {
        'ns2:account_permission': {
          permission: [
            {
              resourceName: 'authorization/role',
              actionGroup: 'RL',
            },
          ],
        },
      };

      getPermissions(config, data).should.equal(Immutable.fromJS({
        authrole: {
          data: 'RL',
        },
        canCreateNew: false,
        canAdmin: true,
        canTool: false,
      }));
    });

    it('should set canTool to true if vocabulary records can be listed', function test() {
      const data = {
        'ns2:account_permission': {
          permission: [
            {
              resourceName: 'vocabularies',
              actionGroup: 'RL',
            },
          ],
        },
      };

      getPermissions(config, data).should.equal(Immutable.fromJS({
        vocabulary: {
          data: 'RL',
        },
        canCreateNew: false,
        canAdmin: false,
        canTool: true,
      }));
    });

    it('should set canTool to true if report records can be listed', function test() {
      const data = {
        'ns2:account_permission': {
          permission: [
            {
              resourceName: 'reports',
              actionGroup: 'CRUL',
            },
          ],
        },
      };

      getPermissions(config, data).should.equal(Immutable.fromJS({
        report: {
          data: 'CRUL',
        },
        canCreateNew: false,
        canAdmin: false,
        canTool: true,
      }));
    });

    it('should set canTool to true if batch records can be listed', function test() {
      const data = {
        'ns2:account_permission': {
          permission: [
            {
              resourceName: 'batch',
              actionGroup: 'CRUDL',
            },
          ],
        },
      };

      getPermissions(config, data).should.equal(Immutable.fromJS({
        batch: {
          data: 'CRUDL',
        },
        canCreateNew: false,
        canAdmin: false,
        canTool: true,
      }));
    });

    it('should retrieve permissions when there is a single (non-list) permission', function test() {
      const data = {
        'ns2:account_permission': {
          permission: {
            resourceName: 'collectionobjects',
            actionGroup: 'RL',
          },
        },
      };

      getPermissions(config, data).should.equal(Immutable.fromJS({
        collectionobject: {
          data: 'RL',
        },
        canCreateNew: false,
        canAdmin: false,
        canTool: false,
      }));
    });

    it('should return empty permissions if there are no permissions in the data', function test() {
      const data = {
        'ns2:account_permission': {},
      };

      getPermissions(config, data).should.equal(Immutable.Map());
    });

    it('should retrieve transition permissions for configured record types', function test() {
      const data = {
        'ns2:account_permission': {
          permission: [
            {
              resourceName: '/collectionobjects/*/workflow/delete',
              actionGroup: 'DL',
            },
            {
              resourceName: '/groups/*/workflow/delete',
              actionGroup: 'CU',
            },
          ],
        },
      };

      getPermissions(config, data).should.equal(Immutable.fromJS({
        collectionobject: {
          transition: {
            delete: 'DL',
          },
        },
        group: {
          transition: {
            delete: 'CU',
          },
        },
        canCreateNew: false,
        canAdmin: false,
        canTool: false,
      }));
    });

    it('should ignore unrecognized resource names', function test() {
      const data = {
        'ns2:account_permission': {
          permission: [
            {
              resourceName: 'something',
              actionGroup: 'CRUDL',
            },
            {
              resourceName: '/collectionobjects/*/something/delete',
              actionGroup: 'CRUDL',
            },
          ],
        },
      };

      getPermissions(config, data).should.equal(Immutable.fromJS({
        canCreateNew: false,
        canAdmin: false,
        canTool: false,
      }));
    });
  });

  describe('canCreate', function suite() {
    it('should return true if create permission exists for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRUDL',
        },
      });

      canCreate('loanin', perms).should.equal(true);
    });

    it('should return false if create permission does not exist for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'RUDL',
        },
      });

      canCreate('loanin', perms).should.equal(false);
    });

    it('should return false if permissions do not exist', function test() {
      canCreate('loanin').should.equal(false);
    });

    it('should return false if data permissions do not exist for the record type', function test() {
      const perms = Immutable.Map();

      canCreate('loanin', perms).should.equal(false);
    });
  });

  describe('canRead', function suite() {
    it('should return true if read permission exists for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRUDL',
        },
      });

      canRead('loanin', perms).should.equal(true);
    });

    it('should return false if read permission does not exist for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CUDL',
        },
      });

      canRead('loanin', perms).should.equal(false);
    });

    it('should return false if permissions do not exist', function test() {
      canRead('loanin').should.equal(false);
    });

    it('should return false if data permissions do not exist for the record type', function test() {
      const perms = Immutable.Map();

      canRead('loanin', perms).should.equal(false);
    });
  });

  describe('canUpdate', function suite() {
    it('should return true if update permission exists for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRUDL',
        },
      });

      canUpdate('loanin', perms).should.equal(true);
    });

    it('should return false if update permission does not exist for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRDL',
        },
      });

      canUpdate('loanin', perms).should.equal(false);
    });

    it('should return false if permissions do not exist', function test() {
      canUpdate('loanin').should.equal(false);
    });

    it('should return false if data permissions do not exist for the record type', function test() {
      const perms = Immutable.Map();

      canUpdate('loanin', perms).should.equal(false);
    });
  });

  describe('canDelete', function suite() {
    it('should return true if delete permission exists for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRUDL',
        },
      });

      canDelete('loanin', perms).should.equal(true);
    });

    it('should return false if delete permission does not exist for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRUL',
        },
      });

      canDelete('loanin', perms).should.equal(false);
    });

    it('should return false if permissions do not exist', function test() {
      canDelete('loanin').should.equal(false);
    });

    it('should return false if data permissions do not exist for the record type', function test() {
      const perms = Immutable.Map();

      canDelete('loanin', perms).should.equal(false);
    });
  });

  describe('canList', function suite() {
    it('should return true if list permission exists for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRUDL',
        },
      });

      canList('loanin', perms).should.equal(true);
    });

    it('should return false if list permission does not exist for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRUD',
        },
      });

      canList('loanin', perms).should.equal(false);
    });

    it('should return false if permissions do not exist', function test() {
      canList('loanin').should.equal(false);
    });

    it('should return false if data permissions do not exist for the record type', function test() {
      const perms = Immutable.Map();

      canList('loanin', perms).should.equal(false);
    });
  });

  describe('canRelate', function suite() {
    it('should return false create permissions do not exist for the relation record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRUDL',
        },
        relation: 'RL',
      });

      canRelate('loanin', perms).should.equal(false);
    });

    it('should return true if update permission exists for the member record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRUDL',
        },
        relation: {
          data: 'CRUDL',
        },
      });

      canRelate('loanin', perms).should.equal(true);
    });

    it('should return false if update permission does not exist for the member record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRDL',
        },
        relation: {
          data: 'CRUDL',
        },
      });

      canRelate('loanin', perms).should.equal(false);
    });

    it('should return false if permissions do not exist', function test() {
      canRelate('loanin').should.equal(false);
    });

    it('should return false if data permissions do not exist for the member record type', function test() {
      const perms = Immutable.Map();

      canRelate('loanin', perms).should.equal(false);
    });
  });

  describe('canSoftDelete', function suite() {
    it('should return true if update permission for the delete transition exists for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          transition: {
            delete: 'CRUDL',
          },
        },
      });

      canSoftDelete('loanin', perms).should.equal(true);
    });

    it('should return false if update permission for the delete transition does not exist for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          transition: {
            delete: 'CRDL',
          },
        },
      });

      canSoftDelete('loanin', perms).should.equal(false);
    });

    it('should return false if permissions do not exist', function test() {
      canSoftDelete('loanin').should.equal(false);
    });

    it('should return false if transition permissions do not exist for the record type', function test() {
      const perms = Immutable.Map();

      canSoftDelete('loanin', perms).should.equal(false);
    });
  });

  describe('canCreateNew', function suite() {
    it('should return true if canCreateNew is true in the permissions', function test() {
      const perms = Immutable.fromJS({
        canCreateNew: true,
      });

      canCreateNew(perms).should.equal(true);
    });
  });

  describe('canAdmin', function suite() {
    it('should return true if canAdmin is true in the permissions', function test() {
      const perms = Immutable.fromJS({
        canAdmin: true,
      });

      canAdmin(perms).should.equal(true);
    });
  });

  describe('canTool', function suite() {
    it('should return true if canTool is true in the permissions', function test() {
      const perms = Immutable.fromJS({
        canTool: true,
      });

      canTool(perms).should.equal(true);
    });
  });

  describe('disallowCreate', function suite() {
    it('should remove create permission on the specified record type', function test() {
      const perms = Immutable.fromJS({
        group: {
          data: 'CRUDL',
        },
        person: {
          data: 'CRUDL',
        },
      });

      const updatedPerms = disallowCreate('group', perms);

      updatedPerms.should.equal(Immutable.fromJS({
        group: {
          data: 'RUDL',
        },
        person: {
          data: 'CRUDL',
        },
      }));

      canCreate('group', updatedPerms).should.equal(false);
    });

    it('should have no effect if create permission does not exist on the specified record type', function test() {
      const perms = Immutable.fromJS({
        person: {
          data: 'CRUDL',
        },
      });

      const updatedPerms = disallowCreate('group', perms);

      updatedPerms.should.equal(perms);
    });
  });

  describe('disallowDelete', function suite() {
    it('should remove delete permission on the specified record type', function test() {
      const perms = Immutable.fromJS({
        group: {
          data: 'CRUDL',
        },
        person: {
          data: 'CRUDL',
        },
      });

      const updatedPerms = disallowDelete('group', perms);

      updatedPerms.should.equal(Immutable.fromJS({
        group: {
          data: 'CRUL',
        },
        person: {
          data: 'CRUDL',
        },
      }));

      canDelete('group', updatedPerms).should.equal(false);
    });

    it('should have no effect if delete permission does not exist on the specified record type', function test() {
      const perms = Immutable.fromJS({
        person: {
          data: 'CRUDL',
        },
      });

      const updatedPerms = disallowDelete('group', perms);

      updatedPerms.should.equal(perms);
    });
  });

  describe('disallowSoftDelete', function suite() {
    it('should remove permission to soft delete the specified record type', function test() {
      const perms = Immutable.fromJS({
        group: {
          data: 'CRUDL',
          transition: {
            delete: 'CRUDL',
          },
        },
        person: {
          data: 'CRUDL',
        },
      });

      const updatedPerms = disallowSoftDelete('group', perms);

      updatedPerms.should.equal(Immutable.fromJS({
        group: {
          data: 'CRUDL',
          transition: {
            delete: 'CRDL',
          },
        },
        person: {
          data: 'CRUDL',
        },
      }));

      canSoftDelete('group', updatedPerms).should.equal(false);
    });

    it('should have no effect if soft delete permission does not exist on the specified record type', function test() {
      const perms = Immutable.fromJS({
        person: {
          data: 'CRUDL',
        },
      });

      const updatedPerms = disallowSoftDelete('group', perms);

      updatedPerms.should.equal(perms);
    });
  });
});
