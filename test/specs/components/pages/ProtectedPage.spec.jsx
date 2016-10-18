/* eslint-disable no-unused-expressions */

import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import chai from 'chai';

import createTestContainer from '../../../helpers/createTestContainer';

import ProtectedPage from '../../../../src/components/pages/ProtectedPage';

chai.should();

describe('ProtectedPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <ProtectedPage username="user@collectionspace.org" />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the content', function test() {
    render(
      <IntlProvider locale="en">
        <ProtectedPage username="user@collectionspace.org">
          <div id="content">This is some content</div>
        </ProtectedPage>
      </IntlProvider>, this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });

  it('should render a header containing a user menu', function test() {
    render(
      <IntlProvider locale="en">
        <ProtectedPage username="user@collectionspace.org">
          <div id="content">This is some content</div>
        </ProtectedPage>
      </IntlProvider>, this.container);

    this.container.querySelector('header .cspace-ui-UserMenu--common').should.not.be.null;
  });
});
