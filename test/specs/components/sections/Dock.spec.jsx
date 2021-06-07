/* global window, document */

import React from 'react';
import { render } from 'react-dom';
import createTestContainer from '../../../helpers/createTestContainer';
import Dock from '../../../../src/components/sections/Dock';

chai.should();

describe('Dock', () => {
  before(() => {
    // Clear any previous tests from the page.
    document.body.innerHTML = '';

    // Make sure there's enough on the page to scroll, so that docking can be tested.
    document.body.style.paddingBottom = `${window.innerHeight * 2}px`;

    // Restore scroll position to top.
    window.scrollTo(0, 0);
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a header', function test() {
    render(
      <Dock>
        <div>Hello world</div>
      </Dock>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('HEADER');
  });

  it('should dock and undock when scrolled', function test() {
    this.timeout(4000);

    const dockTop = 0;

    render(
      <Dock dockTop={dockTop}>
        <div>Hello world</div>
      </Dock>, this.container,
    );

    const container = this.container.firstElementChild.querySelector('div');
    const initialRect = container.getBoundingClientRect();

    initialRect.top.should.be.above(0);

    window.scrollTo(0, initialRect.top + initialRect.height + 50);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve();
      }, 2000);
    })
      .then(() => {
        const scrolledRect = container.getBoundingClientRect();

        scrolledRect.top.should.equal(0);

        window.scrollTo(0, 0);

        return new Promise((resolve) => {
          window.setTimeout(() => {
            resolve();
          }, 1000);
        });
      })
      .then(() => {
        const scrolledRect = container.getBoundingClientRect();

        scrolledRect.top.should.be.above(0);
      });
  });
});
