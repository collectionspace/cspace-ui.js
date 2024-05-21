import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/nagprainventory/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('nagprainventory record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the inventory number and title when both are present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:nagprainventories_common': {
          inventoryNumber: 'INV',
          titles: {
            title: [
              'Title',
              'Alternate Title',
            ],
          },
        },
      },
    });

    title(data).should.equal('INV – Title');
  });

  it('should return the inventory number only when the title is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:nagprainventories_common': {
          inventoryNumber: 'INV',
        },
      },
    });

    title(data).should.equal('INV');
  });

  it('should return the title only when the inventory number is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:nagprainventories_common': {
          titles: {
            title: ['Title'],
          },
        },
      },
    });

    title(data).should.equal('Title');
  });

  it('should return an empty string if no document is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return an empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:nagprainventories_extension': {
          nagpraInventoryAltTitle: 'Alt inventory title',
        },
      },
    });

    title(data).should.equal('');
  });
});
