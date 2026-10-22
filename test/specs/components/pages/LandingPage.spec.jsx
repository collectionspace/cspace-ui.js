import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter as Router } from 'react-router';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import LandingPage from '../../../../src/components/pages/LandingPage';

chai.should();

describe('LandingPage', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <Router>
          <LandingPage />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the welcome heading', function test() {
    render(
      <IntlProvider locale="en">
        <Router>
          <LandingPage />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('h1').textContent.should.equal('Welcome to CollectionSpace');
  });

  it('should render the tagline below the heading', function test() {
    render(
      <IntlProvider locale="en">
        <Router>
          <LandingPage />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-Subtitle--common').textContent.should
      .equal('Your collection management solution for cultural heritage organizations, museums and more.');
  });
});
