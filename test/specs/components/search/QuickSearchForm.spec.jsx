import React from 'react';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import QuickSearchForm from '../../../../src/components/search/QuickSearchForm';

chai.should();

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: (message) => `formatted ${message.id}`,
  formatHTMLMessage: () => null,
  now: () => null,
};

const config = {
  recordTypes: {
    all: {
      messages: {
        record: {
          collectionName: {
            id: 'record.all.collectionName',
            defaultMessage: 'All',
          },
        },
      },
      serviceConfig: {
        serviceType: 'utility',
      },
    },
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
      },
    },
  },
};

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  person: {
    data: 'CRUDL',
  },
});

const getAuthorityVocabCsid = () => '1234';

describe('QuickSearchForm', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a fieldset', function test() {
    render(
      <QuickSearchForm
        config={config}
        intl={intl}
        getAuthorityVocabCsid={getAuthorityVocabCsid}
      />, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('FIELDSET');
  });

  it('should render a QuickSearchInput', function test() {
    render(<QuickSearchForm config={config} intl={intl} />, this.container);

    this.container.querySelector('.cspace-input-QuickSearchInput--common').should.not.equal(null);
  });

  it('should use intl to format the record type and vocabulary names', function test() {
    render(
      <QuickSearchForm
        config={config}
        intl={intl}
        recordTypeValue="person"
        perms={perms}
        getAuthorityVocabCsid={getAuthorityVocabCsid}
      />, this.container,
    );

    const [recordTypeInput, vocabularyInput] = this.container.querySelectorAll('input');

    recordTypeInput.value.should.equal('formatted record.person.collectionName');
    vocabularyInput.value.should.equal('formatted vocab.person.local.name');
  });
});
