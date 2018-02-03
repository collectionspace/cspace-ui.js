import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { render } from 'react-dom';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import RolesInput from '../../../../src/components/admin/RolesInput';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

const roles = Immutable.fromJS([
  { displayName: 'TENANT_ADMINISTRATOR', roleName: 'TENANT_ADMINISTRATOR', '@csid': '1111' },
  { displayName: 'TENANT_READER', roleName: 'TENANT_READER', '@csid': '2222' },
  { displayName: 'ANOTHER_ROLE', roleName: 'ANOTHER_ROLE', '@csid': '3333' },
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
      { roleId: '2222' },
    ]);

    render(
      <RolesInput
        roles={roles}
        value={value}
      />, this.container);

    this.container.querySelector('input[id="2222"]').checked
      .should.equal(true);

    this.container.querySelector('input[id="1111"]').checked
      .should.equal(false);

    this.container.querySelector('input[id="3333"]').checked
      .should.equal(false);
  });

  it('should allow a single (non-list) value', function test() {
    const value = Immutable.Map({ roleId: '1111' });

    render(
      <RolesInput
        roles={roles}
        value={value}
      />, this.container);

    this.container.querySelector('input[id="1111"]').checked
      .should.equal(true);
  });

  it('should not show roles that do not appear in the value if readOnly is true', function test() {
    const value = Immutable.fromJS([
      { roleId: '2222' },
    ]);

    render(
      <RolesInput
        readOnly
        roles={roles}
        value={value}
      />, this.container);

    this.container.querySelector('input[id="2222"]').checked
      .should.equal(true);

    expect(this.container.querySelector('input[id="1111"]')).to.equal(null);
    expect(this.container.querySelector('input[id="3333"]')).to.equal(null);
  });

  it('should render nothing if readOnly is true and no roles appear in the value', function test() {
    const value = Immutable.List();

    render(
      <RolesInput
        readOnly
        roles={roles}
        value={value}
      />, this.container);

    expect(this.container.firstElementChild).to.equal(null);
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

    const input = this.container.querySelector('input[id="2222"]');

    input.checked = 'true';

    Simulate.change(input);

    committedValue.should.equal(Immutable.fromJS([
      { roleId: '2222' },
    ]));
  });

  it('should remove roles that are unchecked from the committed value', function test() {
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedValue = valueArg;
    };

    const value = Immutable.fromJS([
      { roleId: '3333' },
    ]);

    render(
      <RolesInput
        roles={roles}
        value={value}
        onCommit={handleCommit}
      />, this.container);

    const input = this.container.querySelector('input[id="3333"]');

    input.checked = false;

    Simulate.change(input);

    committedValue.should.equal(Immutable.fromJS([]));
  });
});
