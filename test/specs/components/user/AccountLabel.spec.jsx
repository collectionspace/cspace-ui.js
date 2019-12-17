import React from 'react';
import { render } from 'react-dom';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import AccountLabel from '../../../../src/components/user/AccountLabel';

const { expect } = chai;

chai.should();

describe('AccountLabel', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render the user id if account is not supplied', function test() {
    const userId = 'admin@core.collectionspace.org';

    render(<AccountLabel userId={userId} />, this.container);

    this.container.querySelector('span').textContent.should.equal(userId);
  });

  it('should render the screen name if account is supplied', function test() {
    const userId = 'admin@core.collectionspace.org';
    const screenName = 'Administrator';

    const account = Immutable.Map({
      screenName,
    });

    render(<AccountLabel userId={userId} account={account} />, this.container);

    this.container.querySelector('span').textContent.should.equal(screenName);
  });

  it('should render nothing if neither user id nor screen name are present', function test() {
    const userId = null;
    const account = null;

    render(<AccountLabel userId={userId} account={account} />, this.container);

    expect(this.container.querySelector('span')).to.equal(null);
  });

  it('should call findAccount when mounted', function test() {
    let findAccountUserId = null;

    const findAccount = (userIdArg) => {
      findAccountUserId = userIdArg;
    };

    const userId = 'admin@core.collectionspace.org';

    render(<AccountLabel userId={userId} findAccount={findAccount} />, this.container);

    findAccountUserId.should.equal(userId);
  });

  it('should call findAccount when a new user id is supplied via props', function test() {
    let findAccountUserId = null;

    const findAccount = (userIdArg) => {
      findAccountUserId = userIdArg;
    };

    const userId = 'admin@core.collectionspace.org';

    render(<AccountLabel userId={userId} />, this.container);

    const newUserId = 'someone@berkeley.edu';

    render(<AccountLabel userId={newUserId} findAccount={findAccount} />, this.container);

    findAccountUserId.should.equal(newUserId);
  });
});
