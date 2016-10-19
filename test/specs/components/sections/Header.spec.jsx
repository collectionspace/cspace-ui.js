import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';

import createTestContainer from '../../../helpers/createTestContainer';

import Header from '../../../../src/components/sections/Header';

chai.should();

describe('Header', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a header', function test() {
    render(
      <IntlProvider locale="en">
        <Header username="username" />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('HEADER');
  });
});
