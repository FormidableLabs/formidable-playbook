## Mobile Playbook: Deployments

#### Automate build and deployment with Fastlane
Fastlane helps automate building, submission and deployment of apps for testing and public release. Fastlane supports TestFlight for iOS and  Crashlytics (Fabric) and Google Play Beta for Android for test builds. It is important to note that Fastlane does not automatically configure your machine and developer portal for you, but rather automates the entire build process into a single flow called a lane. You will still need to create app IDs, have valid provisioning profiles and have key-pair signed certificates to use Fastlane for iOS or a Google Play keystore for Android. [Learn more about configuring and setting up Fastlane.](https://docs.fastlane.tools)

#### Configuring apps to support multiple environments

#### Certificates and provisioning profiles

All apps for Apple platforms require apps to be signed for development and production deployment. To sign an app, you will need an app ID, provisioning profile and certificate with a signed key-pair. If your app has an extension like Siri integration or a watchOS app, entitlements and additional provisioning profiles are required.

##### Application Identifiers
An App ID links a bundle identifier with app services. App services are integrations like ApplePay, Push Notifications, HealthKit, etc. An App ID can also specify App Groups which let apps communicate between each other and share data. A common use case for an app group is a watchOS app that connects to an iOS counterpart. All targets that connect using an App Group must use the same string identifier in their respective entitlements file. These are managed in Xcode for your app and must match the strings in the Apple Developer portal.

##### Provisioning Profiles
Provisioning profiles link an Apple Developer account with authorized devices and an App ID. Development provisioning profiles are specific to a list of devices and that app will only run on those devices. If new devices are added to a provisioning profile then the app will have to be rebuilt and resigned to run on those additional devices. Production provisioning profiles do not link against devices but only allow for apps to run when distributed as Enterprise Ad-Hoc or with the App Store for testing or public distribution. Provisioning profiles will become automatically invalid if the corresponding app identifier's app services are changed or modified.

#### Certificates
There are two types of certificates—development and production. Certificates need to be signed with a key-pair. Development certificates are for running apps on your local test devices. A development certificate can be automatically generated and managed in Xcode. Development certificates are specific to the developer and their machine. Production certificates are for release and test builds. These certificates are for the entire development team. To create a production certificate you will need to create a certificate signing request in Keychain Access and upload that to the developer portal.

* It is imporatant to note that having Xcode "fix" or "automatically manage" a production certificate can lead to it being reset or revoked which will effect everyone on the team who creates signed production builds. In this case you will need to export the new signed pair certificate (.p12) and distribute it to your team.

#### Push Notification Certificates (APNS)
Additional certificates will be required for receiving push notifications. Similarly to app distribution, there are development and production push notification certificates as well. These certificates are generated like distribution certs with a CSR from Keychain Access and uploaded to the app's App Identifier entry on the developer portal.


#### Continuous Integration
Options:
* Bitrise.io,
* Jenkins + Private Build Server,
* Microsoft VSTS + MacInCloud build agents)
* Xcode Bots and macOS Server

**Needs discussion**

#### Continuous deployment with Microsoft Code Push

#### Play Store Beta program

#### Apple TestFlight
Apple TestFlight is the platform for distributing iOS, watchOS and tvOS apps for testing. Internal and external testing are the two types of distribution with TestFlight. Internal testing is limited up to 25 users who have to be iTunes Connect users. Internal test builds process typically 25 minutes to an hour and do not have to be reviewed by the Apple Store team. External testing can have up to 2000 different users with any email address that are not iTunes Connect accounts. External test builds take longer to review, typically 12-24 hours, and must comply to Apple Store Guidelines. Additionally, external test builds have a 60 day expiration and only 10 apps per iTunes Connect account can be tested.

A build can be submitted for testing by uploading it to the App Store via Xcode or Application Loader. An app entry with a valid bundle identifier must exist in iTunes Connect before uploading. Apps uploaded for testing must be signed with a production certificate. After a build is finished processing, users who are active testers will receive a push notification and be instructed to download the new build through the TestFlight app. New testers will receive an email on how to get started with testing.

#### Third party beta distribution: HockeyApp / Crashlytics

**Needs discussion**

#### App Store submission process
To submit a build to the App Store, use the Archive and Upload feature in Xcode. You will need to archive for a release build configuration which will optimize for performance and use production signing assets. Once an archive is exported, it can be uploaded to iTunes Connect. An app entry with a valid bundle identifier must exist in iTunes Connect before uploading. After the build is finished processing you will have the choice to submit to public release for review or one of the testing distribution channels with TestFlight.

For a public release, complete metadata must be supplied. This includes a description, screenshots, icons, support contact info, and any financial contracts if your app is being sold at a price.

There are some things that can cause a build to fail processing or validation that are outside of Apple Store Guidelines.
* Apps must have a higher build number than a previous build—even if the previous build was not released publicly or to TestFlight.
* Extensions, including watchOS companion apps, must be signed with the same signing identity, or team. Xcode does not prevent this when generating or signing a build.
* App icons must not have an alpha channel or additional Finder metadata. Preview in macOS Sierra adds metadata that will fail validation. It is recommended to process image assets using a tool like ImageMagick.
* Features that require user permission, like geolocation, photo capture, microphone, etc., must have the corresponding user-facing permissions string in the plist file. They are listed [in this document](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) and their Xcode name starts with "Privacy".

#### Play Store submission process

#### Complying with App Store guidelines
Apple has a complete and [detailed document](https://developer.apple.com/app-store/review/guidelines/) on complying with App Store guidelines. Essentially apps must be feature complete, with no placeholders, handle connectivity issues gracefully if it requires internet access and accurately represented in the App Store metadata. If an app has any authentication component, a valid test user and password must be supplied.
