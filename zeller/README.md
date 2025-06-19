# 📱 Zeller RN Code Challenge

A React Native app to display and filter a list of users using GraphQL. This project was built as part of a coding interview assessment.

# ✨ Features

### 🔍 User Filtering

Filter users by roles (Admin, Manager) using a custom toggle.

### 🧑‍💻 GraphQL Integration

Connected to a GraphQL backend using Apollo Client with lazy queries and filters.

### 🔄 Search Support

Text search input with debounce to filter users by name.

### 🔃 Pull to Refresh

Manual refresh support for re-fetching the user list.

### ✅ Navigation

Stack navigation implemented using React Navigation (Home, Customer screens).

### 🧪 Test Coverage

Full test coverage using @testing-library/react-native and Jest.

# 🛠 Tech Stack

React Native

TypeScript

Apollo Client (GraphQL)

Jest + Testing Library

React Navigation

# 📷 UI Screenshots

<table>
  <tr>
    <td align="center">
      <img src="screenshots/Screenshot 2025-06-19 at 6.39.10 AM.png" alt="Landscape Screenshot 1" width="600" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <td align="center">
      <img src="screenshots/Screenshot_1750295313.png" alt="Screenshot 1" width="200" />
    </td>
    <td align="center">
      <img src="screenshots/Screenshot_1750295319.png" alt="Screenshot 2" width="200" />
    </td>
    <td align="center">
      <img src="screenshots/Screenshot_1750295321.png" alt="Screenshot 3" width="200" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="screenshots/Screenshot_1750295324.png" alt="Screenshot 4" width="200" />
    </td>
    <td align="center">
      <img src="screenshots/Screenshot_1750295325.png" alt="Screenshot 5" width="200" />
    </td>
    <td align="center">
      <img src="screenshots/Screenshot_1750295328.png" alt="Screenshot 6" width="200" />
    </td>
  </tr>
</table>

## Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.
