# G-Chain

A password manager packaged as a
[Chrome Extension](https://developer.chrome.com/extensions) and a
[Chrome App](https://developer.chrome.com/apps/about_apps). G-Chain stores your
passwords, [securely encrypted](https://github.com/digitalbazaar/forge), in
your Google Drive account using the
[Drive REST API](https://developers.google.com/drive/web/about-sdk). Passwords
are only retrieved and updated using secure HTTPS connections.

G-Chain is a Chrome *Extension* and a Chrome *App*. The extension does almost
all of the work, the only role of the app is the quick search feature.

## How it works

1. Install the G-Chain Chrome Extension

1. Create a master password to encrypt your passwords. Only you will know your
   master password (*do not lose this!*)

1. Add sites and passwords to your G-Chain

1. When you visit a site you have saved a password for, click the extension
   icon to fill the login form with your password

1. Install the Chrome App to create a hotkey for quickly searching and copying
   stored passwords from your desktop

## Key Features

- Passwords are stored securely in a location only you can access and can only
  be decrypted with the master password only you know

- Match sites using simple strings,
  [glob matching](https://github.com/isaacs/minimatch), or even
  [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) so you
  only need one saved site for `app1.example.com` and `app2.example.com`

- Train your G-Chain to automatically login to sites

- Quickly search for passwords from your desktop with a user-defined hotkey

- Generate secure passwords
