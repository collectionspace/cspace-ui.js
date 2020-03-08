/*
 * This file contains all messages used in cspace-ui, to be used as a reference for customization
 * or translation. The default export is an object containing the default messages in the
 * application, keyed by message ID. Messages may be customized by supplying overrides via the
 * messages configuration property.
 *
 * Messages should conform to the ICU Message syntax: https://formatjs.io/guides/message-syntax/
 */

export default {
  // Content of the about page. This message is interpreted as HTML, so HTML rules apply. For example, newlines are ignored, and <, >, and & must be escaped.
  "about.contentHTML": "<p> CollectionSpace is a community-supported collections management application for museums, historical societies, natural science collections, and more. </p>",

  // Title of the about page.
  "about.title": "Welcome to CollectionSpace",

  // Label of the accept selection button.
  "acceptSelectionButton.label": "Use selection",

  // Label of the clear button on the search bar of the account (user) admin page.
  "accountSearchBar.clear": "Clear",

  // Label of the input on the search bar of the account (user) admin page.
  "accountSearchBar.filter": "Filter by full name",

  // Notification message displayed when a record is deleted successfully.
  "action.record.deleted": "{hasTitle, select, yes {Deleted {title}} other {Deleted record}}",

  // Notification message displayed when a record is being deleted.
  "action.record.deleting": "{hasTitle, select, yes {Deleting {title}…} other {Deleting record…}}",

  // Notification message displayed when a record delete fails.
  "action.record.errorDeleting": "{hasTitle, select, yes {Error deleting {title}: {error}} other {Error deleting record: {error}}}",

  // Notification message displayed when a role save fails because of a duplicate name.
  "action.record.errorDupRoleName": "Error saving {title}: A role already exists with this name. Please choose a different name.",

  // Notification message displayed when a record save fails and there is no more specific message.
  "action.record.errorSaving": "{hasTitle, select, yes {Error saving {title}: {error}} other {Error saving record: {error}}}",

  // Notification message displayed when a record is saved successfully.
  "action.record.saved": "{hasTitle, select, yes {Saved {title}} other {Saved record}}",

  // Notification message displayed when a record is being saved.
  "action.record.saving": "{hasTitle, select, yes {Saving {title}…} other {Saving record…}}",

  // Notification message displayed when a delete workflow transition (soft-delete) fails.
  "action.record.transition.delete.errorTransitioning": "{hasTitle, select, yes {Error deleting {title}: {error}} other {Error deleting record: {error}}}",

  // Notification message displayed when a delete workflow transition (soft-delete) completes successfully.
  "action.record.transition.delete.transitioned": "{hasTitle, select, yes {Deleted {title}} other {Deleted record}}",

  // Notification message displayed when a delete workflow transition (soft-delete) is in progress.
  "action.record.transition.delete.transitioning": "{hasTitle, select, yes {Deleting {title}…} other {Deleting record…}}",

  // Notification message displayed when a lock workflow transition fails.
  "action.record.transition.lock.errorTransitioning": "{hasTitle, select, yes {Error locking {title}: {error}} other {Error locking record: {error}}}",

  // Notification message displayed when a lock workflow transition completes successfully.
  "action.record.transition.lock.transitioned": "{hasTitle, select, yes {Locked {title}} other {Locked record}}",

  // Notification message displayed when a lock workflow transition is in progress.
  "action.record.transition.lock.transitioning": "{hasTitle, select, yes {Locking {title}…} other {Locking record…}}",

  // Message shown when relating multiple records fails.
  "action.relation.batchCreateError": "Some records could not be related: {error}",

  // Message shown when unrelating multiple records fails.
  "action.relation.batchUnrelateError": "Some records could not be unrelated: {error}",

  // Notification message displayed when records are related successfully.
  "action.relation.related": "{objectCount, plural, =0 {No records} one {# record} other {# records}} related to {subjectTitle}.",

  "adminNavBar.account": "Users",

  "adminNavBar.authrole": "Roles and Permissions",

  "adminPage.title": "Administration",

  "advancedSearchBuilder.title": "Advanced Search",

  // Label of the clear button on the search bar of the role admin page.
  "authRoleSearchBar.clear": "Clear",

  // Label of the input on the search bar of the role admin page.
  "authRoleSearchBar.filter": "Filter by name",

  // Message displayed in the autocomplete input dropdown to prompt a user to add a new term.
  "autocompleteInputContainer.addPrompt": "Add \"{displayName}\" to {destinationName}",

  // Label of the clone option shown in the autocomplete input dropdown.
  "autocompleteInputContainer.cloneOptionLabel": "Clone current record",

  // Message displayed in the autocomplete input dropdown when filtering options.
  "autocompleteInputContainer.count": "{count, plural, =0 {No matching terms} one {# matching term} other {# matching terms}} found",

  // Label of the create new option shown in the autocomplete input dropdown.
  "autocompleteInputContainer.createNewOptionLabel": "Create new record",

  // Message displayed in the autocomplete input dropdown when more characters must be typed in order to begin matching.
  "autocompleteInputContainer.moreCharsRequired": "Continue typing to find matching terms",

  // Label of the back button.
  "backButton.label": "Back",

  // Notification message shown when a batch job has completed.
  "batch.complete": "Completed {name}: {numAffected, plural, =0 {No records} one {# record} other {# records}} affected. {userNote}",

  // Notification message shown when a batch job fails.
  "batch.error": "Error running {name}: {error}",

  // Notification message shown when a batch job is running.
  "batch.running": "Running {name}…",

  // Label of the button to add a new boolean constraint to a boolean search
  "booleanConditionInput.addBoolean.label": "+ Any/All",

  // Label of the button to add a new field constraint to a boolean search
  "booleanConditionInput.addField.label": "+ Field",

  // Label of the button to add a new group constraint to a boolean search
  "booleanConditionInput.addGroup.label": "+ Group",

  "booleanConditionInput.and.label": "and",

  "booleanConditionInput.and.opSelectorLabel": "All",

  "booleanConditionInput.opSelector.label": "{opSelectorInput} of the following conditions {operator, select, and {must} or {may}} be satisfied:",

  "booleanConditionInput.or.label": "or",

  "booleanConditionInput.or.opSelectorLabel": "Any",

  // Default label of the cancel button.
  "cancelButton.label": "Cancel",

  // The textual label of a false (unchecked) value in a checkbox input. Used when search criteria are displayed in search results, for fields that were rendered as checkboxes on the search form.
  "checkboxInput.false": "no",

  // The textual label of an indeterminate value in a checkbox input. Currently not used anywhere, but may be in the future.
  "checkboxInput.indeterminate": "indeterminate",

  // The textual label of a true (checked) value in a checkbox input. Used when search criteria are displayed in search results, for fields that were rendered as checkboxes on the search form.
  "checkboxInput.true": "yes",

  // Label of the clone button.
  "cloneButton.label": "Clone",

  // Label of the close button.
  "closeButton.label": "Close",

  "column.account.default.screenName": "Full Name",

  "column.account.default.status": "Status",

  "column.acquisition.default.acquisitionReferenceNumber": "Reference number",

  "column.acquisition.default.acquisitionSource": "Acquisition source",

  "column.acquisition.default.updatedAt": "Updated",

  "column.all.default.docName": "Summary",

  "column.all.default.docNumber": "Record",

  "column.all.default.docType": "Type",

  "column.all.default.updatedAt": "Updated",

  "column.authority.default.docName": "Item",

  "column.authority.default.docType": "Type",

  "column.authority.default.updatedAt": "Updated",

  "column.authority.default.vocabulary": "Vocabulary",

  "column.authRole.default.displayName": "Name",

  "column.batch.default.name": "Name",

  "column.citation.default.termDisplayName": "Display name",

  "column.citation.default.termStatus": "Term status",

  "column.citation.default.vocabulary": "Vocabulary",

  "column.citation.search.updatedAt": "Updated",

  "column.collectionobject.default.objectNumber": "Identification number",

  "column.collectionobject.default.title": "Title",

  "column.collectionobject.default.updatedAt": "Updated",

  "column.collectionobject.narrow.objectNumber": "ID",

  "column.collectionobject.narrow.title": "Title",

  "column.collectionobject.narrow.updatedAt": "Updated",

  "column.concept.default.termDisplayName": "Display name",

  "column.concept.default.termStatus": "Term status",

  "column.concept.default.vocabulary": "Vocabulary",

  "column.concept.search.updatedAt": "Updated",

  "column.conditioncheck.default.condition": "Condition",

  "column.conditioncheck.default.conditionCheckRefNumber": "Reference number",

  "column.conditioncheck.default.updatedAt": "Updated",

  "column.conservation.default.conservationNumber": "Reference number",

  "column.conservation.default.status": "Status",

  "column.conservation.default.updatedAt": "Updated",

  "column.exhibition.default.exhibitionNumber": "Exhibition number",

  "column.exhibition.default.title": "Title",

  "column.exhibition.default.updatedAt": "Updated",

  "column.exhibition.default.updatedAt": "Updated",

  "column.group.default.owner": "Owner",

  "column.group.default.title": "Title",

  "column.group.default.updatedAt": "Updated",

  "column.intake.default.currentOwner": "Current owner",

  "column.intake.default.entryNumber": "Entry number",

  "column.intake.default.updatedAt": "Updated",

  "column.loanin.default.lender": "Lender",

  "column.loanin.default.loanInNumber": "Loan in number",

  "column.loanin.default.updatedAt": "Updated",

  "column.loanout.default.borrower": "Borrower",

  "column.loanout.default.loanOutNumber": "Loan out number",

  "column.loanout.default.updatedAt": "Updated",

  "column.location.default.termDisplayName": "Display name",

  "column.location.default.termStatus": "Term status",

  "column.location.default.vocabulary": "Vocabulary",

  "column.location.search.updatedAt": "Updated",

  "column.media.default.blobCsid": "Thumbnail",

  "column.media.default.identificationNumber": "Identification number",

  "column.media.default.title": "Title",

  "column.media.default.updatedAt": "Updated",

  "column.movement.default.currentLocation": "Current location",

  "column.movement.default.locationDate": "Location date",

  "column.movement.default.movementReferenceNumber": "Reference number",

  "column.movement.default.updatedAt": "Updated",

  "column.object.default.docName": "Summary",

  "column.object.default.docNumber": "Record",

  "column.object.default.docType": "Type",

  "column.object.default.updatedAt": "Updated",

  "column.object.search.updatedAt": "Updated",

  "column.objectexit.default.currentOwner": "Current owner",

  "column.objectexit.default.exitNumber": "Exit number",

  "column.objectexit.default.updatedAt": "Updated",

  "column.organization.default.termDisplayName": "Display name",

  "column.organization.default.termStatus": "Term status",

  "column.organization.default.vocabulary": "Vocabulary",

  "column.organization.search.updatedAt": "Updated",

  "column.person.default.foreName": "Forename",

  "column.person.default.surName": "Surname",

  "column.person.default.termDisplayName": "Display name",

  "column.person.default.vocabulary": "Vocabulary",

  "column.place.default.termDisplayName": "Display name",

  "column.place.default.termStatus": "Term status",

  "column.place.default.vocabulary": "Vocabulary",

  "column.place.search.updatedAt": "Updated",

  "column.procedure.default.docName": "Summary",

  "column.procedure.default.docNumber": "Record",

  "column.procedure.default.docType": "Type",

  "column.procedure.default.updatedAt": "Updated",

  "column.refs.default.docName": "Summary",

  "column.refs.default.docNumber": "Record",

  "column.refs.default.docType": "Type",

  "column.refs.default.sourceField": "Field",

  "column.refs.narrow.docName": "Summary",

  "column.refs.narrow.docNumber": "Record",

  "column.refs.narrow.docType": "Type",

  "column.refs.narrow.sourceField": "Field",

  "column.report.default.name": "Name",

  "column.terms.itemDisplayName": "Term",

  "column.terms.sourceField": "Field",

  "column.terms.type": "Type",

  "column.terms.vocabulary": "Vocabulary",

  "column.uoc.default.authorizedBy": "Authorized by",

  "column.uoc.default.referenceNumber": "Reference number",

  "column.uoc.default.title": "Title",

  "column.valuation.default.updatedAt": "Updated",

  "column.valuation.default.valuationcontrolRefNumber": "Reference number",

  "column.valuation.default.valueType": "Type",

  "column.vocabulary.default.displayName": "Name",

  "column.work.default.termDisplayName": "Display name",

  "column.work.default.termStatus": "Term status",

  "column.work.default.vocabulary": "Vocabulary",

  "column.work.search.updatedAt": "Updated",

  // The message shown in the confirm delete modal when the record to be deleted has broader or narrower relations.
  "confirmRecordDeleteModal.hasHierarchy": "{title} cannot be deleted because it belongs to a hierarchy. To delete this record, first remove its broader and narrower records.",

  // The message shown in the confirm delete modal when deletion of records with broader relations is allowed, but the record to be deleted has narrower relations.
  "confirmRecordDeleteModal.hasNarrowerHierarchy": "{title} cannot be deleted because it is a broader record in a hierarchy. To delete this record, first remove its narrower records.",

  // The message shown in the confirm delete modal when the record to be deleted is related to other records.
  "confirmRecordDeleteModal.hasRelations": "This record is related to other records. Deleting this record will cause those relationships to be lost.",

  // The message shown in the confirm delete modal when the record to be deleted is a role that is used by user accounts.
  "confirmRecordDeleteModal.hasRoleUses": "{title} cannot be deleted because it is associated with user accounts.",

  // The message shown in the confirm delete modal when the record to be deleted is an authority item that is used by other records.
  "confirmRecordDeleteModal.hasUses": "{title} cannot be deleted because it is used by other records.",

  // The prompt shown to confirm deletion of a record.
  "confirmRecordDeleteModal.prompt": "Delete {title}?",

  // Title of the modal shown to confirm deletion of a record.
  "confirmRecordDeleteModal.title": "Delete {recordName}",

  // Label of the cancel button in the confirm navigation modal.
  "confirmRecordNavigationModal.cancel": "Don't leave",

  // The prompt shown to confirm navigation away from a record that has unsaved changes.
  "confirmRecordNavigationModal.prompt": "You're about to leave a record that has unsaved changes.",

  // Label of the revert button in the confirm navigation modal.
  "confirmRecordNavigationModal.revert": "Revert and continue",

  // Label of the save button in the confirm navigation modal.
  "confirmRecordNavigationModal.save": "Save and continue",

  // Title of the modal shown to confirm navigation away from a record that has unsaved changes.
  "confirmRecordNavigationModal.title": "Leave Record?",

  // The prompt shown to confirm unrelating a record.
  "confirmRecordUnrelateModal.prompt": "Unrelate {title} from the primary record?",

  // The prompt shown to confirm unrelating multiple selected records.
  "confirmRecordUnrelateModal.promptMultiple": "Unrelate {recordCount, plural, one {the selected record} other {# selected records}} from the primary record?",

  // Title of the modal shown to confirm unrelating a record.
  "confirmRecordUnrelateModal.title": "Unrelate {recordName}",

  // The message displayed in the unrelate modal when unrelating is in progress.
  "confirmRecordUnrelateModal.unrelating": "Unrelating...",

  "contentViewer.error": "Preview not available",

  "contentViewer.pending": "File preview",

  "contentViewer.previewTitle": "File preview",

  // Label of the create button.
  "createButton.label": "Create new",

  "createPage.authority": "Authorities",

  "createPage.object": "Objects",

  "createPage.procedure": "Procedures",

  "createPage.title": "Create New",

  // Title of the recent records panel on the dashboard page.
  "dashboardPage.recentPanelTitle": "Records Updated in Last 7 Days",

  // Title of the dashboard page.
  "dashboardPage.title": "My CollectionSpace",

  // The value of a datetime field.
  "dateTimeInputContainer.value": "{date} {time}",

  // Label of the delete button.
  "deleteButton.label": "Delete",

  // Label of the deprecate button.
  "deprecateButton.label": "Deactivate",

  "errorPage.ERR_INVALID_CSID": "\"{csid}\" is not a valid CSID.",

  "errorPage.ERR_INVALID_RELATED_TYPE": "The record type \"{recordType}\" does not have a related type \"{relatedRecordType}\".",

  "errorPage.ERR_MISSING_VOCABULARY": "A vocabulary must be specified for the authority record type \"{recordType}\".",

  "errorPage.ERR_NOT_ALLOWED": "You're not allowed to view this type of record.",

  "errorPage.ERR_NOT_FOUND": "The record you're looking for doesn't seem to exist.",

  "errorPage.ERR_UNKNOWN_RECORD_TYPE": "There is no record type named \"{recordType}\".",

  "errorPage.ERR_UNKNOWN_SUBRESOURCE": "There is no subresource named \"{subresource}\".",

  "errorPage.ERR_UNKNOWN_VOCABULARY": "There is no vocabulary named \"{vocabulary}\" for the record type \"{recordType}\".",

  "errorPage.error": "Error code: {code}",

  "errorPage.title": "Page Not Found",

  "field.account.role.name": "Roles",

  // Message to display when the email is invalid on the user account form.
  "field.accounts_common.email.errorInvalidEmail": "Email is not a valid address. Correct the value {value}.",

  "field.accounts_common.email.name": "Email address",

  // Message to display when the password confirmation does not match the password on a user account record.
  "field.accounts_common.errorNotConfirmed": "Password and confirm password must be identical.",

  // Message to display when the password is invalid on the user account form.
  "field.accounts_common.password.errorInvalidPassword": "Password must be between 8 and 24 characters.",

  "field.accounts_common.password.name": "Password",

  "field.accounts_common.passwordConfirmation.name": "Confirm password",

  "field.accounts_common.screenName.name": "Full name",

  "field.accounts_common.status.name": "Status",

  "field.accounts_common.userId.name": "User ID",

  "field.acquisitions_common.accessionDateGroup.name": "Accession date",

  "field.acquisitions_common.acquisitionAuthorizer.name": "Authorizer",

  "field.acquisitions_common.acquisitionAuthorizerDate.fullName": "Authorization date",

  "field.acquisitions_common.acquisitionAuthorizerDate.name": "Date",

  "field.acquisitions_common.acquisitionDateGroup.name": "Acquisition date",

  "field.acquisitions_common.acquisitionFunding.name": "Funding",

  "field.acquisitions_common.acquisitionFundingCurrency.fullName": "Funding currency",

  "field.acquisitions_common.acquisitionFundingCurrency.name": "Currency",

  "field.acquisitions_common.acquisitionFundingSource.fullName": "Funding source",

  "field.acquisitions_common.acquisitionFundingSource.name": "Source",

  "field.acquisitions_common.acquisitionFundingValue.fullName": "Funding value",

  "field.acquisitions_common.acquisitionFundingValue.name": "Value",

  "field.acquisitions_common.acquisitionMethod.name": "Acquisition method",

  "field.acquisitions_common.acquisitionNote.name": "Note",

  "field.acquisitions_common.acquisitionProvisos.name": "Provisos",

  "field.acquisitions_common.acquisitionReason.name": "Acquisition reason",

  "field.acquisitions_common.acquisitionReferenceNumber.name": "Reference number",

  "field.acquisitions_common.acquisitionSource.name": "Acquisition source",

  "field.acquisitions_common.approvalDate.fullName": "Approval status date",

  "field.acquisitions_common.approvalDate.name": "Date",

  "field.acquisitions_common.approvalGroup.fullName": "Approval group",

  "field.acquisitions_common.approvalGroup.name": "Approval",

  "field.acquisitions_common.approvalIndividual.fullName": "Approval individual",

  "field.acquisitions_common.approvalIndividual.name": "Individual",

  "field.acquisitions_common.approvalNote.fullName": "Approval note",

  "field.acquisitions_common.approvalNote.name": "Note",

  "field.acquisitions_common.approvalStatus.fullName": "Approval status",

  "field.acquisitions_common.approvalStatus.name": "Status",

  "field.acquisitions_common.creditLine.name": "Credit line",

  "field.acquisitions_common.fieldCollectionEventName.name": "Field collection event name",

  "field.acquisitions_common.groupPurchasePriceCurrency.fullName": "Group purchase price currency",

  "field.acquisitions_common.groupPurchasePriceCurrency.name": "Currency",

  "field.acquisitions_common.groupPurchasePriceValue.fullName": "Group purchase price value",

  "field.acquisitions_common.groupPurchasePriceValue.name": "Value",

  "field.acquisitions_common.objectOfferPriceCurrency.fullName": "Object offer price currency",

  "field.acquisitions_common.objectOfferPriceCurrency.name": "Currency",

  "field.acquisitions_common.objectOfferPriceValue.fullName": "Object offer price value",

  "field.acquisitions_common.objectOfferPriceValue.name": "Value",

  "field.acquisitions_common.objectPurchaseOfferPriceCurrency.fullName": "Object purchaser offer price currency",

  "field.acquisitions_common.objectPurchaseOfferPriceCurrency.name": "Currency",

  "field.acquisitions_common.objectPurchaseOfferPriceValue.fullName": "Object purchaser offer price value",

  "field.acquisitions_common.objectPurchaseOfferPriceValue.name": "Value",

  "field.acquisitions_common.objectPurchasePriceCurrency.fullName": "Object purchase price currency",

  "field.acquisitions_common.objectPurchasePriceCurrency.name": "Currency",

  "field.acquisitions_common.objectPurchasePriceValue.fullName": "Object purchase price value",

  "field.acquisitions_common.objectPurchasePriceValue.name": "Value",

  "field.acquisitions_common.originalObjectPurchasePriceCurrency.fullName": "Original object purchase price currency",

  "field.acquisitions_common.originalObjectPurchasePriceCurrency.name": "Currency",

  "field.acquisitions_common.originalObjectPurchasePriceValue.fullName": "Original object purchase price value",

  "field.acquisitions_common.originalObjectPurchasePriceValue.name": "Value",

  "field.acquisitions_common.owner.name": "Owner",

  "field.acquisitions_common.transferOfTitleNumber.name": "Transfer of title number",

  "field.acquistions_common.acquisitionFundingSourceProvisos.fullName": "Funding source provisos",

  "field.acquistions_common.acquisitionFundingSourceProvisos.name": "Source provisos",

  "field.approvalGroupField.approvalGroup.name": "Group",

  "field.approvalGroupField.approvalGroup.name": "Group",

  "field.authrole.description.name": "Description",

  "field.authrole.displayName.name": "Name",

  "field.authrole.permission.name": "Permissions",

  "field.batch.Merge Authority Items.targetCSID.name": "Target record",

  "field.batch.UpdateInventoryStatusBatchJob.inventoryStatus.name": "New inventory status",

  "field.batch_common.className.name": "Java class",

  "field.batch_common.createsNewFocus.name": "Navigate to new record when complete",

  "field.batch_common.forDocType.name": "For record type",

  "field.batch_common.name.name": "Name",

  "field.batch_common.notes.name": "Description",

  "field.batch_common.supportsDocList.name": "Record list",

  "field.batch_common.supportsGroup.name": "Group",

  "field.batch_common.supportsNoContext.name": "All records",

  "field.batch_common.supportsSingleDoc.name": "Single record",

  "field.blobs_common.length.name": "Size",

  "field.blobs_common.length.value": "{value, number} bytes",

  "field.blobs_common.mimeType.name": "Type",

  "field.blobs_common.name.name": "Name",

  "field.citations_common.agent.fullName": "Agent name",

  "field.citations_common.agent.name": "Name",

  "field.citations_common.captureDate.fullName": "Resource identifier capture date",

  "field.citations_common.captureDate.name": "Capture date",

  "field.citations_common.citationAgentInfoGroup.name": "Agent",

  "field.citations_common.citationNote.name": "Note",

  "field.citations_common.citationPublicationInfoGroup.name": "Publication",

  "field.citations_common.citationRecordType.name": "Citation type",

  "field.citations_common.citationRelatedTermsGroup.name": "Related term",

  "field.citations_common.citationResourceIdentGroup.name": "Resource identifier",

  "field.citations_common.citationTermGroup.name": "Term",

  "field.citations_common.citationTermGroupList.required": "At least one term display name is required. Please enter a value.",

  "field.citations_common.edition.fullName": "Publication edition",

  "field.citations_common.edition.name": "Edition",

  "field.citations_common.note.fullName": "Agent note",

  "field.citations_common.note.name": "Note",

  "field.citations_common.pages.fullName": "Publication page(s)",

  "field.citations_common.pages.name": "Page(s)",

  "field.citations_common.publicationDate.fullName": "Publication date",

  "field.citations_common.publicationDate.name": "Date",

  "field.citations_common.publicationPlace.fullName": "Publication place",

  "field.citations_common.publicationPlace.name": "Place",

  "field.citations_common.publisher.name": "Publisher",

  "field.citations_common.relatedTerm.fullName": "Related term",

  "field.citations_common.relatedTerm.name": "Term",

  "field.citations_common.relationType.fullName": "Related term type",

  "field.citations_common.relationType.name": "Type",

  "field.citations_common.resourceIdent.fullName": "Resource identifier",

  "field.citations_common.resourceIdent.name": "Identifier",

  "field.citations_common.role.fullName": "Agent role",

  "field.citations_common.role.name": "Role",

  "field.citations_common.termDisplayName.fullName": "Term display name",

  "field.citations_common.termDisplayName.name": "Display name",

  "field.citations_common.termFlag.fullName": "Term flag",

  "field.citations_common.termFlag.name": "Flag",

  "field.citations_common.termFullCitation.fullName": "Term full citation",

  "field.citations_common.termFullCitation.name": "Full citation",

  "field.citations_common.termIssue.fullName": "Term issue",

  "field.citations_common.termIssue.name": "Issue",

  "field.citations_common.termLanguage.fullName": "Term language",

  "field.citations_common.termLanguage.name": "Language",

  "field.citations_common.termName.fullName": "Term name",

  "field.citations_common.termName.name": "Name",

  "field.citations_common.termPrefForLang.fullName": "Term preferred for lang",

  "field.citations_common.termPrefForLang.name": "Preferred for lang",

  "field.citations_common.termQualifier.fullName": "Term qualifier",

  "field.citations_common.termQualifier.name": "Qualifier",

  "field.citations_common.termSectionTitle.fullName": "Term section title",

  "field.citations_common.termSectionTitle.name": "Section title",

  "field.citations_common.termSource.fullName": "Term source name",

  "field.citations_common.termSource.groupName": "Source name",

  "field.citations_common.termSource.name": "Name",

  "field.citations_common.termSourceDetail.fullName": "Term source detail",

  "field.citations_common.termSourceDetail.groupName": "Source detail",

  "field.citations_common.termSourceDetail.name": "Detail",

  "field.citations_common.termSourceID.fullName": "Term source ID",

  "field.citations_common.termSourceID.groupName": "Source ID",

  "field.citations_common.termSourceID.name": "ID",

  "field.citations_common.termSourceNote.fullName": "Term source note",

  "field.citations_common.termSourceNote.groupName": "Source note",

  "field.citations_common.termSourceNote.name": "Note",

  "field.citations_common.termStatus.fullName": "Term status",

  "field.citations_common.termStatus.name": "Status",

  "field.citations_common.termSubTitle.fullName": "Term subtitle",

  "field.citations_common.termSubTitle.name": "Subtitle",

  "field.citations_common.termTitle.fullName": "Term title",

  "field.citations_common.termTitle.name": "Title",

  "field.citations_common.termType.fullName": "Term type",

  "field.citations_common.termType.name": "Type",

  "field.citations_common.termVolume.fullName": "Term volume",

  "field.citations_common.termVolume.name": "Volume",

  "field.citations_common.type.fullName": "Resource identifier type",

  "field.citations_common.type.name": "Type",

  "field.collectionobjects_common.age.fullName": "Age value",

  "field.collectionobjects_common.age.name": "Value",

  "field.collectionobjects_common.ageQualifier.fullName": "Age qualifier",

  "field.collectionobjects_common.ageQualifier.name": "Qualifier",

  "field.collectionobjects_common.ageUnit.fullName": "Age unit",

  "field.collectionobjects_common.ageUnit.name": "Unit",

  "field.collectionobjects_common.assocActivity.fullName": "Associated activity",

  "field.collectionobjects_common.assocActivity.name": "Activity",

  "field.collectionobjects_common.assocActivityGroup.name": "Associated activity",

  "field.collectionobjects_common.assocActivityNote.fullName": "Associated activity note",

  "field.collectionobjects_common.assocActivityNote.name": "Note",

  "field.collectionobjects_common.assocActivityType.fullName": "Associated activity type",

  "field.collectionobjects_common.assocActivityType.name": "Type",

  "field.collectionobjects_common.assocConcept.fullName": "Associated concept",

  "field.collectionobjects_common.assocConcept.name": "Concept",

  "field.collectionobjects_common.assocConceptGroup.name": "Associated concept",

  "field.collectionobjects_common.assocConceptNote.fullName": "Associated concept note",

  "field.collectionobjects_common.assocConceptNote.name": "Note",

  "field.collectionobjects_common.assocConceptType.fullName": "Associated concept type",

  "field.collectionobjects_common.assocConceptType.name": "Type",

  "field.collectionobjects_common.assocCulturalContext.fullName": "Associated cultural affinity",

  "field.collectionobjects_common.assocCulturalContext.name": "Cultural affinity",

  "field.collectionobjects_common.assocCulturalContextGroup.name": "Associated cultural affinity",

  "field.collectionobjects_common.assocCulturalContextNote.fullName": "Associated cultural affinity note",

  "field.collectionobjects_common.assocCulturalContextNote.name": "Note",

  "field.collectionobjects_common.assocCulturalContextType.fullName": "Associated cultural affinity type",

  "field.collectionobjects_common.assocCulturalContextType.name": "Type",

  "field.collectionobjects_common.assocDateGroup.name": "Associated date",

  "field.collectionobjects_common.assocDateNote.fullName": "Associated date note",

  "field.collectionobjects_common.assocDateNote.name": "Note",

  "field.collectionobjects_common.assocDateType.fullName": "Associated date type",

  "field.collectionobjects_common.assocDateType.name": "Type",

  "field.collectionobjects_common.assocEventName.fullName": "Associated event",

  "field.collectionobjects_common.assocEventName.name": "Event",

  "field.collectionobjects_common.assocEventNameType.fullName": "Associated event type",

  "field.collectionobjects_common.assocEventNameType.name": "Type",

  "field.collectionobjects_common.assocEventNote.name": "Associated event note",

  "field.collectionobjects_common.assocEventOrganization.name": "Associated event organization",

  "field.collectionobjects_common.assocEventPeople.name": "Associated event people",

  "field.collectionobjects_common.assocEventPerson.name": "Associated event person",

  "field.collectionobjects_common.assocEventPlace.name": "Associated event place",

  "field.collectionobjects_common.assocObject.fullName": "Associated object",

  "field.collectionobjects_common.assocObject.name": "Object",

  "field.collectionobjects_common.assocObjectGroup.name": "Associated object",

  "field.collectionobjects_common.assocObjectNote.fullName": "Associated object note",

  "field.collectionobjects_common.assocObjectNote.name": "Note",

  "field.collectionobjects_common.assocObjectType.fullName": "Associated object type",

  "field.collectionobjects_common.assocObjectType.name": "Type",

  "field.collectionobjects_common.assocOrganization.fullName": "Associated organization",

  "field.collectionobjects_common.assocOrganization.name": "Organization",

  "field.collectionobjects_common.assocOrganizationGroup.name": "Associated organization",

  "field.collectionobjects_common.assocOrganizationNote.fullName": "Associated organization note",

  "field.collectionobjects_common.assocOrganizationNote.name": "Note",

  "field.collectionobjects_common.assocOrganizationType.fullName": "Associated organization type",

  "field.collectionobjects_common.assocOrganizationType.name": "Type",

  "field.collectionobjects_common.assocPeople.fullName": "Associated people",

  "field.collectionobjects_common.assocPeople.name": "People",

  "field.collectionobjects_common.assocPeopleGroup.name": "Associated people",

  "field.collectionobjects_common.assocPeopleNote.fullName": "Associated people note",

  "field.collectionobjects_common.assocPeopleNote.name": "Note",

  "field.collectionobjects_common.assocPeopleType.fullName": "Associated people type",

  "field.collectionobjects_common.assocPeopleType.name": "Type",

  "field.collectionobjects_common.assocPerson.fullName": "Associated person",

  "field.collectionobjects_common.assocPerson.name": "Person",

  "field.collectionobjects_common.assocPersonGroup.name": "Associated person",

  "field.collectionobjects_common.assocPersonNote.fullName": "Associated person note",

  "field.collectionobjects_common.assocPersonNote.name": "Note",

  "field.collectionobjects_common.assocPersonType.fullName": "Associated person type",

  "field.collectionobjects_common.assocPersonType.name": "Type",

  "field.collectionobjects_common.assocPlace.fullName": "Associated place",

  "field.collectionobjects_common.assocPlace.name": "Place",

  "field.collectionobjects_common.assocPlaceGroup.name": "Associated place",

  "field.collectionobjects_common.assocPlaceNote.fullName": "Associated place note",

  "field.collectionobjects_common.assocPlaceNote.name": "Note",

  "field.collectionobjects_common.assocPlaceType.fullName": "Associated place type",

  "field.collectionobjects_common.assocPlaceType.name": "Type",

  "field.collectionobjects_common.assocStructuredDateGroup.fullName": "Associated date value",

  "field.collectionobjects_common.assocStructuredDateGroup.groupName": "Value",

  "field.collectionobjects_common.assocStructuredDateGroup.name": "Value",

  "field.collectionobjects_common.briefDescription.name": "Brief description",

  "field.collectionobjects_common.collection.name": "Collection",

  "field.collectionobjects_common.color.name": "Color",

  "field.collectionobjects_common.comment.name": "Comment",

  "field.collectionobjects_common.computedCurrentLocation.name": "Computed current location",

  "field.collectionobjects_common.contentActivity.fullName": "Content activity",

  "field.collectionobjects_common.contentActivity.name": "Activity",

  "field.collectionobjects_common.contentConcept.fullName": "Content concept",

  "field.collectionobjects_common.contentConcept.name": "Concept",

  "field.collectionobjects_common.contentDateGroup.fullName": "Content date",

  "field.collectionobjects_common.contentDateGroup.name": "Date",

  "field.collectionobjects_common.contentDescription.fullName": "Content description",

  "field.collectionobjects_common.contentDescription.name": "Description",

  "field.collectionobjects_common.contentEventName.fullName": "Content event name",

  "field.collectionobjects_common.contentEventName.name": "Name",

  "field.collectionobjects_common.contentEventNameGroup.fullName": "Content event",

  "field.collectionobjects_common.contentEventNameGroup.name": "Event",

  "field.collectionobjects_common.contentEventNameType.fullName": "Content event type",

  "field.collectionobjects_common.contentEventNameType.name": "Type",

  "field.collectionobjects_common.contentLanguage.fullName": "Content language",

  "field.collectionobjects_common.contentLanguage.name": "Language",

  "field.collectionobjects_common.contentNote.fullName": "Content note",

  "field.collectionobjects_common.contentNote.name": "Note",

  "field.collectionobjects_common.contentObject.fullName": "Content object name",

  "field.collectionobjects_common.contentObject.name": "Name",

  "field.collectionobjects_common.contentObjectGroup.fullName": "Content object",

  "field.collectionobjects_common.contentObjectGroup.name": "Object",

  "field.collectionobjects_common.contentObjectType.fullName": "Content object type",

  "field.collectionobjects_common.contentObjectType.name": "Type",

  "field.collectionobjects_common.contentOrganization.fullName": "Content organization",

  "field.collectionobjects_common.contentOrganization.name": "Organization",

  "field.collectionobjects_common.contentOther.fullName": "Content other name",

  "field.collectionobjects_common.contentOther.name": "Name",

  "field.collectionobjects_common.contentOtherGroup.fullName": "Content other",

  "field.collectionobjects_common.contentOtherGroup.name": "Other",

  "field.collectionobjects_common.contentOtherType.fullName": "Content other type",

  "field.collectionobjects_common.contentOtherType.name": "Type",

  "field.collectionobjects_common.contentPeople.fullName": "Content people",

  "field.collectionobjects_common.contentPeople.name": "People",

  "field.collectionobjects_common.contentPerson.fullName": "Content person",

  "field.collectionobjects_common.contentPerson.name": "Person",

  "field.collectionobjects_common.contentPlace.fullName": "Content place",

  "field.collectionobjects_common.contentPlace.name": "Place",

  "field.collectionobjects_common.contentPosition.fullName": "Content position",

  "field.collectionobjects_common.contentPosition.name": "Position",

  "field.collectionobjects_common.contentScript.fullName": "Content script",

  "field.collectionobjects_common.contentScript.name": "Script",

  "field.collectionobjects_common.copyNumber.name": "Copy number",

  "field.collectionobjects_common.distinguishingFeatures.name": "Distinguishing features",

  "field.collectionobjects_common.editionNumber.name": "Edition number",

  "field.collectionobjects_common.fieldColEventName.name": "Field collection event name",

  "field.collectionobjects_common.fieldCollectionDateGroup.name": "Field collection date",

  "field.collectionobjects_common.fieldCollectionFeature.name": "Field collection feature",

  "field.collectionobjects_common.fieldCollectionMethod.name": "Field collection method",

  "field.collectionobjects_common.fieldCollectionNote.name": "Field collection note",

  "field.collectionobjects_common.fieldCollectionNumber.name": "Field collection number",

  "field.collectionobjects_common.fieldCollectionPlace.name": "Field collection place",

  "field.collectionobjects_common.fieldCollectionSource.name": "Field collection source",

  "field.collectionobjects_common.fieldCollector.name": "Field collector",

  "field.collectionobjects_common.form.name": "Form",

  "field.collectionobjects_common.inscriptionContent.fullName": "Textual inscription content",

  "field.collectionobjects_common.inscriptionContent.name": "Inscription content",

  "field.collectionobjects_common.inscriptionContentDateGroup.fullName": "Textual inscription date",

  "field.collectionobjects_common.inscriptionContentDateGroup.name": "Date",

  "field.collectionobjects_common.inscriptionContentInscriber.fullName": "Textual inscription inscriber",

  "field.collectionobjects_common.inscriptionContentInscriber.name": "Inscriber",

  "field.collectionobjects_common.inscriptionContentInterpretation.fullName": "Textual inscription interpretation",

  "field.collectionobjects_common.inscriptionContentInterpretation.name": "Interpretation",

  "field.collectionobjects_common.inscriptionContentLanguage.fullName": "Textual inscription language",

  "field.collectionobjects_common.inscriptionContentLanguage.name": "Language",

  "field.collectionobjects_common.inscriptionContentMethod.fullName": "Textual inscription method",

  "field.collectionobjects_common.inscriptionContentMethod.name": "Method",

  "field.collectionobjects_common.inscriptionContentPosition.fullName": "Textual inscription position",

  "field.collectionobjects_common.inscriptionContentPosition.name": "Position",

  "field.collectionobjects_common.inscriptionContentScript.fullName": "Textual inscription script",

  "field.collectionobjects_common.inscriptionContentScript.name": "Script",

  "field.collectionobjects_common.inscriptionContentTranslation.fullName": "Textual inscription translation",

  "field.collectionobjects_common.inscriptionContentTranslation.name": "Translation",

  "field.collectionobjects_common.inscriptionContentTransliteration.fullName": "Textual inscription transliteration",

  "field.collectionobjects_common.inscriptionContentTransliteration.name": "Transliteration",

  "field.collectionobjects_common.inscriptionContentType.fullName": "Textual inscription type",

  "field.collectionobjects_common.inscriptionContentType.name": "Type",

  "field.collectionobjects_common.inscriptionDescription.fullName": "Non-textual inscription description",

  "field.collectionobjects_common.inscriptionDescription.name": "Inscription description",

  "field.collectionobjects_common.inscriptionDescriptionDateGroup.fullName": "Non-textual inscription date",

  "field.collectionobjects_common.inscriptionDescriptionDateGroup.name": "Date",

  "field.collectionobjects_common.inscriptionDescriptionInscriber.fullName": "Non-textual inscription inscriber",

  "field.collectionobjects_common.inscriptionDescriptionInscriber.name": "Inscriber",

  "field.collectionobjects_common.inscriptionDescriptionInterpretation.fullName": "Non-textual inscription interpretation",

  "field.collectionobjects_common.inscriptionDescriptionInterpretation.name": "Interpretation",

  "field.collectionobjects_common.inscriptionDescriptionMethod.fullName": "Non-textual inscription method",

  "field.collectionobjects_common.inscriptionDescriptionMethod.name": "Method",

  "field.collectionobjects_common.inscriptionDescriptionPosition.fullName": "Non-textual inscription position",

  "field.collectionobjects_common.inscriptionDescriptionPosition.name": "Position",

  "field.collectionobjects_common.inscriptionDescriptionType.fullName": "Non-textual inscription type",

  "field.collectionobjects_common.inscriptionDescriptionType.name": "Type",

  "field.collectionobjects_common.inventoryStatus.name": "Inventory status",

  "field.collectionobjects_common.material.name": "Material",

  "field.collectionobjects_common.materialComponent.fullName": "Material component",

  "field.collectionobjects_common.materialComponent.name": "Component",

  "field.collectionobjects_common.materialComponentNote.fullName": "Material component note",

  "field.collectionobjects_common.materialComponentNote.name": "Component note",

  "field.collectionobjects_common.materialGroup.name": "Material",

  "field.collectionobjects_common.materialName.fullName": "Material name",

  "field.collectionobjects_common.materialName.name": "Name",

  "field.collectionobjects_common.materialSource.fullName": "Material source",

  "field.collectionobjects_common.materialSource.name": "Source",

  "field.collectionobjects_common.nonTextualInscriptionGroup.fullName": "Non-textual inscription",

  "field.collectionobjects_common.numberOfObjects.name": "Number of objects",

  "field.collectionobjects_common.numberType.fullName": "Other number type",

  "field.collectionobjects_common.numberType.name": "Type",

  "field.collectionobjects_common.numberValue.fullName": "Other number",

  "field.collectionobjects_common.numberValue.name": "Value",

  "field.collectionobjects_common.objectComponentGroup.name": "Object component",

  "field.collectionobjects_common.objectComponentInformation.fullName": "Object component information",

  "field.collectionobjects_common.objectComponentInformation.name": "Information",

  "field.collectionobjects_common.objectComponentName.fullName": "Object component name",

  "field.collectionobjects_common.objectComponentName.name": "Name",

  "field.collectionobjects_common.objectHistoryNote.name": "Object history note",

  "field.collectionobjects_common.objectName.fullName": "Object name",

  "field.collectionobjects_common.objectName.name": "Name",

  "field.collectionobjects_common.objectNameCurrency.fullName": "Object name currency",

  "field.collectionobjects_common.objectNameCurrency.name": "Currency",

  "field.collectionobjects_common.objectNameGroup.name": "Object name",

  "field.collectionobjects_common.objectNameLanguage.fullName": "Object name language",

  "field.collectionobjects_common.objectNameLanguage.name": "Language",

  "field.collectionobjects_common.objectNameLevel.fullName": "Object name level",

  "field.collectionobjects_common.objectNameLevel.name": "Level",

  "field.collectionobjects_common.objectNameNote.fullName": "Object name note",

  "field.collectionobjects_common.objectNameNote.name": "Note",

  "field.collectionobjects_common.objectNameSystem.fullName": "Object name system",

  "field.collectionobjects_common.objectNameSystem.name": "System",

  "field.collectionobjects_common.objectNameType.fullName": "Object name type",

  "field.collectionobjects_common.objectNameType.name": "Type",

  "field.collectionobjects_common.objectNumber.name": "Identification number",

  "field.collectionobjects_common.objectProductionDateGroup.name": "Production date",

  "field.collectionobjects_common.objectProductionNote.name": "Production note",

  "field.collectionobjects_common.objectProductionOrganization.fullName": "Production organization",

  "field.collectionobjects_common.objectProductionOrganization.name": "Organization",

  "field.collectionobjects_common.objectProductionOrganizationGroup.name": "Production organization",

  "field.collectionobjects_common.objectProductionOrganizationRole.fullName": "Production organization role",

  "field.collectionobjects_common.objectProductionOrganizationRole.name": "Role",

  "field.collectionobjects_common.objectProductionPeople.fullName": "Production people",

  "field.collectionobjects_common.objectProductionPeople.name": "People",

  "field.collectionobjects_common.objectProductionPeopleGroup.name": "Production people",

  "field.collectionobjects_common.objectProductionPeopleRole.fullName": "Production people role",

  "field.collectionobjects_common.objectProductionPeopleRole.name": "Role",

  "field.collectionobjects_common.objectProductionPerson.fullName": "Production person",

  "field.collectionobjects_common.objectProductionPerson.name": "Person",

  "field.collectionobjects_common.objectProductionPersonGroup.name": "Production person",

  "field.collectionobjects_common.objectProductionPersonRole.fullName": "Production person role",

  "field.collectionobjects_common.objectProductionPersonRole.name": "Role",

  "field.collectionobjects_common.objectProductionPlace.fullName": "Production place",

  "field.collectionobjects_common.objectProductionPlace.name": "Place",

  "field.collectionobjects_common.objectProductionPlaceGroup.name": "Production place",

  "field.collectionobjects_common.objectProductionPlaceRole.fullName": "Production place role",

  "field.collectionobjects_common.objectProductionPlaceRole.name": "Role",

  "field.collectionobjects_common.objectProductionReason.name": "Production reason",

  "field.collectionobjects_common.objectStatus.name": "Object status",

  "field.collectionobjects_common.otherNumber.name": "Other number",

  "field.collectionobjects_common.owner.name": "Owner",

  "field.collectionobjects_common.ownersContributionNote.name": "Owner's contribution note",

  "field.collectionobjects_common.ownershipAccess.name": "Ownership access",

  "field.collectionobjects_common.ownershipCategory.name": "Ownership category",

  "field.collectionobjects_common.ownershipDateGroup.name": "Ownership date",

  "field.collectionobjects_common.ownershipExchangeMethod.fullName": "Ownership exchange method",

  "field.collectionobjects_common.ownershipExchangeMethod.name": "Method",

  "field.collectionobjects_common.ownershipExchangeNote.fullName": "Ownership exchange note",

  "field.collectionobjects_common.ownershipExchangeNote.name": "Note",

  "field.collectionobjects_common.ownershipExchangePriceCurrency.fullName": "Ownership exchange price currency",

  "field.collectionobjects_common.ownershipExchangePriceCurrency.name": "Price currency",

  "field.collectionobjects_common.ownershipExchangePriceValue.fullName": "Ownership exchange price value",

  "field.collectionobjects_common.ownershipExchangePriceValue.name": "Price value",

  "field.collectionobjects_common.ownershipPlace.name": "Ownership place",

  "field.collectionobjects_common.ownersPersonalExperience.name": "Owner's personal experience",

  "field.collectionobjects_common.ownersPersonalResponse.name": "Owner's personal response",

  "field.collectionobjects_common.ownersReference.name": "Owner's reference",

  "field.collectionobjects_common.phase.name": "Phase",

  "field.collectionobjects_common.physicalDescription.name": "Physical description",

  "field.collectionobjects_common.publishTo.name": "Publish to",

  "field.collectionobjects_common.recordStatus.name": "Record status",

  "field.collectionobjects_common.reference.name": "Reference",

  "field.collectionobjects_common.referenceGroup.fullName": "Reference",

  "field.collectionobjects_common.referenceNote.fullName": "Reference note",

  "field.collectionobjects_common.referenceNote.name": "Note",

  "field.collectionobjects_common.responsibleDepartment.name": "Responsible department",

  "field.collectionobjects_common.sex.name": "Sex",

  "field.collectionobjects_common.style.name": "Style",

  "field.collectionobjects_common.technicalAttribute.fullName": "Technical attribute",

  "field.collectionobjects_common.technicalAttribute.name": "Attribute",

  "field.collectionobjects_common.technicalAttributeGroup.name": "Technical attribute",

  "field.collectionobjects_common.technicalAttributeMeasurement.fullName": "Technical attribute measurement",

  "field.collectionobjects_common.technicalAttributeMeasurement.name": "Measurement",

  "field.collectionobjects_common.technicalAttributeMeasurementUnit.fullName": "Technical attribute measurement unit",

  "field.collectionobjects_common.technicalAttributeMeasurementUnit.name": "Unit",

  "field.collectionobjects_common.technique.fullName": "Production technique",

  "field.collectionobjects_common.technique.name": "Technique",

  "field.collectionobjects_common.techniqueGroup.name": "Production technique",

  "field.collectionobjects_common.techniqueType.fullName": "Production technique type",

  "field.collectionobjects_common.techniqueType.name": "Type",

  "field.collectionobjects_common.textualInscriptionGroup.fullName": "Textual inscription",

  "field.collectionobjects_common.title.name": "Title",

  "field.collectionobjects_common.titleGroup.name": "Title",

  "field.collectionobjects_common.titleLanguage.fullName": "Title language",

  "field.collectionobjects_common.titleLanguage.name": "Language",

  "field.collectionobjects_common.titleTranslation.fullName": "Title translation",

  "field.collectionobjects_common.titleTranslation.name": "Translation",

  "field.collectionobjects_common.titleTranslationLanguage.fullName": "Title translation language",

  "field.collectionobjects_common.titleTranslationLanguage.name": "Language",

  "field.collectionobjects_common.titleTranslationSubGroup.fullName": "Title translation",

  "field.collectionobjects_common.titleTranslationSubGroup.name": "Translation",

  "field.collectionobjects_common.titleType.fullName": "Title type",

  "field.collectionobjects_common.titleType.name": "Type",

  "field.collectionobjects_common.usage.name": "Usage",

  "field.collectionobjects_common.usageGroup.name": "Usage",

  "field.collectionobjects_common.usageNote.fullName": "Usage note",

  "field.collectionobjects_common.usageNote.name": "Note",

  "field.collectionobjects_common.viewersContributionNote.name": "Viewer's contribution note",

  "field.collectionobjects_common.viewersPersonalExperience.name": "Viewer's personal experience",

  "field.collectionobjects_common.viewersPersonalResponse.name": "Viewer's personal response",

  "field.collectionobjects_common.viewersReference.name": "Viewer's reference",

  "field.collectionobjects_common.viewersRole.name": "Viewer's role",

  "field.concepts_common.additionalSource.fullName": "Additional source",

  "field.concepts_common.additionalSource.name": "Source",

  "field.concepts_common.additionalSourceDetail.fullName": "Additional source detail",

  "field.concepts_common.additionalSourceDetail.name": "Detail",

  "field.concepts_common.additionalSourceGroup.name": "Additional source",

  "field.concepts_common.additionalSourceID.fullName": "Additional source ID",

  "field.concepts_common.additionalSourceID.name": "ID",

  "field.concepts_common.additionalSourceNote.fullName": "Additional source note",

  "field.concepts_common.additionalSourceNote.name": "Note",

  "field.concepts_common.citationGroup.name": "Citation",

  "field.concepts_common.citationSource.fullName": "Citation source",

  "field.concepts_common.citationSource.name": "Source",

  "field.concepts_common.citationSourceDetail.fullName": "Citation source detail",

  "field.concepts_common.citationSourceDetail.name": "Source detail",

  "field.concepts_common.conceptRecordType.name": "Concept type",

  "field.concepts_common.conceptTermGroup.name": "Term",

  "field.concepts_common.conceptTermGroupList.required": "At least one term display name is required. Please enter a value.",

  "field.concepts_common.historicalStatus.fullName": "Term historical status",

  "field.concepts_common.historicalStatus.name": "Historical status",

  "field.concepts_common.scopeNote.fullName": "Scope note",

  "field.concepts_common.scopeNote.name": "Note",

  "field.concepts_common.scopeNoteSource.fullName": "Scope note source",

  "field.concepts_common.scopeNoteSource.name": "Source",

  "field.concepts_common.scopeNoteSourceDetail.fullName": "Scope note source detail",

  "field.concepts_common.scopeNoteSourceDetail.name": "Source detail",

  "field.concepts_common.termDisplayName.fullName": "Term display name",

  "field.concepts_common.termDisplayName.name": "Display name",

  "field.concepts_common.termFlag.fullName": "Term flag",

  "field.concepts_common.termFlag.name": "Flag",

  "field.concepts_common.termLanguage.fullName": "Term language",

  "field.concepts_common.termLanguage.name": "Language",

  "field.concepts_common.termName.fullName": "Term name",

  "field.concepts_common.termName.name": "Name",

  "field.concepts_common.termPrefForLang.fullName": "Term preferred for lang",

  "field.concepts_common.termPrefForLang.name": "Preferred for lang",

  "field.concepts_common.termQualifier.fullName": "Term qualifier",

  "field.concepts_common.termQualifier.name": "Qualifier",

  "field.concepts_common.termSource.fullName": "Term source name",

  "field.concepts_common.termSource.groupName": "Source name",

  "field.concepts_common.termSource.name": "Name",

  "field.concepts_common.termSourceDetail.fullName": "Term source detail",

  "field.concepts_common.termSourceDetail.groupName": "Source detail",

  "field.concepts_common.termSourceDetail.name": "Detail",

  "field.concepts_common.termSourceID.fullName": "Term source ID",

  "field.concepts_common.termSourceID.groupName": "Source ID",

  "field.concepts_common.termSourceID.name": "ID",

  "field.concepts_common.termSourceNote.fullName": "Term source note",

  "field.concepts_common.termSourceNote.groupName": "Source note",

  "field.concepts_common.termSourceNote.name": "Note",

  "field.concepts_common.termStatus.fullName": "Term status",

  "field.concepts_common.termStatus.name": "Status",

  "field.concepts_common.termType.fullName": "Term type",

  "field.concepts_common.termType.name": "Type",

  "field.conditionchecks_common.completeness.fullName": "Completeness description",

  "field.conditionchecks_common.completeness.name": "Description",

  "field.conditionchecks_common.completenessDate.fullName": "Completeness date",

  "field.conditionchecks_common.completenessDate.name": "Date",

  "field.conditionchecks_common.completenessGroup.name": "Completeness",

  "field.conditionchecks_common.completenessNote.fullName": "Completeness note",

  "field.conditionchecks_common.completenessNote.name": "Note",

  "field.conditionchecks_common.condition.fullName": "Condition description",

  "field.conditionchecks_common.condition.name": "Description",

  "field.conditionchecks_common.conditionCheckAssessmentDate.name": "Check/assessment date",

  "field.conditionchecks_common.conditionChecker.name": "Checker/assessor",

  "field.conditionchecks_common.conditionCheckGroup.name": "Condition",

  "field.conditionchecks_common.conditionCheckMethod.name": "Method",

  "field.conditionchecks_common.conditionCheckNote.name": "Note",

  "field.conditionchecks_common.conditionCheckReason.name": "Reason",

  "field.conditionchecks_common.conditionCheckRefNumber.name": "Reference number",

  "field.conditionchecks_common.conditionDate.fullName": "Condition date",

  "field.conditionchecks_common.conditionDate.name": "Date",

  "field.conditionchecks_common.conditionNote.fullName": "Condition note",

  "field.conditionchecks_common.conditionNote.name": "Note",

  "field.conditionchecks_common.conservationTreatmentPriority.name": "Conservation treatment priority",

  "field.conditionchecks_common.displayRecommendations.name": "Display recommendation",

  "field.conditionchecks_common.envConditionNote.fullName": "Environmental condition note",

  "field.conditionchecks_common.envConditionNote.name": "Note",

  "field.conditionchecks_common.envConditionNoteDate.fullName": "Environmental condition date",

  "field.conditionchecks_common.envConditionNoteDate.name": "Date",

  "field.conditionchecks_common.envConditionNoteGroup.name": "Environmental condition",

  "field.conditionchecks_common.envRecommendations.name": "Environmental recommendation",

  "field.conditionchecks_common.handlingRecommendations.name": "Handling recommendation",

  "field.conditionchecks_common.hazard.fullName": "Hazard description",

  "field.conditionchecks_common.hazard.name": "Description",

  "field.conditionchecks_common.hazardDate.fullName": "Hazard date",

  "field.conditionchecks_common.hazardDate.name": "Date",

  "field.conditionchecks_common.hazardGroup.name": "Hazard",

  "field.conditionchecks_common.hazardNote.fullName": "Hazard note",

  "field.conditionchecks_common.hazardNote.name": "Note",

  "field.conditionchecks_common.legalReqsHeld.fullName": "Legal/license requirement held description",

  "field.conditionchecks_common.legalReqsHeld.name": "Description",

  "field.conditionchecks_common.legalReqsHeldBeginDate.fullName": "Legal/license requirement held begin date",

  "field.conditionchecks_common.legalReqsHeldBeginDate.name": "Begin date",

  "field.conditionchecks_common.legalReqsHeldEndDate.fullName": "Legal/license requirement held end date",

  "field.conditionchecks_common.legalReqsHeldEndDate.name": "End date",

  "field.conditionchecks_common.legalReqsHeldGroup.name": "Legal/license requirement held",

  "field.conditionchecks_common.legalReqsHeldNumber.fullName": "Legal/license requirement held number",

  "field.conditionchecks_common.legalReqsHeldNumber.name": "Number",

  "field.conditionchecks_common.legalReqsHeldRenewDate.fullName": "Legal/license requirement held renewal date",

  "field.conditionchecks_common.legalReqsHeldRenewDate.name": "Renewal date",

  "field.conditionchecks_common.legalRequirements.name": "Legal requirement",

  "field.conditionchecks_common.nextConditionCheckDate.name": "Next check/assessment date",

  "field.conditionchecks_common.objectAuditCategory.name": "Object audit category",

  "field.conditionchecks_common.packingRecommendations.name": "Packing recommendation",

  "field.conditionchecks_common.salvagePriorityCode.fullName": "Salvage priority code",

  "field.conditionchecks_common.salvagePriorityCode.name": "Code",

  "field.conditionchecks_common.salvagePriorityCodeDate.fullName": "Salvage priority date",

  "field.conditionchecks_common.salvagePriorityCodeDate.name": "Date",

  "field.conditionchecks_common.salvagePriorityCodeGroup.name": "Salvage priority",

  "field.conditionchecks_common.securityRecommendations.name": "Security recommendation",

  "field.conditionchecks_common.specialRequirements.name": "Special requirement",

  "field.conditionchecks_common.storageRequirements.name": "Storage recommendation",

  "field.conditionchecks_common.techAssessment.fullName": "Technical assessment description",

  "field.conditionchecks_common.techAssessment.name": "Description",

  "field.conditionchecks_common.techAssessmentDate.fullName": "Technical assessment date",

  "field.conditionchecks_common.techAssessmentDate.name": "Date",

  "field.conditionchecks_common.techAssessmentGroup.name": "Technical assessment",

  "field.conservation_common.analysisMethod.name": "Analytical methodology",

  "field.conservation_common.analysisResults.name": "Analytical result",

  "field.conservation_common.approvedBy.name": "Approved by",

  "field.conservation_common.approvedDate.name": "Approval date",

  "field.conservation_common.conservationNumber.name": "Reference number",

  "field.conservation_common.conservationStatusGroup.name": "Procedural status",

  "field.conservation_common.conservator.name": "Conservator",

  "field.conservation_common.destAnalysisApprovalNote.fullName": "Destructive analysis approval note",

  "field.conservation_common.destAnalysisApprovalNote.name": "Approval note",

  "field.conservation_common.destAnalysisApprovedDate.fullName": "Destructive analysis approval date",

  "field.conservation_common.destAnalysisApprovedDate.name": "Approval date",

  "field.conservation_common.destAnalysisGroup.name": "Destructive analysis",

  "field.conservation_common.examinationDate.fullName": "Examination date",

  "field.conservation_common.examinationDate.name": "Date",

  "field.conservation_common.examinationGroup.name": "Examination",

  "field.conservation_common.examinationNote.fullName": "Examination note",

  "field.conservation_common.examinationNote.name": "Note",

  "field.conservation_common.examinationPhase.fullName": "Examination phase of treatment",

  "field.conservation_common.examinationPhase.name": "Phase of treatment",

  "field.conservation_common.examinationStaff.fullName": "Examination staff",

  "field.conservation_common.examinationStaff.name": "Staff",

  "field.conservation_common.fabricationNote.name": "Fabrication note",

  "field.conservation_common.otherParty.fullName": "Other treatment party name",

  "field.conservation_common.otherParty.name": "Name",

  "field.conservation_common.otherPartyGroup.name": "Other treatment party",

  "field.conservation_common.otherPartyNote.fullName": "Other treatment party note",

  "field.conservation_common.otherPartyNote.name": "Note",

  "field.conservation_common.otherPartyRole.fullName": "Other treatment party role",

  "field.conservation_common.otherPartyRole.name": "Role",

  "field.conservation_common.proposedAnalysis.name": "Proposed analysis",

  "field.conservation_common.proposedAnalysisDate.fullName": "Analysis proposal date",

  "field.conservation_common.proposedAnalysisDate.name": "Proposal date",

  "field.conservation_common.proposedTreatment.name": "Proposed treatment",

  "field.conservation_common.researcher.fullName": "Analysis researcher",

  "field.conservation_common.researcher.name": "Researcher",

  "field.conservation_common.sampleBy.fullName": "Destructive analysis sample taken by",

  "field.conservation_common.sampleBy.name": "Sample taken by",

  "field.conservation_common.sampleDate.fullName": "Destructive analysis sample date",

  "field.conservation_common.sampleDate.name": "Sample date",

  "field.conservation_common.sampleDescription.fullName": "Destructive analysis sample description",

  "field.conservation_common.sampleDescription.name": "Sample description",

  "field.conservation_common.sampleReturned.fullName": "Destructive analysis sample returned",

  "field.conservation_common.sampleReturned.nadme": "Sample returned",

  "field.conservation_common.sampleReturnedLocation.fullName": "Destructive analysis sample returned location",

  "field.conservation_common.sampleReturnedLocation.name": "Sample returned location",

  "field.conservation_common.status.fullName": "Procedural status",

  "field.conservation_common.status.name": "Status",

  "field.conservation_common.statusDate.fullName": "Procedural status date",

  "field.conservation_common.statusDate.name": "Date",

  "field.conservation_common.treatmentEndDate.name": "Treatment end date",

  "field.conservation_common.treatmentPurpose.name": "Treatment purpose",

  "field.conservation_common.treatmentStartDate.name": "Treatment start date",

  "field.conservation_common.treatmentSummary.name": "Treatment summary",

  "field.contacts_common.addressCountry.name": "Country",

  "field.contacts_common.addressGroup.name": "Address",

  "field.contacts_common.addressMunicipality.name": "Municipality",

  "field.contacts_common.addressPlace1.name": "Line 1",

  "field.contacts_common.addressPlace2.name": "Line 2",

  "field.contacts_common.addressPostCode.name": "Postal code",

  "field.contacts_common.addressStateOrProvince.name": "State/province",

  "field.contacts_common.addressType.name": "Type",

  "field.contacts_common.email.name": "Address",

  "field.contacts_common.emailGroup.name": "Email",

  "field.contacts_common.emailType.name": "Type",

  "field.contacts_common.faxNumber.name": "Number",

  "field.contacts_common.faxNumberGroup.name": "Fax",

  "field.contacts_common.faxNumberType.name": "Type",

  "field.contacts_common.telephoneNumber.name": "Number",

  "field.contacts_common.telephoneNumberGroup.name": "Phone",

  "field.contacts_common.telephoneNumberType.name": "Type",

  "field.contacts_common.webAddress.name": "URL",

  "field.contacts_common.webAddressGroup.name": "Web site",

  "field.contacts_common.webAddressTypeType.name": "Type",

  "field.exhibitions_common.boilerplateText.name": "Boilerplate text",

  "field.exhibitions_common.curatorialNote.name": "Curatorial note",

  "field.exhibitions_common.exhibitionNumber.name": "Exhibition number",

  "field.exhibitions_common.exhibitionObjectCase.fullName": "Object case",

  "field.exhibitions_common.exhibitionObjectCase.name": "Case",

  "field.exhibitions_common.exhibitionObjectConsCheckDate.fullName": "Object cons. check",

  "field.exhibitions_common.exhibitionObjectConsCheckDate.name": "Cons. check",

  "field.exhibitions_common.exhibitionObjectConsTreatment.fullName": "Object cons. treatment",

  "field.exhibitions_common.exhibitionObjectConsTreatment.name": "Cons. treatment",

  "field.exhibitions_common.exhibitionObjectGroup.name": "Object checklist",

  "field.exhibitions_common.exhibitionObjectMount.fullName": "Object mount",

  "field.exhibitions_common.exhibitionObjectMount.name": "Mount",

  "field.exhibitions_common.exhibitionObjectName.fullName": "Object name",

  "field.exhibitions_common.exhibitionObjectName.name": "Name",

  "field.exhibitions_common.exhibitionObjectNote.fullName": "Object note",

  "field.exhibitions_common.exhibitionObjectNote.name": "Note",

  "field.exhibitions_common.exhibitionObjectNumber.fullName": "Object number",

  "field.exhibitions_common.exhibitionObjectNumber.name": "Number",

  "field.exhibitions_common.exhibitionObjectRotation.fullName": "Object rotation",

  "field.exhibitions_common.exhibitionObjectRotation.name": "Rotation",

  "field.exhibitions_common.exhibitionObjectSection.fullName": "Object section",

  "field.exhibitions_common.exhibitionObjectSection.name": "Section",

  "field.exhibitions_common.exhibitionObjectSeqNum.fullName": "Object seq. #",

  "field.exhibitions_common.exhibitionObjectSeqNum.name": "Seq. #",

  "field.exhibitions_common.exhibitionPerson.fullName": "Working group member name",

  "field.exhibitions_common.exhibitionPerson.name": "Name",

  "field.exhibitions_common.exhibitionPersonGroup.fullName": "Working group member",

  "field.exhibitions_common.exhibitionPersonGroup.name": "Member",

  "field.exhibitions_common.exhibitionPersonRole.fullName": "Working group member role",

  "field.exhibitions_common.exhibitionPersonRole.name": "Role",

  "field.exhibitions_common.exhibitionReference.fullName": "Bibliographic reference",

  "field.exhibitions_common.exhibitionReference.name": "Reference",

  "field.exhibitions_common.exhibitionReferenceGroup.name": "Bibliographic reference",

  "field.exhibitions_common.exhibitionReferenceNote.fullName": "Bibliographic reference note",

  "field.exhibitions_common.exhibitionReferenceNote.name": "Note",

  "field.exhibitions_common.exhibitionReferenceType.fullName": "Bibliographic reference type",

  "field.exhibitions_common.exhibitionReferenceType.name": "Type",

  "field.exhibitions_common.exhibitionSectionGroup.name": "Exhibition section",

  "field.exhibitions_common.exhibitionSectionLocation.fullName": "Exhibition section location",

  "field.exhibitions_common.exhibitionSectionLocation.name": "Location",

  "field.exhibitions_common.exhibitionSectionName.fullName": "Exhibition section name",

  "field.exhibitions_common.exhibitionSectionName.name": "Name",

  "field.exhibitions_common.exhibitionSectionNote.fullName": "Exhibition section note",

  "field.exhibitions_common.exhibitionSectionNote.name": "Note",

  "field.exhibitions_common.exhibitionSectionObjects.fullName": "Exhibition section objects",

  "field.exhibitions_common.exhibitionSectionObjects.name": "Objects",

  "field.exhibitions_common.exhibitionStatus.fullName": "Exhibition status",

  "field.exhibitions_common.exhibitionStatus.name": "Status",

  "field.exhibitions_common.exhibitionStatusDate.fullName": "Exhibition status date",

  "field.exhibitions_common.exhibitionStatusDate.name": "Date",

  "field.exhibitions_common.exhibitionStatusGroup.name": "Exhibition status",

  "field.exhibitions_common.exhibitionStatusNote.fullName": "Exhibition status note",

  "field.exhibitions_common.exhibitionStatusNote.name": "Note",

  "field.exhibitions_common.galleryRotationEndDateGroup.fullName": "Gallery rotation end date",

  "field.exhibitions_common.galleryRotationEndDateGroup.name": "End date",

  "field.exhibitions_common.galleryRotationGroup.name": "Gallery rotation",

  "field.exhibitions_common.galleryRotationName.fullName": "Gallery rotation name",

  "field.exhibitions_common.galleryRotationName.name": "Name",

  "field.exhibitions_common.galleryRotationNote.fullName": "Gallery rotation note",

  "field.exhibitions_common.galleryRotationNote.name": "Note",

  "field.exhibitions_common.galleryRotationStartDateGroup.fullName": "Gallery rotation start date",

  "field.exhibitions_common.galleryRotationStartDateGroup.name": "Start date",

  "field.exhibitions_common.generalNote.name": "General note",

  "field.exhibitions_common.organizer.name": "Organizer",

  "field.exhibitions_common.planningNote.name": "Planning note",

  "field.exhibitions_common.sponsor.name": "Sponsor",

  "field.exhibitions_common.title.name": "Title",

  "field.exhibitions_common.type.name": "Type",

  "field.exhibitions_common.venue.fullName": "Venue name",

  "field.exhibitions_common.venue.name": "Name",

  "field.exhibitions_common.venueAttendance.fullName": "Venue attendance",

  "field.exhibitions_common.venueAttendance.name": "Attendance",

  "field.exhibitions_common.venueClosingDate.fullName": "Venue closing date",

  "field.exhibitions_common.venueClosingDate.name": "Closing date",

  "field.exhibitions_common.venueGroup.name": "Venue",

  "field.exhibitions_common.venueOpeningDate.fullName": "Venue opening date",

  "field.exhibitions_common.venueOpeningDate.name": "Opening date",

  "field.exhibitions_common.venueUrl.fullName": "Venue web address",

  "field.exhibitions_common.venueUrl.name": "Web address",

  "field.exhibitions_common.workingGroup.name": "Working group",

  "field.exhibitions_common.workingGroupNote.fullName": "Working group note",

  "field.exhibitions_common.workingGroupNote.name": "Note",

  "field.exhibitions_common.workingGroupTitle.fullName": "Working group title",

  "field.exhibitions_common.workingGroupTitle.name": "Title",

  "field.ext.address.addressCountry.fullName": "Address country",

  "field.ext.address.addressCountry.name": "Country",

  "field.ext.address.addressMunicipality.fullName": "Address municipality",

  "field.ext.address.addressMunicipality.name": "Municipality",

  "field.ext.address.addressPlace1.fullName": "Address line 1",

  "field.ext.address.addressPlace1.name": "Line 1",

  "field.ext.address.addressPlace2.fullName": "Address line 2",

  "field.ext.address.addressPlace2.name": "Line 2",

  "field.ext.address.addressPostCode.fullName": "Address postal code",

  "field.ext.address.addressPostCode.name": "Postal code",

  "field.ext.address.addressStateOrProvince.fullName": "Address state/province",

  "field.ext.address.addressStateOrProvince.name": "State/Province",

  "field.ext.address.addressType.fullName": "Address type",

  "field.ext.address.addressType.name": "Type",

  "field.ext.address.addrGroup.name": "Address",

  "field.ext.authItem.csid.name": "System CSID",

  "field.ext.authItem.inAuthority.name": "System authority CSID",

  "field.ext.authItem.refName.name": "System ref name",

  "field.ext.authItem.shortIdentifier.name": "System short ID",

  "field.ext.core.createdAt.name": "Created time",

  "field.ext.core.createdBy.name": "Created by",

  "field.ext.core.updatedAt.name": "Last updated time",

  "field.ext.core.updatedBy.name": "Last updated by",

  "field.ext.dimension.dimension.fullName": "Measurement dimension",

  "field.ext.dimension.dimension.name": "Dimension",

  "field.ext.dimension.dimensionNote.fullName": "Measurement note",

  "field.ext.dimension.dimensionNote.name": "Note",

  "field.ext.dimension.dimensionSubGroup.name": "Measurement",

  "field.ext.dimension.dimensionSummary.fullName": "Dimension summary",

  "field.ext.dimension.dimensionSummary.name": "Summary",

  "field.ext.dimension.measuredBy.name": "Measured by",

  "field.ext.dimension.measuredPart.fullName": "Measured part",

  "field.ext.dimension.measuredPart.name": "Part",

  "field.ext.dimension.measuredPartGroup.name": "Dimensions",

  "field.ext.dimension.measurementMethod.fullName": "Measurement method",

  "field.ext.dimension.measurementMethod.name": "Method",

  "field.ext.dimension.measurementUnit.fullName": "Measurement unit",

  "field.ext.dimension.measurementUnit.name": "Unit",

  "field.ext.dimension.value.fullName": "Measurement value",

  "field.ext.dimension.value.name": "Value",

  "field.ext.dimension.valueDate.fullName": "Measurement date",

  "field.ext.dimension.valueDate.name": "Date",

  "field.ext.dimension.valueQualifier.fullName": "Measurement qualifier",

  "field.ext.dimension.valueQualifier.name": "Qualifier",

  "field.ext.structuredDate.dateAssociation.fullName": "Association",

  "field.ext.structuredDate.dateDisplayDate.fullName": "Display date",

  "field.ext.structuredDate.dateEarliestScalarValue.fullName": "Earliest represented date",

  "field.ext.structuredDate.dateEarliestSingleCertainty.fullName": "Earliest/single certainty",

  "field.ext.structuredDate.dateEarliestSingleDay.fullName": "Earliest/single day",

  "field.ext.structuredDate.dateEarliestSingleEra.fullName": "Earliest/single era",

  "field.ext.structuredDate.dateEarliestSingleMonth.fullName": "Earliest/single month",

  "field.ext.structuredDate.dateEarliestSingleQualifier.fullName": "Earliest/single qualifier",

  "field.ext.structuredDate.dateEarliestSingleQualifierUnit.fullName": "Earliest/single qualifier unit",

  "field.ext.structuredDate.dateEarliestSingleQualifierValue.fullName": "Earliest/single qualifier value",

  "field.ext.structuredDate.dateEarliestSingleYear.fullName": "Earliest/single year",

  "field.ext.structuredDate.dateLatestCertainty.fullName": "Latest certainty",

  "field.ext.structuredDate.dateLatestDay.fullName": "Latest day",

  "field.ext.structuredDate.dateLatestEra.fullName": "Latest era",

  "field.ext.structuredDate.dateLatestMonth.fullName": "Latest month",

  "field.ext.structuredDate.dateLatestQualifier.fullName": "Latest qualifier",

  "field.ext.structuredDate.dateLatestQualifierUnit.fullName": "Latest qualifier unit",

  "field.ext.structuredDate.dateLatestQualifierValue.fullName": "Latest qualifier value",

  "field.ext.structuredDate.dateLatestScalarValue.fullName": "Latest represented date",

  "field.ext.structuredDate.dateLatestYear.fullName": "Latest year",

  "field.ext.structuredDate.dateNote.fullName": "Note",

  "field.ext.structuredDate.datePeriod.fullName": "Period",

  "field.ext.structuredDate.scalarValuesComputed.fullName": "Represented dates computed",

  "field.groups_common.groupEarliestSingleDate.name": "Earliest/single date",

  "field.groups_common.groupLatestDate.name": "Latest date",

  "field.groups_common.owner.name": "Group owner",

  "field.groups_common.responsibleDepartment.name": "Responsible department",

  "field.groups_common.scopeNote.name": "Scope note",

  "field.groups_common.title.name": "Title",

  "field.intakes_common.approvalDate.fullName": "Approval status date",

  "field.intakes_common.approvalDate.name": "Date",

  "field.intakes_common.approvalGroup.fullName": "Approval group",

  "field.intakes_common.approvalGroup.name": "Approval",

  "field.intakes_common.approvalIndividual.fullName": "Approval individual",

  "field.intakes_common.approvalIndividual.name": "Individual",

  "field.intakes_common.approvalNote.fullName": "Approval note",

  "field.intakes_common.approvalNote.name": "Note",

  "field.intakes_common.approvalStatus.fullName": "Approval status",

  "field.intakes_common.approvalStatus.name": "Status",

  "field.intakes_common.conditionCheckDate.fullName": "Condition check date",

  "field.intakes_common.conditionCheckDate.name": "Date",

  "field.intakes_common.conditionCheckerOrAssessor.fullName": "Condition check assessor",

  "field.intakes_common.conditionCheckerOrAssessor.name": "Assessor",

  "field.intakes_common.conditionCheckMethod.fullName": "Condition check method",

  "field.intakes_common.conditionCheckMethod.name": "Method",

  "field.intakes_common.conditionCheckNote.fullName": "Condition check note",

  "field.intakes_common.conditionCheckNote.name": "Note",

  "field.intakes_common.conditionCheckReason.fullName": "Condition check reason",

  "field.intakes_common.conditionCheckReason.name": "Reason",

  "field.intakes_common.conditionCheckReferenceNumber.fullName": "Condition check reference number",

  "field.intakes_common.conditionCheckReferenceNumber.name": "Reference number",

  "field.intakes_common.currentLocation.fullName": "Current location",

  "field.intakes_common.currentLocation.name": "Location",

  "field.intakes_common.currentLocationFitness.fullName": "Current location fitness",

  "field.intakes_common.currentLocationFitness.name": "Fitness",

  "field.intakes_common.currentLocationGroup.name": "Current location",

  "field.intakes_common.currentLocationNote.fullName": "Current location note",

  "field.intakes_common.currentLocationNote.name": "Note",

  "field.intakes_common.currentOwner.name": "Current owner",

  "field.intakes_common.depositor.fullName": "Depositor name",

  "field.intakes_common.depositor.name": "Name",

  "field.intakes_common.depositorGroup.name": "Depositor",

  "field.intakes_common.despositorsRequirements.fullName": "Depositor requirements",

  "field.intakes_common.despositorsRequirements.name": "Requirements",

  "field.intakes_common.entryDate.name": "Entry date",

  "field.intakes_common.entryMethod.name": "Entry method",

  "field.intakes_common.entryNote.name": "Entry note",

  "field.intakes_common.entryNumber.name": "Entry number",

  "field.intakes_common.entryReason.name": "Entry reason",

  "field.intakes_common.fieldCollectionDate.name": "Field collection date",

  "field.intakes_common.fieldCollectionEventName.name": "Field collection event name",

  "field.intakes_common.fieldCollectionMethod.name": "Field collection method",

  "field.intakes_common.fieldCollectionNote.name": "Field collection note",

  "field.intakes_common.fieldCollectionNumber.name": "Field collection number",

  "field.intakes_common.fieldCollectionPlace.name": "Field collection place",

  "field.intakes_common.fieldCollectionSource.name": "Field collection source",

  "field.intakes_common.fieldCollector.name": "Field collector",

  "field.intakes_common.insuranceNote.fullName": "Insurance note",

  "field.intakes_common.insuranceNote.name": "Note",

  "field.intakes_common.insurancePolicyNumber.fullName": "Insurance policy number",

  "field.intakes_common.insurancePolicyNumber.name": "Policy number",

  "field.intakes_common.insuranceReferenceNumber.fullName": "Insurance reference number",

  "field.intakes_common.insuranceReferenceNumber.name": "Reference number",

  "field.intakes_common.insuranceRenewalDate.fullName": "Insurance renewal date",

  "field.intakes_common.insuranceRenewalDate.name": "Renewal date",

  "field.intakes_common.insurer.name": "Insurer",

  "field.intakes_common.locationDate.name": "Location date",

  "field.intakes_common.normalLocation.name": "Normal location",

  "field.intakes_common.packingNote.name": "Packing note",

  "field.intakes_common.returnDate.name": "Return date",

  "field.intakes_common.valuationReferenceNumber.fullName": "Valuation reference number",

  "field.intakes_common.valuationReferenceNumber.name": "Reference number",

  "field.intakes_common.valuer.name": "Valuer",

  "field.loansin_common.borrowersAuthorizationDate.fullName": "Borrower authorization date",

  "field.loansin_common.borrowersAuthorizationDate.name": "Authorization date",

  "field.loansin_common.borrowersAuthorizer.fullName": "Borrower authorizer",

  "field.loansin_common.borrowersAuthorizer.name": "Authorizer",

  "field.loansin_common.borrowersContact.fullName": "Borrower contact",

  "field.loansin_common.borrowersContact.name": "Contact",

  "field.loansin_common.lender.fullName": "Lender name",

  "field.loansin_common.lender.name": "Name",

  "field.loansin_common.lenderGroup.name": "Lender",

  "field.loansin_common.lendersAuthorizationDate.fullName": "Lender authorization date",

  "field.loansin_common.lendersAuthorizationDate.name": "Authorization date",

  "field.loansin_common.lendersAuthorizer.fullName": "Lender authorizer",

  "field.loansin_common.lendersAuthorizer.name": "Authorizer",

  "field.loansin_common.lendersContact.fullName": "Lender contact",

  "field.loansin_common.lendersContact.name": "Contact",

  "field.loansin_common.loanGroup.fullName": "Loan status group",

  "field.loansin_common.loanGroup.name": "Group",

  "field.loansin_common.loanInConditions.name": "Conditions of loan",

  "field.loansin_common.loanInDate.name": "Loan in date",

  "field.loansin_common.loanIndividual.fullName": "Loan status individual",

  "field.loansin_common.loanIndividual.name": "Individual",

  "field.loansin_common.loanInNote.name": "Note",

  "field.loansin_common.loanInNumber.name": "Loan in number",

  "field.loansin_common.loanPurpose.name": "Loan purpose",

  "field.loansin_common.loanRenewalApplicationDate.name": "Loan renewal application date",

  "field.loansin_common.loanReturnDate.name": "Loan return date",

  "field.loansin_common.loanStatus.fullName": "Loan status",

  "field.loansin_common.loanStatus.name": "Status",

  "field.loansin_common.loanStatusDate.fullName": "Loan status date",

  "field.loansin_common.loanStatusDate.name": "Date",

  "field.loansin_common.loanStatusGroup.name": "Loan status",

  "field.loansin_common.loanStatusNote.fullName": "Loan status note",

  "field.loansin_common.loanStatusNote.name": "Note",

  "field.loansout_common.borrower.fullName": "Borrower name",

  "field.loansout_common.borrower.name": "Name",

  "field.loansout_common.borrowersAuthorizationDate.fullName": "Borrower authorization date",

  "field.loansout_common.borrowersAuthorizationDate.name": "Authorization date",

  "field.loansout_common.borrowersAuthorizer.fullName": "Borrower authorizer",

  "field.loansout_common.borrowersAuthorizer.name": "Authorizer",

  "field.loansout_common.borrowersContact.fullName": "Borrower contact",

  "field.loansout_common.borrowersContact.name": "Contact",

  "field.loansout_common.lendersAuthorizationDate.fullName": "Lender authorization date",

  "field.loansout_common.lendersAuthorizationDate.name": "Authorization date",

  "field.loansout_common.lendersAuthorizer.fullName": "Lender authorizer",

  "field.loansout_common.lendersAuthorizer.name": "Authorizer",

  "field.loansout_common.lendersContact.fullName": "Lender contact",

  "field.loansout_common.lendersContact.name": "Contact",

  "field.loansout_common.loanGroup.fullName": "Loan status group",

  "field.loansout_common.loanGroup.name": "Group",

  "field.loansout_common.loanIndividual.fullName": "Loan status individual",

  "field.loansout_common.loanIndividual.name": "Individual",

  "field.loansout_common.loanOutDate.name": "Loan out date",

  "field.loansout_common.loanOutNote.name": "Note",

  "field.loansout_common.loanOutNumber.name": "Loan out number",

  "field.loansout_common.loanPurpose.name": "Loan purpose",

  "field.loansout_common.loanRenewalApplicationDate.name": "Loan renewal application date",

  "field.loansout_common.loanReturnDate.name": "Loan return date",

  "field.loansout_common.loanStatus.fullName": "Loan status",

  "field.loansout_common.loanStatus.name": "Status",

  "field.loansout_common.loanStatusDate.fullName": "Loan status date",

  "field.loansout_common.loanStatusDate.name": "Date",

  "field.loansout_common.loanStatusGroup.name": "Loan status",

  "field.loansout_common.loanStatusNote.fullName": "Loan status note",

  "field.loansout_common.loanStatusNote.name": "Note",

  "field.loansout_common.specialConditionsOfLoan.name": "Conditions of loan",

  "field.locations_common.accessNote.name": "Access note",

  "field.locations_common.address.name": "Address",

  "field.locations_common.conditionNote.fullName": "Condition note",

  "field.locations_common.conditionNote.name": "Note",

  "field.locations_common.conditionNoteDate.fullName": "Condition note date",

  "field.locations_common.conditionNoteDate.name": "Date",

  "field.locations_common.locationType.name": "Storage location type",

  "field.locations_common.locTermGroup.name": "Term",

  "field.locations_common.locTermGroupList.required": "At least one term display name is required. Please enter a value.",

  "field.locations_common.securityNote.name": "Security note",

  "field.locations_common.termDisplayName.fullName": "Term display name",

  "field.locations_common.termDisplayName.name": "Display name",

  "field.locations_common.termFlag.fullName": "Term flag",

  "field.locations_common.termFlag.name": "Flag",

  "field.locations_common.termLanguage.fullName": "Term language",

  "field.locations_common.termLanguage.name": "Language",

  "field.locations_common.termName.fullName": "Term name",

  "field.locations_common.termName.name": "Name",

  "field.locations_common.termPrefForLang.fullName": "Term preferred for lang",

  "field.locations_common.termPrefForLang.name": "Preferred for lang",

  "field.locations_common.termQualifier.fullName": "Term qualifier",

  "field.locations_common.termQualifier.name": "Qualifier",

  "field.locations_common.termSource.fullName": "Term source name",

  "field.locations_common.termSource.groupName": "Source name",

  "field.locations_common.termSource.name": "Name",

  "field.locations_common.termSourceDetail.fullName": "Term source detail",

  "field.locations_common.termSourceDetail.groupName": "Source detail",

  "field.locations_common.termSourceDetail.name": "Detail",

  "field.locations_common.termSourceID.fullName": "Term source ID",

  "field.locations_common.termSourceID.groupName": "Source ID",

  "field.locations_common.termSourceID.name": "ID",

  "field.locations_common.termSourceNote.fullName": "Term source note",

  "field.locations_common.termSourceNote.groupName": "Source note",

  "field.locations_common.termSourceNote.name": "Note",

  "field.locations_common.termStatus.fullName": "Term status",

  "field.locations_common.termStatus.name": "Status",

  "field.locations_common.termType.fullName": "Term type",

  "field.locations_common.termType.name": "Type",

  "field.media_common.contributor.name": "Contributor",

  "field.media_common.copyrightStatement.name": "Copyright statement",

  "field.media_common.coverage.name": "Coverage",

  "field.media_common.creator.name": "Creator",

  "field.media_common.dateGroup.name": "Date",

  "field.media_common.description.name": "Description",

  "field.media_common.externalUrl.name": "External URL",

  "field.media_common.identificationNumber.name": "Identification number",

  "field.media_common.language.name": "Language",

  "field.media_common.publisher.name": "Publisher",

  "field.media_common.publishTo.name": "Publish to",

  "field.media_common.relation.name": "Relation",

  "field.media_common.rightsHolder.name": "Rights holder",

  "field.media_common.source.name": "Source",

  "field.media_common.subject.name": "Subject",

  "field.media_common.title.name": "Title",

  "field.media_common.type.name": "Type",

  "field.movements_common.currentLocation.fullName": "Current location",

  "field.movements_common.currentLocation.name": "Location",

  "field.movements_common.currentLocationFitness.fullName": "Current location fitness",

  "field.movements_common.currentLocationFitness.name": "Fitness",

  "field.movements_common.currentLocationNote.fullName": "Current location note",

  "field.movements_common.currentLocationNote.name": "Note",

  "field.movements_common.frequencyForInventory.name": "Inventory frequency",

  "field.movements_common.inventoryActionRequired.name": "Inventory action required",

  "field.movements_common.inventoryContact.fullName": "Inventory contact",

  "field.movements_common.inventoryContact.name": "Contact",

  "field.movements_common.inventoryDate.name": "Inventory date",

  "field.movements_common.inventoryNote.fullName": "Inventory note",

  "field.movements_common.inventoryNote.name": "Note",

  "field.movements_common.locationDate.name": "Location date",

  "field.movements_common.movementContact.fullName": "Movement contact",

  "field.movements_common.movementContact.name": "Contact",

  "field.movements_common.movementMethod.name": "Movement method",

  "field.movements_common.movementNote.fullName": "Movement note",

  "field.movements_common.movementNote.name": "Note",

  "field.movements_common.movementReferenceNumber.name": "Reference number",

  "field.movements_common.nextInventoryDate.name": "Next inventory date",

  "field.movements_common.normalLocation.name": "Normal location",

  "field.movements_common.plannedRemovalDate.name": "Planned removal date",

  "field.movements_common.reasonForMove.name": "Reason for move",

  "field.movements_common.removalDate.name": "Removal date",

  "field.objectexit_common.authorizationDate.name": "Authorization date",

  "field.objectexit_common.currentOwner.name": "Current owner",

  "field.objectexit_common.deacApprovalGroup.name": "Deaccession approval",

  "field.objectexit_common.deaccessionApprovalDate.fullName": "Deaccession approval status date",

  "field.objectexit_common.deaccessionApprovalDate.name": "Date",

  "field.objectexit_common.deaccessionApprovalGroup.fullName": "Deaccession approval group",

  "field.objectexit_common.deaccessionApprovalGroup.name": "Group",

  "field.objectexit_common.deaccessionApprovalIndividual.fullName": "Deaccession approval individual",

  "field.objectexit_common.deaccessionApprovalIndividual.name": "Individual",

  "field.objectexit_common.deaccessionApprovalNote.fullName": "Deaccession approval note",

  "field.objectexit_common.deaccessionApprovalNote.name": "Note",

  "field.objectexit_common.deaccessionApprovalStatus.fullName": "Deaccession approval status",

  "field.objectexit_common.deaccessionApprovalStatus.name": "Status",

  "field.objectexit_common.deaccessionAuthorizer.name": "Deaccession authorizer",

  "field.objectexit_common.deaccessionDate.name": "Deaccession date",

  "field.objectexit_common.depositor.name": "Depositor",

  "field.objectexit_common.displosalNewObjectNumber.name": "Disposal new object number",

  "field.objectexit_common.displosalNote.name": "Disposal note",

  "field.objectexit_common.displosalProvisos.name": "Disposal provisos",

  "field.objectexit_common.displosalReason.name": "Disposal reason",

  "field.objectexit_common.displosalValue.fullName": "Disposal value",

  "field.objectexit_common.displosalValue.name": "Value",

  "field.objectexit_common.disposalCurrency.fullName": "Disposal currency",

  "field.objectexit_common.disposalCurrency.name": "Currency",

  "field.objectexit_common.disposalDate.name": "Disposal date",

  "field.objectexit_common.disposalMethod.name": "Disposal method",

  "field.objectexit_common.disposalProposedRecipient.name": "Disposal proposed recipient",

  "field.objectexit_common.disposalRecipient.name": "Disposal recipient",

  "field.objectexit_common.exitDateGroup.name": "Exit date",

  "field.objectexit_common.exitMethod.name": "Exit method",

  "field.objectexit_common.exitNote.name": "Exit note",

  "field.objectexit_common.exitNumber.name": "Exit number",

  "field.objectexit_common.exitQuantity.name": "Exit quantity",

  "field.objectexit_common.exitReason.name": "Exit reason",

  "field.objectexit_common.groupDisplosalValue.name": "Value",

  "field.objectexit_common.groupDisposalCurrency.fullName": "Group disposal currency",

  "field.objectexit_common.groupDisposalCurrency.name": "Currency",

  "field.objectexit_common.groupDisposalValue.fullName": "Group disposal value",

  "field.objectexit_common.packingNote.name": "Packing note",

  "field.organizations_common.additionsToName.fullName": "Term name addition",

  "field.organizations_common.additionsToName.groupName": "Name addition",

  "field.organizations_common.additionsToName.name": "Addition",

  "field.organizations_common.contactDateGroup.fullName": "Contact date",

  "field.organizations_common.contactDateGroup.groupName": "Date",

  "field.organizations_common.contactDateGroup.name": "Date",

  "field.organizations_common.contactEndDateGroup.fullName": "Contact end date",

  "field.organizations_common.contactEndDateGroup.groupName": "End date",

  "field.organizations_common.contactEndDateGroup.name": "End date",

  "field.organizations_common.contactGroup.name": "Contact person",

  "field.organizations_common.contactName.fullName": "Contact name",

  "field.organizations_common.contactName.name": "Name",

  "field.organizations_common.contactRole.fullName": "Contact role",

  "field.organizations_common.contactRole.name": "Role",

  "field.organizations_common.contactStatus.fullName": "Contact status",

  "field.organizations_common.contactStatus.name": "Status",

  "field.organizations_common.dissolutionDateGroup.name": "Dissolution date",

  "field.organizations_common.foundingDateGroup.name": "Foundation date",

  "field.organizations_common.foundingPlace.name": "Foundation place",

  "field.organizations_common.function.name": "Function",

  "field.organizations_common.group.name": "Group",

  "field.organizations_common.historyNote.name": "History",

  "field.organizations_common.mainBodyName.fullName": "Term main body name",

  "field.organizations_common.mainBodyName.name": "Main body name",

  "field.organizations_common.organizationRecordType.name": "Organization type",

  "field.organizations_common.orgTermGroup.name": "Term",

  "field.organizations_common.orgTermGroupList.required": "At least one term display name is required. Please enter a value.",

  "field.organizations_common.termDisplayName.fullName": "Term display name",

  "field.organizations_common.termDisplayName.name": "Display name",

  "field.organizations_common.termFlag.fullName": "Term flag",

  "field.organizations_common.termFlag.name": "Flag",

  "field.organizations_common.termLanguage.fullName": "Term language",

  "field.organizations_common.termLanguage.name": "Language",

  "field.organizations_common.termName.fullName": "Term name",

  "field.organizations_common.termName.name": "Name",

  "field.organizations_common.termPrefForLang.fullName": "Term preferred for lang",

  "field.organizations_common.termPrefForLang.name": "Preferred for lang",

  "field.organizations_common.termQualifier.fullName": "Term qualifier",

  "field.organizations_common.termQualifier.name": "Qualifier",

  "field.organizations_common.termSource.fullName": "Term source name",

  "field.organizations_common.termSource.groupName": "Source name",

  "field.organizations_common.termSource.name": "Name",

  "field.organizations_common.termSourceDetail.fullName": "Term source detail",

  "field.organizations_common.termSourceDetail.groupName": "Source detail",

  "field.organizations_common.termSourceDetail.name": "Detail",

  "field.organizations_common.termSourceID.fullName": "Term source ID",

  "field.organizations_common.termSourceID.groupName": "Source ID",

  "field.organizations_common.termSourceID.name": "ID",

  "field.organizations_common.termSourceNote.fullName": "Term source note",

  "field.organizations_common.termSourceNote.groupName": "Source note",

  "field.organizations_common.termSourceNote.name": "Note",

  "field.organizations_common.termStatus.fullName": "Term status",

  "field.organizations_common.termStatus.name": "Status",

  "field.organizations_common.termType.fullName": "Term type",

  "field.organizations_common.termType.name": "Type",

  "field.persons_common.bioNote.name": "Biographical note",

  "field.persons_common.birthDateGroup.name": "Birth date",

  "field.persons_common.birthPlace.name": "Place of birth",

  "field.persons_common.conditionGroup.name": "Condition note",

  "field.persons_common.deathDateGroup.name": "Death date",

  "field.persons_common.deathPlace.name": "Place of death",

  "field.persons_common.forename.fullName": "Term forename",

  "field.persons_common.forename.name": "Forename",

  "field.persons_common.gender.name": "Gender",

  "field.persons_common.group.name": "Group",

  "field.persons_common.initials.fullName": "Term initials",

  "field.persons_common.initials.name": "Initials",

  "field.persons_common.middleName.fullName": "Term middle name",

  "field.persons_common.middleName.name": "Middle name",

  "field.persons_common.nameAdditions.fullName": "Term name addition",

  "field.persons_common.nameAdditions.groupName": "Name addition",

  "field.persons_common.nameAdditions.name": "Addition",

  "field.persons_common.nameNote.name": "Name note",

  "field.persons_common.nationality.name": "Nationality",

  "field.persons_common.occupation.name": "Occupation",

  "field.persons_common.personRecordType.name": "Person type",

  "field.persons_common.personTermGroup.name": "Term",

  "field.persons_common.personTermGroupList.required": "At least one term display name is required. Please enter a value.",

  "field.persons_common.salutation.fullName": "Term salutation",

  "field.persons_common.salutation.name": "Salutation",

  "field.persons_common.schoolOrStyle.name": "School/style",

  "field.persons_common.surname.fullName": "Term surname",

  "field.persons_common.surname.name": "Surname",

  "field.persons_common.termDisplayName.fullName": "Term display name",

  "field.persons_common.termDisplayName.name": "Display name",

  "field.persons_common.termFlag.fullName": "Term flag",

  "field.persons_common.termFlag.name": "Flag",

  "field.persons_common.termFormattedDisplayName.fullName": "Term formatted display name",

  "field.persons_common.termFormattedDisplayName.name": "Formatted display name",

  "field.persons_common.termLanguage.fullName": "Term language",

  "field.persons_common.termLanguage.name": "Language",

  "field.persons_common.termName.fullName": "Term name",

  "field.persons_common.termName.name": "Name",

  "field.persons_common.termPrefForLang.fullName": "Term preferred for lang",

  "field.persons_common.termPrefForLang.name": "Preferred for lang",

  "field.persons_common.termQualifier.fullName": "Term qualifier",

  "field.persons_common.termQualifier.name": "Qualifier",

  "field.persons_common.termSource.fullName": "Term source name",

  "field.persons_common.termSource.groupName": "Source name",

  "field.persons_common.termSource.name": "Name",

  "field.persons_common.termSourceDetail.fullName": "Term source detail",

  "field.persons_common.termSourceDetail.groupName": "Source detail",

  "field.persons_common.termSourceDetail.name": "Detail",

  "field.persons_common.termSourceID.fullName": "Term source ID",

  "field.persons_common.termSourceID.groupName": "Source ID",

  "field.persons_common.termSourceID.name": "ID",

  "field.persons_common.termSourceNote.fullName": "Term source note",

  "field.persons_common.termSourceNote.groupName": "Source note",

  "field.persons_common.termSourceNote.name": "Note",

  "field.persons_common.termStatus.fullName": "Term status",

  "field.persons_common.termStatus.name": "Status",

  "field.persons_common.termType.fullName": "Term type",

  "field.persons_common.termType.name": "Type",

  "field.persons_common.title.fullName": "Term title",

  "field.persons_common.title.name": "Title",

  "field.places_common.coordPrecision.fullName": "Georeference precision",

  "field.places_common.coordPrecision.name": "Precision",

  "field.places_common.coordUncertaintyInMeters.fullName": "Georeference uncertainty (m)",

  "field.places_common.coordUncertaintyInMeters.name": "Uncertainty (m)",

  "field.places_common.decimalLatitude.fullName": "Georeference decimal latitude",

  "field.places_common.decimalLatitude.name": "Decimal latitude",

  "field.places_common.decimalLongitude.fullName": "Georeference decimal longitude",

  "field.places_common.decimalLongitude.name": "Decimal longitude",

  "field.places_common.footprintSpatialFit.fullName": "Georeference footprint spatial fit",

  "field.places_common.footprintSpatialFit.name": "Footprint spatial fit",

  "field.places_common.footprintSRS.fullName": "Georeference footprint SRS",

  "field.places_common.footprintSRS.name": "Footprint SRS",

  "field.places_common.footprintWKT.fullName": "Georeference footprint WKT",

  "field.places_common.footprintWKT.name": "Footprint WKT",

  "field.places_common.geodeticDatum.fullName": "Georeference datum",

  "field.places_common.geodeticDatum.name": "Datum",

  "field.places_common.geoRefDateGroup.fullName": "Georeference date",

  "field.places_common.geoRefDateGroup.name": "Date",

  "field.places_common.geoReferencedBy.name": "Georeferenced by",

  "field.places_common.geoRefPlaceName.fullName": "Georeference place name",

  "field.places_common.geoRefPlaceName.name": "Place name",

  "field.places_common.geoRefProtocol.fullName": "Georeference protocol",

  "field.places_common.geoRefProtocol.name": "Protocol",

  "field.places_common.geoRefRemarks.fullName": "Georeference remarks",

  "field.places_common.geoRefRemarks.name": "Remarks",

  "field.places_common.geoRefSource.fullName": "Georeference source",

  "field.places_common.geoRefSource.name": "Source",

  "field.places_common.geoRefVerificationStatus.fullName": "Georeference verification",

  "field.places_common.geoRefVerificationStatus.name": "Verification",

  "field.places_common.historicalStatus.fullName": "Term historical status",

  "field.places_common.historicalStatus.name": "Historical status",

  "field.places_common.maxDepthInMeters.name": "Max depth (m)",

  "field.places_common.maxDistanceAboveSurfaceInMeters.name": "Max distance above surface (m)",

  "field.places_common.maxElevationInMeters.name": "Max elevation (m)",

  "field.places_common.minDepthInMeters.name": "Min depth (m)",

  "field.places_common.minDistanceAboveSurfaceInMeters.name": "Min distance above surface (m)",

  "field.places_common.minElevationInMeters.name": "Min elevation (m)",

  "field.places_common.nameAbbrev.fullName": "Term abbreviation",

  "field.places_common.nameAbbrev.name": "Abbreviation",

  "field.places_common.nameDateGroup.fullName": "Term date",

  "field.places_common.nameDateGroup.name": "Date",

  "field.places_common.nameNote.fullName": "Term note",

  "field.places_common.nameNote.name": "Note",

  "field.places_common.owner.name": "Owner",

  "field.places_common.ownershipDateGroup.fullName": "Ownership date",

  "field.places_common.ownershipDateGroup.name": "Date",

  "field.places_common.ownershipNote.fullName": "Ownership note",

  "field.places_common.ownershipNote.name": "Note",

  "field.places_common.placeGeoRefGroup.fullName": "Georeference",

  "field.places_common.placeNote.name": "Place note",

  "field.places_common.placeOwnerGroup.name": "Ownership",

  "field.places_common.placeSource.name": "Place source",

  "field.places_common.placeTermGroup.name": "Term",

  "field.places_common.placeTermGroupList.required": "At least one term display name is required. Please enter a value.",

  "field.places_common.placeType.name": "Place type",

  "field.places_common.pointRadiusSpatialFit.fullName": "Georeference point radius spatial fit",

  "field.places_common.pointRadiusSpatialFit.name": "Point radius spatial fit",

  "field.places_common.termDisplayName.fullName": "Term display name",

  "field.places_common.termDisplayName.name": "Display name",

  "field.places_common.termFlag.fullName": "Term flag",

  "field.places_common.termFlag.name": "Flag",

  "field.places_common.termLanguage.fullName": "Term language",

  "field.places_common.termLanguage.name": "Language",

  "field.places_common.termName.fullName": "Term name",

  "field.places_common.termName.name": "Name",

  "field.places_common.termPrefForLang.fullName": "Term preferred for lang",

  "field.places_common.termPrefForLang.name": "Preferred for lang",

  "field.places_common.termQualifier.fullName": "Term qualifier",

  "field.places_common.termQualifier.name": "Qualifier",

  "field.places_common.termSource.fullName": "Term source name",

  "field.places_common.termSource.groupName": "Source name",

  "field.places_common.termSource.name": "Name",

  "field.places_common.termSourceDetail.fullName": "Term source detail",

  "field.places_common.termSourceDetail.groupName": "Source detail",

  "field.places_common.termSourceDetail.name": "Detail",

  "field.places_common.termSourceID.fullName": "Term source ID",

  "field.places_common.termSourceID.groupName": "Source ID",

  "field.places_common.termSourceID.name": "ID",

  "field.places_common.termSourceNote.fullName": "Term source note",

  "field.places_common.termSourceNote.groupName": "Source note",

  "field.places_common.termSourceNote.name": "Note",

  "field.places_common.termStatus.fullName": "Term status",

  "field.places_common.termStatus.name": "Status",

  "field.places_common.termType.fullName": "Term type",

  "field.places_common.termType.name": "Type",

  "field.places_common.vCoordinates.name": "Verbatim coords",

  "field.places_common.vCoordSource.name": "Coordinate source",

  "field.places_common.vCoordSourceRefId.name": "Coordinate source detail",

  "field.places_common.vCoordSys.name": "Coordinate system",

  "field.places_common.vDepth.name": "Depth",

  "field.places_common.vDistanceAboveSurface.name": "Distance above surface",

  "field.places_common.vElevation.name": "Elevation",

  "field.places_common.vLatitude.name": "Verbatim latitude",

  "field.places_common.vLongitude.name": "Verbatim longitude",

  "field.places_common.vSpatialReferenceSystem.name": "Spatial ref system",

  "field.places_common.vUnitofMeasure.name": "Unit of measure",

  "field.report.systematicInventory.endLocation.name": "To location",

  "field.report.systematicInventory.startLocation.name": "From location",

  "field.reports_common.filename.name": "Jasper report file",

  "field.reports_common.forDocType.name": "For record type",

  "field.reports_common.name.name": "Name",

  "field.reports_common.notes.name": "Description",

  "field.reports_common.outputMIME.name": "Default output format",

  "field.reports_common.supportsDocList.name": "Record list",

  "field.reports_common.supportsGroup.name": "Group",

  "field.reports_common.supportsNoContext.name": "All records",

  "field.reports_common.supportsSingleDoc.name": "Single record",

  "field.structuredDate.dateAssociation": "Association",

  "field.structuredDate.dateCertainty": "Certainty",

  "field.structuredDate.dateDay": "Day",

  "field.structuredDate.dateEra": "Era",

  "field.structuredDate.dateMonth": "Month",

  "field.structuredDate.dateNote": "Note",

  "field.structuredDate.datePeriod": "Period",

  "field.structuredDate.dateQualifier": "Qualifier",

  "field.structuredDate.dateQualifierUnit": "Unit",

  "field.structuredDate.dateQualifierValue": "Value",

  "field.structuredDate.dateYear": "Year",

  "field.structuredDate.earliestSingle": "Earliest/Single",

  "field.structuredDate.latest": "Latest",

  "field.uoc_common.authorizationDate.fullName": "Authorization date",

  "field.uoc_common.authorizationDate.name": "Date",

  "field.uoc_common.authorizationNote.fullName": "Authorization note",

  "field.uoc_common.authorizationNote.name": "Note",

  "field.uoc_common.authorizedBy.name": "Authorized by",

  "field.uoc_common.endDate.name": "End date",

  "field.uoc_common.location.name": "Location",

  "field.uoc_common.method.name": "Method",

  "field.uoc_common.note.name": "Note",

  "field.uoc_common.provisos.name": "Provisos",

  "field.uoc_common.referenceNumber.name": "Reference number",

  "field.uoc_common.result.name": "Result",

  "field.uoc_common.startSingleDate.name": "Start/single date",

  "field.uoc_common.title.name": "Title",

  "field.uoc_common.user.fullName": "User name",

  "field.uoc_common.user.name": "Name",

  "field.uoc_common.userGroup.name": "User",

  "field.uoc_common.userType.fullName": "User type",

  "field.uoc_common.userType.name": "Type",

  "field.valuationcontrols_common.valuationcontrolRefNumber.name": "Reference number",

  "field.valuationcontrols_common.valueAmount.fullName": "Amount value",

  "field.valuationcontrols_common.valueAmount.name": "Value",

  "field.valuationcontrols_common.valueAmounts.name": "Amount",

  "field.valuationcontrols_common.valueCurrency.fullName": "Amount currency",

  "field.valuationcontrols_common.valueCurrency.name": "Currency",

  "field.valuationcontrols_common.valueDate.name": "Date",

  "field.valuationcontrols_common.valueNote.name": "Note",

  "field.valuationcontrols_common.valueRenewalDate.name": "Renewal date",

  "field.valuationcontrols_common.valueSource.name": "Source",

  "field.valuationcontrols_common.valueType.name": "Type",

  "field.vocabularies_common.description.name": "Description",

  "field.vocabularies_common.displayName.name": "Name",

  "field.vocabularies_common.source.name": "Source",

  "field.vocabularyitems_common.description.name": "Description",

  "field.vocabularyitems_common.displayName.fullName": "Term name",

  "field.vocabularyitems_common.displayName.name": "Name",

  "field.vocabularyitems_common.list-item.name": "Terms",

  "field.vocabularyitems_common.source.name": "Source",

  "field.vocabularyitems_common.sourcePage.name": "Source page",

  "field.vocabularyitems_common.termStatus.name": "Status",

  "field.works_common.creator.fullName": "Creator name",

  "field.works_common.creator.name": "Name",

  "field.works_common.creatorGroup.name": "Creator",

  "field.works_common.creatorType.fullName": "Creator type",

  "field.works_common.creatorType.name": "Type",

  "field.works_common.publisher.fullName": "Publisher name",

  "field.works_common.publisher.name": "Name",

  "field.works_common.publisherGroup.name": "Publisher",

  "field.works_common.publisherType.fullName": "Publisher type",

  "field.works_common.publisherType.name": "Type",

  "field.works_common.termDisplayName.fullName": "Term display name",

  "field.works_common.termDisplayName.name": "Display name",

  "field.works_common.termFlag.fullName": "Term flag",

  "field.works_common.termFlag.name": "Flag",

  "field.works_common.termLanguage.fullName": "Term language",

  "field.works_common.termLanguage.name": "Language",

  "field.works_common.termName.fullName": "Term name",

  "field.works_common.termName.name": "Name",

  "field.works_common.termPrefForLang.fullName": "Term preferred for lang",

  "field.works_common.termPrefForLang.name": "Preferred for lang",

  "field.works_common.termQualifier.fullName": "Term qualifier",

  "field.works_common.termQualifier.name": "Qualifier",

  "field.works_common.termSource.fullName": "Term source name",

  "field.works_common.termSource.groupName": "Source name",

  "field.works_common.termSource.name": "Name",

  "field.works_common.termSourceDetail.fullName": "Term source detail",

  "field.works_common.termSourceDetail.groupName": "Source detail",

  "field.works_common.termSourceDetail.name": "Detail",

  "field.works_common.termSourceID.fullName": "Term source ID",

  "field.works_common.termSourceID.groupName": "Source ID",

  "field.works_common.termSourceID.name": "ID",

  "field.works_common.termSourceNote.fullName": "Term source note",

  "field.works_common.termSourceNote.groupName": "Source note",

  "field.works_common.termSourceNote.name": "Note",

  "field.works_common.termStatus.fullName": "Term status",

  "field.works_common.termStatus.name": "Status",

  "field.works_common.termType.fullName": "Term type",

  "field.works_common.termType.name": "Type",

  "field.works_common.workDateGroup.name": "Work date",

  "field.works_common.workHistoryNote.name": "History note",

  "field.works_common.workTermGroup.name": "Term",

  "field.works_common.workTermGroupList.required": "At least one term display name is required. Please enter a value.",

  "field.works_common.workType.name": "Work type",

  "footer.about": "About CollectionSpace",

  // The name of the application, displayed in the footer.
  "footer.appName": "UI",

  "footer.copyright": "Copyright © {startYear}–{endYear} CollectionSpace",

  "footer.feedback": "Leave Feedback",

  "footer.feedbackUrl": "http://www.collectionspace.org/contact",

  // Message shown in the footer when a connection to the CollectionSpace server can not be established.
  "footer.notConnected": "Not connected to {serverUrl}",

  "footer.release": "Release {version}",

  "footer.version": "{name} version {version}",

  "form.account.default.name": "Standard Template",

  "form.acquisition.default.name": "Standard Template",

  "form.authrole.default.name": "Standard Template",

  "form.batch.default.name": "Standard Template",

  "form.blob.default.name": "Standard Template",

  "form.blob.upload.name": "Upload Template",

  "form.blob.view.name": "View Template",

  "form.citation.default.name": "Standard Template",

  "form.citation.mini.name": "Mini Template",

  "form.collectionobject.default.name": "Standard Template",

  "form.collectionobject.inventory.name": "Inventory Template",

  "form.collectionobject.mini.name": "Mini Template",

  "form.collectionobject.photo.name": "Photograph Template",

  "form.concept.default.name": "Standard Template",

  "form.concept.mini.name": "Mini Template",

  "form.conditioncheck.default.name": "Standard Template",

  "form.conservation.default.name": "Standard Template",

  "form.contact.default.name": "Standard Template",

  "form.exhibition.default.name": "Standard Template",

  "form.group.default.name": "Standard Template",

  "form.intake.default.name": "Standard Template",

  "form.intake.doorstep.name": "Doorstep Donation Template",

  "form.loanin.default.name": "Standard Template",

  "form.loanout.default.name": "Standard Template",

  "form.location.default.name": "Standard Template",

  "form.location.mini.name": "Mini Template",

  "form.media.default.name": "Standard Template",

  "form.movement.default.name": "Standard Template",

  "form.objectexit.default.name": "Standard Template",

  "form.organization.default.name": "Standard Template",

  "form.organization.mini.name": "Mini Template",

  "form.person.default.name": "Standard Template",

  "form.person.mini.name": "Mini Template",

  "form.place.default.name": "Standard Template",

  "form.place.mini.name": "Mini Template",

  "form.report.default.name": "Standard Template",

  "form.uoc.default.name": "Standard Template",

  "form.valuation.default.name": "Standard Template",

  "form.vocabulary.default.name": "Standard Template",

  "form.work.default.name": "Standard Template",

  "form.work.mini.name": "Mini Template",

  "GroupConditionInput.groupInput.compactLabel": "In {groupInput}:",

  "GroupConditionInput.groupInput.pendingLabel": "In a single {groupInput} ...",

  "GroupConditionInput.groupInput.selectedLabel": "In a single {groupInput} group:",

  "hierarchyInput.citation.children": "Narrower citations",

  "hierarchyInput.citation.parent": "Broader citation",

  "hierarchyInput.citation.siblings": "Adjacent citations",

  "hierarchyInput.collectionobject.childName": "Object",

  "hierarchyInput.collectionobject.children": "Component objects",

  "hierarchyInput.collectionobject.childType": "Type",

  "hierarchyInput.collectionobject.parent": "Broader object",

  "hierarchyInput.collectionobject.parentName": "Object",

  "hierarchyInput.collectionobject.parentType": "Type",

  "hierarchyInput.collectionobject.siblings": "Adjacent objects",

  "hierarchyInput.concept.children": "Narrower concepts",

  "hierarchyInput.concept.parent": "Broader concept",

  "hierarchyInput.concept.siblings": "Adjacent concepts",

  "hierarchyInput.location.children": "Narrower locations",

  "hierarchyInput.location.parent": "Broader location",

  "hierarchyInput.location.siblings": "Adjacent locations",

  "hierarchyInput.organization.children": "Narrower organizations",

  "hierarchyInput.organization.parent": "Broader organization",

  "hierarchyInput.organization.siblings": "Adjacent organizations",

  "hierarchyInput.person.children": "Narrower persons",

  "hierarchyInput.person.parent": "Broader person",

  "hierarchyInput.person.siblings": "Adjacent persons",

  "hierarchyInput.place.children": "Narrower places",

  "hierarchyInput.place.parent": "Broader place",

  "hierarchyInput.place.siblings": "Adjacent places",

  "hierarchyInput.work.children": "Narrower works",

  "hierarchyInput.work.parent": "Broader work",

  "hierarchyInput.work.siblings": "Adjacent works",

  "hierarchyReparentNotifier.reparentWarning": "{childName} currently has the broader record {parentName}. Its broader record will be changed when this record is saved.",

  "idGenerator.accession.type": "Accession",

  "idGenerator.accession.type": "Accession",

  "idGenerator.archives.type": "Archives",

  "idGenerator.conditioncheck.type": "Condition Check",

  "idGenerator.conservation.type": "Conservation",

  "idGenerator.evaluation.type": "Evaluation",

  "idGenerator.exhibition.type": "Exhibition",

  "idGenerator.intake.type": "Intake",

  "idGenerator.inventory.type": "Inventory",

  "idGenerator.library.type": "Library",

  "idGenerator.loanin.type": "Loan In",

  "idGenerator.loanout.type": "Loan Out",

  "idGenerator.location.type": "Location",

  "idGenerator.media.type": "Media Resource",

  "idGenerator.movement.type": "Movement",

  "idGenerator.objectexit.type": "Object Exit",

  "idGenerator.study.type": "Study",

  "idGenerator.uoc.type": "Use of Collections",

  "idGenerator.valuationcontrol.type": "Valuation Control",

  // Label of the number pattern sample column displayed in the ID generator dropdown.
  "idGeneratorInput.column.sample": "Last Generated Value",

  // Label of the number pattern type column displayed in the ID generator dropdown.
  "idGeneratorInput.column.type": "Type",

  "inputTable.acquisition.acquisitionAuthorizer": "Authorization",

  "inputTable.acquisition.groupPurchasePrice": "Group purchase price",

  "inputTable.acquisition.objectOfferPrice": "Object offer price",

  "inputTable.acquisition.objectPurchaseOfferPrice": "Object purchaser offer price",

  "inputTable.acquisition.objectPurchasePrice": "Object purchase price",

  "inputTable.acquisition.originalObjectPurchasePrice": "Original object purchase price",

  "inputTable.citation.termSource": "Source",

  "inputTable.collectionobject.age": "Age",

  "inputTable.collectionobject.assocEvent": "Associated event",

  "inputTable.collectionobject.ownershipExchange": "Ownership exchange",

  "inputTable.concept.scopeNote": "Scope note",

  "inputTable.concept.termSource": "Source",

  "inputTable.loanin.borrower": "Borrower",

  "inputTable.loanout.borrower": "Borrower",

  "inputTable.loanout.lender": "Lender",

  "inputTable.location.termSource": "Source",

  "inputTable.movement.currentLocation": "Current location",

  "inputTable.objectexit.disposal": "Disposal",

  "inputTable.objectexit.groupDisposal": "Group disposal",

  "inputTable.organization.nameDetail": "Name detail",

  "inputTable.organization.termSource": "Source",

  "inputTable.person.nameDetail": "Name detail",

  "inputTable.person.termSource": "Source",

  "inputTable.place.nameDetail": "Name detail",

  "inputTable.place.termSource": "Source",

  "inputTable.uoc.authorizedBy": "Authorization",

  "inputTable.uoc.user": "User",

  "inputTable.work.termSource": "Source",

  // Label of the clear button on the search bar of the report and batch job pages.
  "invocableSearchBar.clear": "Clear",

  // Label of the input on the search bar of the report and batch job pages.
  "invocableSearchBar.filter": "Filter by name",

  // Message displayed when invocable metadata is loading.
  "invocationEditor.loading": "Loading…",

  // Message displayed when an invocable has no description.
  "invocationEditor.noDescription": "Description not provided.",

  // Label of the cancel button in the invocation modal.
  "invocationModal.cancel": "Cancel",

  // Label of the output format picker in the invocation modal.
  "invocationModal.format": "Format:",

  // Label of the invoke button in the invocation modal.
  "invocationModal.run": "Run",

  // Message displayed in the invocation modal when the report/batch job is running.
  "invocationModal.running": "Running…",

  // Label of the invocation target picker in group mode.
  "invocationTargetInput.group": "Group",

  // Label of the invocation target picker in list mode.
  "invocationTargetInput.list": "Records",

  // Label of the invocation target picker in single mode.
  "invocationTargetInput.single": "Record",

  // Label of the invoke button.
  "invokeButton.label": "Run",

  "list.account.resultCount": "{totalItems, plural, =0 {No users} one {1 user} other {{startNum, number}–{endNum, number} of {totalItems, number} users}} found",

  "list.account.searching": "Finding users...",

  "list.authRef.resultCount": "{totalItems, plural, =0 {No terms} one {1 term} other {{startNum, number}–{endNum, number} of {totalItems, number} terms}} found",

  "list.authRef.searching": "Finding terms...",

  "list.common.resultCount": "{totalItems, plural, =0 {No records} one {1 record} other {{startNum, number}–{endNum, number} of {totalItems, number} records}} found",

  "list.common.searching": "Finding records...",

  "list.refDoc.resultCount": "{totalItems, plural, =0 {No uses} one {1 use} other {{startNum, number}–{endNum, number} of {totalItems, number} uses}} found",

  "list.refDoc.searching": "Finding uses...",

  "list.role.resultCount": "{totalItems, plural, =0 {No roles} one {1 role} other {{startNum, number}–{endNum, number} of {totalItems, number} roles}} found",

  "list.role.searching": "Finding roles...",

  // Label of the cancel button in the lock record modal.
  "lockRecordModal.cancel": "Cancel",

  // The prompt shown to optionally lock a record on save.
  "lockRecordModal.prompt": "This record may be locked after it is saved. This will make the record read-only, to prevent further modification.",

  // Label of the save and lock button in the lock record modal.
  "lockRecordModal.saveLock": "Save and lock",

  // Label of the save only (do not lock) button in the lock record modal.
  "lockRecordModal.saveOnly": "Save only",

  // Title of the modal shown to optionally lock a record on save.
  "lockRecordModal.title": "Lock Record?",

  // Label of the login button.
  "loginButton.label": "Sign in",

  // Error message displayed when incorrect credentials were entered during login.
  "loginForm.ERR_INVALID_CREDENTIALS": "Sign in failed. Incorrect username/password.",

  // Error message displayed when there is a network error during login.
  "loginForm.ERR_NETWORK": "Sign in failed. Unable to reach the CollectionSpace server.",

  // Error message displayed when the logged in user belongs to the wrong tenant.
  "loginForm.ERR_WRONG_TENANT": "Sign in failed. The user is not registered to this CollectionSpace tenant.",

  // Generic login error message. Displayed when a more specific error message is not available.
  "loginForm.error": "Sign in failed.",

  // The prompt displayed on the login form when the login session has expired.
  "loginForm.expiredPrompt": "Your session has expired. Please sign in again to continue.",

  // Text of the forgot password link.
  "loginForm.forgotPassword": "Forgot password",

  // Label for the login password field.
  "loginForm.password": "Password",

  // Message displayed while login is in progress.
  "loginForm.pending": "Signing in...",

  // The prompt displayed on the login form when the user is not logged in.
  "loginForm.prompt": "Please sign in to continue.",

  // Message displayed when login completes successfully.
  "loginForm.success": "Sign in complete.",

  // Title displayed above the login form.
  "loginForm.title": "Sign In",

  // Label for the login username field.
  "loginForm.username": "Email",

  // The title of the login modal.
  "loginModal.title": "Sign In",

  // The title (advisory text) of the application logo image.
  "logo.title": "CollectionSpace",

  // Message displayed while logout is in progress.
  "logoutIndicator.pending": "Signing out...",

  // Message displayed when logout completes successfully.
  "logoutIndicator.success": "Success!",

  "mediaSnapshotPanel.title": "Media",

  "mediaViewerPanel.titleWithCount": "{title}: {totalItems, number}",

  // Label of the invocation mode picker.
  "modePickerInput.label": "Run on",

  "modePickerInput.mode.group": "group",

  "modePickerInput.mode.list": "record list",

  "modePickerInput.mode.nocontext": "all records",

  "modePickerInput.mode.single": "single record",

  "navBar.admin": "Administration",

  "navBar.create": "Create New",

  "navBar.dashboard": "My CollectionSpace",

  "navBar.search": "Search",

  "navBar.tool": "Tools",

  // Label of the open button.
  "openButton.label": "Open",

  "operatorInput.compact.OP_COMPLETE": "is complete",

  "operatorInput.compact.OP_CONTAIN": "contains",

  "operatorInput.compact.OP_EQ": "=",

  "operatorInput.compact.OP_GT": ">",

  "operatorInput.compact.OP_GTC": "> or contains",

  "operatorInput.compact.OP_GTE": "≥",

  "operatorInput.compact.OP_LT": "<",

  "operatorInput.compact.OP_LTC": "< or contains",

  "operatorInput.compact.OP_LTE": "≤",

  "operatorInput.compact.OP_MATCH": "matches",

  "operatorInput.compact.OP_NOT_COMPLETE": "is incomplete",

  "operatorInput.compact.OP_NOT_CONTAIN": "doesn't contain",

  "operatorInput.compact.OP_NOT_EQ": "≠",

  "operatorInput.compact.OP_NOT_MATCH": "doesn't match",

  "operatorInput.compact.OP_NOT_NULL": "isn't blank",

  "operatorInput.compact.OP_NOT_RANGE": "isn't between",

  "operatorInput.compact.OP_NULL": "is blank",

  "operatorInput.compact.OP_RANGE": "is between",

  "operatorInput.OP_COMPLETE": "is complete",

  "operatorInput.OP_CONTAIN": "contains",

  "operatorInput.OP_EQ": "is",

  "operatorInput.OP_GT": "is greater than",

  "operatorInput.OP_GTC": "is greater than or contains",

  "operatorInput.OP_GTE": "is at least",

  "operatorInput.OP_LT": "is less than",

  "operatorInput.OP_LTC": "is less than or contains",

  "operatorInput.OP_LTE": "is at most",

  "operatorInput.OP_MATCH": "matches",

  "operatorInput.OP_NOT_COMPLETE": "is incomplete",

  "operatorInput.OP_NOT_CONTAIN": "does not contain",

  "operatorInput.OP_NOT_EQ": "is not",

  "operatorInput.OP_NOT_MATCH": "does not match",

  "operatorInput.OP_NOT_NULL": "is not blank",

  "operatorInput.OP_NOT_RANGE": "is not between",

  "operatorInput.OP_NULL": "is blank",

  "operatorInput.OP_RANGE": "is between",

  "option.accountStatuses.active": "active",

  "option.accountStatuses.inactive": "inactive",

  "option.acquisitionMethods.exchange": "exchange",

  "option.acquisitionMethods.gift": "gift",

  "option.acquisitionMethods.purchase": "purchase",

  "option.acquisitionMethods.transfer": "transfer",

  "option.acquisitionMethods.treasure": "treasure",

  "option.addressCountries.AD": "Andorra",

  "option.addressCountries.AE": "United Arab Emirates (the)",

  "option.addressCountries.AF": "Afghanistan",

  "option.addressCountries.AG": "Antigua and Barbuda",

  "option.addressCountries.AI": "Anguilla",

  "option.addressCountries.AL": "Albania",

  "option.addressCountries.AM": "Armenia",

  "option.addressCountries.AO": "Angola",

  "option.addressCountries.AQ": "Antarctica",

  "option.addressCountries.AR": "Argentina",

  "option.addressCountries.AS": "American Samoa",

  "option.addressCountries.AT": "Austria",

  "option.addressCountries.AU": "Australia",

  "option.addressCountries.AW": "Aruba",

  "option.addressCountries.AX": "Åland Islands",

  "option.addressCountries.AZ": "Azerbaijan",

  "option.addressCountries.BA": "Bosnia and Herzegovina",

  "option.addressCountries.BB": "Barbados",

  "option.addressCountries.BD": "Bangladesh",

  "option.addressCountries.BE": "Belgium",

  "option.addressCountries.BF": "Burkina Faso",

  "option.addressCountries.BG": "Bulgaria",

  "option.addressCountries.BH": "Bahrain",

  "option.addressCountries.BI": "Burundi",

  "option.addressCountries.BJ": "Benin",

  "option.addressCountries.BL": "Saint Barthélemy",

  "option.addressCountries.BM": "Bermuda",

  "option.addressCountries.BN": "Brunei Darussalam",

  "option.addressCountries.BO": "Bolivia (Plurinational State of)",

  "option.addressCountries.BQ": "Bonaire, Sint Eustatius and Saba",

  "option.addressCountries.BR": "Brazil",

  "option.addressCountries.BS": "Bahamas (the)",

  "option.addressCountries.BT": "Bhutan",

  "option.addressCountries.BV": "Bouvet Island",

  "option.addressCountries.BW": "Botswana",

  "option.addressCountries.BY": "Belarus",

  "option.addressCountries.BZ": "Belize",

  "option.addressCountries.CA": "Canada",

  "option.addressCountries.CC": "Cocos (Keeling) Islands (the)",

  "option.addressCountries.CD": "Congo (the Democratic Republic of the)",

  "option.addressCountries.CF": "Central African Republic (the)",

  "option.addressCountries.CG": "Congo (the)",

  "option.addressCountries.CH": "Switzerland",

  "option.addressCountries.CI": "Côte d'Ivoire",

  "option.addressCountries.CK": "Cook Islands (the)",

  "option.addressCountries.CL": "Chile",

  "option.addressCountries.CM": "Cameroon",

  "option.addressCountries.CN": "China",

  "option.addressCountries.CO": "Colombia",

  "option.addressCountries.CR": "Costa Rica",

  "option.addressCountries.CU": "Cuba",

  "option.addressCountries.CV": "Cape Verde",

  "option.addressCountries.CW": "Curaçao",

  "option.addressCountries.CX": "Christmas Island",

  "option.addressCountries.CY": "Cyprus",

  "option.addressCountries.CZ": "Czechia",

  "option.addressCountries.DE": "Germany",

  "option.addressCountries.DJ": "Djibouti",

  "option.addressCountries.DK": "Denmark",

  "option.addressCountries.DM": "Dominica",

  "option.addressCountries.DO": "Dominican Republic (the)",

  "option.addressCountries.DZ": "Algeria",

  "option.addressCountries.EC": "Ecuador",

  "option.addressCountries.EE": "Estonia",

  "option.addressCountries.EG": "Egypt",

  "option.addressCountries.EH": "Western Sahara",

  "option.addressCountries.ER": "Eritrea",

  "option.addressCountries.ES": "Spain",

  "option.addressCountries.ET": "Ethiopia",

  "option.addressCountries.FI": "Finland",

  "option.addressCountries.FJ": "Fiji",

  "option.addressCountries.FK": "Falkland Islands (the) [Malvinas]",

  "option.addressCountries.FM": "Micronesia (Federated States of)",

  "option.addressCountries.FO": "Faroe Islands (the)",

  "option.addressCountries.FR": "France",

  "option.addressCountries.GA": "Gabon",

  "option.addressCountries.GB": "United Kingdom of Great Britain and Northern Ireland (the)",

  "option.addressCountries.GD": "Grenada",

  "option.addressCountries.GE": "Georgia",

  "option.addressCountries.GF": "French Guiana",

  "option.addressCountries.GG": "Guernsey",

  "option.addressCountries.GH": "Ghana",

  "option.addressCountries.GI": "Gibraltar",

  "option.addressCountries.GL": "Greenland",

  "option.addressCountries.GM": "Gambia (the)",

  "option.addressCountries.GN": "Guinea",

  "option.addressCountries.GP": "Guadeloupe",

  "option.addressCountries.GQ": "Equatorial Guinea",

  "option.addressCountries.GR": "Greece",

  "option.addressCountries.GS": "South Georgia and the South Sandwich Islands",

  "option.addressCountries.GT": "Guatemala",

  "option.addressCountries.GU": "Guam",

  "option.addressCountries.GW": "Guinea-Bissau",

  "option.addressCountries.GY": "Guyana",

  "option.addressCountries.HK": "Hong Kong",

  "option.addressCountries.HM": "Heard Island and McDonald Islands",

  "option.addressCountries.HN": "Honduras",

  "option.addressCountries.HR": "Croatia",

  "option.addressCountries.HT": "Haiti",

  "option.addressCountries.HU": "Hungary",

  "option.addressCountries.ID": "Indonesia",

  "option.addressCountries.IE": "Ireland",

  "option.addressCountries.IL": "Israel",

  "option.addressCountries.IM": "Isle of Man",

  "option.addressCountries.IN": "India",

  "option.addressCountries.IO": "British Indian Ocean Territory (the)",

  "option.addressCountries.IQ": "Iraq",

  "option.addressCountries.IR": "Iran (Islamic Republic of)",

  "option.addressCountries.IS": "Iceland",

  "option.addressCountries.IT": "Italy",

  "option.addressCountries.JE": "Jersey",

  "option.addressCountries.JM": "Jamaica",

  "option.addressCountries.JO": "Jordan",

  "option.addressCountries.JP": "Japan",

  "option.addressCountries.KE": "Kenya",

  "option.addressCountries.KG": "Kyrgyzstan",

  "option.addressCountries.KH": "Cambodia",

  "option.addressCountries.KI": "Kiribati",

  "option.addressCountries.KM": "Comoros (the)",

  "option.addressCountries.KN": "Saint Kitts and Nevis",

  "option.addressCountries.KP": "Korea (the Democratic People's Republic of)",

  "option.addressCountries.KR": "Korea (the Republic of)",

  "option.addressCountries.KW": "Kuwait",

  "option.addressCountries.KY": "Cayman Islands (the)",

  "option.addressCountries.KZ": "Kazakhstan",

  "option.addressCountries.LA": "Lao People's Democratic Republic (the)",

  "option.addressCountries.LB": "Lebanon",

  "option.addressCountries.LC": "Saint Lucia",

  "option.addressCountries.LI": "Liechtenstein",

  "option.addressCountries.LK": "Sri Lanka",

  "option.addressCountries.LR": "Liberia",

  "option.addressCountries.LS": "Lesotho",

  "option.addressCountries.LT": "Lithuania",

  "option.addressCountries.LU": "Luxembourg",

  "option.addressCountries.LV": "Latvia",

  "option.addressCountries.LY": "Libya",

  "option.addressCountries.MA": "Morocco",

  "option.addressCountries.MC": "Monaco",

  "option.addressCountries.MD": "Moldova (the Republic of)",

  "option.addressCountries.ME": "Montenegro",

  "option.addressCountries.MF": "Saint Martin (French part)",

  "option.addressCountries.MG": "Madagascar",

  "option.addressCountries.MH": "Marshall Islands (the)",

  "option.addressCountries.MK": "Macedonia (the former Yugoslav Republic of)",

  "option.addressCountries.ML": "Mali",

  "option.addressCountries.MM": "Myanmar",

  "option.addressCountries.MN": "Mongolia",

  "option.addressCountries.MO": "Macao",

  "option.addressCountries.MP": "Northern Mariana Islands (the)",

  "option.addressCountries.MQ": "Martinique",

  "option.addressCountries.MR": "Mauritania",

  "option.addressCountries.MS": "Montserrat",

  "option.addressCountries.MT": "Malta",

  "option.addressCountries.MU": "Mauritius",

  "option.addressCountries.MV": "Maldives",

  "option.addressCountries.MW": "Malawi",

  "option.addressCountries.MX": "Mexico",

  "option.addressCountries.MY": "Malaysia",

  "option.addressCountries.MZ": "Mozambique",

  "option.addressCountries.NA": "Namibia",

  "option.addressCountries.NC": "New Caledonia",

  "option.addressCountries.NE": "Niger (the)",

  "option.addressCountries.NF": "Norfolk Island",

  "option.addressCountries.NG": "Nigeria",

  "option.addressCountries.NI": "Nicaragua",

  "option.addressCountries.NL": "Netherlands (the)",

  "option.addressCountries.NO": "Norway",

  "option.addressCountries.NP": "Nepal",

  "option.addressCountries.NR": "Nauru",

  "option.addressCountries.NU": "Niue",

  "option.addressCountries.NZ": "New Zealand",

  "option.addressCountries.OM": "Oman",

  "option.addressCountries.PA": "Panama",

  "option.addressCountries.PE": "Peru",

  "option.addressCountries.PF": "French Polynesia",

  "option.addressCountries.PG": "Papua New Guinea",

  "option.addressCountries.PH": "Philippines (the)",

  "option.addressCountries.PK": "Pakistan",

  "option.addressCountries.PL": "Poland",

  "option.addressCountries.PM": "Saint Pierre and Miquelon",

  "option.addressCountries.PN": "Pitcairn",

  "option.addressCountries.PR": "Puerto Rico",

  "option.addressCountries.PS": "Palestine, State of",

  "option.addressCountries.PT": "Portugal",

  "option.addressCountries.PW": "Palau",

  "option.addressCountries.PY": "Paraguay",

  "option.addressCountries.QA": "Qatar",

  "option.addressCountries.RE": "Réunion",

  "option.addressCountries.RO": "Romania",

  "option.addressCountries.RS": "Serbia",

  "option.addressCountries.RU": "Russian Federation (the)",

  "option.addressCountries.RW": "Rwanda",

  "option.addressCountries.SA": "Saudi Arabia",

  "option.addressCountries.SB": "Solomon Islands",

  "option.addressCountries.SC": "Seychelles",

  "option.addressCountries.SD": "Sudan (the)",

  "option.addressCountries.SE": "Sweden",

  "option.addressCountries.SG": "Singapore",

  "option.addressCountries.SH": "Saint Helena, Ascension and Tristan da Cunha",

  "option.addressCountries.SI": "Slovenia",

  "option.addressCountries.SJ": "Svalbard and Jan Mayen",

  "option.addressCountries.SK": "Slovakia",

  "option.addressCountries.SL": "Sierra Leone",

  "option.addressCountries.SM": "San Marino",

  "option.addressCountries.SN": "Senegal",

  "option.addressCountries.SO": "Somalia",

  "option.addressCountries.SR": "Suriname",

  "option.addressCountries.SS": "South Sudan",

  "option.addressCountries.ST": "Sao Tome and Principe",

  "option.addressCountries.SV": "El Salvador",

  "option.addressCountries.SX": "Sint Maarten (Dutch part)",

  "option.addressCountries.SY": "Syrian Arab Republic",

  "option.addressCountries.SZ": "Swaziland",

  "option.addressCountries.TC": "Turks and Caicos Islands (the)",

  "option.addressCountries.TD": "Chad",

  "option.addressCountries.TF": "French Southern Territories (the)",

  "option.addressCountries.TG": "Togo",

  "option.addressCountries.TH": "Thailand",

  "option.addressCountries.TJ": "Tajikistan",

  "option.addressCountries.TK": "Tokelau",

  "option.addressCountries.TL": "Timor-Leste",

  "option.addressCountries.TM": "Turkmenistan",

  "option.addressCountries.TN": "Tunisia",

  "option.addressCountries.TO": "Tonga",

  "option.addressCountries.TR": "Turkey",

  "option.addressCountries.TT": "Trinidad and Tobago",

  "option.addressCountries.TV": "Tuvalu",

  "option.addressCountries.TW": "Taiwan (Province of China)",

  "option.addressCountries.TZ": "Tanzania, United Republic of",

  "option.addressCountries.UA": "Ukraine",

  "option.addressCountries.UG": "Uganda",

  "option.addressCountries.UM": "United States Minor Outlying Islands (the)",

  "option.addressCountries.US": "United States of America (the)",

  "option.addressCountries.UY": "Uruguay",

  "option.addressCountries.UZ": "Uzbekistan",

  "option.addressCountries.VA": "Holy See (the)",

  "option.addressCountries.VC": "Saint Vincent and the Grenadines",

  "option.addressCountries.VE": "Venezuela (Bolivarian Republic of)",

  "option.addressCountries.VG": "Virgin Islands (British)",

  "option.addressCountries.VI": "Virgin Islands (U.S.)",

  "option.addressCountries.VN": "Viet Nam",

  "option.addressCountries.VU": "Vanuatu",

  "option.addressCountries.WF": "Wallis and Futuna",

  "option.addressCountries.WS": "Samoa",

  "option.addressCountries.YE": "Yemen",

  "option.addressCountries.YT": "Mayotte",

  "option.addressCountries.ZA": "South Africa",

  "option.addressCountries.ZM": "Zambia",

  "option.addressCountries.ZW": "Zimbabwe",

  "option.addressTypes.business": "business",

  "option.addressTypes.home": "home",

  "option.addressTypes.other": "other",

  "option.ageUnits.days": "days",

  "option.ageUnits.months": "months",

  "option.ageUnits.weeks": "weeks",

  "option.ageUnits.years": "years",

  "option.booleans.false": "no",

  "option.booleans.true": "yes",

  "option.citationTermStatuses.accepted": "accepted",

  "option.citationTermStatuses.provisional": "provisional",

  "option.citationTermStatuses.rejected": "rejected",

  "option.citationTermStatuses.under review": "under review",

  "option.collections.library-collection": "library collection",

  "option.collections.permanent-collection": "permanent collection",

  "option.collections.study-collection": "study collection",

  "option.collections.teaching-collection": "teaching collection",

  "option.completenessLevels.complete": "complete",

  "option.completenessLevels.fragmented": "fragmented",

  "option.completenessLevels.incomplete": "incomplete",

  "option.conceptHistoricalStatuses.both": "both",

  "option.conceptHistoricalStatuses.current": "current",

  "option.conceptHistoricalStatuses.historical": "historical",

  "option.conceptHistoricalStatuses.unknown": "unknown",

  "option.conceptTermStatuses.accepted": "accepted",

  "option.conceptTermStatuses.provisional": "provisional",

  "option.conceptTermStatuses.rejected": "rejected",

  "option.conceptTermStatuses.under review": "under review",

  "option.conceptTermTypes.alternate descriptor": "alternate descriptor",

  "option.conceptTermTypes.descriptor": "descriptor",

  "option.conceptTermTypes.used for term": "used for term",

  "option.conditionCheckMethods.observed": "observed",

  "option.conditionCheckMethods.xrayed": "x-rayed",

  "option.conditionCheckReasons.conservation": "conservation",

  "option.conditionCheckReasons.damagedintransit": "damaged in transit",

  "option.conditionCheckReasons.exhibition": "exhibition",

  "option.conditionCheckReasons.loanin": "loan in",

  "option.conditionCheckReasons.newacquisition": "new acquisition",

  "option.conditions.exhibitableneedswork": "exhibitable / needs work",

  "option.conditions.injeopardy": "in jeopardy",

  "option.conditions.needsnowork": "needs no work",

  "option.conditions.notexhibitablestable": "not exhibitable / stable",

  "option.conservationTreatmentPriorities.high": "high",

  "option.conservationTreatmentPriorities.low": "low",

  "option.conservationTreatmentPriorities.medium": "medium",

  "option.contentObjectTypes.food": "food",

  "option.contentObjectTypes.furniture": "furniture",

  "option.coordinateSystems.altitude-depth": "altitude depth",

  "option.coordinateSystems.latitude-longitude": "latitude and longitude",

  "option.coordinateSystems.national-grid-reference": "National Grid reference",

  "option.coordinateSystems.utm": "Universal Transverse Mercator (UTM)",

  "option.dateQualifiers.+": "+",

  "option.dateQualifiers.+/-": "+/-",

  "option.dateQualifiers.-": "-",

  "option.departments.antiquities": "Antiquities",

  "option.departments.architecture-design": "Architecture and Design",

  "option.departments.decorative-arts": "Decorative Arts",

  "option.departments.ethnography": "Ethnography",

  "option.departments.herpetology": "Herpetology",

  "option.departments.media-performance-art": "Media and Performance Art",

  "option.departments.paintings-sculpture": "Paintings and Sculpture",

  "option.departments.paleobotany": "Paleobotany",

  "option.departments.photographs": "Photographs",

  "option.departments.prints-drawings": "Prints and Drawings",

  "option.dimensions.area": "area",

  "option.dimensions.base": "base",

  "option.dimensions.circumference": "circumference",

  "option.dimensions.count": "count",

  "option.dimensions.depth": "depth",

  "option.dimensions.diameter": "diameter",

  "option.dimensions.height": "height",

  "option.dimensions.length": "length",

  "option.dimensions.running-time": "running time",

  "option.dimensions.target": "target",

  "option.dimensions.volume": "volume",

  "option.dimensions.weight": "weight",

  "option.dimensions.width": "width",

  "option.emailTypes.business": "business",

  "option.emailTypes.other": "other",

  "option.emailTypes.personal": "personal",

  "option.entryReasons.commission": "commission",

  "option.entryReasons.consideration": "consideration",

  "option.entryReasons.enquiry": "enquiry",

  "option.entryReasons.loan": "loan",

  "option.exhibitionConsTreatmentStatuses.Done": "done",

  "option.exhibitionConsTreatmentStatuses.Needed": "needed",

  "option.exhibitionConsTreatmentStatuses.Not needed": "not needed",

  "option.exhibitionMountStatuses.Done": "done",

  "option.exhibitionMountStatuses.Needed": "needed",

  "option.exhibitionMountStatuses.Not needed": "not needed",

  "option.exitMethods.courier": "courier",

  "option.exitMethods.inperson": "in person",

  "option.exitMethods.post": "post",

  "option.exitReasons.deaccession": "deaccession",

  "option.exitReasons.disposal": "disposal",

  "option.exitReasons.returnofloan": "return of loan",

  "option.faxNumberTypes.business": "business",

  "option.faxNumberTypes.home": "home",

  "option.faxNumberTypes.other": "other",

  "option.forms.dry": "dry",

  "option.forms.pinned": "pinned",

  "option.forms.thin-section": "thin section",

  "option.forms.wet": "wet",

  "option.genders.female": "female",

  "option.genders.male": "male",

  "option.geodeticDatums.epsg4267-nad27": "EPSG:4267-NAD27",

  "option.geodeticDatums.epsg4269-nad83": "EPSG:4269-NAD83",

  "option.geodeticDatums.epsg4326-wgs84": "EPSG:4326-WGS84",

  "option.geodeticDatums.unknown": "unknown",

  "option.geoRefProtocols.biogeomancer": "BioGeomancer",

  "option.geoRefProtocols.chapman-wieczorek-2006-guide-best-practices-georeferencing": "Chapman, Wieczorek 2006, Guide to Best Practices for Georeferencing",

  "option.geoRefProtocols.georeferencing-dummies": "Georeferencing For Dummies",

  "option.geoRefProtocols.manis-herpnet-ornis-georeferencing-guidelines": "MaNIS/HerpNet/ORNIS Georeferencing Guidelines",

  "option.geoRefVerificationStatuses.unverified": "unverified",

  "option.geoRefVerificationStatuses.verified-contributor": "verified by contributor",

  "option.geoRefVerificationStatuses.verified-data-custodian": "verified by data custodian",

  "option.hazards.poisonous": "poisonous",

  "option.hazards.radioactive": "radioactive",

  "option.inscriptionTypes.brand": "brand",

  "option.inscriptionTypes.decoration": "decoration",

  "option.inscriptionTypes.estate-stamp": "estate stamp",

  "option.inscriptionTypes.graffiti": "graffiti",

  "option.inscriptionTypes.label": "label",

  "option.inscriptionTypes.maker's-mark": "maker's mark",

  "option.invActions.conservation": "conservation",

  "option.invActions.preservation": "preservation",

  "option.invActions.re-housing": "re-housing",

  "option.invFreqs.annually": "annually",

  "option.invFreqs.daily": "daily",

  "option.invFreqs.monthly": "monthly",

  "option.invFreqs.semi-annually": "semi-annually",

  "option.invFreqs.weekly": "weekly",

  "option.loanPurposes.analysis": "analysis",

  "option.loanPurposes.conservationotherrequestedservices": "conservation or other requested services",

  "option.loanPurposes.exhibition": "exhibition",

  "option.loanPurposes.longtermcollectionsmanagementandstorage": "long-term collections management and storage",

  "option.loanPurposes.photography": "photography",

  "option.loanPurposes.research": "research",

  "option.loanPurposes.scientificorexhibitpreparation": "scientific or exhibit preparation",

  "option.localityUnits.acres": "acres",

  "option.localityUnits.centimeters": "centimeters",

  "option.localityUnits.feet": "feet",

  "option.localityUnits.hectares": "hectares",

  "option.localityUnits.inches": "inches",

  "option.localityUnits.kilometers": "kilometers",

  "option.localityUnits.meters": "meters",

  "option.localityUnits.miles": "miles",

  "option.localityUnits.millimeters": "millimeters",

  "option.localityUnits.square-feet": "square feet",

  "option.localityUnits.square-meters": "square meters",

  "option.localityUnits.square-yards": "square yards",

  "option.localityUnits.stories": "stories",

  "option.locationFitnesses.dangerous": "dangerous",

  "option.locationFitnesses.suitable": "suitable",

  "option.locationFitnesses.temporary": "temporary",

  "option.locationFitnesses.unsuitable": "unsuitable",

  "option.locationTermStatuses.accepted": "accepted",

  "option.locationTermStatuses.provisional": "provisional",

  "option.locationTermStatuses.rejected": "rejected",

  "option.locationTermStatuses.under review": "under review",

  "option.locationTermTypes.alternate descriptor": "alternate descriptor",

  "option.locationTermTypes.descriptor": "descriptor",

  "option.locationTermTypes.used for term": "used for term",

  "option.measuredParts.base": "base",

  "option.measuredParts.frame": "frame",

  "option.measuredParts.framed": "framed",

  "option.measuredParts.image-size": "image size",

  "option.measuredParts.mount": "mount",

  "option.measuredParts.paper-size": "paper size",

  "option.measuredParts.plate-size": "plate size",

  "option.measuredParts.unframed": "unframed",

  "option.measurementMethods.balance_beam_scale": "balance/beam scale",

  "option.measurementMethods.electronic_distance_measurement": "electronic distance measurement",

  "option.measurementMethods.goniometer": "goniometer",

  "option.measurementMethods.hydraulic_or_pneumatic_scale": "hydraulic or pneumatic scale",

  "option.measurementMethods.measuring_tape_cloth": "measuring tape (cloth)",

  "option.measurementMethods.measuring_tape_metal": "measuring tape (metal)",

  "option.measurementMethods.microscopy_reticule": "microscopy (reticule)",

  "option.measurementMethods.odometer": "odometer",

  "option.measurementMethods.optical_range_finder": "optical range finder",

  "option.measurementMethods.osteometric_board": "osteometric board",

  "option.measurementMethods.pacing_pedometer": "pacing pedometer",

  "option.measurementMethods.protractor": "protractor",

  "option.measurementMethods.ruler": "ruler",

  "option.measurementMethods.sliding_calipers": "sliding calipers",

  "option.measurementMethods.spreading_calipers": "spreading calipers",

  "option.measurementMethods.spring_scale": "spring scale",

  "option.measurementMethods.stadia_transit": "stadia/transit",

  "option.measurementMethods.standard_mesh_screen": "standard mesh/screen",

  "option.measurementMethods.taping_chaining": "taping/chaining",

  "option.measurementMethods.theodolite_total_station": "theodolite/total station",

  "option.measurementUnits.carats": "carats",

  "option.measurementUnits.centimeters": "centimeters",

  "option.measurementUnits.cubic-centimeters": "cubic centimeters",

  "option.measurementUnits.feet": "feet",

  "option.measurementUnits.inches": "inches",

  "option.measurementUnits.kilograms": "kilograms",

  "option.measurementUnits.liters": "liters",

  "option.measurementUnits.meters": "meters",

  "option.measurementUnits.millimeters": "millimeters",

  "option.measurementUnits.minutes": "minutes",

  "option.measurementUnits.ounces": "ounces",

  "option.measurementUnits.pixels": "pixels",

  "option.measurementUnits.pounds": "pounds",

  "option.measurementUnits.square-feet": "square feet",

  "option.measurementUnits.stories": "stories",

  "option.measurementUnits.tons": "tons",

  "option.mediaTypes.dataset": "dataset",

  "option.mediaTypes.document": "document",

  "option.mediaTypes.moving_image": "moving image",

  "option.mediaTypes.sound": "sound",

  "option.mediaTypes.still_image": "still image",

  "option.moveMethods.forklift": "forklift",

  "option.moveMethods.handcarried": "handcarried",

  "option.moveMethods.trolley": "trolley",

  "option.moveReasons.conservation": "conservation",

  "option.moveReasons.exhibition": "exhibition",

  "option.moveReasons.inventory": "inventory",

  "option.moveReasons.loan": "loan",

  "option.moveReasons.newstoragelocation": "new storage location",

  "option.moveReasons.photography": "photography",

  "option.moveReasons.research": "research",

  "option.nameCurrencies.archaic": "archaic",

  "option.nameCurrencies.current": "current",

  "option.nameLevels.group": "group",

  "option.nameLevels.subgroup": "subgroup",

  "option.nameSystems.art-and-architecture-thesaurus": "Art & Architecture Thesaurus",

  "option.nameSystems.nomenclature": "nomenclature",

  "option.nameTypes.classified": "classified",

  "option.nameTypes.denomination": "denomination",

  "option.nameTypes.simple": "simple",

  "option.nameTypes.taxonomic": "taxonomic",

  "option.nameTypes.typological": "typological",

  "option.numberTypes.lender": "lender",

  "option.numberTypes.obsolete": "obsolete",

  "option.numberTypes.previous": "previous",

  "option.numberTypes.serial": "serial",

  "option.numberTypes.unknown": "unknown",

  "option.objectAuditCategories.high": "high",

  "option.objectAuditCategories.low": "low",

  "option.objectAuditCategories.medium": "medium",

  "option.objectChildTypes.derivative": "derivative",

  "option.objectChildTypes.non-separable-part": "non-separable part",

  "option.objectChildTypes.recto": "recto",

  "option.objectChildTypes.separable-part": "separable part",

  "option.objectChildTypes.set": "item in a set",

  "option.objectChildTypes.verso": "verso",

  "option.objectComponentNames.blade": "blade",

  "option.objectComponentNames.buttonhole": "buttonhole",

  "option.objectComponentNames.handle": "handle",

  "option.objectComponentNames.sleeve": "sleeve",

  "option.objectParentTypes.derivative": "work (derivative)",

  "option.objectParentTypes.non-separable-part": "work (non-separable part)",

  "option.objectParentTypes.recto": "work (recto)",

  "option.objectParentTypes.separable-part": "work (separable part)",

  "option.objectParentTypes.set": "set",

  "option.objectParentTypes.verso": "work (verso)",

  "option.objectStatuses.copy": "copy",

  "option.objectStatuses.forgery": "forgery",

  "option.objectStatuses.holotype": "holotype",

  "option.objectStatuses.paralectotype": "paralectotype",

  "option.objectStatuses.paratype": "paratype",

  "option.objectStatuses.type": "type",

  "option.orgTermStatuses.accepted": "accepted",

  "option.orgTermStatuses.provisional": "provisional",

  "option.orgTermStatuses.rejected": "rejected",

  "option.orgTermStatuses.under review": "under review",

  "option.orgTermTypes.alternate descriptor": "alternate descriptor",

  "option.orgTermTypes.descriptor": "descriptor",

  "option.orgTermTypes.used for term": "used for term",

  "option.ownershipAccessLevels.limited": "limited",

  "option.ownershipAccessLevels.open": "open",

  "option.ownershipAccessLevels.restricted": "restricted",

  "option.ownershipCategories.company": "company",

  "option.ownershipCategories.private": "private",

  "option.ownershipCategories.public": "public",

  "option.ownershipExchangeMethods.bequest": "bequest",

  "option.ownershipExchangeMethods.exchange": "exchange",

  "option.ownershipExchangeMethods.gift": "gift",

  "option.ownershipExchangeMethods.purchase": "purchase",

  "option.ownershipExchangeMethods.transfer": "transfer",

  "option.ownershipExchangeMethods.treasure": "treasure",

  "option.personTermStatuses.accepted": "accepted",

  "option.personTermStatuses.provisional": "provisional",

  "option.personTermStatuses.rejected": "rejected",

  "option.personTermStatuses.under review": "under review",

  "option.personTermTypes.alternate descriptor": "alternate descriptor",

  "option.personTermTypes.descriptor": "descriptor",

  "option.personTermTypes.used for term": "used for term",

  "option.personTitles.Baron": "Baron",

  "option.personTitles.Baroness": "Baroness",

  "option.personTitles.Dame": "Dame",

  "option.personTitles.Dr": "Dr",

  "option.personTitles.Lady": "Lady",

  "option.personTitles.Lord": "Lord",

  "option.personTitles.Miss": "Miss",

  "option.personTitles.Mr": "Mr",

  "option.personTitles.Mrs": "Mrs",

  "option.personTitles.Ms": "Ms",

  "option.personTitles.Professor": "Professor",

  "option.personTitles.Sir": "Sir",

  "option.phases.adult": "adult",

  "option.phases.imago": "imago",

  "option.phases.larva": "larva",

  "option.phases.nymph": "nymph",

  "option.phases.pupa": "pupa",

  "option.placeHistoricalStatuses.both": "both",

  "option.placeHistoricalStatuses.current": "current",

  "option.placeHistoricalStatuses.historical": "historical",

  "option.placeTermStatuses.accepted": "accepted",

  "option.placeTermStatuses.provisional": "provisional",

  "option.placeTermStatuses.rejected": "rejected",

  "option.placeTermStatuses.under review": "under review",

  "option.placeTermTypes.common": "common name",

  "option.placeTermTypes.descriptive": "descriptive name",

  "option.placeTermTypes.local": "local name",

  "option.placeTermTypes.native": "native name",

  "option.placeTermTypes.non-native": "non-native name",

  "option.placeTermTypes.spelling-variant": "spelling variant",

  "option.placeTermTypes.technical-scientific": "technical or scientific name",

  "option.placeTypes.autonomous-region": "autonomous region",

  "option.placeTypes.borough": "borough",

  "option.placeTypes.city": "city",

  "option.placeTypes.collection-site": "collection site",

  "option.placeTypes.continent": "continent",

  "option.placeTypes.country": "country",

  "option.placeTypes.country-code": "country code",

  "option.placeTypes.county": "county",

  "option.placeTypes.dependent-state": "dependent state",

  "option.placeTypes.deserted-settlement": "deserted settlement",

  "option.placeTypes.district-national": "district (national)",

  "option.placeTypes.general-region": "general region",

  "option.placeTypes.governorate": "governorate",

  "option.placeTypes.inhabited-place": "inhabited place",

  "option.placeTypes.island": "island",

  "option.placeTypes.island-group": "island group",

  "option.placeTypes.locality": "locality",

  "option.placeTypes.metropolitan-area": "metropolitan area",

  "option.placeTypes.municipality": "municipality",

  "option.placeTypes.nation": "nation",

  "option.placeTypes.national-division": "national division",

  "option.placeTypes.neighborhood": "neighborhood",

  "option.placeTypes.occupied-territory": "occupied territory",

  "option.placeTypes.prefecture": "prefecture",

  "option.placeTypes.province": "province",

  "option.placeTypes.region": "region",

  "option.placeTypes.state": "state",

  "option.placeTypes.state-province": "state province",

  "option.placeTypes.territory": "territory",

  "option.placeTypes.union-territory": "union territory",

  "option.placeTypes.unitary-authority": "unitary authority",

  "option.placeTypes.urban-prefecture": "urban prefecture",

  "option.placeTypes.water-body": "water body",

  "option.positions.back": "back",

  "option.positions.base": "base",

  "option.positions.bottom": "bottom",

  "option.positions.front": "front",

  "option.positions.inside": "inside",

  "option.positions.left": "left",

  "option.positions.outside": "outside",

  "option.positions.recto": "recto",

  "option.positions.right": "right",

  "option.positions.rim": "rim",

  "option.positions.top": "top",

  "option.positions.verso": "verso",

  "option.recordStatuses.approved": "approved",

  "option.recordStatuses.in-process": "in process",

  "option.recordStatuses.new": "new",

  "option.recordStatuses.temporary": "temporary",

  "option.reportMimeTypes.application/msword": "MS Word (.doc)",

  "option.reportMimeTypes.application/pdf": "PDF",

  "option.reportMimeTypes.application/vnd.ms-excel": "MS Excel (.xls)",

  "option.reportMimeTypes.application/vnd.ms-powerpoint": "MS PowerPoint (.ppt)",

  "option.reportMimeTypes.application/vnd.openxmlformats-officedocument.presentationml.presentation": "MS PowerPoint (.pptx)",

  "option.reportMimeTypes.application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "MS Excel (.xlsx)",

  "option.reportMimeTypes.application/vnd.openxmlformats-officedocument.wordprocessingml.document": "MS Word (.docx)",

  "option.reportMimeTypes.application/xml": "XML",

  "option.reportMimeTypes.text/csv": "CSV",

  "option.reportMimeTypes.text/html": "HTML",

  "option.reportMimeTypes.text/tab-separated-values": "TSV",

  "option.salutations.dear": "Dear",

  "option.salutations.hello": "Hello",

  "option.salutations.to": "To",

  "option.salvagePriorityCodes.high": "high",

  "option.salvagePriorityCodes.low": "low",

  "option.salvagePriorityCodes.medium": "medium",

  "option.scripts.carolingian-miniscule": "Carolingian minuscule",

  "option.scripts.gothic-script": "Gothic script",

  "option.scripts.palmer-method": "Palmer method",

  "option.scripts.roman-cursive": "Roman cursive",

  "option.scripts.rustic-capitals": "rustic capitals",

  "option.scripts.spencerian-method": "Spencerian method",

  "option.scripts.square-capitals": "square capitals",

  "option.sexes.female": "female",

  "option.sexes.male": "male",

  "option.spatialRefSystems.epsg4267-nad27": "EPSG:4267-NAD27",

  "option.spatialRefSystems.epsg4269-nad83": "EPSG:4269-NAD83",

  "option.spatialRefSystems.epsg4326-wgs84": "EPSG:4326-WGS84",

  "option.spatialRefSystems.unknown": "unknown",

  "option.technicalAttributeMeasurements.78": "78",

  "option.technicalAttributeMeasurements.metal": "metal",

  "option.technicalAttributeMeasurementUnits.rpm": "rpm",

  "option.technicalAttributes.magnetic-tape-type": "magnetic tape type",

  "option.technicalAttributes.record-speed": "record speed",

  "option.telephoneNumberTypes.business": "business",

  "option.telephoneNumberTypes.home": "home",

  "option.telephoneNumberTypes.mobile": "mobile",

  "option.telephoneNumberTypes.other": "other",

  "option.titleTypes.assigned-by-artist": "assigned by artist",

  "option.titleTypes.collection": "collection",

  "option.titleTypes.generic": "generic",

  "option.titleTypes.popular": "popular",

  "option.titleTypes.series": "series",

  "option.titleTypes.trade": "trade",

  "option.valueTypes.Current Value": "current value",

  "option.valueTypes.Original Value": "original value",

  "option.valueTypes.Replacement Value": "replacement value",

  "option.vocabTermStatuses.active": "active",

  "option.vocabTermStatuses.inactive": "inactive",

  "option.webAddressTypes.business": "business",

  "option.webAddressTypes.other": "other",

  "option.webAddressTypes.personal": "personal",

  "option.workTermStatuses.complete": "complete",

  "option.workTermStatuses.inprogress": "in progress",

  "option.workTermStatuses.quickaddedneedsattention": "quick added, needs attention",

  "option.yesNoValues.no": "no",

  "option.yesNoValues.yes": "yes",

  // Message displayed in the option picker input dropdown when filtering options.
  "optionPickerInput.count": "{count, plural, =0 {No matching options} one {# matching option} other {# matching options}} found",

  "pager.gap": "...",

  "pager.next": ">",

  "pager.previous": "<",

  // The current page size displayed above search results.
  "pageSizeChooser.pageSize": "{pageSize} per page",

  "panel.acquisition.info": "Acquisition Information",

  "panel.acquisition.objectCollectionInformation": "Object Collection Information",

  "panel.acquisition.priceInformation": "Price Information",

  "panel.batch.mode": "Runs on",

  "panel.citation.hierarchy": "Hierarchy",

  "panel.citation.info": "Citation Information",

  "panel.collectionobject.assoc": "Associations",

  "panel.collectionobject.collect": "Object Collection Information",

  "panel.collectionobject.content": "Content",

  "panel.collectionobject.desc": "Object Description Information",

  "panel.collectionobject.hierarchy": "Hierarchy",

  "panel.collectionobject.hist": "Object History and Association Information",

  "panel.collectionobject.id": "Object Identification Information",

  "panel.collectionobject.nonTextInscript": "Non-Textual Inscription",

  "panel.collectionobject.owner": "Object Owner's Contribution Information",

  "panel.collectionobject.prod": "Object Production Information",

  "panel.collectionobject.reference": "Reference Information",

  "panel.collectionobject.textInscript": "Textual Inscription",

  "panel.collectionobject.viewer": "Object Viewer's Contribution Information",

  "panel.concept.hierarchy": "Hierarchy",

  "panel.concept.info": "Concept Information",

  "panel.conditioncheck.conditionCheckAndTechAssessmentInfo": "Condition Check/Technical Assessment Information",

  "panel.conditioncheck.objectConditionAndTechAssessmentInfo": "Object Condition Information",

  "panel.conditioncheck.objectRequirementInfo": "Object Recommendation/Requirement Information",

  "panel.conservation.info": "Conservation Treatment Information",

  "panel.conservation.objectAnalysisInfo": "Object Analysis Information",

  "panel.contact.info": "Contact Information",

  "panel.exhibition.exhibitedObjectInformation": "Exhibited Object Information",

  "panel.exhibition.info": "Exhibition Information",

  "panel.exhibition.planningInfo": "Exhibition Planning Information",

  "panel.group.info": "Group Information",

  "panel.intake.condition": "Condition Check Information",

  "panel.intake.insurance": "Insurance Information",

  "panel.intake.location": "Location Information",

  "panel.intake.objectCollectionInfo": "Object Collection Information",

  "panel.intake.objectEntryInfo": "Object Entry Information",

  "panel.intake.valuation": "Valuation Information",

  "panel.loanin.info": "Loan In Information",

  "panel.loanout.info": "Loan Out Information",

  "panel.location.hierarchy": "Hierarchy",

  "panel.location.info": "Storage Location Information",

  "panel.media.file": "File Information",

  "panel.media.media": "Media Handling Information",

  "panel.movement.inventory": "Inventory Information",

  "panel.movement.location": "Object Location Information",

  "panel.movement.movement": "Movement Information",

  "panel.objectexit.deaccessionDisposalInfo": "Deaccession and Disposal Information",

  "panel.objectexit.info": "Object Exit Information",

  "panel.organization.hierarchy": "Hierarchy",

  "panel.organization.info": "Organization Information",

  "panel.person.hierarchy": "Hierarchy",

  "panel.person.info": "Person Information",

  "panel.place.geoRefInfo": "Georeference Information",

  "panel.place.hierarchy": "Hierarchy",

  "panel.place.info": "Place Information",

  "panel.place.localityInfo": "Locality Information",

  "panel.report.mode": "Runs on",

  "panel.uoc.useOfCollections": "Use of Collections Information",

  "panel.valuation.info": "Object Valuation Information",

  "panel.work.hierarchy": "Hierarchy",

  "panel.work.info": "Work Information",

  // Label for the confirm password field on the password reset form.
  "passwordResetForm.confirmPassword": "Confirm password",

  // Generic message to display when a password reset fails, and no more specific message is available.
  "passwordResetForm.error": "An error occurred while attempting to reset the password: {detail}",

  // Message to display when the password is invalid on the password reset form.
  "passwordResetForm.errorInvalidPassword": "The password must be between 8 and 24 characters.",

  // Message to display when no password confirmation is entered on the password reset form.
  "passwordResetForm.errorMissingConfirmation": "Please confirm the new password.",

  // Message to display when no password is entered on the password reset form.
  "passwordResetForm.errorMissingPassword": "Please enter a new password.",

  // Message to display when the password confirmation does not match the password on the password reset form.
  "passwordResetForm.errorNotConfirmed": "The password was not correctly confirmed.",

  // Message to display when the password reset token has expired on the password reset form.
  "passwordResetForm.errorTokenExpired": "The password reset request has expired. Please {newRequestLink} to reset your password.",

  // Message to display when the password reset token is invalid on the password reset form.
  "passwordResetForm.errorTokenInvalid": "The password reset request could not be validated. Please {newRequestLink} to reset your password.",

  // Text of the link to the login page displayed after a password has been reset.
  "passwordResetForm.loginLink": "Sign in",

  // Text of the link to make a new password reset request, displayed in the error message when a token is invalid or has expired.
  "passwordResetForm.newRequestLink": "make a new request",

  // Label for the password field on the password reset form.
  "passwordResetForm.password": "Password",

  // The prompt displayed on the password reset form.
  "passwordResetForm.prompt": "Enter the new password for this account.",

  // Label for the submit button on the password reset form.
  "passwordResetForm.submit": "Submit",

  // Message displayed when a password reset has been successfully completed.
  "passwordResetForm.success": "Your password has been reset. {loginLink} to continue.",

  // Generic message to display when a password reset request fails, and no more specific message is available.
  "passwordResetRequestForm.error": "An error occurred while attempting to request the password reset: {detail}",

  // Message to display when the email entered on the password reset request form is not a valid email address.
  "passwordResetRequestForm.errorInvalidEmail": "{email} is not a valid email address.",

  // Message to display when no email is entered on the password reset request form.
  "passwordResetRequestForm.errorMissingEmail": "Please enter an email address.",

  // Message to display when the email is not found for a password reset request.
  "passwordResetRequestForm.errorNotFound": "Could not locate an account associated with the email {email}.",

  // The prompt displayed on the password reset request form.
  "passwordResetRequestForm.prompt": "Enter your email address to request a password reset.",

  // Label for the submit button on the password reset request form.
  "passwordResetRequestForm.submit": "Submit",

  // Message displayed when a password reset has been successfully requested.
  "passwordResetRequestForm.success": "An email has been sent to {email}. Follow the instructions in the email to finish resetting your password.",

  // Label of the 'delete' permission level shown when editing permissions.
  "permissionsInput.perm.delete": "Delete",

  // Label of the 'none' permission level shown when editing permissions.
  "permissionsInput.perm.none": "None",

  // Label of the 'read' permission level shown when editing permissions.
  "permissionsInput.perm.read": "Read",

  // Label of the 'write' permission level shown when editing permissions.
  "permissionsInput.perm.write": "Write",

  "permissionsInput.serviceType.authority": "Authorities",

  "permissionsInput.serviceType.object": "Objects",

  "permissionsInput.serviceType.procedure": "Procedures",

  "permissionsInput.serviceType.security": "Security Resources",

  "permissionsInput.serviceType.utility": "Utility Resources",

  // The placeholder text to display in the quick search input.
  "quickSearchForm.placeholder": "Search",

  // The label of the search button in the quick search input.
  "quickSearchForm.search": "Search",

  "RangeSearchField.fields": "{startField} and {endField}",

  // The name of a collection of records of the type.
  "record.account.collectionName": "Users",

  // The name of the record type.
  "record.account.name": "User",

  // The name of a collection of records of the type.
  "record.acquisition.collectionName": "Acquisitions",

  // The name of a collection of records of the type.
  "record.all.collectionName": "All Records",

  // The name of the record type.
  "record.all.name": "Record",

  // The name of the record type.
  "record.aquisition.name": "Acquisition",

  // The name of a collection of records of the type.
  "record.authority.collectionName": "Authority Items",

  // The name of the record type.
  "record.authority.name": "Authority Item",

  // The name of a collection of records of the type.
  "record.authrole.collectionName": "Roles",

  // The name of the record type.
  "record.authrole.name": "Role",

  // The name of a collection of records of the type.
  "record.batch.collectionName": "Data Updates",

  // The message shown when a record of the type is invoked, and the invocation target has not been supplied in group mode.
  "record.batch.groupTargetMissing": "Select a group on which to run this data update.",

  // The message shown when a record of the type is invoked, and the context record has unsaved changes.
  "record.batch.invokeUnsaved": "This record has changes that have not been saved. The data update will not include any unsaved data.",

  // The message shown when a record of the type is invoked, and the invocation target has not been supplied in list mode.
  "record.batch.listTargetMissing": "Select one or more records on which to run this data update.",

  // The name of the record type.
  "record.batch.name": "Data Update",

  // The message shown when a record of the type is invoked, and the invocation target has not been supplied in single mode.
  "record.batch.singleTargetMissing": "Select a record on which to run this data update.",

  // The name of a collection of records of the type.
  "record.batchinvocation.collectionName": "Data Update Invocations",

  // The name of the record type.
  "record.batchinvocation.name": "Data Update Invocation",

  // The name of a collection of records of the type.
  "record.blob.collectionName": "Blobs",

  // The name of the record type.
  "record.blob.name": "Blob",

  // The name of a collection of records of the type.
  "record.citation.collectionName": "Citations",

  // The name of the record type.
  "record.citation.name": "Citation",

  // The name of a collection of records of the type.
  "record.collectionobject.collectionName": "Objects",

  // The name of the record type.
  "record.collectionobject.name": "Object",

  // The name of a collection of records of the type.
  "record.concept.collectionName": "Concepts",

  // The name of the record type.
  "record.concept.name": "Concept",

  // The name of a collection of records of the type.
  "record.conditioncheck.collectionName": "Condition Checks",

  // The name of the record type.
  "record.conditioncheck.name": "Condition Check",

  // The name of a collection of records of the type.
  "record.conservation.collectionName": "Conservation Treatments",

  // The name of the record type.
  "record.conservation.name": "Conservation",

  // The name of a collection of records of the type.
  "record.contact.collectionName": "Contacts",

  // The name of the record type.
  "record.contact.name": "Contact",

  // The name of a collection of records of the type.
  "record.exhibition.collectionName": "Exhibitions",

  // The name of the record type.
  "record.exhibition.name": "Exhibition",

  // The name of a collection of records of the type.
  "record.group.collectionName": "Groups",

  // The name of the record type.
  "record.group.name": "Group",

  // The name of a collection of records of the type.
  "record.idgenerator.collectionName": "ID Generators",

  // The name of the record type.
  "record.idgenerator.name": "ID Generator",

  // The name of a collection of records of the type.
  "record.intake.collectionName": "Intakes",

  // The name of the record type.
  "record.intake.name": "Intake",

  // The name of a collection of records of the type.
  "record.loanin.collectionName": "Loans In",

  // The name of the record type.
  "record.loanin.name": "Loan In",

  // The name of a collection of records of the type.
  "record.loanout.collectionName": "Loans Out",

  // The name of the record type.
  "record.loanout.name": "Loan Out",

  // The name of a collection of records of the type.
  "record.location.collectionName": "Storage Locations",

  // The name of the record type.
  "record.location.name": "Storage Location",

  // The name of a collection of records of the type.
  "record.media.collectionName": "Media Handling",

  // The name of the record type.
  "record.media.name": "Media Handling",

  // The name of a collection of records of the type.
  "record.movement.collectionName": "Location/Movement/Inventory",

  // The name of the record type.
  "record.movement.name": "Location/Movement/Inventory",

  // The name of a collection of records of the type.
  "record.object.collectionName": "Objects",

  // The name of the record type.
  "record.object.name": "Object",

  // The name of a collection of records of the type.
  "record.objectexit.collectionName": "Object Exits",

  // The name of the record type.
  "record.objectexit.name": "Object Exit",

  // The name of a collection of records of the type.
  "record.organization.collectionName": "Organizations",

  // The name of the record type.
  "record.organization.name": "Organization",

  // The name of a collection of records of the type.
  "record.person.collectionName": "Persons",

  // The name of the record type.
  "record.person.name": "Person",

  // The name of a collection of records of the type.
  "record.place.collectionName": "Places",

  // The name of the record type.
  "record.place.name": "Place",

  // The name of a collection of records of the type.
  "record.procedure.collectionName": "Procedures",

  // The name of the record type.
  "record.procedure.name": "Procedure",

  // The name of a collection of records of the relation type.
  "record.relation.collectionName": "Relations",

  // The name of the relation record type.
  "record.relation.name": "Relation",

  // The name of a collection of records of the type.
  "record.report.collectionName": "Reports",

  // The message shown when a record of the type is invoked, and the invocation target has not been supplied in group mode.
  "record.report.groupTargetMissing": "Select a group on which to run this report.",

  // The message shown when a record of the type is invoked, and the context record has unsaved changes.
  "record.report.invokeUnsaved": "This record has changes that have not been saved. The report will not include any unsaved data.",

  // The message shown when a record of the type is invoked, and the invocation target has not been supplied in list mode.
  "record.report.listTargetMissing": "Select one or more records on which to run this report.",

  // The name of the record type.
  "record.report.name": "Report",

  // The message shown when a record of the type is invoked, and the invocation target has not been supplied in single mode.
  "record.report.singleTargetMissing": "Select a record on which to run this report.",

  // The name of a collection of records of the type.
  "record.reportinvocation.collectionName": "Report Invocations",

  // The name of the record type.
  "record.reportinvocation.name": "Report Invocation",

  // The name of a collection of records of the type.
  "record.structureddates.collectionName": "Structured Date Parser",

  // The name of the record type.
  "record.structureddates.name": "Structured Date Parser",

  // The name of a collection of records of the type.
  "record.uoc.collectionName": "Use of Collections",

  // The name of the record type.
  "record.uoc.name": "Use of Collections",

  // The name of a collection of records of the type.
  "record.valuation.collectionName": "Valuation Controls",

  // The name of the record type.
  "record.valuation.name": "Valuation Control",

  // The name of a collection of records of the type.
  "record.vocabulary.collectionName": "Term Lists",

  // The name of the record type.
  "record.vocabulary.name": "Term List",

  // The name of a collection of records of the type.
  "record.work.collectionName": "Works",

  // The name of the record type.
  "record.work.name": "Work",

  "recordBatchPanel.title": "Data Updates",

  "recordBrowserNavBar.close": "close",

  "recordBrowserNavBar.moreRelated": "+ Related",

  "recordBrowserNavBar.new": "New Record",

  "recordBrowserNavBar.primary": "Primary Record",

  "recordBrowserNavBar.related": "+ Related",

  "recordHistory.created": "{style, select, full {Created {date} {time} by {user}} dateTime {Created {date} {time}}}",

  "recordHistory.editing": "Editing",

  "recordHistory.savedRelative": "Saved {relativeTime}",

  "recordHistory.saving": "Saving",

  "recordHistory.updated": "{style, select, full {Updated {date} {time} by {user}} dateTime {Updated {date} {time}}}",

  "recordReportPanel.title": "Reports",

  "recordSearchInput.value": "{count, plural, =0 {} one {} other {# records: }}{items}{remainingCount, plural, =0 {} other {, and # more}}",

  // For authority items, the record type and vocabulary displayed in the right side of the title bar.
  "recordTitleBar.authority": "{recordType} - {vocabulary}",

  // Label of the relate button.
  "relateButton.label": "Relate existing…",

  "relatedMediaPanel.title": "Related Media",

  "relatedRecordPanel.title": "Related {collectionName}",

  // Label of the open related record link.
  "relationButtonBar.open": "Open",

  "relationEditor.editTitle": "Related {recordTypeName}",

  "relationEditor.newTitle": "New Related {recordTypeName}",

  "relationEditor.noRelation": "There is no related record with CSID \"{csid}\" and type \"{recordType}\".",

  "relationEditor.notFound": "Not Found",

  // Notification message shown when a report fails.
  "report.error": "Error running report: {error}",

  // Message displayed when a report invocation fails.
  "reportViewerPage.error": "Error running report: {error}",

  // Message displayed when a report is loading.
  "reportViewerPage.loading": "Generating report…",

  // Title of the reset password page.
  "resetPasswordPage.title": "Reset Password",

  // Label of the revert button.
  "revertButton.label": "Revert",

  // The title of the application, displayed in the browser tab.
  "rootPage.title": "CollectionSpace",

  // Label of the run button.
  "runButton.label": "Run…",

  // Label of the save button.
  "saveButton.label": "Save",

  // Text of the tooltip shown when the save button is disabled due to field validation errors.
  "saveButton.validationErrors": "Field validation errors must be corrected before this record can be saved.",

  // Label of the search button.
  "searchButton.label": "Search",

  // Label of the search clear button.
  "searchClearButton.label": "Clear",

  // The label used to indicate search terms that are or'ed together.
  "searchField.or": "or",

  "searchForm.fullTextSearch": "Full Text Search",

  "searchForm.keyword": "Keywords",

  "searchForm.recordType": "Find",

  "searchForm.vocabulary": "in vocabulary",

  "searchPage.title": "Search",

  // Label of the open as search link in the search panel header.
  "searchPanel.openSearch": "Open",

  "searchPanel.titleWithCount": "{title}: {totalItems, number}",

  "searchPanel.titleWithCountFiltered": "{title}: {totalItems, number} (filtered)",

  "searchResultBatchPanel.title": "Data Updates",

  "searchResultLink.error": "...",

  "searchResultLink.label": "{recordNumber}",

  "searchResultLink.notFound": "[record not found]",

  "searchResultLink.pending": "...",

  // Label of the relate button on the search result page.
  "searchResultPage.relate": "Relate…",

  "searchResultReportPanel.title": "Reports",

  "searchResultSummary.editSearch": "Revise search",

  "searchResultSummary.ERR_NOT_ALLOWED": "You're not allowed to perform this search.",

  "searchResultSummary.error": "Error: {code}",

  "searchResultTable.searchPending": "⋯",

  "searchResultTitleBar.keyword": "containing \"{keyword}\"",

  "searchResultTitleBar.related": "related to {record}",

  "searchResultTitleBar.title": "Search Result",

  // Label of the next record link in the search result traverser.
  "searchResultTraverser.next": "Next",

  // Label of the previous record link in the search result traverser.
  "searchResultTraverser.prev": "Previous",

  // Label of the search result link in the search result traverser.
  "searchResultTraverser.result": "Search result {current, number} of {total, number}",

  // Label of the search result link in the search result traverser when the search is pending.
  "searchResultTraverser.resultPending": "Search result … of …",

  // Label of the search save button.
  "searchSaveButton.label": "Save",

  // Label of the accept selection button in the search to relate modal.
  "searchToRelateModal.accept": "Relate selected",

  "searchToRelateModal.error.locked": "Locked records are selected. Relations cannot be made to locked records.",

  "searchToRelateModal.error.notPermitted": "{name} records are selected. You are not permitted to create relations to {collectionName}.",

  "searchToRelateModal.errorTitle": "Can't Relate",

  "searchToRelateModal.label": "Relate records",

  // Message shown when the record(s) selected in the search to relate modal were related to multiple (> 1) subject records.
  "searchToRelateModal.multipleSubjectsRelated": "{objectCount, plural, =0 {No records} one {# record} other {# records}} related to each of {subjectCount, number} search results.",

  "searchToRelateModal.relating": "Relating…",

  "searchToRelateModal.title": "Relate {typeName} {query}",

  "searchToSelectModal.editSearch": "Revise search",

  "searchToSelectModal.label": "Select records",

  "searchToSelectTitleBar.keyword": "containing \"{keyword}\"",

  "searchToSelectTitleBar.title": "Select {typeName} {query}",

  // Label showing the number of selected items.
  "selectBar.selected": "{selectedItemCount, plural, =0 {0 selected} other {# selected}}",

  // Label of the button to hide the sidebar.
  "sidebarToggleButton.hide": "Hide sidebar",

  // Label of the button to show the sidebar.
  "sidebarToggleButton.show": "Show sidebar",

  "structuredDateInput.parseFailed": "Unrecognized display date format. Try a different format, or enter values in the fields below.",

  // Default label of the subrecord detach button.
  "subrecordDetachButton.label": "Remove",

  // The name of a collection of subresources of the type.
  "subresource.refs.collectionName": "Uses of {record}",

  // The name of a collection of subresources of the type.
  "subresource.terms.collectionName": "Authority Terms Used by {record}",

  // Message displayed in the term picker input dropdown when filtering options.
  "termPickerInput.count": "{count, plural, =0 {No matching terms} one {# matching term} other {# matching terms}} found",

  "termsUsedPanel.title": "Terms Used",

  "toolNavBar.batch": "Data Updates",

  "toolNavBar.report": "Reports",

  "toolNavBar.vocabulary": "Term Lists",

  "toolPage.title": "Tools",

  // Label of the undeprecate button.
  "undeprecateButton.label": "Activate",

  // Label of the unrelate button.
  "unrelateButton.label": "Unrelate",

  "UploadInputContainer.fileChooseButtonLabel": "Select…",

  "UploadInputContainer.fileInfo": "{name} ({type}, {size, number} bytes)",

  "UploadInputContainer.fileInputLabel": "File",

  "UploadInputContainer.fileOptionLabel": "local file",

  "UploadInputContainer.typeInputLabel": "Upload",

  "UploadInputContainer.urlInputLabel": "URL",

  "UploadInputContainer.urlOptionLabel": "external media",

  // Content of the link displayed alongside URL input fields.
  "urlInput.link": "Open",

  "usedByPanel.title": "Used By",

  // Log out menu option label.
  "userMenu.logout": "Sign out",

  // The default, generic message for a validation error. Validators should provide a more specific message.
  "validationErrorMessage.default": "{fieldName} has an invalid value.",

  // The error message for a data type validation error.
  "validationErrorMessage.ERR_DATA_TYPE": "{dataType, select, DATA_TYPE_INT {{fieldName} must be an integer. Correct the value {value}.} DATA_TYPE_FLOAT {{fieldName} must be a number. Correct the value {value}.} DATA_TYPE_DATE {{fieldName} must be a date in the format YYYY-MM-DD. Correct the value {value}.} other {{fieldName} has an invalid value for the data type {dataType}. Correct the value {value}.}}",

  // The error message for a missing required field validation error.
  "validationErrorMessage.ERR_MISSING_REQ_FIELD": "{fieldName} is required. Please enter a value.",

  // The error message for a failure to validate one or more fields.
  "validationErrorMessage.ERR_UNABLE_TO_VALIDATE": "An unexpected error occurred while validating this record.",

  // The name of a collection of records from the vocabulary.
  "vocab.citation.all.collectionName": "All Citations",

  // The name of a record from the vocabulary.
  "vocab.citation.all.itemName": "Citation",

  // The name of the vocabulary.
  "vocab.citation.all.name": "All",

  // The name of a collection of records from the vocabulary.
  "vocab.citation.local.collectionName": "Local Citations",

  // The name of a record from the vocabulary.
  "vocab.citation.local.itemName": "Local Citation",

  // The name of the vocabulary.
  "vocab.citation.local.name": "Local",

  // The name of a collection of records from the vocabulary.
  "vocab.citation.worldcat.collectionName": "WorldCat Citations",

  // The name of a record from the vocabulary.
  "vocab.citation.worldcat.itemName": "WorldCat Citation",

  // The name of the vocabulary.
  "vocab.citation.worldcat.name": "WorldCat",

  // The name of a collection of records from the vocabulary.
  "vocab.concept.activity.collectionName": "Activity Concepts",

  // The name of a record from the vocabulary.
  "vocab.concept.activity.itemName": "Activity Concept",

  // The name of the vocabulary.
  "vocab.concept.activity.name": "Activity",

  // The name of a collection of records from the vocabulary.
  "vocab.concept.all.collectionName": "All Concepts",

  // The name of a record from the vocabulary.
  "vocab.concept.all.itemName": "Concept",

  // The name of the vocabulary.
  "vocab.concept.all.name": "All",

  // The name of a collection of records from the vocabulary.
  "vocab.concept.associated.collectionName": "Associated Concepts",

  // The name of a record from the vocabulary.
  "vocab.concept.associated.itemName": "Associated Concept",

  // The name of the vocabulary.
  "vocab.concept.associated.name": "Associated",

  // The name of a collection of records from the vocabulary.
  "vocab.concept.material.collectionName": "Material Concepts",

  // The name of a record from the vocabulary.
  "vocab.concept.material.itemName": "Material Concept",

  // The name of the vocabulary.
  "vocab.concept.material.name": "Material",

  // The name of a collection of records from the nomenclature concept vocabulary.
  "vocab.concept.nomenclature.collectionName": "Nomenclature Concepts",

  // The name of a record from the vocabulary.
  "vocab.concept.nomenclature.itemName": "Nomenclature",

  // The name of the nomenclature concept vocabulary.
  "vocab.concept.nomenclature.name": "Nomenclature",

  // The name of a collection of records from the vocabulary.
  "vocab.location.all.collectionName": "All Locations",

  // The name of a record from the vocabulary.
  "vocab.location.all.itemName": "Location",

  // The name of the vocabulary.
  "vocab.location.all.name": "All",

  // The name of a collection of records from the vocabulary.
  "vocab.location.local.collectionName": "Local Storage Locations",

  // The name of a record from the vocabulary.
  "vocab.location.local.itemName": "Local Storage Location",

  // The name of the vocabulary.
  "vocab.location.local.name": "Local",

  // The name of a collection of records from the vocabulary.
  "vocab.location.offsite.collectionName": "Offsite Storage Locations",

  // The name of a record from the vocabulary.
  "vocab.location.offsite.itemName": "Offsite Storage Location",

  // The name of the vocabulary.
  "vocab.location.offsite.name": "Offsite",

  // The name of a collection of records from the vocabulary.
  "vocab.organization.all.collectionName": "All Organizations",

  // The name of a record from the vocabulary.
  "vocab.organization.all.itemName": "Organization",

  // The name of the vocabulary.
  "vocab.organization.all.name": "All",

  // The name of a collection of records from the vocabulary.
  "vocab.organization.local.collectionName": "Local Organizations",

  // The name of a record from the vocabulary.
  "vocab.organization.local.itemName": "Local Organization",

  // The name of the vocabulary.
  "vocab.organization.local.name": "Local",

  // The name of a collection of records from the vocabulary.
  "vocab.organization.ulan.collectionName": "ULAN Organizations",

  // The name of a record from the vocabulary.
  "vocab.organization.ulan.itemName": "ULAN Organization",

  // The name of the vocabulary.
  "vocab.organization.ulan.name": "ULAN",

  // The name of a collection of records from the vocabulary.
  "vocab.person.all.collectionName": "All Persons",

  // The name of a record from the vocabulary.
  "vocab.person.all.itemName": "Person",

  // The name of the vocabulary.
  "vocab.person.all.name": "All",

  // The name of a collection of records from the vocabulary.
  "vocab.person.local.collectionName": "Local Persons",

  // The name of a record from the vocabulary.
  "vocab.person.local.itemName": "Local Person",

  // The name of the vocabulary.
  "vocab.person.local.name": "Local",

  // The name of a collection of records from the vocabulary.
  "vocab.person.ulan.collectionName": "ULAN Persons",

  // The name of a record from the vocabulary.
  "vocab.person.ulan.itemName": "ULAN Person",

  // The name of the vocabulary.
  "vocab.person.ulan.name": "ULAN",

  // The name of a collection of records from the vocabulary.
  "vocab.place.all.collectionName": "All Places",

  // The name of a record from the vocabulary.
  "vocab.place.all.itemName": "Place",

  // The name of the vocabulary.
  "vocab.place.all.name": "All",

  // The name of a collection of records from the vocabulary.
  "vocab.place.local.collectionName": "Local Places",

  // The name of a record from the vocabulary.
  "vocab.place.local.itemName": "Local Place",

  // The name of the vocabulary.
  "vocab.place.local.name": "Local",

  // The name of a collection of records from the vocabulary.
  "vocab.place.tgn.collectionName": "TGN Places",

  // The name of a record from the vocabulary.
  "vocab.place.tgn.itemName": "TGN Place",

  // The name of the vocabulary.
  "vocab.place.tgn.name": "TGN",

  // The name of a collection of records from the vocabulary.
  "vocab.work.all.collectionName": "All Works",

  // The name of a record from the vocabulary.
  "vocab.work.all.itemName": "Work",

  // The name of the vocabulary.
  "vocab.work.all.name": "All",

  // The name of a collection of records from the vocabulary.
  "vocab.work.cona.collectionName": "CONA Works",

  // The name of a record from the vocabulary.
  "vocab.work.cona.itemName": "CONA Work",

  // The name of the vocabulary.
  "vocab.work.cona.name": "CONA",

  // The name of a collection of records from the vocabulary.
  "vocab.work.local.collectionName": "Local Works",

  // The name of a record from the vocabulary.
  "vocab.work.local.itemName": "Local Work",

  // The name of the vocabulary.
  "vocab.work.local.name": "Local",

  // Label of the clear button on the search bar of the vocabulary (term list) admin page.
  "vocabularySearchBar.clear": "Clear",

  // Label of the input on the search bar of the vocabulary (term list) admin page.
  "vocabularySearchBarSearchBar.filter": "Filter by name",

  "vocabularyUsedByPanel.notUsed": "No uses found.",

  "vocabularyUsedByPanel.title": "Used By",

  "workflowStateIcon.deprecated": "Deprecated",

  "workflowStateIcon.locked": "Locked",

  "workflowStateIcon.replicated": "Replicated",
}