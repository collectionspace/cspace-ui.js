# Change Log

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
