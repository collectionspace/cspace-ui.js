import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/dutyofcare/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('dutyofcare record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the dutyofcare number and title when both are present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:dutyofcares_common': {
          dutyOfCareNumber: 'DC',
          dutyOfCareTitle: 'Title',
        },
      },
    });

    title(data).should.equal('DC – Title');
  });

  it('should return the dutyofcare number only when the title is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:dutyofcares_common': {
          dutyOfCareNumber: 'DC',
        },
      },
    });

    title(data).should.equal('DC');
  });

  it('should return the title only when the dutyofcare number is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:dutyofcares_common': {
          dutyOfCareTitle: 'Title',
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
        'ns2:dutyofcares_extension': {
          dutyofcareAltTitle: 'Alt dutyofcare title',
        },
      },
    });

    title(data).should.equal('');
  });
});
