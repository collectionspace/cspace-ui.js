/* eslint-disable no-unused-expressions */

import React from 'react';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import TitleBar from '../../../../src/components/sections/TitleBar';

const { expect } = chai;

chai.should();

describe('TitleBar', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a header', function test() {
    render(<TitleBar title="Title" />, this.container);

    this.container.firstElementChild.nodeName.should.equal('HEADER');
  });

  it('should render the title as a programmatically focusable level 1 heading', function test() {
    render(<TitleBar title="Title" />, this.container);

    const heading = this.container.querySelector('h1');

    heading.textContent.should.equal('Title');
    heading.getAttribute('tabindex').should.equal('-1');
  });

  it('should not be marked busy by default', function test() {
    render(<TitleBar title="Title" />, this.container);

    expect(this.container.querySelector('header').getAttribute('aria-busy')).to.equal(null);
  });

  it('should be marked busy when busy is true', function test() {
    render(<TitleBar title="Title" busy />, this.container);

    this.container.querySelector('header').getAttribute('aria-busy').should.equal('true');
  });
});
