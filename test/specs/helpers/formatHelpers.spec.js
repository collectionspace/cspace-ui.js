import Immutable from 'immutable';
import BlobImage from '../../../src/components/media/BlobImage';
import WorkflowStateIcon from '../../../src/components/record/WorkflowStateIcon';

import {
  DERIVATIVE_THUMBNAIL,
  DERIVATIVE_SMALL,
  DERIVATIVE_MEDIUM,
  DERIVATIVE_ORIGINAL_JPEG,
  DERIVATIVE_ORIGINAL,
} from '../../../src/constants/derivativeNames';

import {
  formatForeignSourceField,
  formatRecordTypeSourceField,
  formatRefNameAsRecordType,
  formatRefNameAsVocabularyName,
  formatServiceObjectName,
  formatSourceField,
  formatTimestamp,
  formatWorkflowStateIcon,
  derivativeImage,
  thumbnailImage,
  smallImage,
  mediumImage,
  originalJpegImage,
  originalImage,
} from '../../../src/helpers/formatHelpers';

import {
  configKey,
} from '../../../src/helpers/configHelpers';

const { expect } = chai;

chai.should();

describe('formatHelpers', () => {
  describe('formatTimestamp', () => {
    const intl = {
      formatDate: (value) => `formatted ${value}`,
    };

    it('should return a formatted timestamp', () => {
      formatTimestamp('2017-01-04T05:20:36.377Z', { intl }).should
        .equal('formatted 2017-01-04T05:20:36.377Z');
    });
  });

  describe('formatServiceObjectName', () => {
    const intl = {
      formatMessage: (message) => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        collectionobject: {
          messages: {
            record: {
              name: {
                id: 'record.collectionobject.name',
                defaultMessage: 'record.collectionobject.name message',
              },
            },
          },
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    it('should return a formatted record type name', () => {
      formatServiceObjectName('CollectionObject', { intl, config }).should
        .equal('formatted record.collectionobject.name');
    });

    it('should return a placeholder if the record type is unknown', () => {
      formatServiceObjectName('SomethingElse', { intl, config }).should
        .equal('[ somethingelse ]');
    });
  });

  describe('formatRefNameAsRecordType', () => {
    const intl = {
      formatMessage: (message) => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        person: {
          messages: {
            record: {
              name: {
                id: 'record.person.name',
                defaultMessage: 'record.person.name message',
              },
            },
          },
          serviceConfig: {
            servicePath: 'personauthorities',
          },
        },
      },
    };

    it('should return a formatted record type name', () => {
      formatRefNameAsRecordType('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JohnDoe1507580521121)\'John Doe\'', { intl, config }).should
        .equal('formatted record.person.name');
    });

    it('should return a placeholder if the record type is unknown', () => {
      formatRefNameAsRecordType('urn:cspace:core.collectionspace.org:something:name(person):item:name(JohnDoe1507580521121)\'John Doe\'', { intl, config }).should
        .equal('[ something ]');
    });
  });

  describe('formatRefNameAsVocabularyName', () => {
    const intl = {
      formatMessage: (message) => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        person: {
          messages: {
            record: {
              name: {
                id: 'record.person.name',
                defaultMessage: 'record.person.name message',
              },
            },
          },
          serviceConfig: {
            servicePath: 'personauthorities',
          },
          vocabularies: {
            ulan: {
              messages: {
                name: {
                  id: 'vocab.person.ulan.name',
                  defaultMessage: 'vocab.person.ulan.name message',
                },
              },
              serviceConfig: {
                servicePath: 'urn:cspace:name(ulan_pa)',
              },
            },
          },
        },
      },
    };

    it('should return a formatted vocabulary name', () => {
      formatRefNameAsVocabularyName('urn:cspace:core.collectionspace.org:personauthorities:name(ulan_pa):item:name(JohnDoe1507580521121)\'John Doe\'', { intl, config }).should
        .equal('formatted vocab.person.ulan.name');
    });

    it('should return a placeholder if the record type is unknown', () => {
      formatRefNameAsVocabularyName('urn:cspace:core.collectionspace.org:something:name(ulan_pa):item:name(JohnDoe1507580521121)\'John Doe\'', { intl, config }).should
        .equal('[ something ]');
    });

    it('should return a placeholder if the vocabulary is unknown', () => {
      formatRefNameAsVocabularyName('urn:cspace:core.collectionspace.org:personauthorities:name(oh_no):item:name(JohnDoe1507580521121)\'John Doe\'', { intl, config }).should
        .equal('[ oh_no ]');
    });
  });

  describe('formatRecordTypeSourceField', () => {
    const intl = {
      formatMessage: (message) => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        collectionobject: {
          fields: {
            document: {
              'ns2:collectionobjects_common': {
                fieldCollector: {
                  [configKey]: {
                    messages: {
                      name: {
                        id: 'field.collectionobjects_common.fieldCollector.name',
                        defaultMessage: 'field.collectionobjects_common.fieldCollector.name message',
                      },
                    },
                  },
                },
              },
            },
          },
          messages: {
            record: {
              name: {
                id: 'record.collectionobject.name',
                defaultMessage: 'record.collectionobject.name message',
              },
            },
          },
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    it('should return a formatted field name', () => {
      formatRecordTypeSourceField('collectionobject', 'collectionobjects_common:fieldCollector', { intl, config }).should
        .equal('formatted field.collectionobjects_common.fieldCollector.name');
    });
  });

  describe('formatSourceField', () => {
    const intl = {
      formatMessage: (message) => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        collectionobject: {
          fields: {
            document: {
              'ns2:collectionobjects_common': {
                fieldCollector: {
                  [configKey]: {
                    messages: {
                      name: {
                        id: 'field.collectionobjects_common.fieldCollector.name',
                        defaultMessage: 'field.collectionobjects_common.fieldCollector.name message',
                      },
                    },
                  },
                },
              },
            },
          },
          messages: {
            record: {
              name: {
                id: 'record.collectionobject.name',
                defaultMessage: 'record.collectionobject.name message',
              },
            },
          },
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    it('should return a formatted field name', () => {
      formatSourceField('collectionobjects_common:fieldCollector', { intl, config, recordType: 'collectionobject' }).should
        .equal('formatted field.collectionobjects_common.fieldCollector.name');
    });
  });

  describe('formatForeignSourceField', () => {
    const intl = {
      formatMessage: (message) => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        collectionobject: {
          fields: {
            document: {
              'ns2:collectionobjects_common': {
                fieldCollector: {
                  [configKey]: {
                    messages: {
                      name: {
                        id: 'field.collectionobjects_common.fieldCollector.name',
                        defaultMessage: 'field.collectionobjects_common.fieldCollector.name message',
                      },
                    },
                  },
                },
              },
            },
          },
          messages: {
            record: {
              name: {
                id: 'record.collectionobject.name',
                defaultMessage: 'record.collectionobject.name message',
              },
            },
          },
          name: 'collectionobject',
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    it('should return a formatted field name', () => {
      formatForeignSourceField('collectionobjects_common:fieldCollector', {
        intl,
        config,
        rowData: Immutable.Map({
          docType: 'CollectionObject',
        }),
      }).should.equal('formatted field.collectionobjects_common.fieldCollector.name');
    });
  });

  describe('formatWorkflowStateIcon', () => {
    it('should return a WorkflowStateIcon', () => {
      const icon = formatWorkflowStateIcon('locked');

      icon.should.have.property('type', WorkflowStateIcon);
    });
  });

  describe('derivativeImage', () => {
    it('should return a BlobImage with the given csid and derivative', () => {
      const csid = '1234';
      const derivative = 'SomeDerivativeName';

      const component = derivativeImage(csid, derivative);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal(derivative);
    });

    it('should return null if no csid is supplied', () => {
      const csid = null;
      const derivative = 'SomeDerivativeName';

      const component = derivativeImage(csid, derivative);

      expect(component).to.equal(null);
    });
  });

  describe('thumbnailImage', () => {
    it('should return a BlobImage with the given csid and the thumbnail derivative', () => {
      const csid = '1234';

      const component = thumbnailImage(csid);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal(DERIVATIVE_THUMBNAIL);
    });
  });

  describe('smallImage', () => {
    it('should return a BlobImage with the given csid and the small derivative', () => {
      const csid = '1234';

      const component = smallImage(csid);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal(DERIVATIVE_SMALL);
    });
  });

  describe('mediumImage', () => {
    it('should return a BlobImage with the given csid and the medium derivative', () => {
      const csid = '1234';

      const component = mediumImage(csid);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal(DERIVATIVE_MEDIUM);
    });
  });

  describe('originalJpegImage', () => {
    it('should return a BlobImage with the given csid and the original jpeg derivative', () => {
      const csid = '1234';

      const component = originalJpegImage(csid);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal(DERIVATIVE_ORIGINAL_JPEG);
    });
  });

  describe('originalImage', () => {
    it('should return a BlobImage with the given csid and the original derivative', () => {
      const csid = '1234';

      const component = originalImage(csid);

      component.type.should.equal(BlobImage);
      component.props.csid.should.equal(csid);
      component.props.derivative.should.equal(DERIVATIVE_ORIGINAL);
    });
  });
});
