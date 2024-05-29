import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/summarydocumentation/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('summarydocumentation record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the summarydocumentation number and title when both are present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:summarydocumentations_common': {
          documentationNumber: 'SD',
          titles: {
            title: ['Title', 'AltTitle'],
          },
        },
      },
    });

    title(data).should.equal('SD – Title');
  });

  it('should return the summarydocumentation number only when the title is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:summarydocumentations_common': {
          documentationNumber: 'SD',
        },
      },
    });

    title(data).should.equal('SD');
  });

  it('should return the title only when the summarydocumentation number is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:summarydocumentations_common': {
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
        'ns2:summarydocumentations_extension': {
          summarydocumentationAltTitle: 'Alt doc title',
        },
      },
    });

    title(data).should.equal('');
  });
});
