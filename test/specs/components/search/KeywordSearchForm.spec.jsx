import React from 'react';
import { render } from 'react-dom';
import createTestContainer from '../../../helpers/createTestContainer';
import KeywordSearchForm from '../../../../src/components/search/KeywordSearchForm';

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

const config = {
  recordTypes: {},
};

describe('KeywordSearchForm', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a fieldset', function test() {
    render(<KeywordSearchForm config={config} intl={intl} />, this.container);

    this.container.firstElementChild.nodeName.should.equal('FIELDSET');
  });

  it('should render a KeywordSearchInput', function test() {
    render(<KeywordSearchForm config={config} intl={intl} />, this.container);

    this.container.querySelector('.cspace-input-KeywordSearchInput--common').should.not.equal(null);
  });
});
