import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import SearchSaveButton from '../../../../src/components/search/SearchSaveButton';

chai.should();

describe('SearchSaveButton', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <SearchSaveButton />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should call onClick when clicked', function test() {
    let clicked = false;

    const handleClick = () => {
      clicked = true;
    };

    render(
      <IntlProvider locale="en">
        <SearchSaveButton onClick={handleClick} />
      </IntlProvider>, this.container,
    );

    Simulate.click(this.container.firstElementChild);

    clicked.should.equal(true);
  });

  it('should be disabled when disabled is true', function test() {
    render(
      <IntlProvider locale="en">
        <SearchSaveButton disabled />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.disabled.should.equal(true);
  });
});
