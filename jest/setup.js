jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { View } = require("react-native");
  const MockIcon = (props) => <View {...props} />;
  return {
    Ionicons: MockIcon,
    MaterialIcons: MockIcon,
    AntDesign: MockIcon,
  };
});

jest.mock("@expo/vector-icons/build/createIconSet", () => {
  const React = require("react");
  const { View } = require("react-native");
  return () => (props) => <View {...props} />;
});
