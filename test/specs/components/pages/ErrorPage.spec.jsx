import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import ErrorPage from '../../../../src/components/pages/ErrorPage';

import {
  ERR_API,
} from '../../../../src/constants/errorCodes';

chai.should();

describe('ErrorPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const error = {
      code: 'ERROR_CODE',
    };

    render(
      <IntlProvider locale="en">
        <ErrorPage error={error} />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a not found message for an http error with status 404', function test() {
    const error = {
      code: ERR_API,
      error: {
        response: {
          status: 404,
        },
      },
    };

    render(
      <IntlProvider locale="en">
        <ErrorPage error={error} />
      </IntlProvider>, this.container);

    this.container.querySelector('p').textContent.should.equal('The record you\'re looking for doesn\'t seem to exist.');
  });

  it('should render a not allowed message for an http error with status 401', function test() {
    const error = {
      code: ERR_API,
      error: {
        response: {
          status: 401,
        },
      },
    };

    render(
      <IntlProvider locale="en">
        <ErrorPage error={error} />
      </IntlProvider>, this.container);

    this.container.querySelector('p').textContent.should.equal('You\'re not allowed to view this type of record.');
  });
});
