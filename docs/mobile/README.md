## The Mobile Playbook

**@TODO: Move this document to the main repo readme?**

Our mobile development is currently focused on React Native, targeting the Android and iOS platforms.

This playbook is intended towards developers with existing JavaScript and React experience. Unless otherwise stated, all general React good practices apply to native development.

#### [Mobile UI and UX practices](mobile-ui-ux.md)

React Native is superior to hybrid mobile app development, because it's *native*. To benefit from the native view layer, you'll need to follow platform guidelines and general native app development best practices.

#### [Platform-specific code](platform-specific-code.md)

React Native philosophy is *learn once, write everywhere*. While well-architected apps can achieve high degree of code sharing, there will be need for platform-specific implementation.

#### [Navigation and routing](platform-specific-code.md)

Navigation and routing patterns differ significantly from React web applications. Following idiomatic mobile navigation UX patterns, combined with Redux/Flux-managed navigation state, can be a powerful and pleasant abstraction to work with.

#### [State management](state-management.md)

Unlike your average web application, a mobile app's state is long-lived. We recommend using a Redux/Flux store and middleware-based disk persistence as the base solution, and considering mobile databases such as Realm or SQLite in case of specific requirements.

#### [Networking](networking.md)

Mobile applications have to deal with high network latency, unreliable network conditions, and they should be kind to the user's data plan.

This chapter discusses good practices around mobile app networking with standard HTTPS JSON API endpoints.

Consider GraphQL as the primary data interchange format.

#### [Authentication](authentication.md)

There are many ways to authenticate your users. We recommend using basic signed JSON Web Tokens for their simplicity.

Alternatives like OAuth should be carefully considered for the complexity they introduce.

#### [Offline-resilient applications](offline-resilient-applications.md)

Some mobile applications need to work fully offline, but all of them need to handle offline scenarios in one way or another.

This chapter discusses different strategies for handling situations where network resources cannot be accessed.

#### [Performance](performance.md)

React Native applications achieve a buttery smooth 60fps out of the box in many situations, but there are known performance bottlenecks, and you can shoot yourself in the foot in untold ways. Be prepared!

#### [Debugging](debugging.md)

Debugging React Native applications is not entirely different from debugging React web applications. Some special tooling is needed, and learning to debug native code can be a dive in the deep end.

#### [Deployments](deployments.md)

Deploying mobile apps is... painful. Thankfully there are tools than can ease the pain, and knowing the app store release guidelines will make it a lot easier.

Investing in build and release automation pays off in all but the most trivial cases.

#### [Production](production.md)

Got the app to the app store? Good job! Now you need to keep it running. Put analytics and crash reporting in place to see how your app is doing, and be prepared to roll out updates.

#### [Surviving React Native](surviving-react-native.md)

Creating mobile apps with React Native is a joy! Well, mostly. The platform is moving fast and occasionally things are broken. With the right attitude and following a few good practices you can keep up with the change, and known issues are manageable when you know how.
