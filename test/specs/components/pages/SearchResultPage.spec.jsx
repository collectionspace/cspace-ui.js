import React from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import SearchResultPage from '../../../../src/components/pages/SearchResultPage';

chai.should();

describe('SearchResultPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<SearchResultPage />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
