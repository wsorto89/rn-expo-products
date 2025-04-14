jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: (props) => React.createElement("Icon", props),
    MaterialIcons: (props) => React.createElement("Icon", props),
    // Add more icons you use here
  };
});

global.setImmediate = global.setImmediate || ((fn) => setTimeout(fn, 0));
