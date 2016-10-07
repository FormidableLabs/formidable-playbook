## Mobile Playbook: State management

State management strategies in React Native are similar to regular React applications: Flux architecture with [Redux](http://redux.js.org/) is a sensible default choice. Alternatives like [MobX](https://github.com/mobxjs/mobx) and [Relay](https://facebook.github.io/relay/) are also interesting, but not discussed at length here.

#### Persist Redux/Flux store to disk

Most mobile applications will need to persist their data stores to achieve a snappy user experience and offline resilience.

The simplest way to achieve persistent state and offline caching is to serialize the store object to JSON and write it to disk via the [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html) API, and reset the store state from the serialized representation on app startup.

You can use the [redux-storage](https://github.com/michaelcontento/redux-storage) middleware with the [redux-storage-engine-reactNativeAsyncStorage](https://github.com/michaelcontento/redux-storage-engine-reactNativeAsyncStorage) backend to achieve this. For performance reasons, [debouncing](https://github.com/michaelcontento/redux-storage-decorator-debounce) the serialization is usually a good idea.

#### Transient state

Some store keys should not be restored on startup. A good example are "isLoading"-style properties that control loading indicator visibility. If an application crashes while a request is in flight, the app would still display the loading indicator on next launch.

Because state is serialized much more often than it is read, prefer to keep writes simple by writing everything to disk, and remove the unwanted properties when restoring the state.

Some attempted strategies for marking which parts of the store are transient:
 * Blacklist keys (not recommended, increases maintenance burden)
 * Have a separate store subtree for transient state and [prune](#pruning) on startup (not recommended, leads to fragmented source-of-truth in reducers, though your mileage may vary)
 * Prefix transient properties with `_` (or other convention) and use a [JSON.parse reviver](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter) to drop keys that match the convention:

   ```
   JSON.parse(json, (key, value) => key.startsWith('_') ? undefined : value)
   ```
   This method is crude, but effective.


#### Prepare for store schema migrations/pruning on updates

When you persist your application state to disk, you have created a database. And like traditional databases, the schema and existing data may need to be migrated when new versions of application code are released.

Before launching your application to the public, consider what should happen to the persisted application state when the newly updated app is first launched.

##### Pruning

In some cases the application state is a cache that can be repopulated from the backend. Easiest solution is to jettison the persisted state and allow the new version of the application to start from empty initial state.

Sometimes the state can be mostly discarded, but some bits like user session information needs to be kept, so the user isn't required to log into the application again. Simple solution is to organise the Redux store in a way that some subtrees can be kept as-is, and others discarded wholesale.

##### Schema migrations

When the application state contains information that cannot be repopulated from the backend, or it would be too expensive to do so, you need to be able to migrate the store schema and data to be compatible with the new application version.

Conceptually, schema migrations are simple:

 1. Store the application version somewhere in the store.
 2. For each application update that changes the store shape, write a function that takes in the previous version of the state, and returns a new version. Order these functions chronologically and tag them with a version number.
 3. When application starts up, read the state from disk and compare the current app version to the state version.
 4. Upon first startup after an update, apply all migration functions that have not been applied.
 5. Store the new version somewhere in the store.

The implementation of the migrations is usually simple, but testing them reliably is hard, and the consequence of a bad or incomplete migration can be a non-functioning app.

The app should always verify that the it was able to start correctly after a migration and fall back to an initial state if something went wrong.

#### Cache invalidation

If the application state already contains a cached copy of the data required to render a particular screen, when should new data be fetched? Below are some common strategies, although in a complex application a winning strategy is to combine more than one of them where applicable.

##### Update always

Use data in the store as a write-through cache, but attempt to refresh it from the backend every time the data is needed. When user enters a screen they see the old data while the request is in flight, optionally with an indicator to show new data is being fetched.

When new data arrives, the screen updates. If new data was identical to old data and the store update was idempotent nothing on the screen changes. If the request fails due to network error, no obtrusive error should be displayed, unless it is critical that the user always has the latest data.

If handled well, this can result in significant improvement in perceived performance, but provides no optimisation of network usage.

##### Update always, but only load changed data

A variation of the update always strategy, you can use some kind of entity version or `If-Modified-Since` request headers to ask the server to only return data when changed. This is a network optimisation.

##### Expire after time

An option is to store an expiration timestamp along with the cached objects, and only make a request to the server when the object has expired.

Using timed expiry requires consideration of the domain model: How often is this particular data expected to change.

When using timed expiry, manual override (such as pull-to-refresh) should always be provided to enable user to update the latest data when they need it.

#### Alternative storage mechanisms

Sometimes simple state serialization may not cut it. Consider alternative state storage mechanisms, when:
* The application state is too large to fit comfortably into memory
* The application state is so large that its serialization/deserialization causes a noticeable performance hit
* The application state contains sensitive data that must be cached, but cannot securely be saved to disk in plain text

Alternative storage mechanisms to consider are:
* SQLite database (via [react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage))
* [Realm database](https://realm.io/products/realm-mobile-database/)

If using Realm, it may be worthwhile to explore an alternative state management architecture to take advantage of the database's [reactive change events](https://realm.io/docs/react-native/latest/#change-events).

Both of these strategies will add complexity, so use them with careful consideration. It may be wise to first evaluate whether you need to store all this data at all, or if you can chunk the persistence of the store across multiple `AsyncStorage` keys to load data lazily and avoid doing expensive work when not necessary.


#### Using GraphQL with Redux vs Relay

Using GraphQL to talk to your backend will have an effect to the application's state management architecture. [Relay](https://facebook.github.io/relay/) is often considered the "default" client choice, but the tradeoff is that in addition to handling GraphQL queries, Relay wants to also manage the client state for you.

It's worth considering alternatives to be able to keep control of the state. GraphQL client libraries like [Apollo](https://github.com/apollostack/apollo-client) and [Lokka](https://github.com/kadirahq/lokka) provide a lighter-weight GraphQL client API. As an added benefit, they can be used with any GraphQL endpoint and don't require a [Relay-compliant](https://facebook.github.io/relay/docs/graphql-relay-specification.html#content) server implementation.
