# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

Hello, this is a demo app. The purpose of this is to show you my coding
style and what kind of work I have done. Here, I have created custom
hooks in the hooks directory for debouncing and catching errors when
making API calls. I used a FLatlist to virtualize the list of products.
I handled errors gracefully across the app. I added gestures for going
to the next product in the list in the footer of the product details
page and to clear the cart. I made the product's title be copyable. I used a split
context for the cart in order to prevent unnecessary re-renders. I
used the useMemo and useCallback hooks to optimize some components. I wrote unit and integration tests. Lastly, I added github workflows to run on each PR into the main branch and github labels to create builds in expo.

![part1](https://media.giphy.com/media/mm0ORus5kALFfZGpqN/giphy.gif)

![part2](https://media.giphy.com/media/uXLdU9ApfnzcnPaS3l/giphy.gif)

![part3](https://media.giphy.com/media/xoLDQQHaSlV0wi72BK/giphy.gif)

![part4](https://media.giphy.com/media/Qxp9eHkRrcraHUerFs/giphy.gif)
