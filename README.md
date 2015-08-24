# G-Chain

> A password manager packaged as a
> [Chrome App](https://developer.chrome.com/apps/about_apps). G-Chain stores
> all your passwords
> [securely encrypted](https://github.com/digitalbazaar/forge) in your Google
> Drive account using the
> [Drive REST API](https://developers.google.com/drive/web/about-sdk).
> Passwords are only retrieved and updated using secure HTTPS connections.

## How it works

1. Install the Chrome App

1. Create a master password to encrypt your passwords. Only you will know your
   master password (*do not lose this!*)

1. Add sites and passwords to your G-Chain

1. When you visit a site you have saved a password for, click the extension
   icon to fill the login form with your password

## Key Features

- Passwords are stored securely in a location only you can access and can only
  be decrypted with the master password only you know

- Match sites with 
  [regular expressions](https://en.wikipedia.org/wiki/Regular_expression), so
  you can have one saved password for `app1.example.com` and `app2.example.com`

- Train your G-Chain to automatically login to sites

- Quickly search for passwords in the app with a user-defined hotkey

- Generate secure passwords

## Development Roadmap

- [ ] Chrome App skeleton to display sites

- [ ] Store and retrieve encrypted passwords locally

- [ ] Notify when browser path matches a saved site

- [ ] Generate secure passwords

- [ ] Store passwords in user's Google Drive
      ["Application Data folder"](https://developers.google.com/drive/web/appdata)

- [ ] Search for passwords using hotkey at anytime

- [ ] Version 1.0

- [ ] Android app skeleton to display sites

- [ ] Android app stores and retrieves encrypted passwords locally
