## Mobile Playbook: Mobile UI and UX patterns

This chapter is primarily targeted towards developers who do not have much experience developing mobile apps. To be able to create compelling and native-feeling mobile user interfaces, you need to be aware of platform idioms and develop an intuition on what kind of interaction the user expects at each given circumstance.

#### Follow platform design guidelines

Both Apple and Google have published design guidelines: iOS [Human Interface Guidelines](https://developer.apple.com/ios/human-interface-guidelines/), and and Android [Material Design](https://material.google.com/). **Know them. Follow them.**

This does not mean that apps need to look like standard iOS or Android applications. Visual design of the app may be unique, delightful, branded, and stand out from the crowd. The user experience and interactions, on the other hand, should be obvious, predictable and totally unremarkable: the user should know how to use the app the first time they see it. Following the platform guidelines makes this possible.

Challenge designs that use one platform's idioms on the other. These are usually unintended consequences of designer's bias or lack of experience of the other platform.

Use a component library, such as [react-native-material-kit](https://github.com/xinthink/react-native-material-kit#buttons) or [react-native-material-design](https://github.com/react-native-material-design/react-native-material-design) to help with Material design elements.

#### Touchable things need to respond to touch

There is no hover on mobile. Users discover what actions they can take by touching things to see if they respond. This means all touchable elements should respond to touch, and the action should be cancellable by moving your finger away from the target before releasing the touch.

The Touchable components [TouchableOpacity](https://facebook.github.io/react-native/docs/touchableopacity.html) and [TouchableFeedback](https://facebook.github.io/react-native/docs/touchablehighlight.html) support this. Consider increasing the [TouchableOpacity#activeOpacity](https://facebook.github.io/react-native/docs/touchableopacity.html#activeopacity) when using elements that contrast heavily with the background, as the default effect can look hammy.

On Android, consider using [TouchableNativeFeedback](https://facebook.github.io/react-native/docs/touchablenativefeedback.html) or one of the Material component library Buttons for native platform feel.

An exception to the rule is [TouchableWithoutFeedback](https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html). Use this when making `ListView` rows tappable to avoid unwanted touch effects when scrolling the view. Instead, the element should:
* Visually indicate it is touchable.
* Respond to touch with no delay, by either performing the desired action (navigation, state update) or if the action is long running, showing a progress indicator.

#### Touchable things need to be large enough to touch

Apple recommends all touchable elements are at least [44 x 44 pt](https://developer.apple.com/ios/human-interface-guidelines/visual-design/layout/), whereas Android material guide recommends [48 x 48 dp](https://material.google.com/layout/metrics-keylines.html#metrics-keylines-touch-target-size). The best metric is hallway usability testing on different screen sizes.

Easiest way to increase touchable size of an element is to give it `padding` or an explicit height.

In some cases you may need to increase the touch target size without increasing the space the element takes in the layout. In these cases use [View#hitSlop](https://facebook.github.io/react-native/docs/view.html#hitslop) - just make sure the slop doesn't overlap other touchable targets.

#### Apply animation and motion

If you look at an app on the screen of a phone, you could not tell whether it was a native app or a web page. When you begin to use the app, you can easily (sadly, for the state of mobile web) tell the difference.

The key to a great mobile UX is [thoughtful animation](https://uxplanet.org/animation-in-mobile-ux-design-93263dc6c5f4#.c6nmv0wkg). Unfortunately, in cases where design/dev collaboration is not truly cross-functional, the communication tools (photoshops, lo-fi prototypes, mockups) do not easily communicate motion.

It is therefore the responsibility of the developer to ensure the animations are implemented. As front end web developers we have grown wary of animation: it often feels gratuitous, performs poorly, and is difficult to implement cross-browser. React Native animation, on the other hand, are easy to use and to maintain, and you should not judge them before you try them.

The MVP for animation in React Native is a liberal sprinkling of [LayoutAnimation](https://facebook.github.io/react-native/docs/layoutanimation.html) in `componentWillMount`/`componentWillReceiveProps`.

For custom element animations, use the awesome [Animated](https://facebook.github.io/react-native/docs/animated.html) API.

#### Use other apps to learn what works

Best way to gain intuition of mobile UX is to use a wide range of apps to see what works and what doesn't. Be inspired and copy with pride.
