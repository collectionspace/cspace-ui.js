import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import URLInput from '../../../../src/components/record/URLInput';

chai.should();

describe('URLInput', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a LineInput with a link and formatted link content', function test() {
    const url = 'http://collectionspace.org/';

    render(
      <IntlProvider locale="en">
        <URLInput value={url} />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-input-LineInput--normal').should.not.equal(null);
    this.container.querySelector(`a[href="${url}"]`).textContent.should.equal('Open');
  });
});
