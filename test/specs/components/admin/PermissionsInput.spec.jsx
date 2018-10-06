import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import PermissionsInput from '../../../../src/components/admin/PermissionsInput';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';

chai.use(chaiImmutable);
chai.should();

const config = {
  recordTypes: {
    collectionobject: {
      name: 'collectionobject',
      serviceConfig: {
        servicePath: 'collectionobjects',
        serviceType: 'object',
      },
    },
    loanin: {
      name: 'loanin',
      messages: {
        record: {
          collectionName: {
            id: 'record.loanin.collectionName',
            defaultMessage: 'Loan In',
          },
        },
      },
      serviceConfig: {
        servicePath: 'loansin',
        serviceType: 'procedure',
      },
    },
    group: {
      name: 'group',
      messages: {
        record: {
          collectionName: {
            id: 'record.group.collectionName',
            defaultMessage: 'Group',
          },
        },
      },
      serviceConfig: {
        servicePath: 'groups',
        serviceType: 'procedure',
      },
    },
    movement: {
      name: 'movement',
      messages: {
        record: {
          collectionName: {
            id: 'record.movement.collectionName',
            defaultMessage: 'Movement',
          },
        },
      },
      serviceConfig: {
        servicePath: 'movements',
        serviceType: 'procedure',
      },
    },
    location: {
      name: 'location',
      messages: {
        record: {
          collectionName: {
            id: 'record.location.collectionName',
            defaultMessage: 'Location',
          },
        },
      },
      serviceConfig: {
        servicePath: 'locationauthorities',
        serviceType: 'authority',
      },
      sortOrder: 1,
    },
    person: {
      name: 'person',
      messages: {
        record: {
          collectionName: {
            id: 'record.person.collectionName',
            defaultMessage: 'Person',
          },
        },
      },
      serviceConfig: {
        servicePath: 'personauthorities',
        serviceType: 'authority',
        documentName: 'persons',
      },
      sortOrder: 0,
    },
    authrole: {
      name: 'authrole',
      messages: {
        record: {
          collectionName: {
            id: 'record.authrole.collectionName',
            defaultMessage: 'Role',
          },
        },
      },
      serviceConfig: {
        servicePath: 'authorization/roles',
        serviceType: 'security',
      },
    },
    relation: {
      name: 'relation',
      messages: {
        record: {
          collectionName: {
            id: 'record.relation.collectionName',
            defaultMessage: 'Relations',
          },
        },
      },
      serviceConfig: {
        servicePath: 'relations',
        serviceType: 'utility',
      },
    },
  },
};

const resourceNames = Immutable.List([
  'collectionobjects',
  'groups',
  'other',
  'loansin',
  'movements',
  'locationauthorities',
  'personauthorities',
  'authorization/roles',
  'relations',
]);

describe('PermissionsInput', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should call readPerms when mounted if resourceNames is not supplied', function test() {
    let readPermsConfig = null;

    const readPerms = (configArg) => {
      readPermsConfig = configArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            readPerms={readPerms}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    readPermsConfig.should.equal(config);
  });

  it('should render a row of radio buttons for each resource name that is a known record type', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.querySelectorAll('input[name="collectionobject"][type="radio"]').length.should.equal(4);
    this.container.querySelectorAll('input[name="group"][type="radio"]').length.should.equal(4);
    this.container.querySelectorAll('input[name="other"][type="radio"]').length.should.equal(0);
  });

  it('should sort record types by the configured sort order', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    const authoritySection = this.container.querySelectorAll('section')[2];
    const inputs = authoritySection.querySelectorAll('div > label:first-child > input');

    inputs[0].name.should.equal('person');
    inputs[1].name.should.equal('location');
  });

  it('should sort record types by label when there is no sort order configured', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    const procedureSection = this.container.querySelectorAll('section')[1];
    const inputs = procedureSection.querySelectorAll('div > label:first-child > input');

    inputs[0].name.should.equal('group');
    inputs[1].name.should.equal('loanin');
    inputs[2].name.should.equal('movement');
  });

  it('should check radio buttons corresponding to the supplied value', function test() {
    const value = Immutable.fromJS([
      { resourceName: 'collectionobjects', actionGroup: 'RL' },
      { resourceName: 'groups', actionGroup: 'CRUDL' },
    ]);

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
            value={value}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('input[name="collectionobject"][value="RL"]').checked
      .should.equal(true);

    this.container.querySelector('input[name="group"][value="CRUDL"]').checked
      .should.equal(true);
  });

  it('should treat CRUDL on a delete workflow transition as D on the corresponding resource', function test() {
    const value = Immutable.fromJS([
      { resourceName: '/groups/*/workflow/delete', actionGroup: 'CRUDL' },
      { resourceName: 'groups', actionGroup: 'CRUL' },
    ]);

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
            value={value}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('input[name="group"][value="CRUDL"]').checked
      .should.equal(true);
  });

  it('should allow a single (non-list) value', function test() {
    const value = Immutable.Map({ resourceName: 'collectionobjects', actionGroup: 'RL' });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
            value={value}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('input[name="collectionobject"][value="RL"]').checked
      .should.equal(true);
  });

  it('should call onCommit when a radio button changes', function test() {
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedValue = valueArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
            onCommit={handleCommit}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input[name="collectionobject"][value="RL"]');

    input.checked = 'true';

    Simulate.change(input);

    committedValue.should.equal(Immutable.fromJS([
      { resourceName: 'collectionobjects', actionGroup: 'RL' },
      { resourceName: '/collectionobjects/*/workflow/delete', actionGroup: 'RL' },
      { resourceName: 'servicegroups', actionGroup: 'RL' },
    ]));
  });

  it('should convert delete permission to CRUL on a resource and CRUDL on its corresonding delete workflow', function test() {
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedValue = valueArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
            onCommit={handleCommit}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input[name="collectionobject"][value="CRUDL"]');

    input.checked = 'true';

    Simulate.change(input);

    committedValue.should.equal(Immutable.fromJS([
      { resourceName: 'collectionobjects', actionGroup: 'CRUL' },
      { resourceName: '/collectionobjects/*/workflow/delete', actionGroup: 'CRUDL' },
      { resourceName: 'servicegroups', actionGroup: 'RL' },
    ]));
  });

  context('for relations', function relationSuite() {
    it('should set delete permissions on the resource and the delete workflow when delete is selected', function test() {
      let committedValue = null;

      const handleCommit = (pathArg, valueArg) => {
        committedValue = valueArg;
      };

      render(
        <IntlProvider locale="en">
          <ConfigProvider config={config}>
            <PermissionsInput
              resourceNames={resourceNames}
              onCommit={handleCommit}
            />
          </ConfigProvider>
        </IntlProvider>, this.container);

      const input = this.container.querySelector('input[name="relation"][value="CRUDL"]');

      input.checked = 'true';

      Simulate.change(input);

      committedValue.should.equal(Immutable.fromJS([
        { resourceName: 'relations', actionGroup: 'CRUDL' },
        { resourceName: '/relations/*/workflow/delete', actionGroup: 'CRUDL' },
        { resourceName: 'servicegroups', actionGroup: 'RL' },
      ]));
    });

    it('should set delete workflow to read only when delete is not selected', function test() {
      let committedValue = null;

      const handleCommit = (pathArg, valueArg) => {
        committedValue = valueArg;
      };

      render(
        <IntlProvider locale="en">
          <ConfigProvider config={config}>
            <PermissionsInput
              resourceNames={resourceNames}
              onCommit={handleCommit}
            />
          </ConfigProvider>
        </IntlProvider>, this.container);

      const input = this.container.querySelector('input[name="relation"][value="RL"]');

      input.checked = 'true';

      Simulate.change(input);

      committedValue.should.equal(Immutable.fromJS([
        { resourceName: 'relations', actionGroup: 'RL' },
        { resourceName: '/relations/*/workflow/delete', actionGroup: 'RL' },
        { resourceName: 'servicegroups', actionGroup: 'RL' },
      ]));
    });

    it('should set no permissions on the resource and the delete workflow when none is selected', function test() {
      let committedValue = null;

      const handleCommit = (pathArg, valueArg) => {
        committedValue = valueArg;
      };

      render(
        <IntlProvider locale="en">
          <ConfigProvider config={config}>
            <PermissionsInput
              resourceNames={resourceNames}
              onCommit={handleCommit}
            />
          </ConfigProvider>
        </IntlProvider>, this.container);

      const input = this.container.querySelector('input[name="relation"][value=""]');

      input.checked = 'true';

      Simulate.change(input);

      committedValue.should.equal(Immutable.fromJS([
        { resourceName: 'servicegroups', actionGroup: 'RL' },
      ]));
    });
  });

  it('should update permissions of authority items when permissions of authorities change', function test() {
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedValue = valueArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
            onCommit={handleCommit}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input[name="person"][value="CRUL"]');

    input.checked = 'true';

    Simulate.change(input);

    committedValue.should.equal(Immutable.fromJS([
      { resourceName: 'personauthorities', actionGroup: 'CRUL' },
      { resourceName: '/personauthorities/*/workflow/delete', actionGroup: 'RL' },
      { resourceName: 'persons', actionGroup: 'CRUL' },
      { resourceName: 'servicegroups', actionGroup: 'RL' },
    ]));
  });

  it('should update permissions of the permissions resource when permissions of the roles resource change', function test() {
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedValue = valueArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
            onCommit={handleCommit}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input[name="authrole"][value="CRUL"]');

    input.checked = 'true';

    Simulate.change(input);

    committedValue.should.equal(Immutable.fromJS([
      { resourceName: 'authorization/roles', actionGroup: 'CRUL' },
      { resourceName: 'authorization/permissions', actionGroup: 'RL' },
      { resourceName: 'servicegroups', actionGroup: 'RL' },
    ]));
  });

  it('should remove permissions that are set to none', function test() {
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedValue = valueArg;
    };

    const value = Immutable.fromJS([
      { resourceName: 'groups', actionGroup: 'CRUL' },
      { resourceName: '/groups/*/workflow/delete', actionGroup: 'RL' },
    ]);

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
            value={value}
            onCommit={handleCommit}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input[name="group"][value=""]');

    input.checked = 'true';

    Simulate.change(input);

    committedValue.should.equal(Immutable.fromJS([
      { resourceName: 'servicegroups', actionGroup: 'RL' },
    ]));
  });

  it('should call onCommit when a header button is clicked', function test() {
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedValue = valueArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <PermissionsInput
            resourceNames={resourceNames}
            onCommit={handleCommit}
          />
        </ConfigProvider>
      </IntlProvider>, this.container);

    const button = this.container.querySelector('button[data-servicetype="procedure"][data-actiongroup="RL"]');

    Simulate.click(button);

    committedValue
      .sortBy(perm => perm.get('resourceName'))
      .should.equal(Immutable.fromJS([
        { resourceName: '/groups/*/workflow/delete', actionGroup: 'RL' },
        { resourceName: '/loansin/*/workflow/delete', actionGroup: 'RL' },
        { resourceName: '/movements/*/workflow/delete', actionGroup: 'RL' },
        { resourceName: 'groups', actionGroup: 'RL' },
        { resourceName: 'loansin', actionGroup: 'RL' },
        { resourceName: 'movements', actionGroup: 'RL' },
        { resourceName: 'servicegroups', actionGroup: 'RL' },
      ]));
  });
});
