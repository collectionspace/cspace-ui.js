# File Directory

This document describes the filesystem layout of cspace-ui source code.

## Source Code

Source code is located in the `src` directory.

### index.jsx

The entry point of the application. Exports the CSpaceUI function, which is used to configure and render the application.

### routes.jsx

Defines the [routes](ArchitecturalOverview.md#routing) (URL to component mappings) used by the application.

### actions

Contains definitions of [action creators](ArchitecturalOverview.md#application-state) and action type constants.

### components

Contains definitions of [presentational React components](ArchitecturalOverview.md#view-layer).

### containers

Contains definitions of Redux [container components](ArchitecturalOverview.md#connecting-the-application-state-to-the-view-layer).

### enhancers

Contains definitions of [higher-order components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) used to enhance other components.

### helpers

Contains definitions of helper/utility functions.

### plugins

Contains definitions of cspace-ui [plugins](PluginGuide).

### reducers

Contains definitions of Redux [reducers](ArchitecturalOverview.md#application-state).

## Tests

Tests are located in the `test` directory.

### helpers

Contains definitions of helper/utility functions used for testing.

### integration

Contains integration tests.

### specs

Contains unit tests (aka specifications). The `src` tree is more-or-less mirrored here; there is usually a spec file for each JS file in `src`.

## Other Assets

The `images` directory contains icon and logo images. The `styles` directory contains stylesheets.
