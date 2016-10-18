import React from 'react';
import { render } from 'react-dom';
import chai from 'chai';

import createTestContainer from '../../../helpers/createTestContainer';

import NavLink from '../../../../src/components/navigation/NavLink';

chai.should();

const expectedClassName = 'cspace-ui-NavLink--normal cspace-ui-NavLink--common';

describe('NavLink', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as an a', function test() {
    render(<NavLink to="" />, this.container);

    this.container.firstElementChild.nodeName.should.equal('A');
  });

  it('should render with correct class', function test() {
    render(<NavLink to="" />, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });
});
