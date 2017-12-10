import React from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import TermsPage from '../../../../src/components/pages/TermsPage';

chai.should();

describe('TermsPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<TermsPage />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
