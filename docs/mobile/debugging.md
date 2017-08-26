## Mobile Playbook: Debugging

See the official [Debugging](https://facebook.github.io/react-native/docs/debugging.html) docs for introduction to React Native debugging tools. This chapter discusses additional tools and techniques.

#### Chrome Developer Tools

The main debugging tool in React Native are the Chrome Developer Tools, which connect to the emulator or device remotely via websockets. There are a few quirks to be aware of.

* When debugging code remotely in Chrome, the application code *actually runs in the Chrome V8 process* not in the device's JavaScriptCore engine as usual. This makes the debugging environment subtly different from actual production runtime, and may cause different bugs to surface or not occur at all in debugger.
* This also changes the performance characteristics of the application: JavaScript runs faster, but communication over the native bridge occurs remotely and is significantly slower. Chrome remote debugging is therefore not a good tool for debugging performance-related issues.
* When hot reloading is enabled, you may occasionally experience "breakpoint drift": the breakpoint indicator displays on a different line than where the actual break occurs. Toggle hot reloading on and off on reset the breakpoints.

See [Debugging on a device with Chrome Developer Tools](https://facebook.github.io/react-native/docs/debugging.html#debugging-on-a-device-with-chrome-developer-tools) documentation to set up remote debugging on device.

#### react-native log-{platform}

To work around differences between remote debugging environment and the device execution environment, the best tool is often logging. To view a stream of log events from a connected device, run `react-native log-ios` or `react-native log-android`. To make the log searchable, pipe it to `less`

Combined with [redux-logger](https://github.com/evgenyrodionov/redux-logger) middleware this can be a powerful debugging technique.

Turn off verbose logging for production builds, as it can have a measurable performance impact on the application.

#### redux-remote-devtools

To use Redux DevTools with React Native, use the [redux-remote-devtools](https://github.com/zalmoxisus/remote-redux-devtools) package.

#### Inspecting network traffic

To inspect network traffic from a simulator or a device, configure the device network traffic to go through a HTTP proxy such as [Charles Proxy](https://www.charlesproxy.com/) ([instructions](https://www.charlesproxy.com/documentation/configuration/browser-and-system-configuration/)) or WireShark.

#### Inspecting view hierarchies

You can use the in-app "Inspector" developer tool to inspect the view elements on screen. The inspector is moderately useful for debugging flex-box issues, but only allows you to inspect elements you can actually see, and only their dimensions.

On iOS, a more powerful tool for debugging layout issues is Xcode's [Debug view hierarchies](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/debugging_with_xcode/chapters/special_debugging_workflows.html) tool, which allows you to see a 3D view of the applications structure and inspect element layering.

On Android, you can use [Stetho](https://facebook.github.io/react-native/docs/debugging.html#debugging-with-stetho-http-facebook-github-io-stetho-on-android) to see the native view hierarchy.
