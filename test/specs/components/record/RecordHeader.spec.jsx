import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordHeader from '../../../../src/components/record/RecordHeader';

chai.should();

const config = {
  recordTypes: {
    collectionobject: {
      messages: {
        record: {
          name: {
            id: 'name',
            defaultMessage: 'Object',
          },
        },
      },
      title: () => 'Title',
    },
  },
};

const data = Immutable.Map();

describe('RecordHeader', () => {
  // before(function first() {
  //   // Clear any previous tests from the page.
  //   document.body.innerHTML = '';

  //   // Make sure there's enough on the page to scroll, so that docking can be tested.
  //   document.body.style.paddingBottom = `${window.innerHeight}px`;

  //   // Restore scroll position to top.
  //   window.scrollTo(0, 0);
  // });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordHeader data={data} recordType="collectionobject" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  // it('should dock and undock when scrolled', function test() {
  //   this.timeout(4000);

  //   const dockTop = 0;

  //   render(
  //     <IntlProvider locale="en">
  //       <ConfigProvider config={config}>
  //         <RecordHeader data={data} dockTop={dockTop} recordType="collectionobject" />
  //       </ConfigProvider>
  //     </IntlProvider>, this.container);

  //   const container = this.container.firstElementChild.querySelector('div');
  //   const initialRect = container.getBoundingClientRect();

  //   initialRect.top.should.be.above(0);

  //   window.scrollTo(0, initialRect.top + initialRect.height + 10);

  //   return new Promise((resolve) => {
  //     window.setTimeout(() => {
  //       resolve();
  //     }, 2000);
  //   })
  //     .then(() => {
  //       const scrolledRect = container.getBoundingClientRect();

  //       scrolledRect.top.should.equal(0);

  //       window.scrollTo(0, 0);

  //       return new Promise((resolve) => {
  //         window.setTimeout(() => {
  //           resolve();
  //         }, 1000);
  //       });
  //     })
  //     .then(() => {
  //       const scrolledRect = container.getBoundingClientRect();

  //       scrolledRect.top.should.be.above(0);
  //     });
  // });
});
