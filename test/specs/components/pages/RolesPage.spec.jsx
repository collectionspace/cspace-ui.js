import React from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import RolesPage from '../../../../src/components/pages/RolesPage';

chai.should();

describe('RolesPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<RolesPage />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
