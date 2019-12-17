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

describe('optionList action creator', () => {
  describe('addOptionLists', () => {
    it('should create an ADD_OPTION_LISTS action', () => {
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

  describe('buildRecordFieldOptionLists', () => {
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
                    fooName: {
                      [configKey]: {
                        messages: {
                          fullName: { id: 'fooName fullName message' },
                          groupName: { id: 'fooName groupName message' },
                          name: { id: 'fooName name message' },
                        },
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
                      datePeriod: {
                        [configKey]: {
                          extensionParentConfig: {
                            dataType: DATA_TYPE_STRUCTURED_DATE,
                          },
                          messages: {
                            name: { id: 'datePeriod name message' },
                            groupName: { id: 'datePeriod groupName message' },
                            fullName: { id: 'datePeriod fullName message' },
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
              'ns2:intakes_common': {
                foo: {
                  [configKey]: {
                    searchDisabled: true,
                  },
                },
                barGroupList: {
                  [configKey]: {
                    searchDisabled: true,
                  },
                  barGroup: {
                    barName: {},
                    barType: {},
                  },
                },
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
        objectexit: {
          fields: {
            document: {
              'ns2:objectexit_common': {
                fooGroupList: {
                  fooGroup: {
                    barGroup: {
                      [configKey]: {
                        messages: {
                          name: { id: 'barGroup name message' },
                          groupName: { id: 'barGroup groupName message' },
                          fullName: { id: 'barGroup fullName message' },
                        },
                      },
                      barName: {},
                      barType: {},
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    it('should dispatch an ADD_OPTION_LISTS action containing fields and groups in the given record type', () => {
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

    it('should use the fullName message of the option if available, and fall back to the name', () => {
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
            { message: { id: 'fooName fullName message' }, value: 'ns2:groups_common/fooGroupList/fooGroup/fooName' },
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

    it('should skip the rel:relations-common-list field', () => {
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

    it('should skip fields where searchDisabled is true', () => {
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

    it('should not descend into structured dates when collecting fields if includeStructDateFields is false', () => {
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

    it('should descend into structured dates when collecting fields if includeStructDateFields is true', () => {
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
        .map((option) => option.value)
        .should.deep.equal([
          'ns2:loansin_common/structDate',
          'ns2:loansin_common/structDate/dateDisplayDate',
          'ns2:loansin_common/structDate/dateNote',
        ]);

      actions[0].payload[getRecordFieldOptionListName(recordType)]
        .map((option) => option.fieldConfig)
        .should.deep.equal([
          undefined,
          config.recordTypes.loanin.fields.document['ns2:loansin_common'].structDate.dateDisplayDate[configKey],
          config.recordTypes.loanin.fields.document['ns2:loansin_common'].structDate.dateNote[configKey],
        ]);

      actions[0].payload[getRecordFieldOptionListName(recordType)]
        .map((option) => (typeof option.labelFormatter))
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

    it('should only include fields/groups under the rootPath, of one is supplied', () => {
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

    it('should prefer the groupName message on top-level children of the rootPath, then fall back to name, then fullName', () => {
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
            { message: { id: 'fooName groupName message' }, value: 'ns2:groups_common/fooGroupList/fooGroup/fooName' },
            { message: { id: 'fooType name message' }, value: 'ns2:groups_common/fooGroupList/fooGroup/fooType' },
            { message: { id: 'fooNote fullName message' }, value: 'ns2:groups_common/fooGroupList/fooGroup/fooNote' },
          ],
          [getRecordGroupOptionListName(recordType, rootPath)]: [],
        },
      });
    });

    it('should prefer the groupName message on top-level children of the rootPath, when the rootPath is a structured date group', () => {
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
            { message: { id: 'datePeriod groupName message' }, value: 'ns2:loansout_common/groupList/group/structDate/datePeriod' },
          ],
          [getRecordGroupOptionListName(recordType, rootPath)]: [],
        },
      });
    });

    it('should prefer the groupName message on top-level group children of the rootPath', () => {
      const store = mockStore({
        optionList: Immutable.Map(),
      });

      const recordType = 'objectexit';
      const rootPath = 'ns2:objectexit_common/fooGroupList/fooGroup';

      store.dispatch(buildRecordFieldOptionLists(config, recordType, rootPath));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: {
          [getRecordFieldOptionListName(recordType, rootPath)]: [
            { value: 'ns2:objectexit_common/fooGroupList/fooGroup/barGroup/barName' },
            { value: 'ns2:objectexit_common/fooGroupList/fooGroup/barGroup/barType' },
          ],
          [getRecordGroupOptionListName(recordType, rootPath)]: [
            { message: { id: 'barGroup groupName message' }, value: 'ns2:objectexit_common/fooGroupList/fooGroup/barGroup' },
          ],
        },
      });
    });

    it('should skip invalid field descriptors', () => {
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

    it('should not dispatch any action if the option lists already exist', () => {
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
