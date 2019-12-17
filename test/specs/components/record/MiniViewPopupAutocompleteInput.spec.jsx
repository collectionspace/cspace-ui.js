/* global window */

import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { MemoryRouter as Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import { BaseMiniViewPopupAutocompleteInput } from '../../../../src/components/record/MiniViewPopupAutocompleteInput';

import {
  configureCSpace,
} from '../../../../src/actions/cspace';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  authority: Immutable.Map(),
  partialTermSearch: Immutable.Map().setIn(['sam', 'person', 'local', 'items'], [
    {
      refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(SamuelSmith)\'Samuel Smith\'',
      uri: '/personauthorities/fbe3019a-f8d4-4f84-a901/items/7fc7c8ca-8ca0-4a29-8e2d',
    },
    {
      refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(SamanthaSmith)\'Samantha Smith\'',
      uri: '/personauthorities/fbe3019a-f8d4-4f84-a902/items/7fc7c8ca-8ca0-4a29-8e2f',
    },
  ]),
  record: Immutable.Map(),
  user: Immutable.fromJS({
    perms: {
      person: {
        data: 'CRUDL',
      },
    },
  }),
});

const config = {
  recordTypes: {
    person: {
      fields: {},
      forms: {
        mini: {
          template: <div>Mini template</div>,
        },
      },
      name: 'person',
      serviceConfig: {
        servicePath: 'personauthorities',
      },
      title: () => 'The computed title',
      vocabularies: {
        local: {
          messages: {
            collectionName: {
              id: 'vocab.person.local.collectionName',
              defaultMessage: 'Local Persons',
            },
          },
          serviceConfig: {
            servicePath: 'urn:cspace:name(person)',
          },
        },
      },
    },
  },
};

const perms = Immutable.fromJS({
  person: {
    data: 'CRUDL',
  },
});

describe('MiniViewPopupAutocompleteInput', () => {
  before(() => store.dispatch(configureCSpace())
    .then(() => store.clearActions()));

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <BaseMiniViewPopupAutocompleteInput
                source="person/local"
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should not render an input if asText is true', function test() {
    const value = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JohnDoe1514784052823)\'John Doe\'';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <BaseMiniViewPopupAutocompleteInput
                source="person/local"
                value={value}
                asText
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.firstElementChild;

    input.nodeName.should.equal('DIV');
    input.className.should.contain('cspace-input-LineInput--normal');
    input.textContent.should.equal('John Doe');
  });

  it('should open the popup when the mouse enters', function test() {
    const value = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JohnDoe1514784052823)\'John Doe\'';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <BaseMiniViewPopupAutocompleteInput
                perms={perms}
                source="person/local"
                value={value}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.firstElementChild;

    Simulate.mouseEnter(input);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelector('.cspace-ui-MiniViewPopup--common').should.not.equal(null);

        resolve();
      }, 700);
    });
  });

  it('should not open the popup if the value not parseable as a ref name', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <BaseMiniViewPopupAutocompleteInput
                perms={perms}
                source="person/local"
                value="oops"
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.firstElementChild;

    Simulate.mouseEnter(input);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        expect(this.container.querySelector('.cspace-ui-MiniViewPopup--common')).to.equal(null);

        resolve();
      }, 700);
    });
  });

  it('should not open the popup if read permissions do not exist for the record type', function test() {
    const value = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JohnDoe1514784052823)\'John Doe\'';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <BaseMiniViewPopupAutocompleteInput
                perms={Immutable.Map()}
                source="person/local"
                value={value}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.firstElementChild;

    Simulate.mouseEnter(input);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        expect(this.container.querySelector('.cspace-ui-MiniViewPopup--common')).to.equal(null);

        resolve();
      }, 700);
    });
  });

  it('should close the popup when the mouse leaves', function test() {
    const value = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JohnDoe1514784052823)\'John Doe\'';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <BaseMiniViewPopupAutocompleteInput
                perms={perms}
                source="person/local"
                value={value}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.firstElementChild;

    Simulate.mouseEnter(input);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelector('.cspace-ui-MiniViewPopup--common').should.not.equal(null);

        resolve();
      }, 700);
    }).then(() => new Promise((resolve) => {
      Simulate.mouseLeave(input);

      window.setTimeout(() => {
        expect(this.container.querySelector('.cspace-ui-MiniViewPopup--common')).to.equal(null);

        resolve();
      }, 700);
    }));
  });

  it('should close the popup when a new value is supplied via props', function test() {
    const value = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JohnDoe1514784052823)\'John Doe\'';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <BaseMiniViewPopupAutocompleteInput
                perms={perms}
                source="person/local"
                value={value}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.firstElementChild;

    Simulate.mouseEnter(input);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelector('.cspace-ui-MiniViewPopup--common').should.not.equal(null);

        resolve();
      }, 700);
    }).then(() => new Promise((resolve) => {
      const newValue = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe)\'Jane Doe\'';

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <Router>
                <BaseMiniViewPopupAutocompleteInput
                  perms={perms}
                  source="person/local"
                  value={newValue}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      expect(this.container.querySelector('.cspace-ui-MiniViewPopup--common')).to.equal(null);

      resolve();
    }));
  });

  context('when the filtering dropdown is open', () => {
    beforeEach(function beforeEach() {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <Router>
                <BaseMiniViewPopupAutocompleteInput
                  perms={perms}
                  source="person/local"
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      const input = this.container.querySelector('input');

      input.value = 'sam';

      Simulate.change(input);
    });

    it('should open the popup when the mouse enters a menu item', function test() {
      const items = this.container.querySelectorAll('.cspace-input-MenuItem--common');
      const item = items[0];

      Simulate.mouseEnter(item);

      return new Promise((resolve) => {
        window.setTimeout(() => {
          this.container.querySelector('.cspace-ui-MiniViewPopup--common').should.not.equal(null);

          resolve();
        }, 700);
      });
    });

    it('should close the popup when the mouse leaves a menu item', function test() {
      const items = this.container.querySelectorAll('.cspace-input-MenuItem--common');
      const item = items[0];

      Simulate.mouseEnter(item);

      return new Promise((resolve) => {
        window.setTimeout(() => {
          this.container.querySelector('.cspace-ui-MiniViewPopup--common').should.not.equal(null);

          resolve();
        }, 700);
      }).then(() => new Promise((resolve) => {
        Simulate.mouseLeave(item);

        window.setTimeout(() => {
          expect(this.container.querySelector('.cspace-ui-MiniViewPopup--common')).to.equal(null);

          resolve();
        }, 700);
      }));
    });

    it('should close the popup if the mouse enters the popup immediately after it leaves a menu item', function test() {
      const items = this.container.querySelectorAll('.cspace-input-MenuItem--common');
      const item = items[0];

      Simulate.mouseEnter(item);

      return new Promise((resolve) => {
        window.setTimeout(() => {
          this.container.querySelector('.cspace-ui-MiniViewPopup--common').should.not.equal(null);

          resolve();
        }, 700);
      }).then(() => new Promise((resolve) => {
        Simulate.mouseLeave(item);

        const popup = this.container.querySelector('.cspace-ui-MiniViewPopup--common');

        Simulate.mouseEnter(popup);

        window.setTimeout(() => {
          this.container.querySelector('.cspace-ui-MiniViewPopup--common').should.not.equal(null);

          resolve();
        }, 700);
      }));
    });

    it('should close the popup when the filtering dropdown closes', function test() {
      const items = this.container.querySelectorAll('.cspace-input-MenuItem--common');
      const item = items[0];

      Simulate.mouseEnter(item);

      return new Promise((resolve) => {
        window.setTimeout(() => {
          this.container.querySelector('.cspace-ui-MiniViewPopup--common').should.not.equal(null);

          resolve();
        }, 700);
      }).then(() => new Promise((resolve) => {
        const input = this.container.querySelector('input');

        Simulate.keyDown(input, { key: 'Escape' });

        window.setTimeout(() => {
          expect(this.container.querySelector('.cspace-ui-MiniViewPopup--common')).to.equal(null);

          resolve();
        }, 700);
      }));
    });
  });
});
