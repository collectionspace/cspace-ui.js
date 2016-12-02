export default (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    AuthorityControlledInput,
    CompoundInput,
    OptionControlledInput,
    TextInput,
  } = pluginContext.inputComponents;

  const {
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    getPartPropertyName,
  } = pluginContext.recordDataHelpers;

  return (
    <CompoundInput defaultChildSubpath={getPartPropertyName('groups_common')}>
      <Panel name="infoPanel" collapsible>
        <Row>
          <div>
            <TextInput name="title" />
          </div>
        </Row>
        <Row>
          <div>
            <OptionControlledInput name="responsibleDepartment" optionListName="departments" />
          </div>
          <div>
            <AuthorityControlledInput name="owner" authority="person/person" />
          </div>
        </Row>
        <TextInput name="scopeNote" multiline />
      </Panel>
    </CompoundInput>
  );
};
