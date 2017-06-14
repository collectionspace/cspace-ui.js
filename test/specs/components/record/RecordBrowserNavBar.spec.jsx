import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import RecordBrowserNavBar from '../../../../src/components/record/RecordBrowserNavBar';

chai.use(chaiImmutable);
chai.should();

const config = {
  recordTypes: {
    collectionobject: {
      serviceConfig: {
        serviceType: 'object',
      },
      messages: {
        record: {
          collectionName: {
            id: 'record.collectionobject.collectionName',
            defaultMessage: 'Objects',
          },
        },
      },
    },
    group: {
      serviceConfig: {
        serviceType: 'procedure',
      },
      messages: {
        record: {
          collectionName: {
            id: 'record.group.collectionName',
            defaultMessage: 'Groups',
          },
        },
      },
    },
    media: {
      serviceConfig: {
        serviceType: 'procedure',
      },
      messages: {
        record: {
          collectionName: {
            id: 'record.media.collectionName',
            defaultMessage: 'Media Handling',
          },
        },
      },
    },
    intake: {
      serviceConfig: {
        serviceType: 'procedure',
      },
      messages: {
        record: {
          collectionName: {
            id: 'record.intake.collectionName',
            defaultMessage: 'Intakes',
          },
        },
      },
    },
    loanin: {
      serviceConfig: {
        serviceType: 'procedure',
      },
      messages: {
        record: {
          collectionName: {
            id: 'record.loanin.collectionName',
            defaultMessage: 'Loans In',
          },
        },
      },
    },
    person: {
      serviceConfig: {
        serviceType: 'authority',
      },
    },
  },
};

describe('RecordBrowserNavBar', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a nav', function test() {
    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('NAV');
  });

  it('should render a primary item and a related record selector', function test() {
    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          csid="b09295cf-ff56-4018-be16"
        />
      </IntlProvider>, this.container);

    const listItems = this.container.querySelectorAll('li');

    listItems.length.should.equal(2);

    listItems[0].querySelector('button').textContent.should.equal('Primary Record');
    listItems[1].querySelector('.cspace-input-DropdownMenuInput--common').should.not.equal(null);
  });

  it('should render a list item for each entry in items', function test() {
    const navBarItems = Immutable.List(['group', 'media']);

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          csid="b09295cf-ff56-4018-be16"
          items={navBarItems}
        />
      </IntlProvider>, this.container);

    const listItems = this.container.querySelectorAll('li');

    listItems.length.should.equal(4);

    listItems[0].querySelector('button').textContent.should.equal('Primary Record');
    listItems[1].querySelector('button').textContent.should.equal('Groups');
    listItems[2].querySelector('button').textContent.should.equal('Media Handling');
    listItems[3].querySelector('.cspace-input-DropdownMenuInput--common').should.not.equal(null);
  });

  it('should not show related items when no csid is supplied', function test() {
    const items = Immutable.List(['group', 'media']);

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          items={items}
        />
      </IntlProvider>, this.container);

    const listItems = this.container.querySelectorAll('li');

    listItems.length.should.equal(1);

    listItems[0].querySelector('button').textContent.should.equal('New Record');
  });

  it('should not show related items when the supplied record type is an authority', function test() {
    const items = Immutable.List(['group', 'media']);

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="person"
          csid="b09295cf-ff56-4018-be16"
          items={items}
        />
      </IntlProvider>, this.container);

    const listItems = this.container.querySelectorAll('li');

    listItems.length.should.equal(1);

    listItems[0].querySelector('button').textContent.should.equal('Primary Record');
  });

  it('should call setItems when the selected related record type is not in items', function test() {
    const items = Immutable.List(['group', 'media']);

    let setItemsRecordType = null;
    let setItemsItems = null;

    const setItems = (recordTypeArg, itemsArg) => {
      setItemsRecordType = recordTypeArg;
      setItemsItems = itemsArg;
    };

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          relatedRecordType="intake"
          csid="b09295cf-ff56-4018-be16"
          items={items}
          setItems={setItems}
        />
      </IntlProvider>, this.container);

    setItemsRecordType.should.equal('collectionobject');
    setItemsItems.should.equal(Immutable.List(['group', 'media', 'intake']));

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          relatedRecordType="loanin"
          csid="b09295cf-ff56-4018-be16"
          items={items}
          setItems={setItems}
        />
      </IntlProvider>, this.container);

    setItemsRecordType.should.equal('collectionobject');
    setItemsItems.should.equal(Immutable.List(['group', 'media', 'loanin']));
  });

  it('should call onSelect when a related record item button is clicked', function test() {
    const items = Immutable.List(['group']);

    let selectedRecordType = null;

    const handleSelect = (recordTypeArg) => {
      selectedRecordType = recordTypeArg;
    };

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          csid="b09295cf-ff56-4018-be16"
          items={items}
          onSelect={handleSelect}
        />
      </IntlProvider>, this.container);

    const groupItem = this.container.querySelectorAll('li')[1];
    const button = groupItem.querySelector('button');

    Simulate.click(button);

    selectedRecordType.should.equal('group');
  });

  it('should call setItems when a related record item close button is clicked', function test() {
    const items = Immutable.List(['group', 'media']);

    let setItemsRecordType = null;
    let setItemsItems = null;

    const setItems = (recordTypeArg, itemsArg) => {
      setItemsRecordType = recordTypeArg;
      setItemsItems = itemsArg;
    };

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          csid="b09295cf-ff56-4018-be16"
          items={items}
          setItems={setItems}
        />
      </IntlProvider>, this.container);

    const groupItem = this.container.querySelectorAll('li')[1];
    const closeButton = groupItem.querySelector('button:nth-of-type(2)');

    Simulate.click(closeButton);

    setItemsRecordType.should.equal('collectionobject');
    setItemsItems.should.equal(Immutable.List(['media']));
  });

  it('should call onSelect with the following item when the close button is clicked on the active related record item', function test() {
    const items = Immutable.List(['group', 'media']);

    let selectedRecordType = null;

    const handleSelect = (recordTypeArg) => {
      selectedRecordType = recordTypeArg;
    };

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          relatedRecordType="group"
          csid="b09295cf-ff56-4018-be16"
          items={items}
          onSelect={handleSelect}
        />
      </IntlProvider>, this.container);

    const groupItem = this.container.querySelectorAll('li')[1];
    const closeButton = groupItem.querySelector('button:nth-of-type(2)');

    Simulate.click(closeButton);

    selectedRecordType.should.equal('media');
  });

  it('should call onSelect with the preceding item when the close button is clicked on the active related record item, and it is the last related record item', function test() {
    const items = Immutable.List(['group', 'media']);

    let selectedRecordType = null;

    const handleSelect = (recordTypeArg) => {
      selectedRecordType = recordTypeArg;
    };

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          relatedRecordType="media"
          csid="b09295cf-ff56-4018-be16"
          items={items}
          onSelect={handleSelect}
        />
      </IntlProvider>, this.container);

    const mediaItem = this.container.querySelectorAll('li')[2];
    const closeButton = mediaItem.querySelector('button:nth-of-type(2)');

    Simulate.click(closeButton);

    selectedRecordType.should.equal('group');
  });

  it('should call setItems when a selection is made in the related record selector', function test() {
    let setItemsRecordType = null;
    let setItemsItems = null;

    const setItems = (recordTypeArg, itemsArg) => {
      setItemsRecordType = recordTypeArg;
      setItemsItems = itemsArg;
    };

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          csid="b09295cf-ff56-4018-be16"
          setItems={setItems}
        />
      </IntlProvider>, this.container);

    const selectorItem = this.container.querySelectorAll('li')[1];
    const recordTypeInput = selectorItem.querySelector('.cspace-input-DropdownMenuInput--common > input');

    Simulate.keyDown(recordTypeInput, { key: 'ArrowDown' });

    const menu = selectorItem.querySelector('.cspace-input-Menu--common');
    const menuItems = menu.querySelectorAll('li');

    Simulate.click(menuItems[0]);

    setItemsRecordType.should.equal('collectionobject');
    setItemsItems.should.equal(Immutable.List(['collectionobject']));
  });

  it('should call onSelect when a selection is made in the related record selector', function test() {
    let selectedRecordType = null;

    const handleSelect = (recordTypeArg) => {
      selectedRecordType = recordTypeArg;
    };

    render(
      <IntlProvider locale="en">
        <RecordBrowserNavBar
          config={config}
          recordType="collectionobject"
          csid="b09295cf-ff56-4018-be16"
          onSelect={handleSelect}
        />
      </IntlProvider>, this.container);

    const selectorItem = this.container.querySelectorAll('li')[1];
    const recordTypeInput = selectorItem.querySelector('.cspace-input-DropdownMenuInput--common > input');

    Simulate.keyDown(recordTypeInput, { key: 'ArrowDown' });

    const menu = selectorItem.querySelector('.cspace-input-Menu--common');
    const menuItems = menu.querySelectorAll('li');

    Simulate.click(menuItems[0]);

    selectedRecordType.should.equal('collectionobject');
  });
});
