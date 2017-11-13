import React from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import UsersPage from '../../../../src/components/pages/UsersPage';

chai.should();

describe('UsersPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<UsersPage />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
