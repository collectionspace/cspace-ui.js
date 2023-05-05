/* global window, document */

import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import { createRenderer } from 'react-test-renderer/shallow';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import SearchResultTraverserContainer from '../../../../src/containers/search/SearchResultTraverserContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordTitleBar from '../../../../src/components/record/RecordTitleBar';

const { expect } = chai;

chai.should();

const expectedClassName = 'cspace-ui-TitleBar--common';

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
    loanin: {
      messages: {
        record: {
          name: {
            id: 'name',
            defaultMessage: 'This is really long to force the title bar to have more height',
          },
        },
      },
      title: () => 'The title is also really long so that the title will take up more than one line and the title bar will have to have more height, and now there is some more to make sure',
    },
    person: {
      messages: {
        record: {
          name: {
            id: 'name',
            defaultMessage: 'Person',
          },
        },
      },
      title: () => 'Title',
      vocabularies: {
        local: {
          messages: {
            name: {
              id: 'name',
              defaultMessage: 'Local',
            },
          },
        },
      },
    },
  },
};

const data = Immutable.Map();

describe('RecordTitleBar', () => {
  before(() => {
    // Clear any previous tests from the page.
    document.body.innerHTML = '';

    // Make sure there's enough on the page to scroll, so that docking can be tested.
    document.body.style.paddingBottom = `${window.innerHeight}px`;

    // Restore scroll position to top.
    window.scrollTo(0, 0);
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  after(() => {
    document.body.style.paddingBottom = '0';
  });

  it('should render as a header', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTitleBar data={data} recordType="collectionobject" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('HEADER');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTitleBar data={data} recordType="collectionobject" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render the record title and record type name', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTitleBar data={data} recordType="collectionobject" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('h1').textContent.should.equal('Title');
    this.container.querySelector('h2').textContent.should.equal('Object');
  });

  it('should render the vocabulary name', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTitleBar data={data} recordType="person" vocabulary="local" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('h1').textContent.should.equal('Title');
    this.container.querySelector('h2').textContent.should.equal('Person - Local');
  });

  it('should render nothing if a plugin is not found for the record type', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTitleBar data={data} recordType="foo" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should dock and undock when scrolled', function test() {
    this.timeout(4000);

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTitleBar data={data} recordType="collectionobject" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const container = this.container.firstElementChild.querySelector('div');
    const initialRect = container.getBoundingClientRect();

    initialRect.top.should.be.above(0);

    window.scrollTo(0, initialRect.top + initialRect.height + 10);

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

  it('should call onDock if the height changes while docked', function test() {
    this.timeout(7000);

    let handlerCalled = false;

    const handleDocked = () => {
      handlerCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTitleBar data={data} recordType="collectionobject" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const container = this.container.firstElementChild.querySelector('div');
    const initialRect = container.getBoundingClientRect();

    initialRect.top.should.be.above(0);

    window.scrollTo(0, initialRect.top + initialRect.height + 10);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve();
      }, 2000);
    })
      .then(() => {
        const scrolledRect = container.getBoundingClientRect();

        scrolledRect.top.should.equal(0);

        render(
          <IntlProvider locale="en">
            <ConfigProvider config={config}>
              <RecordTitleBar data={data} recordType="loanin" onDocked={handleDocked} />
            </ConfigProvider>
          </IntlProvider>, this.container,
        );

        return new Promise((resolve) => {
          window.setTimeout(() => {
            resolve();
          }, 1000);
        });
      })
      .then(() => {
        handlerCalled.should.equal(true);

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

  it('should render a search result traverser as the title bar navigation if a search descriptor is supplied', () => {
    const searchName = 'searchName';
    const searchDescriptor = Immutable.Map();
    const csid = '1234';
    const originSearchPageState = { foo: '1' };

    const shallowRenderer = createRenderer();

    const context = {
      config,
    };

    shallowRenderer.render(
      <RecordTitleBar
        data={data}
        recordType="collectionobject"
        csid={csid}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
        originSearchPageState={originSearchPageState}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const { nav } = result.props;

    nav.type.should.equal(SearchResultTraverserContainer);

    nav.props.should.deep.equal({
      config,
      csid,
      searchName,
      searchDescriptor,
      originSearchPageState,
    });
  });

  it('should add and remove window scroll listeners when mounted and unmounted', function test() {
    const saved = {
      addEventListener: window.addEventListener,
      removeEventListener: window.removeEventListener,
    };

    // after react 16, addEventListener is being called multiple times
    // so track whether or not the 'scroll' event was added and removed
    let addEventListenerCalled = false;
    window.addEventListener = (eventName) => {
      if (eventName === 'scroll') {
        addEventListenerCalled = true;
      }
    };

    let removeEventListenerCalled = false;
    window.removeEventListener = (eventName) => {
      if (eventName === 'scroll') {
        removeEventListenerCalled = true;
      }
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTitleBar data={data} recordType="collectionobject" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    ReactDOM.unmountComponentAtNode(this.container);

    addEventListenerCalled.should.equal(true);
    removeEventListenerCalled.should.equal(true);

    window.addEventListener = saved.addEventListener;
    window.removeEventListener = saved.removeEventListener;
  });
});
