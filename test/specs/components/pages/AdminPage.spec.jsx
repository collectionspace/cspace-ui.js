import React from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import AdminPage from '../../../../src/components/pages/AdminPage';

chai.should();

describe('AdminPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<AdminPage />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
