/* global document */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import BatchModal from '../../../../src/components/record/BatchModal';
import createTestContainer from '../../../helpers/createTestContainer';

const expect = chai.expect;

chai.should();

describe('BatchModal', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a modal', function test() {
    const batchItem = Immutable.Map({
      csid: '1234',
    });

    render(
      <IntlProvider locale="en">
        <BatchModal
          isOpen
          batchItem={batchItem}
        />
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open').should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render nothing if isOpen is false', function test() {
    const batchItem = Immutable.Map({
      csid: '1234',
    });

    render(
      <IntlProvider locale="en">
        <BatchModal
          isOpen={false}
          batchItem={batchItem}
        />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render nothing if batchItem is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <BatchModal
          isOpen={false}
        />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });
});
