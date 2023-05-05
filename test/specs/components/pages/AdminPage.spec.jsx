import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import Immutable from 'immutable';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import AdminPage from '../../../../src/components/pages/AdminPage';

const { expect } = chai;

chai.should();

describe('AdminPage', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const perms = Immutable.fromJS({
      account: {
        data: 'CRUDL',
      },
      authrole: {
        data: 'CRUDL',
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <AdminPage match={{ url: '/admin' }} perms={perms} />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render nothing if no tabs are permitted', function test() {
    const perms = Immutable.Map({
      group: {
        data: 'CRUDL',
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <AdminPage match={{ url: '/admin' }} perms={perms} />
        </Router>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should not render tabs for which list permissions do not exist', function test() {
    const perms = Immutable.fromJS({
      account: {
        data: 'CRUDL',
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <AdminPage match={{ url: '/admin' }} perms={perms} />
        </Router>
      </IntlProvider>, this.container,
    );

    const links = this.container.querySelectorAll('a');

    links.length.should.equal(1);

    links[0].textContent.should.equal('Users');
  });
});
