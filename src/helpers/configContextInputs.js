import {
  components as inputComponents,
  enhancers as inputEnhancers,
} from 'cspace-input';

import CheckboxInputComponent from '../components/record/CheckboxInput';
import ObjectNameInputComponent from '../components/record/ObjectNameInput';
import URLInputComponent from '../components/record/URLInput';
import WorkflowStateInputComponent from '../components/record/WorkflowStateInput';
import DateInputContainer from '../containers/input/DateInputContainer';
import DateTimeInputContainer from '../containers/input/DateTimeInputContainer';
import HierarchyInputContainer from '../containers/record/HierarchyInputContainer';
import IDGeneratorInputContainer from '../containers/input/IDGeneratorInputContainer';
import OptionPickerInputContainer from '../containers/record/OptionPickerInputContainer';
import UploadInputContainer from '../containers/input/UploadInputContainer';
import PermissionsInputContainer from '../containers/admin/PermissionsInputContainer';
import MiniViewPopupAutocompleteInputContainer from '../containers/record/MiniViewPopupAutocompleteInputContainer';
import RolesInputContainer from '../containers/admin/RolesInputContainer';
import StructuredDateInputContainer from '../containers/record/StructuredDateInputContainer';
import TermPickerInputContainer from '../containers/record/TermPickerInputContainer';
import withBooleanValue from '../enhancers/withBooleanValue';
import withCsid from '../enhancers/withCsid';

const {
  labelable,
  repeatable,
} = inputEnhancers;

export const AutocompleteInput = repeatable(labelable(MiniViewPopupAutocompleteInputContainer));
AutocompleteInput.toJSON = () => 'AutocompleteInput';

export const { Button } = inputComponents;
Button.toJSON = () => 'Button';

export const CheckboxInput = withBooleanValue(CheckboxInputComponent);
CheckboxInput.toJSON = () => 'CheckboxInput';

export const { CompoundInput } = inputComponents;
CompoundInput.toJSON = () => 'CompoundInput';

export const DateInput = DateInputContainer;
DateInput.toJSON = () => 'DateInput';

export const DateTimeInput = DateTimeInputContainer;
DateTimeInput.toJSON = () => 'DateTimeInput';

export const HierarchyInput = withCsid(HierarchyInputContainer);
HierarchyInput.toJSON = () => 'HierarchyInput';

export const IDGeneratorInput = IDGeneratorInputContainer;
IDGeneratorInput.toJSON = () => 'IDGeneratorInput';

export const ObjectNameInput = repeatable(labelable(ObjectNameInputComponent));
ObjectNameInput.toJSON = () => 'ObjectNameInput';

export const { PasswordInput } = inputComponents;
PasswordInput.toJSON = () => 'PasswordInput';

export const PermissionsInput = labelable(PermissionsInputContainer);
PermissionsInput.toJSON = () => 'PermissionsInput';

export const RolesInput = labelable(RolesInputContainer);
RolesInput.toJSON = () => 'RolesInput';

export const StructuredDateInput = StructuredDateInputContainer;
StructuredDateInput.toJSON = () => 'StructuredDateInput';

export const { ReadOnlyInput } = inputComponents;
ReadOnlyInput.toJSON = () => 'ReadOnlyInput';

export const { RichTextInput } = inputComponents;
RichTextInput.toJSON = () => 'RichTextInput';

export const { TextInput } = inputComponents;
TextInput.toJSON = () => 'TextInput';

export const OptionPickerInput = OptionPickerInputContainer;
OptionPickerInput.toJSON = () => 'OptionPickerInput';

export const TermPickerInput = TermPickerInputContainer;
TermPickerInput.toJSON = () => 'TermPickerInput';

export const UploadInput = UploadInputContainer;
UploadInput.toJSON = () => 'UploadInput';

export const URLInput = URLInputComponent;
URLInput.toJSON = () => 'URLInput';

export const WorkflowStateInput = WorkflowStateInputComponent;
WorkflowStateInput.toJSON = () => 'WorkflowStateInput';
