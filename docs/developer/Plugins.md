# Plugins

This documentation is intended for developers who wish to author CollectionSpace UI plugins. For instructions on using an existing plugin, see the [configuration documentation](../configuration).

Plugins modify or extend the functionality of the CollectionSpace UI by supplying configuration to be merged into the default configuration. The cspace-ui project contains built-in plugins in its source tree (in the [src/plugins](../../../src/plugins) directory). These plugins are loaded by default. Plugins may also be authored as separate projects, and distributed as npm packages that CollectionSpace administrators may add to their installations.

## Plugin API

A plugin is a JavaScript module whose default export is a factory function, with two possible return types.

```JavaScript
(pluginConfig: Object) => Object
```

```JavaScript
(pluginConfig: Object) => (configContext: Object) => Object
```

The factory function accepts a plugin configuration object, whose shape is determined by the plugin author. The purpose of the plugin configuration is to modify the behavior the plugin, but the plugin author determines exactly how that object is used.

The function has two possible return values: a configuration object, or a configurer function.

If a configuration object is returned, it must be a [CollectionSpace UI configuration object](../configuration). This configuration will be deeply merged into the pre-existing UI configuration.

If a configurer function is returned, it will be executed with a configuration context object as its argument. The configuration context contains information about the runtime environment that may be useful to the plugin, and provides access to cspace-ui APIs. This allows the plugin to implement more complex configurations. The configurer function must return a [CollectionSpace UI configuration object](../configuration). The returned configuration will be deeply merged into the pre-existing UI configuration.

Using an ES2015 [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and the ES2015 [export statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export), a simple plugin that returns a configuration object might look like this:

```JavaScript
export default pluginConfig => ({
  // Define configuration properties here. The supplied pluginConfig may be used to compute these
  // properties.
});
```

A simple plugin that returns a configurer function might look like this:

```JavaScript
export default pluginConfig => configContext => ({
  // Define configuration properties here. The supplied pluginConfig and configContext arguments
  // may be used to compute these properties.
});
```

## Plugin Types

A plugin may configure anything that is configurable in the UI, so plugins are not limited to these categories. This list serves only as a guide to some common types.

Types of plugins include:

- Language
  A language plugin translates the UI to a particular language.
- Theme
  A theme plugin customizes the styling (for example, fonts and colors) used by the UI.
- Record Type
  A record type plugin adds support for a new record type to the CollectionSpace UI.
- Extension Set
  An extension set plugin configures fields that may be added to one or more record types.
- Profile
  A profile plugin implements configuration for a community of practice or a class of collection.

## Composing Plugins

Plugins may load other plugins by supplying the `plugins` configuration property.

Below is an example of a plugin that loads other plugins:

```JavaScript
import claimRecordPlugin from 'cspace-ui-plugin-record-claim';
import transportRecordPlugin from 'cspace-ui-plugin-record-transport';

export default () => ({
  plugins: [
    claimRecordPlugin(),
    transportRecordPlugin(),
  ],
});
```

When a plugin is applied to a configuration, any plugins that it loads are first applied to the target configuration in order, and then the other remaining configuration properties are merged into the plugin-modified target configuration.
