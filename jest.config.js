module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  setupFiles: ["./jest/setup.js"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(expo" +
      "|expo-clipboard" +
      "|expo-router" +
      "|expo-modules-core" +
      "|@expo" +
      "|@react-native" +
      "|@react-navigation" +
      "|react-native" +
      "|react-native-reanimated" +
      "|react-native-safe-area-context" +
      ")/)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jsdom",
};
