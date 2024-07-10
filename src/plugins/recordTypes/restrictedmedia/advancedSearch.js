export default (configContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
  } = configContext.searchOperators;

  const {
    defaultAdvancedSearchBooleanOp,
    extensions,
  } = configContext.config;

  return {
    op: defaultAdvancedSearchBooleanOp,
    value: [
      {
        op: OP_CONTAIN,
        path: 'ns2:restrictedmedia_common/identificationNumber',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:restrictedmedia_common/title',
      },
      {
        op: OP_EQ,
        path: 'ns2:restrictedmedia_common/creator',
      },
      {
        op: OP_EQ,
        path: 'ns2:restrictedmedia_common/languageList/language',
      },
      {
        op: OP_EQ,
        path: 'ns2:restrictedmedia_common/publisher',
      },
      {
        op: OP_EQ,
        path: 'ns2:restrictedmedia_common/typeList/type',
      },
      {
        op: OP_RANGE,
        path: 'ns2:restrictedmedia_common/dateGroupList/dateGroup',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:restrictedmedia_common/source',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:restrictedmedia_common/subjectList/subject',
      },
      {
        op: OP_EQ,
        path: 'ns2:restrictedmedia_common/rightsHolder',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
