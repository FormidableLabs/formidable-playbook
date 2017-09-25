## Mobile Playbook: Networking

#### Expect failure

In web programming you can get surprisingly far by following the [happy path](https://en.wikipedia.org/wiki/Happy_path). In mobile development, all user actions that depend on the network should be considered likely to result in a failure.

Not every network error should be broadcast to the user. Make a distinction between actions that should display an error message, and ones that should not. Broadly, there are three categories.
 1. **Failed mutation**: User tried to perform an action that affects the state of the system in some way. Display a modal, obtrusive error, such as [Alert](https://facebook.github.io/react-native/docs/alert.html).
 2. **Failed fetch**: User tried to manually refresh some data (e.g. by pull-to-refresh), or the app tried to load data it needs to display a screen. Display a non-intrusive error, such as a toast, a pop-down status bar, or an error message in place of the screen content.
 3. **Failed background refresh**: The app tried to refresh data in the background when entering a screen, but it already has a cached copy of the data. Consider not notifying the user and displaying stale cached data instead, making the app a lot more usable in poor networks.

Read about [Offline-resilient applications](offline-resilient-applications.md) for more advanced scenarios.

#### Expect slow requests

All network-bound user actions should also be presumed to be slow.

Always display a progress indicator and prevent the same action to be performed again while the request is in-flight. On iOS, displaying the [network status indicator](https://facebook.github.io/react-native/docs/statusbar.html#networkactivityindicatorvisible) in the status bar is recommended, but not enough just by itself. [SpinKit](https://github.com/maxs15/react-native-spinkit) provides a few nice-looking loading indicators, if the standard [ActivityIndicator](https://facebook.github.io/react-native/docs/activityindicator.html) is not exciting enough.

Using the Redux async action ["request/response/error"](http://redux.js.org/docs/advanced/AsyncActions.html) pattern is a great way to keep track of request state and update the user interface accordingly. If you are persisting your store, see [Transient state](state-management.md#transient-state).

#### Always use timeouts

Network requests may occasionally hang. Apply a short timeout (10 seconds is a safe default) to allow user to retry the action.

[Fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API), the React Native networking primitive, does not support timeouts natively (!) Instead, you can [wrap the returned Promise and reject it after a timer expires](https://github.com/github/fetch/issues/175#issuecomment-216791333). It's worth noting:
* The timeout does not cancel the request, simply ignores its return value.
* The timeout is not a connection timeout. The timer runs until server sends the response headers.

#### Always use HTTPS endpoints

Never send data from mobile applications unencrypted. If common sense is not a good enough reason, Apple [blocking the usage of unencrypted HTTP starting January 2017](https://techcrunch.com/2016/06/14/apple-will-require-https-connections-for-ios-apps-by-the-end-of-2016/) should be.

Even HTTPS traffic can be trivially intercepted and spoofed by a man-in-the-middle. If it is important the network traffic originates verifiably from the app, consider [SSL Public Key Pinning](https://www.owasp.org/index.php/Pinning_Cheat_Sheet) but be [aware of the dragons](https://blog.qualys.com/ssllabs/2016/09/06/is-http-public-key-pinning-dead).

#### Catch and rethrow async/await exceptions at call site

`async/await` is a way to make asynchronous, Promise-based code appear synchronous. Promise rejections are handled via the language `try..catch` feature. If the rejection is not caught, however, it is swallowed silently. To make network errors explicit, consider following strategies:

 1. By default `fetch` promises no not reject even if the server responds with a HTTP error code. Check `response.ok` before reading the response body, and reject the Promise if that property is `false`.
 2. It is a good practice to encapsulate API calls in a "service" class or module, instead of calling `fetch` directly in View or Action Creator. That module should wrap the API call in a `try..catch`, log the error and re-throw, to ensure the error is not silently swallowed even if the consumer of that module does not handle errors properly.
 3. Avoid `async/await` and use Promises explicitly to avoid masking the asynchronous semantics of the operation.

#### Backend API versioning and forced updates

Unlike web applications, users may continue to use versions of your app for a long time. In order to not break existing clients, the backend API should support [some form of versioning](https://www.3scale.net/2016/06/api-versioning-methods-a-brief-reference/).

In addition to API versioning (or in lieue of, if implementing full-blown versioning is not possible) the app should **always** support deprecating old API versions. The simplest method is to pass either the app version or expected API version to the server on every request, and configure the server to return a special HTTP response for unsupported versions. The app will need to handle this response, display a message to the user instructing to update the app, and prevent further usage of the current version.

These precautions should be in place from the first public release, as releasing software without versioning or deprecation support may prevent you from making new backend releases without bricking existing installations.

#### Prefer chunky APIs

A decision API designers often face: Chatty or Chunky. Chatty APIs require many service calls with small payloads, chunky APIs fewer calls but larger payloads.

It's not the bandwidth that kills, it's the latency. Once a connection to the server is established, most real-life payloads transfer quickly over 3G/4G networks. Fewer requests also mean fewer opportunities to fail due to a temporary network unavailability.

Mobile apps therefore usually do better with chunky APIs.

#### Mobile app needs a mobile backend

When building an application that needs to interface with a legacy API, consider isolating the app from the API with a [Backend for Frontend (BFF)](http://samnewman.io/patterns/architectural/bff/), when the legacy backend:
 * is slow or unavailable, and intermediate caching can be used
 * is managed by a separate team whose priorities and roadmap do not align with the app's
 * is expected to churn a lot
 * does not support versioning
 * does not provide a convenient API and client must perform too much network I/O
 * does not support mobile-friendly authentication

[GraphQL](http://graphql.org) is an ideal BFF for React Native mobile applications. See [State management](state-management.md#using-graphql-with-redux-vs-relay) for client implementation.
