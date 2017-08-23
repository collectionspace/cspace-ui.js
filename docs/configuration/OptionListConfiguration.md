# Option List Configuration

Option lists are used by the CollectionSpace UI to populate dropdowns for fields in which the possible values are controlled.

The option lists described here are more specifically called *static option lists*. Static option lists are stored in configuration files, may only be edited by a system administrator, and are not expected to change frequently. By contrast, *dynamic option lists* (or *vocabularies*) are stored in the database, are editable through the UI by any user with the appropriate permission level, and are expected to change more frequently. [TODO: Link to documentation for dynamic option lists.]

## Example

Option lists are configured by the `optionLists` property of the [cspace-ui configuration](../configuration) object, as in the following example:

```JavaScript
cspaceUI({
  optionLists: {
    distanceUnits: {
      values: [
        'millimeters',
        'centimeters',
        'meters',
      ],
      messages: defineMessages({
        carats: {
          id: 'option.distanceUnits.millimeters',
          defaultMessage: 'mm',
        },
        centimeters: {
          id: 'option.distanceUnits.centimeters',
          defaultMessage: 'cm',
        },
        meters: {
          id: 'option.distanceUnits.meters',
          defaultMessage: 'm',
        },
      }),
    },
    volumeUnits: {
      values: [
        'cubic centimeters',
        'cubic feet',
      ],
      messages: defineMessages({
        carats: {
          id: 'option.volumeUnits.cubic centimeters',
          defaultMessage: 'cubic cm',
        },
        centimeters: {
          id: 'option.volumeUnits.cubic feet',
          defaultMessage: 'cubic ft',
        },
      }),
    },
    seasons: {
      values: [
        'summer',
        'fall',
        'winter',
        'spring',
      ],
      messages: defineMessages({
        summer: {
          id: 'option.seasons.summer',
          defaultMessage: 'Summer',
        },
        fall: {
          id: 'option.seasons.fall',
          defaultMessage: 'Autumn',
        },
        winter: {
          id: 'option.seasons.winter',
          defaultMessage: 'Winter',
        },
        spring: {
          id: 'option.seasons.spring',
          defaultMessage: 'Spring',
        },
      }),
    }
  },
});
```

The `defineMessages` function used above is exported by the [react-intl](https://github.com/yahoo/react-intl/wiki) package.

## Description

The value of `optionLists` should be an option list map object:

```
type OptionListMap = { [optionListName: string]: OptionListDescriptor }
```

The option list map is keyed by name. The name of an option list is used when configuring fields, in order to bind a field input to the option list [TODO: link to docs for this]. The value for each name is an object describing the option list:

```
type OptionListDescriptor = {
  values: Array<string>,
  messages: MessageDescriptorMap,
}
```

The `values` property contains an array of possible values. These are the values that will be stored in the database. In dropdowns, values will appear in the order in which they are specified here.

The `messages` property contains a [react-intl message descriptor map](https://github.com/yahoo/react-intl/wiki/API#definemessages). Each key of the message descriptor map should be a value from the `values` array. The corresponding message descriptor should describe the translatable, user-friendly display label for the value. If a message descriptor is not present for a value, the value itself is displayed.

## Tips

- ⚠️ When configuring option lists for an existing CollectionSpace installation that has data, be sure that the option list values exactly match the values in the database, including case, whitespace, and punctuation. Any values in the database that do not exactly match values configured in the option list will not appear to be selected in the UI.

- It's not strictly necessary to supply a message descriptor for each option you configure. If the database value is the same as the label you want to be displayed to the user, and you're not going to translate it to another language, you don't need a message descriptor.

- If you do supply a message descriptor, the `id` must be unique among all message descriptors in the application. Use this convention to reduce the likelihood of duplication: `option.${optionListName}.${value}`. This ID can be any string, so it doesn't matter if there's whitespace or punctuation in it -- it just has to be unique.

- Make option list names plural. This makes it easier to identify them when they're used in field configuration files.

- Make option list names understandable, and descriptive of their contents. Sometimes an option list should have a similar name to the field in which it's used, but sometimes it shouldn't. For example, the option list associated with the field `vCoordSys` is more legibly named `coordinateSystems`. An option list associated with a field called `responsibleDepartment` is better named more generically, as `departments` or `museumDepartments`; that allows the same list to be used in other fields without confusion.

- To change the label of an existing option, do not override the message descriptor's `defaultMessage` property. It's better to supply a top-level `messages` configuration property that uses the message ID to override the option's default message, as in [this example](../configuration#messages). This lets you put all of your message overrides in one place, which is a lot easier to manage, especially if you're working with a translator.

- Follow the [UI style guide](../style#option-lists) when labeling options.
