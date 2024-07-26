import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/dutyofcare/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('dutyofcare record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the dutyofcare number and dutyOfCareTitle when both are present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:dutiesofcare_common': {
          dutyOfCareNumber: 'DC',
          dutyOfCareTitle: 'Title',
        },
      },
    });

    title(data).should.equal('DC – Title');
  });

  it('should return the dutyofcare number only when the dutyOfCareTitle is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:dutiesofcare_common': {
          dutyOfCareNumber: 'DC',
        },
      },
    });

    title(data).should.equal('DC');
  });

  it('should return the dutyOfCareTitle only when the dutyofcare number is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:dutiesofcare_common': {
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
        'ns2:dutiesofcare_extension': {
          dutyofcareAltTitle: 'Alt dutyofcare dutyOfCareTitle',
        },
      },
    });

    title(data).should.equal('');
  });
});
