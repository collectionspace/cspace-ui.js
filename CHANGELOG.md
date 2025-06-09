# Change Log

## v10.1.0

v10.1.0 adds support for CollectionSpace 8.2.

### New Fields

A free text `note` field has been added to the following procedures:
- Object Exit
- Held-In-Trust
- NAGPRA Inventory
- Summary Documentation

A controlled repeating field `objectProductionAgent` has been added to CollectionObject

### Non-Breaking Changes

Improve form validation for role description and role name

### Bug Fixes

- Remove TermPickerInput views from Vocabulary Used By panel
- Add `documentation` to status group label
- Fix typo in label id for `publishedRelatedLinkGroup` in CollectionObject

**Full Changelog**: [`v10.0.2...v10.1.0`](https://github.com/collectionspace/cspace-ui.js/compare/v10.0.2...v10.1.0)

## v10.0.0

v10.0.0 adds support for CollectionSpace 8.1. It can not be used with earlier versions.

### New Procedures

Support for the following procedures has been added:
  - Consultation
  - Deaccession
  - Duty of Care
  - NAGPRA Inventory
  - Restricted Media Handling
  - Repatriation Request
  - Summary Documentation

### Legacy Procedures

The Object Exit procedure has been revamped, and the old Object Exit is now considered legacy.

### Non-Breaking Changes

- `ethculture` has been relabeled to Cultural Group
- `archculture` has been relabeled to Archaeological Culture

### Breaking Changes

- On the Create New page:
  - Procedures are now grouped by their tags defined by the CollectionSpace server.

- On the record editor for Object records:
  - The Published Related Link field group (`publishedRelatedLinkGroupList/publishedRelatedLinkGroup`) has been added. Values entered in these fields will not be saved with an older CollectionSpace server.
  - The field Object count unit (`objectCountUnit`) has been added to the Object Count group list. Values entered in this field will not be saved with an older CollectionSpace server.

### Bug Fixes

- Sorting for Chronology authority searches on Display name and Term status have been fixed.
- The message ID for the field `conditionGroupList/conditionGroup` in the Storage Location authority has been fixed.
- The namespace for the accounts common has been fixed.

## v9.0.0

v9.0.0 adds support for CollectionSpace 8.0. It can not be used with earlier versions.

### Breaking Changes

- Sign in now uses the OAuth 2 authorization code grant, supported in CollectionSpace 8. If this version of cspace-ui is used with an older CollectionSpace server, users will not be able to sign in.

- On the record editor form for Object records:
  - The number of objects field (`numberOfObjects`) has been replaced with the repeating object count group (`objectCountGroupList/objectCountGroup`). If this version of cspace-ui is used with an older CollectionSpace server, values entered in the repeating group will not be saved.
  - The field collection place field (`fieldCollectionPlace`) has been replaced with the repeating field collection places (`fieldCollectionPlaces/fieldCollectionPlace`). If this version of cspace-ui is used with an older CollectionSpace server, values entered in the repeating field will not be saved.

- On the record editor form for Chronology records:
  - Various associated authority fields have been added, in the Associated Authorities panel. If this version of cspace-ui is used with an older CollectionSpace server, values entered in these fields will not be saved.

- On the record editor form for Organization records:
  - The Name Note field (`nameNote`) has been added. If this version of cspace-ui is used with an older CollectionSpace server, values entered in this field will not be saved.

- On the record editor form for Person records:
  - Various associated authority fields have been added, in the Associated Authorities panel. If this version of cspace-ui is used with an older CollectionSpace server, values entered in these fields will not be saved.

- On the record editor form for Place records:
  - Various associated authority fields have been added, in the Associated Authorities panel. If this version of cspace-ui is used with an older CollectionSpace server, values entered in these fields will not be saved.

## v8.0.0

v8.0.0 adds support for CollectionSpace 7.2.

### Breaking Changes

The record editor form for Object records now includes the following new fields, added in CollectionSpace 7.2. To use this version of cspace-ui with an older CollectionSpace server, these fields should be hidden; otherwise, any values entered will not be saved.

- Description Level (`descriptionLevel`)
- Apparel Size (`apparelSizes/apparelSize`)
- Production Era (`objectProductionEras/objectProductionEra`)
- Content controlled event or period/era (`contentEvents/contentEvent`)
- Associated controlled event or period/era (`assocEvents/assocEvent`)
- Field Collection Site (`fieldCollectionSites/fieldCollectionSite`)

## v7.0.0

v7.0.0 adds support for CollectionSpace 7.1.

### Breaking Changes

- Object record:
  - Fields for time-based media have been added. These fields exist in CollectionSpace 7.1, but not in prior versions of CollectionSpace. To use this version of cspace-ui with an older version of the CollectionSpace server, the new fields should be hidden; otherwise, any values entered will not be saved.
  - Fields for copyright information have been added. These fields exist in CollectionSpace 7.1, but not in prior versions of CollectionSpace. To use this version of cspace-ui with an older version of the CollectionSpace server, the new fields should be hidden; otherwise, any values entered will not be saved.

## v6.0.0

v6.0.0 adds support for CollectionSpace 7.0.

### Breaking Changes

- Exhibition record:
  - A new field, `publishTo`, has been added to the record editor form for exhibition records. This field exists in CollectionSpace 7, but not in prior versions of CollectionSpace. To use this version of cspace-ui with an older version of the CollectionSpace server, this new field should be hidden; otherwise, any value entered will not be saved.

- Media record:
  - A new field, `altText`, has been added to the record editor form for media records. This field exists in CollectionSpace 7, but not in prior versions of CollectionSpace. To use this version of cspace-ui with an older version of the CollectionSpace server, this new field should be hidden; otherwise, any value entered will not be saved.

- The format of column names in exported CSV files has changed. For fields that are controlled by authorities, the column name now always includes both the authority and vocabulary name, in addition to the field name. Previously, the column name only included the authority name, if the field was controlled by more than one authority. For example, on the Object record, the Content Organization field was previously exported to the column `contentOrganization`, but it is now exported to the columns `contentOrganizationOrganizationLocal` and `contentOrganizationOrganizationUlan`.

## v5.0.0

v5.0.0 adds support for CollectionSpace 6.1.

### Breaking Changes

- An Export button now appears on search results. This feature requires CollectionSpace 6.1. If this version of the UI is used with an older version of the CollectionSpace server, attempting to export search results will result in an error.

- Object record:
  - A new field, `namedCollections/namedCollection`, has been added to the record editor form. This field exists in CollectionSpace 6.1, but not in prior versions of CollectionSpace. To use this version of cspace-ui with an older version of the CollectionSpace server, this new field should be hidden; otherwise, any value entered will not be saved.

## v4.0.0

v4.0.0 adds support for CollectionSpace 6.0.

### Breaking Changes

- All fields may now be searched using advanced search. Any new fields you've added in your configuration should have `fullName` and/or `groupName` messages configured, when necessary. See the [configuration documentation](./docs/configuration/FieldConfiguration.md#messages) and [style guide](./docs/style) for usage of these messages. Ensure that any fields you've added are displayed as you expect in advanced search.

- Many fields now have `fullName` and/or `groupName` messages configured, when they did not previously. If you are relabeling a field in your configuration by overriding its `name` message, you should now also override the `fullName` and `groupName` messages, if present. Otherwise, the field will not be relabeled in advanced search. Consult the [messages reference](./docs/configuration/messages.js) or the source code for the record type to see if a `fullName` or `groupName` is present.

- Acquisition record:
  - The message IDs of the labels for the field `approvalGroupList/approvalGroup/approvalGroup` have changed. They are now `field.acquisitions_common.approvalGroup.approvalGroup.fullName` and `field.acquisitions_common.approvalGroup.approvalGroup.name`. If you have customized these labels using the previous message IDs (`field.acquisitions_common.approvalGroup.fullName` and `field.approvalGroupField.approvalGroup.name`, respectively), update your configuration to use the new IDs. (Note that `approvalGroup` intentionally appears twice in the new IDs.)
  - The message IDs of the labels for the field `acquisitionFundingList/acquisitionFunding/acquisitionFundingSourceProvisos` have changed. They are now `field.acquisitions_common.acquisitionFundingSourceProvisos.fullName` and `field.acquisitions_common.acquisitionFundingSourceProvisos.name`. If you have customized these labels using the previous message IDs (`field.acquistions_common.acquisitionFundingSourceProvisos.fullName` and `field.acquistions_common.acquisitionFundingSourceProvisos.name`, respectively), update your configuration to use the new IDs. The previous IDs contained typos.

- Contact record:
  - The message ID of the label for the field `webAddressGroupList/webAddressGroup/webAddressType` has changed. It is now `field.contacts_common.webAddressType.name`. If you have customized this label using the previous message ID (`field.contacts_common.webAddressTypeType.name`), update your configuration to use the new ID. The previous ID contained a typo.

- Intake record:
  - The field `currentOwner` has been replaced with the repeating field `currentOwners/currentOwner`. If you've changed the configuration of `currentOwner`, move that configuration under `currentOwners`. If you've overridden any form templates, replace `currentOwner` with `currentOwners/currentOwner` in any templates in which it appears. If you've customized the advanced search form, and `currentOwners` is present, replace it with `currentOwners/currentOwner`.
  - The fields `depositor` and `depositorsRequirements` have been moved into the repeating group `depositorGroupList/depositorGroup`. If you've changed the configuration of either of those fields, move that configuration under `depositorGroupList/depositorGroup`. If you've overridden any form templates, move the `depositor` and `depositorsRequirements` fields under `depositorGroupList/depositorGroup`. If you've customized the advanced search form, and `depositor` or `depositorsRequirements` is present, replace it with the corresponding field under `depositorGroupList/depositorGroup`.
  - The message IDs of the labels for the field `approvalGroupList/approvalGroup/approvalGroup` have changed. They are now `field.intakes_common.approvalGroup.approvalGroup.fullName` and `field.intakes_common.approvalGroup.approvalGroup.name`. If you have customized these labels using the previous message IDs (`field.intakes_common.approvalGroup.fullName` and `field.approvalGroupField.approvalGroup.name`, respectively), update your configuration to use the new IDs. (Note that `approvalGroup` intentionally appears twice in the new IDs.)
  - The message IDs of the labels for the field `depositorGroupList/depositorGroup/depositorsRequirements` have changed. They are now `field.intakes_common.depositorsRequirements.fullName` and `field.intakes_common.depositorsRequirements.name`. If you have customized these labels using the previous message IDs (`field.intakes_common.despositorsRequirements.fullName` and `field.intakes_common.despositorsRequirements.name`, respectively), update your configuration to use the new IDs. The previous IDs contained typos.

- Media record:
  - A new field, `publishToList/publishTo`, has been added to the record editor form. This field exists in CollectionSpace 6.0, but not in prior versions of CollectionSpace. To use this version of cspace-ui with an older version of the CollectionSpace server, this new field should be hidden; otherwise, any value entered will not be saved.

- Organization record:
  - The field `contactName` has been moved from `contactNames` into the repeating group `contactGroupList/contactGroup`, and `contactNames` has been removed. If you've changed the configuration of `contactName`, move that configuration under the `contactGroupList/contactGroup` path. If you've overridden any form templates, move the `contactName` field under `contactGroupList/contactGroup`, and remove `contactNames`. If you've customized the advanced search form, and `contactNames/contactName` is present, replace it with `contactGroupList/contactGroup/contactName`.

- Person record:
  - The message IDs of the labels for the field `personTermGroupList/personTermGroup/foreName` have changed. They are now `field.persons_common.foreName.fullName` and `field.persons_common.foreName.name`. If you have customized these labels using the previous message IDs (`field.persons_common.forename.fullName` and `field.persons_common.forename.name`, respectively), update your configuration to use the new IDs. Note the uppercase "N" in "foreName" in the new IDs.
  - The message IDs of the labels for the field `personTermGroupList/personTermGroup/surName` have changed. They are now `field.persons_common.surName.fullName` and `field.persons_common.surName.name`. If you have customized these labels using the previous message IDs (`field.persons_common.surname.fullName` and `field.persons_common.surname.name`, respectively), update your configuration to use the new IDs. Note the uppercase "N" in "surName" in the new IDs.

- Use of collections record:
  - The record editor form has been updated to display new fields that were added in 6.0, and to hide fields that were migrated into new fields. To use this version of cspace-ui with an older version of the CollectionSpace server, the use of collections form should be replaced with one from a prior version of cspace-ui that is compatible with that version of the server.

## v3.0.0

v3.0.0 adds support for CollectionSpace 5.2.

### Breaking Changes

- On the Roles and Permissions tab of the Administration screen, roles may now be sorted by display name. This requires API support from the CollectionSpace server that is present in CollectionSpace 5.2, but not in prior versions of CollectionSpace. If this version of cspace-ui is used with an older version of the CollectionSpace server, attempting to sort roles by display name will cause an error.
- A new field, `fieldCollectionFeature`, has been added to the record editor form for object records. This field exists in CollectionSpace 5.2, but not in prior versions of CollectionSpace. To use this version of cspace-ui with an older version of the CollectionSpace server, this new field should be hidden; otherwise, any value entered will not be saved.

## v2.0.0

v2.0.0 adds support for CollectionSpace 5.1.

### Breaking Changes

New fields have been added to the record editor forms for following record types: group, intake, loan in, loan out, and object exit. These fields exist in CollectionSpace 5.1, but not in prior versions of CollectionSpace. To use this version of cspace-ui with an older version of the CollectionSpace server, these new fields should be hidden; otherwise, any values entered will not be saved. The following fields are new:

#### group
- `groupEarliestSingleDate`
- `groupLatestDate`

#### intake
- `approvalGroupList` and descendants

#### loan in
- `loanGroup` (in `loanStatusGroupList/loanStatusGroup`)
- `loanIndividual` (in `loanStatusGroupList/loanStatusGroup`)

#### loan out
- `loanGroup` (in `loanStatusGroupList/loanStatusGroup`)
- `loanIndividual` (in `loanStatusGroupList/loanStatusGroup`)

#### object exit
- `deaccessionApprovalIndividual` (in `deacApprovalGroupList/deacApprovalGroup`)
- `deaccessionApprovalNote` (in `deacApprovalGroupList/deacApprovalGroup`)
