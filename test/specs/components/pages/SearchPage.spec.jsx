import React from 'react';
import { render } from 'react-dom';
import chai from 'chai';

import createTestContainer from '../../../helpers/createTestContainer';

import SearchPage from '../../../../src/components/pages/SearchPage';

chai.should();

describe('SearchPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<SearchPage />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
