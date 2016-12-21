import React from 'react';
import { render } from 'react-dom';
import createTestContainer from '../../../helpers/createTestContainer';
import KeywordSearch from '../../../../src/components/search/KeywordSearch';

chai.should();

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: () => null,
  formatHTMLMessage: () => null,
  now: () => null,
};

describe('KeywordSearch', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a fieldset', function test() {
    render(<KeywordSearch intl={intl} />, this.container);

    this.container.firstElementChild.nodeName.should.equal('FIELDSET');
  });

  it('should render a KeywordSearchInput', function test() {
    render(<KeywordSearch intl={intl} />, this.container);

    this.container.querySelector('.cspace-input-KeywordSearchInput--common').should.not.equal(null);
  });
});
