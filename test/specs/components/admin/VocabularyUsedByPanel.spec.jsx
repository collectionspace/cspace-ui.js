import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import createTestContainer from '../../../helpers/createTestContainer';
import VocabularyUsedByPanel from '../../../../src/components/admin/VocabularyUsedByPanel';
import { configKey } from '../../../../src/helpers/configHelpers';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  prefs: Immutable.fromJS({
    panels: {
      vocabulary: {
        usedBy: {
          collapsed: false,
        },
      },
    },
  }),
});

describe('VocabularyUsedByPanel', () => {
  const shortId = 'shortId';

  const config = {
    recordTypes: {
      group: {
        name: 'group',
        messages: {
          record: {
            name: {
              id: 'record.group.name',
              defaultMessage: 'Group',
            },
          },
        },
        fields: {
          field1: {
            [configKey]: {
              messages: {
                name: {
                  id: 'field1.name',
                  defaultMessage: 'Field 1',
                },
              },
              view: {
                props: {
                  source: shortId,
                },
              },
            },
          },
        },
      },
    },
  };

  const data = Immutable.fromJS({
    document: {
      'ns2:vocabularies_common': {
        shortIdentifier: shortId,
      },
    },
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a panel', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <VocabularyUsedByPanel config={config} data={data} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-layout-Panel--common').should.not.equal(null);
  });

  it('should render a list of uses', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <VocabularyUsedByPanel config={config} data={data} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const list = this.container.querySelector('ul');

    list.should.not.equal(null);

    list.querySelector('li > div').textContent.should.equal('Group');
    list.querySelector('li > ul > li').textContent.should.equal('Field 1');
  });

  it('should render a not used message if no uses are found', function test() {
    const notUsedData = Immutable.fromJS({
      document: {
        'ns2:vocabularies_common': {
          shortIdentifier: 'foobar',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <VocabularyUsedByPanel config={config} data={notUsedData} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('div').textContent.should.equal('No uses found.');
  });

  it('should render nothing if no data is provided', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <VocabularyUsedByPanel config={config} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });
});
