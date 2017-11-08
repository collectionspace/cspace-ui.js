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
} from '../../../src/helpers/permissionHelpers';

chai.use(chaiImmutable);
chai.should();

describe('permissionHelpers', function moduleSuite() {
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
      }));
    });

    it('should set canAdmin to true if vocabularies or security records can be updated or created', function test() {
      const data = {
        'ns2:account_permission': {
          permission: [
            {
              resourceName: 'authorization/role',
              actionGroup: 'CRUDL',
            },
          ],
        },
      };

      getPermissions(config, data).should.equal(Immutable.fromJS({
        authrole: {
          data: 'CRUDL',
        },
        canCreateNew: false,
        canAdmin: true,
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
    it('should return true if update permission exists for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRUDL',
        },
      });

      canRelate('loanin', perms).should.equal(true);
    });

    it('should return false if update permission does not exist for the record type', function test() {
      const perms = Immutable.fromJS({
        loanin: {
          data: 'CRDL',
        },
      });

      canRelate('loanin', perms).should.equal(false);
    });

    it('should return false if permissions do not exist', function test() {
      canRelate('loanin').should.equal(false);
    });

    it('should return false if data permissions do not exist for the record type', function test() {
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
});
