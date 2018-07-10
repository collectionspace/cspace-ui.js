### Configuration Context

The context object provided to a configurer function contains information about the runtime environment that may be useful when configuring the UI. This includes references to third-party libraries, like React and Immutable, that have been imported by the application. The configurer itself should not import any external dependencies that are injected via the context; instead, it should use the provided ones. This ensures that the configurer does not import incompatible versions of libraries that are already imported by the application. If the configurer is part of a plugin that is distributed separately from the UI application, it also allows for reduced plugin size, since duplicate libraries won't appear in both distributions.

The following properties are provided in the context:

#### `config`: Object

The target configuration into which the configuration returned by the configurer will be merged. This allows the configurer to access other configuration properties.

⚠️ Do not mutate the config object in the configuration context.

#### `configHelpers`: Object

An object that contains constants and functions used in configuration.

<table>
  <thead>
    <tr>
      <th>Property</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>configKey</code></td>
      <td>
        <p>String. The name of the property in a field descriptor that contains the field's configuration.</p>
      </td>
    </tr>
    <tr>
      <td><code>mergeStrategy</code></td>
      <td>
        <p>
        Object. Contains functions that may be used to specify how a configuration value is merged into the target, instead of the default deep merge. Contains the following functions:
        </p>
        <ul>
          <li>
            <code>override: (config: Object) => Object</code>
            <p>
              Causes the specified configuration to replace the target configuration,
              instead of being merged into it.
            </p>
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### `dataTypes`: Object

An object that contains data type constants used to define the types of fields in field configuration.

|Property                   |Description|
|---------------------------|-----------|
|`DATA_TYPE_MAP`            |Map type (used for complex fields that contain other fields).|
|`DATA_TYPE_STRING`         |String type.|
|`DATA_TYPE_INT`            |Integer type.|
|`DATA_TYPE_FLOAT`          |Floating point number type.|
|`DATA_TYPE_BOOL`           |Boolean type.|
|`DATA_TYPE_DATE`           |Date type.|
|`DATA_TYPE_DATETIME`       |Date and time type.|
|`DATA_TYPE_STRUCTURED_DATE`|Structured date type.|


#### `formatHelpers`: Object

An object that contains functions useful for formatting data.

<table>
  <thead>
    <tr>
      <th>Property</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>formatDate</code></td>
      <td>
        <p></p>
      </td>
    </tr>
    <tr>
      <td><code>formatForeignSourceField</code></td>
      <td>
        <p></p>
      </td>
    </tr>
    <tr>
      <td><code>formatRefName</code></td>
      <td>
        <p></p>
      </td>
    </tr>
    <tr>
      <td><code>formatRefNameAsRecordType</code></td>
      <td>
        <p></p>
      </td>
    </tr>
    <tr>
      <td><code>formatRefNameAsVocabularyName</code></td>
      <td>
        <p></p>
      </td>
    </tr>
    <tr>
      <td><code>formatServiceObjectName</code></td>
      <td>
        <p></p>
      </td>
    </tr>
    <tr>
      <td><code>formatSourceField</code></td>
      <td>
        <p></p>
      </td>
    </tr>
    <tr>
      <td><code>formatTimestamp</code></td>
      <td>
        <p></p>
      </td>
    </tr>
    <tr>
      <td><code>formatWorkflowStateIcon</code></td>
      <td>
        <p></p>
      </td>
    </tr>
  </tbody>
</table>

#### `inputComponents`: Object

An object that contains React input components for use in field configuration. These are used when configuring view types for fields (via the searchView and view properties). The following properties are available.

|Property             |Description|
|---------------------|-----------|
|`AutocompleteInput`  |An input component that performs partial term searches on specified authorities as the user types, and suggests authority terms that may be selected.|
|`CheckboxInput`      |A checkbox, suitable for marking boolean fields true or false.|
|`CompoundInput`      |An input that contains other inputs, used to render complex fields.|
|`DateInput`          |An input used to render ISO 8601 dates. A calendar dropdown is displayed to allow the user to select the value.|
|`DateTimeInput`      |An input that displays a date and time, used to render ISO 8601 timestamps. The value displayed by this component is read only (not editable).|
|`HierarchyInput`     |An input used to display and edit broader and narrower records, and show adjacent records. Only to be used on record types that support hierarchical relations (authorities and objects).|
|`IDGeneratorInput`   |An input that allows the user to select an automatically generated ID number.|
|`URLInput`           |A text input that shows a clickable link to its value, if the value is a URL.|
|`OptionPickerInput`  |An input that displays a dropdown of static option list values.|
|`StructuredDateInput`|An input for editing structured date fields.|
|`RichTextInput`      |An input for editing rich text fields, used to render fields that contain HTML.|
|`TextInput`          |A simple free text input.|
|`TermPickerInput`    |An input that displays a dropdown of dynamic option list values.|
|`UploadInput`        |An input for uploading files. Only to be used to upload the content of blob records.|

#### `lib`: Object

An object that contains external libraries. The object has the following properties:

|Property|Description|
|`Immutable`|The [Immutable](http://facebook.github.io/immutable-js/) library. The configurer may use this library to work with record data, which is represented as an Immutable [Map](http://facebook.github.io/immutable-js/docs/#/Map).|
|`React`    |The [React](https://facebook.github.io/react/) library. The configurer may use this library to render UI components, such as record forms.|

#### `layoutComponents`: Object

An object that contains React layout components for use in forms. The following properties are available.

|Property|Description|
|--------|-----------|
|`Col`   |A column of fields.|
|`Cols`  |A set of columns.|
|`Panel` |A (possibly collapsible) container for fields.|
|`Row`   |A row of fields.|

#### `recordComponents`

An object that contains React components for use in forms.

|Property       |Description|
|---------------|-----------|
|`ContentViewer`|A viewer for record content. Used to display blob content in forms.|
|`Field`        |A field. The `Field` component is used indicate the position a field in a form for purposes of layout. The particular rendering of the field is determined by the field's view configuration.|
|`InputTable`   |A component for laying out fields as a single row table with headers.|
|`Subrecord`    |An embedded record. The `Subrecord` component is used to position the subrecord in a form for purposes of layout. The subrecord must also be configured in the record type configuration.|

#### `recordDataHelpers`: Object

An object that contains functions for working with record data.

<table>
  <thead>
    <tr>
      <th>Property</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>deepGet</code></td>
      <td>
        <p>
          <code>(data: Immutable.Map, path: Array<string>) => Immutable.Map | Immutable.List | string</code>
        </p>
        <p>Gets a value from record data, given a path of keys or indices.</p>
        <p>⚠️ Deprecated. Use <a href="https://facebook.github.io/immutable-js/docs/#/Map/getIn">Immutable.Map.getIn</a> instead.</p>
      </td>
    </tr>
    <tr>
      <td><code>getPart</code></td>
      <td>
        <p>
          <code>(data: Immutable.Map, name: string) => Immutable.Map</code>
        </p>
        <p>Gets the named part from the record data. The supplied name must not contain a namespace prefix. <code>getPart(data, 'loansin_common')</code> is equivalent to <code>data.get('ns2:loansin_common')</code>.</p>
      </td>
    </tr>
    <tr>
      <td><code>getPartPropertyName</code></td>
      <td>
        <p>
          <code>(partName: string) => string</code>
        </p>
        <p>Gets the property name for a part name in record data, where the part name does not contain a namespace prefix.</p>
        <p>Example: <code>getPartPropertyName('loansin_common') => 'ns2:loansin_common'</code></p>
      </td>
    </tr>
    <tr>
      <td><code>isNewRecord</code></td>
      <td>
        <p>
          <code>(data: Immutable.Map) => boolean</code>
        </p>
        <p>Returns true if the given record data represents a new (never saved) record, false otherwise.</p>
      </td>
    </tr>
  </tbody>
</table>

#### `refNameHelpers`: Object

An object that contains functions for working with refnames.

<table>
  <thead>
    <tr>
      <th>Property</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>getDisplayName</code></td>
      <td>
        <p>
          <code>(refName: string) => string</code>
        </p>
        <p>Returns the display name part of the given ref name.</p>
      </td>
    </tr>
  </tbody>
</table>

#### `searchOperators`: Object

An object that contains search operator constants used to define advanced search conditions. See the [advanced search configuration documentation](./AdvancedSearchConfiguration.md) for details.