import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter as Router } from 'react-router';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import Logo from '../../../../src/components/sections/Logo';

chai.should();

const renderLogo = (container, config, messages) => {
  render(
    <IntlProvider locale="en" messages={messages}>
      <Router>
        <Logo config={config} />
      </Router>
    </IntlProvider>, container,
  );
};

describe('Logo', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render the CollectionSpace logo, linked to the root path', function test() {
    renderLogo(this.container, {});

    const image = this.container.querySelector('a[href="/"] > img');

    image.should.not.equal(null);
    image.alt.should.equal('CollectionSpace');
  });

  it('should not render an institutional logo if none is configured', function test() {
    renderLogo(this.container, {});

    this.container.querySelectorAll('img').length.should.equal(1);
  });

  it('should render the institutional logo after the CollectionSpace logo, with alt text from the customized message', function test() {
    renderLogo(this.container, { logo: 'institution.png' }, {
      'logo.institutionTitle': 'My Museum',
    });

    const images = this.container.querySelectorAll('img');

    images.length.should.equal(2);
    images[0].alt.should.equal('CollectionSpace');
    images[1].getAttribute('src').should.equal('institution.png');
    images[1].alt.should.equal('My Museum');
  });

  it('should use the default alt text for the institutional logo if the message is not customized', function test() {
    renderLogo(this.container, { logo: 'institution.png' });

    this.container.querySelectorAll('img')[1].alt.should.equal('Institution logo');
  });

  it('should not link the institutional logo if no link is configured', function test() {
    renderLogo(this.container, { logo: 'institution.png' });

    this.container.querySelectorAll('img')[1].parentNode.nodeName.should.equal('DIV');
  });

  it('should link the institutional logo if a link is configured', function test() {
    renderLogo(this.container, { logo: 'institution.png', logoLink: 'https://example.org/' }, {
      'logo.institutionTitle': 'My Museum',
    });

    const link = this.container.querySelectorAll('img')[1].parentNode;

    link.nodeName.should.equal('A');
    link.getAttribute('href').should.equal('https://example.org/');
  });
});
