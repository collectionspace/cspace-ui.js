import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { injectIntl, IntlProvider } from 'react-intl';
import { render } from 'react-dom';
import merge from 'lodash/merge';

import createTestContainer from '../../../helpers/createTestContainer';

import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import BaseCreatePage from '../../../../src/components/pages/CreatePage';

const CreatePage = injectIntl(BaseCreatePage);

const expect = chai.expect;

chai.should();

const config = {
  recordTypes: {
    collectionobject: {
      messages: {
        record: {
          name: {
            id: 'record.collectionobject.name',
            defaultMessage: 'Object',
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
          name: {
            id: 'record.group.name',
            defaultMessage: 'Group',
          },
        },
      },
      serviceConfig: {
        serviceType: 'procedure',
      },
    },
    intake: {
      messages: {
        record: {
          name: {
            id: 'record.intake.name',
            defaultMessage: 'Intake',
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
          name: {
            id: 'record.person.name',
            defaultMessage: 'Person',
          },
        },
      },
      serviceConfig: {
        serviceType: 'authority',
      },
      vocabularies: {
        all: {
          messages: {
            name: {
              id: 'vocab.person.all.name',
              defaultMessage: 'All',
            },
          },
        },
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
        disabled: {
          disabled: true,
          messages: {
            name: {
              id: 'vocab.person.disabled.name',
              defaultMessage: 'Disabled Vocab',
            },
          },
        },
      },
    },
    exhibition: {
      disabled: true,
      messages: {
        record: {
          name: {
            id: 'record.exhibition.name',
            defaultMessage: 'Exhibition',
          },
        },
      },
      serviceConfig: {
        serviceType: 'procedure',
      },
    },
    work: {
      messages: {
        record: {
          name: {
            id: 'record.work.name',
            defaultMessage: 'Work',
          },
        },
      },
      serviceConfig: {
        serviceType: 'authority',
      },
      vocabularies: {
        all: {
          messages: {
            name: {
              id: 'vocab.work.all.name',
              defaultMessage: 'All',
            },
          },
        },
        local: {
          disabled: true,
          messages: {
            name: {
              id: 'vocab.work.local.name',
              defaultMessage: 'Local',
            },
          },
        },
        cona: {
          disabled: true,
          messages: {
            name: {
              id: 'vocab.work.cona.name',
              defaultMessage: 'CONA',
            },
          },
        },
      },
    },
  },
};

describe('CreatePage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <Router>
            <CreatePage />
          </Router>
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a link for each object/procedure record, and for each vocabulary', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <Router>
            <CreatePage />
          </Router>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const links = this.container.querySelectorAll('a');

    links.should.have.lengthOf(5);

    links[0].textContent.should
      .equal(config.recordTypes.collectionobject.messages.record.name.defaultMessage);

    links[1].textContent.should
      .equal(config.recordTypes.group.messages.record.name.defaultMessage);

    links[2].textContent.should
      .equal(config.recordTypes.intake.messages.record.name.defaultMessage);

    links[3].textContent.should
      .equal(config.recordTypes.person.vocabularies.local.messages.name.defaultMessage);

    links[4].textContent.should
      .equal(config.recordTypes.person.vocabularies.ulan.messages.name.defaultMessage);
  });

  it('should not render links for disabled procedures', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <Router>
            <CreatePage />
          </Router>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const links = this.container.querySelectorAll('a');

    links.should.have.lengthOf(5);

    Array.from(links).map(link => link.textContent).should.not.include('Exhibition');
  });

  it('should not render links for disabled vocabularies', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <Router>
            <CreatePage />
          </Router>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const links = this.container.querySelectorAll('a');

    links.should.have.lengthOf(5);

    Array.from(links).map(link => link.textContent).should.not.include('Disabled Vocab');
  });

  it('should not render links for authority records whose vocabularies are all disabled', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <Router>
            <CreatePage />
          </Router>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const links = this.container.querySelectorAll('a');

    links.should.have.lengthOf(5);

    Array.from(links).map(link => link.textContent).should.not.include('Work');
  });

  it('should sort procedures/vocabularies by sortOrder if present', function test() {
    const sortedConfig = merge({}, config, {
      recordTypes: {
        group: {
          sortOrder: 1,
        },
        intake: {
          sortOrder: 0,
        },
        person: {
          vocabularies: {
            local: {
              sortOrder: 1,
            },
            ulan: {
              sortOrder: 0,
            },
          },
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={sortedConfig}>
          <Router>
            <CreatePage />
          </Router>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const links = this.container.querySelectorAll('a');

    links.should.have.lengthOf(5);

    links[0].textContent.should
      .equal(config.recordTypes.collectionobject.messages.record.name.defaultMessage);

    links[1].textContent.should
      .equal(config.recordTypes.intake.messages.record.name.defaultMessage);

    links[2].textContent.should
      .equal(config.recordTypes.group.messages.record.name.defaultMessage);

    links[3].textContent.should
      .equal(config.recordTypes.person.vocabularies.ulan.messages.name.defaultMessage);

    links[4].textContent.should
      .equal(config.recordTypes.person.vocabularies.local.messages.name.defaultMessage);
  });

  it('should not render service types whose record types are all disabled', function test() {
    const proceduresAndAuthoritiesDisabledConfig = merge({}, config, {
      recordTypes: {
        group: {
          disabled: true,
        },
        intake: {
          disabled: true,
        },
        person: {
          disabled: true,
        },
        work: {
          disabled: true,
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={proceduresAndAuthoritiesDisabledConfig}>
          <Router>
            <CreatePage />
          </Router>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const links = this.container.querySelectorAll('a');

    links.should.have.lengthOf(1);

    expect(this.container.querySelector('.cspace-ui-CreatePagePanel--procedure')).to.equal(null);
    expect(this.container.querySelector('.cspace-ui-CreatePagePanel--authority')).to.equal(null);
  });
});
