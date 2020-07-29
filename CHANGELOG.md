# Change Log

## v5.0.0

v5.0.0 adds support for CollectionSpace 6.1.

### Breaking Changes

- An Export button now appears on search results. This feature requires CollectionSpace 6.1. If this version of the UI is used with an older version of the CollectionSpace server, attempting to export search results will result in an error.

- Obejct record:
  - A new field, `namedCollection`, has been added to the record editor form. This field exists in CollectionSpace 6.1, but not in prior versions of CollectionSpace. To use this version of cspace-ui with an older version of the CollectionSpace server, this new field should be hidden; otherwise, any value entered will not be saved.

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
