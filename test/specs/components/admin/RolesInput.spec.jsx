import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { render } from 'react-dom';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import RolesInput from '../../../../src/components/admin/RolesInput';

chai.use(chaiImmutable);
chai.should();

const roles = Immutable.fromJS([
  { displayName: 'TENANT_ADMINISTRATOR', roleName: 'TENANT_ADMINISTRATOR' },
  { displayName: 'TENANT_READER', roleName: 'TENANT_READER' },
  { displayName: 'ANOTHER_ROLE', roleName: 'ANOTHER_ROLE' },
]);

describe('RolesInput', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a ul', function test() {
    render(
      <RolesInput
        roles={roles}
      />, this.container);

    this.container.firstElementChild.nodeName.should.equal('UL');
  });

  it('should call readRoles when mounted if roles is not supplied', function test() {
    let readRolesCalled = false;

    const readRoles = () => {
      readRolesCalled = true;
    };

    render(
      <RolesInput
        readRoles={readRoles}
      />, this.container);

    readRolesCalled.should.equal(true);
  });

  it('should render a checkbox for each role', function test() {
    render(
      <RolesInput
        roles={roles}
      />, this.container);

    this.container.querySelectorAll('input[type="checkbox"]').length.should.equal(roles.size);
  });

  it('should check checkboxes for roles that appear in value', function test() {
    const value = Immutable.fromJS([
      { roleName: 'TENANT_READER' },
    ]);

    render(
      <RolesInput
        roles={roles}
        value={value}
      />, this.container);

    this.container.querySelector('input[id="TENANT_READER"]').checked
      .should.equal(true);

    this.container.querySelector('input[id="TENANT_ADMINISTRATOR"]').checked
      .should.equal(false);

    this.container.querySelector('input[id="ANOTHER_ROLE"]').checked
      .should.equal(false);
  });

  it('should allow a single (non-list) value', function test() {
    const value = Immutable.Map({ roleName: 'TENANT_ADMINISTRATOR' });

    render(
      <RolesInput
        roles={roles}
        value={value}
      />, this.container);

    this.container.querySelector('input[id="TENANT_ADMINISTRATOR"]').checked
      .should.equal(true);
  });

  it('should call onCommit when a checkbox changes', function test() {
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedValue = valueArg;
    };

    render(
      <RolesInput
        roles={roles}
        onCommit={handleCommit}
      />, this.container);

    const input = this.container.querySelector('input[id="TENANT_READER"]');

    input.checked = 'true';

    Simulate.change(input);

    committedValue.should.equal(Immutable.fromJS([
      { roleName: 'TENANT_READER' },
    ]));
  });

  it('should remove roles that are unchecked', function test() {
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedValue = valueArg;
    };

    const value = Immutable.fromJS([
      { roleName: 'ANOTHER_ROLE' },
    ]);

    render(
      <RolesInput
        roles={roles}
        value={value}
        onCommit={handleCommit}
      />, this.container);

    const input = this.container.querySelector('input[id="ANOTHER_ROLE"]');

    input.checked = false;

    Simulate.change(input);

    committedValue.should.equal(Immutable.fromJS([]));
  });
});
