import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import SearchToSelectTitleBar from '../../../../src/components/search/SearchToSelectTitleBar';
import { configKey } from '../../../../src/helpers/configHelpers';

const { expect } = chai;

chai.should();

const TestInput = (props) => {
  const {
    name,
    parentPath,
    value,
    onCommit,
  } = props;

  return (
    <input
      name={name}
      defaultValue={value}
      onBlur={(event) => onCommit([...parentPath, name], event.target.value)}
    />
  );
};

TestInput.propTypes = {
  parentPath: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.string,
  onCommit: PropTypes.func,
};

const config = {
  recordTypes: {
    collectionobject: {
      messages: {
        record: {
          collectionName: {
            id: 'record.collectionobject.collectionName',
            defaultMessage: 'Objects',
          },
        },
      },
      fields: {
        document: {
          name: {
            [configKey]: {
              searchView: {
                type: TestInput,
              },
            },
          },
        },
      },
    },
    person: {
      messages: {
        record: {
          collectionName: {
            id: 'record.person.collectionName',
            defaultMessage: 'Persons',
          },
        },
      },
      vocabularies: {
        local: {
          messages: {
            collectionName: {
              id: 'vocab.person.local.collectionName',
              defaultMessage: 'Local Persons',
            },
          },
        },
      },
    },
  },
};

describe('SearchToSelectTitleBar', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a header', function test() {
    render(
      <IntlProvider locale="en">
        <SearchToSelectTitleBar
          config={config}
          recordType="collectionobject"
        />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('HEADER');
  });

  it('should render nothing for an unknown record type', function test() {
    render(
      <IntlProvider locale="en">
        <SearchToSelectTitleBar
          config={config}
          recordType="foo"
        />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render the vocabulary name if a vocabulary is supplied', function test() {
    render(
      <IntlProvider locale="en">
        <SearchToSelectTitleBar
          config={config}
          recordType="person"
          vocabulary="local"
        />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('h1').textContent.should.match(/Local Persons/);
  });

  it('should show the keyword and advanced search condition after a search is initiated', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {
        kw: 'keyword',
        as: Immutable.Map({
          op: 'eq',
          path: 'name',
          value: 'value',
        }),
      },
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <SearchToSelectTitleBar
            config={config}
            isSearchInitiated
            searchDescriptor={searchDescriptor}
          />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('h1').textContent.should.match(/containing "keyword"/);
    this.container.querySelector('.cspace-ui-FieldConditionInput--common').should.not.equal(null);
  });

  it('should render the vocabulary name if a vocabulary is supplied after a search is initiated', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'person',
      vocabulary: 'local',
      searchQuery: {},
    });

    render(
      <IntlProvider locale="en">
        <SearchToSelectTitleBar
          config={config}
          searchDescriptor={searchDescriptor}
          isSearchInitiated
        />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('h1').textContent.should.match(/Local Persons/);
  });
});
