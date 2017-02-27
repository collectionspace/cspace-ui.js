import React from 'react';
import { Simulate } from 'react-addons-test-utils';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import SearchBuilder from '../../../../src/components/search/SearchBuilder';

const expect = chai.expect;

chai.should();

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
      serviceConfig: {
        serviceType: 'object',
      },
    },
    group: {
      messages: {
        record: {
          collectionName: {
            id: 'record.group.collectionName',
            defaultMessage: 'Groups',
          },
        },
      },
      serviceConfig: {
        serviceType: 'procedure',
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
      serviceConfig: {
        serviceType: 'authority',
      },
      vocabularies: {
        local: {
          messages: {
            name: {
              id: 'vocab.person.local.name',
              defaultMessage: 'Local',
            },
          },
        },
        ulan: {
          messages: {
            name: {
              id: 'vocab.person.ulan.name',
              defaultMessage: 'ULAN',
            },
          },
        },
      },
    },
  },
};

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

describe('SearchBuilder', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a form', function test() {
    render(
      <IntlProvider locale="en">
        <SearchBuilder
          config={config}
          intl={intl}
          recordTypeValue="person"
          vocabularyValue="local"
        />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('FORM');
  });

  it('should not render a vocabulary input for non-authority record types', function test() {
    render(
      <IntlProvider locale="en">
        <SearchBuilder
          config={config}
          intl={intl}
          recordTypeValue="group"
        />
      </IntlProvider>, this.container);

    expect(this.container.querySelector('.cspace-ui-SearchBuilderVocab--common')).to.equal(null);
  });

  it('should call onKeywordCommit when a keyword is committed', function test() {
    let committedKeyword = null;

    const handleKeywordCommit = (keywordArg) => {
      committedKeyword = keywordArg;
    };

    render(
      <IntlProvider locale="en">
        <SearchBuilder
          config={config}
          intl={intl}
          recordTypeValue="group"
          onKeywordCommit={handleKeywordCommit}
        />
      </IntlProvider>, this.container);

    const input = this.container.querySelector('section > div > input');

    input.value = 'some keywords';

    Simulate.change(input);
    Simulate.blur(input);

    committedKeyword.should.equal('some keywords');
  });

  it('should call onRecordTypeCommit when the record type is committed', function test() {
    let committedRecordType = null;

    const handleRecordTypeCommit = (recordTypeArg) => {
      committedRecordType = recordTypeArg;
    };

    render(
      <IntlProvider locale="en">
        <SearchBuilder
          config={config}
          intl={intl}
          recordTypeValue="group"
          onRecordTypeCommit={handleRecordTypeCommit}
        />
      </IntlProvider>, this.container);

    const input = this.container.querySelector('.cspace-ui-SearchBuilderRecordType--common input');

    input.value = 'collectionobject';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedRecordType.should.equal('collectionobject');
  });

  it('should call onVocabularyCommit when the vocabulary is committed', function test() {
    let committedVocabulary = null;

    const handleVocabularyCommit = (vocabularyArg) => {
      committedVocabulary = vocabularyArg;
    };

    render(
      <IntlProvider locale="en">
        <SearchBuilder
          config={config}
          intl={intl}
          recordTypeValue="person"
          vocabularyValue="local"
          onVocabularyCommit={handleVocabularyCommit}
        />
      </IntlProvider>, this.container);

    const input = this.container.querySelector('.cspace-ui-SearchBuilderVocab--common input');

    input.value = 'ulan';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedVocabulary.should.equal('ulan');
  });

  it('should call onSearch when the form is submitted', function test() {
    let handlerCalled = false;

    const handleSearch = () => {
      handlerCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <SearchBuilder
          config={config}
          intl={intl}
          recordTypeValue="group"
          onSearch={handleSearch}
        />
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');

    Simulate.submit(form);

    handlerCalled.should.equal(true);
  });
});
