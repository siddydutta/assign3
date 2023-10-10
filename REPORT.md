# Assignment 3 Report

Please see the [assignment spec](https://web.stanford.edu/class/cs253/assign3) for the full details of each question BEFORE answering below.

## What fingerprinting methods did you use? Why did you choose them?

1. **Screen Resolution**: Capturing the user's screen resolution using window.screen.width and window.screen.height. This can help identify a user since screen resolutions can vary widely among devices.

2. **Language**: Capturing the user's preferred language using navigator.language. This can help identify the user's language and, to some extent, their location.

3. **Timezone Offset**: Capturing the user's timezone offset using new Date().getTimezoneOffset(). This can help identify the user's timezone, which can provide additional information about their location.

4. **HTTP Headers**: A request is made to /headers to fetch specific headers (those starting with *`sec-`*). This can provide information about the user's browser and its configuration.

## What limitations does your fingerprinting implementation currently have?

1. **Limited Uniqueness**: While these methods can provide some level of uniqueness, they are not foolproof. Many users may share similar screen resolutions, languages, and timezone offsets.

2. **Inaccurate Location**: Language and timezone information can be misleading. Users might travel or use devices with settings different from their actual location.

3. **Dynamic Changes**: User settings can change over time, so a fingerprint generated at one point might not match later.

4. **Proxy and VPN Usage**: Users behind proxies or VPNs may have identical or similar fingerprints despite being different individuals.

5. **Browser Differences**: Different browsers may provide different header information, leading to inconsistencies in the fingerprint.

## Suppose you are working on a privacy-preserving web browser. Describe ONE way to defend against your fingerprinting methods (or explain why your method is unable to be defended against).<br><br>Analyze the costs of your proposed mitigation strategy, in terms of performance, user experience, and web compatibility.

**Fingerprint Randomization**
Feature that periodically changes the browser's fingerprint attributes. This includes regularly altering user agent strings, screen resolution, and other identifiable attributes. By doing so, it becomes challenging for trackers to create a stable and unique fingerprint for each user.

1. **Performance**: Randomizing browser attributes may lead to slight performance overhead, as the browser needs to regenerate the fingerprint periodically. However, this impact should be minimal, especially if done intelligently to minimize disruption during critical tasks.

2. **User Experience**: This mitigation strategy could enhance user privacy significantly, but there might be some trade-offs in user experience. Users may occasionally encounter issues on websites that rely heavily on fingerprinting for security (e.g., banking sites) or customization (e.g., saved preferences).

3. **Web Compatibility**: While randomizing fingerprints can help protect privacy, it might result in occasional compatibility issues on websites that rely on consistent user data for legitimate purposes.

## Choose ONE of the following browser anti-fingerprinting initiatives. Do they defend against your fingerprinting methods? If so, how could you modify your fingerprinting methods to continue to work despite those new policies?<br><ul style="list-style-type:circle;"><li>Brave: [Fingerprinting Protections](https://github.com/brave/brave-browser/wiki/Fingerprinting-Protections)<li>Chromium: [Intent to Deprecate and Freeze: The User-Agent string](https://groups.google.com/a/chromium.org/g/blink-dev/c/-2JIRNMWJ7s/m/yHe4tQNLCgAJ)<li>WebKit (Safari): [Tracking Prevention in WebKit § Anti Fingerprinting](https://webkit.org/tracking-prevention/#anti-fingerprinting)

Brave's fingerprinting protections will affect my `fingerprint.js` script. 

1. **API Behavior Modification**: Brave may block or modify certain APIs or return non-identifying values to minimize fingerprinting.
    > Instead of relying solely on specific API values, the script can use a combination of multiple sources or techniques to gather information. This might make it more challenging for Brave's protection mechanisms to detect and block fingerprinting attempts.

2. **Randomization of API Values**: Brave might randomize values from APIs to prevent consistent fingerprinting across sessions and websites. 
    > To adapt to randomization, the script can try collecting multiple samples of the same information over time and then aggregating or averaging them. This approach might allow the script to still extract meaningful data even if values are randomized.

3. **Cross-session and Site Linking Prevention**: Brave aims to make its instances look different to websites each time to prevent cross-session and site linking.
    > Incorporating more advanced statistical techniques to analyze the data collected can detect patterns even if Brave randomizes some values.
