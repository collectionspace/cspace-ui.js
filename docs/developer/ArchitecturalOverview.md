# Architectural Overview

cspace-ui is a conventional [React](https://facebook.github.io/react/) + [Redux](http://redux.js.org/) [single page application](https://en.wikipedia.org/wiki/Single-page_application).

## Application State

The entire (non-transient, serializable) state of the application is stored in a single object. This includes: the data of the record currently being displayed; the loading state and content of sidebar components; the open/closed state of collapsible panels; the notifications being displayed; and basically everything else. The [Redux](http://redux.js.org/) library provides the framework for this. The state object has the following characteristics:

- Serializable. This means that state may be saved and restored easily, and sent along with bug reports.
- Immutable. State is never mutated; all state changes result in a new state object. This allows for trivial implementation of undo/redo.

A Redux [_store_](http://redux.js.org/docs/basics/Store.html) contains the state. State is modified by dispatching an [_action_](http://redux.js.org/docs/basics/Actions.html) to the store. An action is an object that contains an action type and a payload. In response to an action, the store applies a [_reducer_](http://redux.js.org/docs/basics/Reducers.html) to the current state. A reducer is a [pure](https://en.wikipedia.org/wiki/Pure_function) function that accepts the current state and the action, and returns the new state.

The state object is never accessed directly by the rest of the application. Instead, _selectors_ are provided. These are functions that read from the state, so that changes to the shape of the state do not require changes to code that accesses the state.

## Data Layer

Data for the application is retrieved from the CollectionSpace REST API, using the [cspace-client](https://github.com/collectionspace/cspace-client.js) library. In a Redux application, side-effects such as communicating with an external API are isolated to [_action creators_](http://redux.js.org/docs/basics/Actions.html#action-creators). These are functions that dispatch one or more actions, and perform side-effects. For example, a `saveRecord()` action creator might dispatch a `RECORD_SAVE_STARTED` action, issue a call to the API, and then asynchronously dispatch a `RECORD_SAVE_FULFILLED` action, with the response data as the payload of the action. The store may update the application state accordingly in response to each action.

## View Layer

The view layer consists of a number of [presentational](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) React components. These are concerned with how the UI _looks_. They respond to user interaction (e.g. mouse clicks, typing, dragging) by executing callbacks provided as [props](https://facebook.github.io/react/docs/components-and-props.html), but they do not know or care what those callbacks do. They do not issue actions or read from state. All they do is render the provided props.

Some presentational components store local transient state; for example, a dropdown input handles the click event, and displays a popup, treating the visible/hidden state of the popup as internal state. An alternate implementation would be to push this state into the Redux store, but this would add a bit of complexity to the implementation, and would make it more difficult to reuse the component in other applications, since those other applications would also be required to manage the popup state.

A presentational component may store internal state if:

- The state is local, meaning it does not need to be visible to any other part of the application, and
- The state does not need to be reproduced when stepping through the state of the application via undo/redo, and
- The state is transient. As a rule of thumb, the state of a cspace-ui component may be considered to be transient if it does not need to be remembered after the component loses focus.

Any other state should be pushed into the Redux store.

## Connecting the Application State to the View Layer

To complete the application, the view needs to be updated as the application state changes, and user interaction with the view needs to cause action creators to be executed. This is handled by the [React Redux](https://github.com/reactjs/react-redux) library. React Redux introduces [_container_](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) components. These are React components that wrap presentational components (using the [higher-order component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.23x9han42) pattern), making them Redux-aware. Specifically, this means that the container component reads from the application state (using selectors), and passes that state information to the wrapped component via props. It also passes callback functions to the wrapped component via props. These callback functions execute action creators when users click, type, drag, etc. in the wrapped component.

This architecture allows presentational components to be reused in applications that do not use Redux. The coupling to Redux is isolated to the container components.

## Routing

As a single page JavaScript application, cspace-ui handles any URL under the URL of the page in which it is running. This is essentially a client-side implementation of the [front-controller](https://en.wikipedia.org/wiki/Front_controller) pattern. Dispatching of URLs to views (aka _routing_) is done using the [React Router](https://github.com/ReactTraining/react-router) library. React Router maps URLs to React components, and renders the appropriate set of components for a given URL.
