import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import NavLink from '../../../../src/components/navigation/NavLink';

chai.should();

const expectedClassName = 'cspace-ui-NavLink--normal cspace-ui-NavLink--common';

describe('NavLink', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as an a', function test() {
    render(
      <Router>
        <NavLink to="" />
      </Router>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('A');
  });

  it('should render with correct class', function test() {
    render(
      <Router>
        <NavLink to="/foo" />
      </Router>, this.container,
    );

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });
});
