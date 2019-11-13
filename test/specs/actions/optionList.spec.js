import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { DATA_TYPE_STRUCTURED_DATE } from '../../../src/constants/dataTypes';

import {
  configKey,
  getRecordFieldOptionListName,
  getRecordGroupOptionListName,
} from '../../../src/helpers/configHelpers';

import {
  ADD_OPTION_LISTS,
} from '../../../src/constants/actionCodes';

import {
  addOptionLists,
  buildRecordFieldOptionLists,
} from '../../../src/actions/optionList';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('optionList action creator', function suite() {
  describe('addOptionLists', function actionSuite() {
    it('should create an ADD_OPTION_LISTS action', function test() {
      const optionLists = {
        states: {
          values: [
            'CA',
            'CT',
            'MA',
            'NY',
          ],
          messages: {
            CA: { defaultMessage: 'California' },
            MA: { defaultMessage: 'Massachusetts' },
            NY: { defaultMessage: 'New York' },
          },
        },
      };

      const mergedOptionLists = {
        states: [
          {
            value: 'CA',
            message: { defaultMessage: 'California' },
          },
          {
            value: 'CT',
          },
          {
            value: 'MA',
            message: { defaultMessage: 'Massachusetts' },
          },
          {
            value: 'NY',
            message: { defaultMessage: 'New York' },
          },
        ],
      };

      addOptionLists(optionLists).should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: mergedOptionLists,
      });
    });
  });

  describe('buildRecordFieldOptionLists', function actionSuite() {
    const config = {
      recordTypes: {
        collectionobject: {
          fields: {
            document: {
              'ns2:collectionobjects_common': {
                objectNumber: {},
                phase: {},
                form: {},
                referenceGroupList: {
                  referenceGroup: {
                    reference: {},
                    referenceNote: {},
                  },
                },
                titleGroupList: {
                  titleGroup: {
                    title: {},
                    titleLanguage: {},
                    titleTranslationSubGroupList: {
                      titleTranslationSubGroup: {
                        titleTranslation: {},
                        titleTranslationLanguage: {},
                      },
                    },
                  },
                },
              },
            },
          },
        },
        group: {
          fields: {
            document: {
              'ns2:groups_common': {
                title: {
                  [configKey]: {
                    messages: {
                      fullName: { id: 'title fullName message' },
                      name: { id: 'title name message' },
                    },
                  },
                },
                owner: {
                  [configKey]: {
                    messages: {
                      name: { id: 'owner name message' },
                    },
                  },
                },
                fooGroupList: {
                  fooGroup: {
                    [configKey]: {
                      messages: {
                        fullName: { id: 'foo fullName message' },
                        name: { id: 'foo name message' },
                      },
                    },
                    fooType: {
                      [configKey]: {
                        messages: {
                          fullName: { id: 'fooType fullName message' },
                          name: { id: 'fooType name message' },
                        },
                      },
                    },
                    fooNote: {
                      [configKey]: {
                        messages: {
                          fullName: { id: 'fooNote fullName message' },
                        },
                      },
                    },
                  },
                },
                barGroupList: {
                  barGroup: {
                    [configKey]: {
                      messages: {
                        name: { id: 'bar name message' },
                      },
                    },
                    barType: {},
                    barNote: {},
                  },
                },
              },
            },
          },
        },
        loanin: {
          fields: {
            document: {
              'ns2:loansin_common': {
                structDate: {
                  [configKey]: {
                    dataType: DATA_TYPE_STRUCTURED_DATE,
                  },
                  dateDisplayDate: {
                    [configKey]: {
                      extensionParentConfig: {
                        dataType: DATA_TYPE_STRUCTURED_DATE,
                      },
                      messages: {
                        name: { id: 'dateDisplayDate name message' },
                        fullName: { id: 'dateDisplayDate fullName message' },
                      },
                    },
                  },
                  dateNote: {
                    [configKey]: {
                      extensionParentConfig: {
                        dataType: DATA_TYPE_STRUCTURED_DATE,
                      },
                      messages: {
                        fullName: { id: 'dateNote fullName message' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        loanout: {
          fields: {
            document: {
              'ns2:loansout_common': {
                groupList: {
                  group: {
                    structDate: {
                      [configKey]: {
                        dataType: DATA_TYPE_STRUCTURED_DATE,
                      },
                      dateDisplayDate: {
                        [configKey]: {
                          extensionParentConfig: {
                            dataType: DATA_TYPE_STRUCTURED_DATE,
                          },
                          messages: {
                            name: { id: 'dateDisplayDate name message' },
                            fullName: { id: 'dateDisplayDate fullName message' },
                          },
                        },
                      },
                      dateNote: {
                        [configKey]: {
                          extensionParentConfig: {
                            dataType: DATA_TYPE_STRUCTURED_DATE,
                          },
                          messages: {
                            fullName: { id: 'dateNote fullName message' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        intake: {
          fields: {
            document: {
              'rel:relations-common-list': {
                'relation-list-item': {},
              },
            },
          },
        },
        conditioncheck: {
          fields: {
            document: {
              'ns2:conditionchecks_common': {
                badfield: {
                  // Oh no, forgot the [configKey] key.
                  messages: {
                    id: 'message id',
                  },
                },
              },
            },
          },
        },
      },
    };

    it('should dispatch an ADD_OPTION_LISTS action containing fields and groups in the given record type', function test() {
      const store = mockStore({
        optionList: Immutable.Map(),
      });

      const recordType = 'collectionobject';

      store.dispatch(buildRecordFieldOptionLists(config, recordType));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: {
          [getRecordFieldOptionListName(recordType)]: [
            { value: 'ns2:collectionobjects_common/objectNumber' },
            { value: 'ns2:collectionobjects_common/phase' },
            { value: 'ns2:collectionobjects_common/form' },
            { value: 'ns2:collectionobjects_common/referenceGroupList/referenceGroup/reference' },
            { value: 'ns2:collectionobjects_common/referenceGroupList/referenceGroup/referenceNote' },
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup/title' },
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup/titleLanguage' },
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup/titleTranslationSubGroupList/titleTranslationSubGroup/titleTranslation' },
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup/titleTranslationSubGroupList/titleTranslationSubGroup/titleTranslationLanguage' },
          ],
          [getRecordGroupOptionListName(recordType)]: [
            { value: 'ns2:collectionobjects_common/referenceGroupList/referenceGroup' },
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup' },
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup/titleTranslationSubGroupList/titleTranslationSubGroup' },
          ],
        },
      });
    });

    it('should use the fullName message of the option if available, and fall back to the name', function test() {
      const store = mockStore({
        optionList: Immutable.Map(),
      });

      const recordType = 'group';

      store.dispatch(buildRecordFieldOptionLists(config, recordType));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: {
          [getRecordFieldOptionListName(recordType)]: [
            { message: { id: 'title fullName message' }, value: 'ns2:groups_common/title' },
            { message: { id: 'owner name message' }, value: 'ns2:groups_common/owner' },
            { message: { id: 'fooType fullName message' }, value: 'ns2:groups_common/fooGroupList/fooGroup/fooType' },
            { message: { id: 'fooNote fullName message' }, value: 'ns2:groups_common/fooGroupList/fooGroup/fooNote' },
            { value: 'ns2:groups_common/barGroupList/barGroup/barType' },
            { value: 'ns2:groups_common/barGroupList/barGroup/barNote' },
          ],
          [getRecordGroupOptionListName(recordType)]: [
            { message: { id: 'foo fullName message' }, value: 'ns2:groups_common/fooGroupList/fooGroup' },
            { message: { id: 'bar name message' }, value: 'ns2:groups_common/barGroupList/barGroup' },
          ],
        },
      });
    });

    it('should skip the rel:relations-common-list field', function test() {
      const store = mockStore({
        optionList: Immutable.Map(),
      });

      const recordType = 'intake';

      store.dispatch(buildRecordFieldOptionLists(config, recordType));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: {
          [getRecordFieldOptionListName(recordType)]: [],
          [getRecordGroupOptionListName(recordType)]: [],
        },
      });
    });

    it('should not descend into structured dates when collecting fields if includeStructDateFields is false', function test() {
      const store = mockStore({
        optionList: Immutable.Map(),
      });

      const recordType = 'loanin';

      store.dispatch(buildRecordFieldOptionLists(config, recordType, undefined, false));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: {
          [getRecordFieldOptionListName(recordType)]: [
            { value: 'ns2:loansin_common/structDate' },
          ],
          [getRecordGroupOptionListName(recordType)]: [
            { value: 'ns2:loansin_common/structDate' },
          ],
        },
      });
    });

    it('should descend into structured dates when collecting fields if includeStructDateFields is true', function test() {
      const store = mockStore({
        optionList: Immutable.Map(),
      });

      const recordType = 'loanin';

      store.dispatch(buildRecordFieldOptionLists(config, recordType, undefined, true));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].type.should.equal(ADD_OPTION_LISTS);

      actions[0].payload.should.have.property(getRecordFieldOptionListName(recordType)).that
        .has.lengthOf(3);

      actions[0].payload[getRecordFieldOptionListName(recordType)]
        .map(option => option.value)
        .should.deep.equal([
          'ns2:loansin_common/structDate',
          'ns2:loansin_common/structDate/dateDisplayDate',
          'ns2:loansin_common/structDate/dateNote',
        ]);

      actions[0].payload[getRecordFieldOptionListName(recordType)]
        .map(option => option.fieldConfig)
        .should.deep.equal([
          undefined,
          config.recordTypes.loanin.fields.document['ns2:loansin_common'].structDate.dateDisplayDate[configKey],
          config.recordTypes.loanin.fields.document['ns2:loansin_common'].structDate.dateNote[configKey],
        ]);

      actions[0].payload[getRecordFieldOptionListName(recordType)]
        .map(option => (typeof option.labelFormatter))
        .should.deep.equal([
          'undefined',
          'function',
          'function',
        ]);

      actions[0].payload.should.have.property(getRecordGroupOptionListName(recordType)).that
        .deep.equals([
          { value: 'ns2:loansin_common/structDate' },
        ]);
    });

    it('should only include fields/groups under the rootPath, of one is supplied', function test() {
      const store = mockStore({
        optionList: Immutable.Map(),
      });

      const recordType = 'collectionobject';
      const rootPath = 'ns2:collectionobjects_common/titleGroupList/titleGroup';

      store.dispatch(buildRecordFieldOptionLists(config, recordType, rootPath));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: {
          [getRecordFieldOptionListName(recordType, rootPath)]: [
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup/title' },
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup/titleLanguage' },
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup/titleTranslationSubGroupList/titleTranslationSubGroup/titleTranslation' },
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup/titleTranslationSubGroupList/titleTranslationSubGroup/titleTranslationLanguage' },
          ],
          [getRecordGroupOptionListName(recordType, rootPath)]: [
            { value: 'ns2:collectionobjects_common/titleGroupList/titleGroup/titleTranslationSubGroupList/titleTranslationSubGroup' },
          ],
        },
      });
    });

    it('should prefer the name message on direct children of the rootPath, if one is supplied', function test() {
      const store = mockStore({
        optionList: Immutable.Map(),
      });

      const recordType = 'group';
      const rootPath = 'ns2:groups_common/fooGroupList/fooGroup';

      store.dispatch(buildRecordFieldOptionLists(config, recordType, rootPath));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: {
          [getRecordFieldOptionListName(recordType, rootPath)]: [
            { message: { id: 'fooType name message' }, value: 'ns2:groups_common/fooGroupList/fooGroup/fooType' },
            { message: { id: 'fooNote fullName message' }, value: 'ns2:groups_common/fooGroupList/fooGroup/fooNote' },
          ],
          [getRecordGroupOptionListName(recordType, rootPath)]: [],
        },
      });
    });

    it('should prefer the name message on direct children of the rootPath, if one is supplied', function test() {
      const store = mockStore({
        optionList: Immutable.Map(),
      });

      const recordType = 'loanout';
      const rootPath = 'ns2:loansout_common/groupList/group/structDate';

      store.dispatch(buildRecordFieldOptionLists(config, recordType, rootPath));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: {
          [getRecordFieldOptionListName(recordType, rootPath)]: [
            { message: { id: 'dateDisplayDate name message' }, value: 'ns2:loansout_common/groupList/group/structDate/dateDisplayDate' },
            { message: { id: 'dateNote fullName message' }, value: 'ns2:loansout_common/groupList/group/structDate/dateNote' },
          ],
          [getRecordGroupOptionListName(recordType, rootPath)]: [],
        },
      });
    });

    it('should skip invalid field descriptors', function test() {
      const store = mockStore({
        optionList: Immutable.Map(),
      });

      const recordType = 'conditioncheck';

      store.dispatch(buildRecordFieldOptionLists(config, recordType));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: {
          [getRecordFieldOptionListName(recordType)]: [],
          [getRecordGroupOptionListName(recordType)]: [],
        },
      });
    });

    it('should not dispatch any action if the option lists already exist', function test() {
      const recordType = 'collectionobject';

      const store = mockStore({
        optionList: Immutable.Map({
          [getRecordFieldOptionListName(recordType)]: [],
          [getRecordGroupOptionListName(recordType)]: [],
        }),
      });

      store.dispatch(buildRecordFieldOptionLists(config, recordType));

      const actions = store.getActions();

      actions.should.have.lengthOf(0);
    });
  });
});
