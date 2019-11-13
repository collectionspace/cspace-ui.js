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
export const Button = inputComponents.Button;
export const CheckboxInput = withBooleanValue(CheckboxInputComponent);
export const CompoundInput = inputComponents.CompoundInput;
export const DateInput = DateInputContainer;
export const DateTimeInput = DateTimeInputContainer;
export const HierarchyInput = withCsid(HierarchyInputContainer);
export const IDGeneratorInput = IDGeneratorInputContainer;
export const ObjectNameInput = repeatable(labelable(ObjectNameInputComponent));
export const PasswordInput = inputComponents.PasswordInput;
export const PermissionsInput = labelable(PermissionsInputContainer);
export const RolesInput = labelable(RolesInputContainer);
export const StructuredDateInput = StructuredDateInputContainer;
export const ReadOnlyInput = inputComponents.ReadOnlyInput;
export const RichTextInput = inputComponents.RichTextInput;
export const TextInput = inputComponents.TextInput;
export const OptionPickerInput = OptionPickerInputContainer;
export const TermPickerInput = TermPickerInputContainer;
export const UploadInput = UploadInputContainer;
export const URLInput = URLInputComponent;
export const WorkflowStateInput = WorkflowStateInputComponent;
