import React from 'react';
import { render } from 'react-dom';
import chai from 'chai';

import createTestContainer from '../../../helpers/createTestContainer';

import DashboardPage from '../../../../src/components/pages/DashboardPage';

chai.should();

describe('DashboardPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<DashboardPage />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
