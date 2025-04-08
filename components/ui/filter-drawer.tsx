// import * as React from "react";
// import { Button, Text } from "react-native";
// import DrawerLayout from "react-native-drawer-layout";

// const FilterDrawer = () => {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <Drawer
//       open={open}
//       onOpen={() => setOpen(true)}
//       onClose={() => setOpen(false)}
//       renderDrawerContent={() => {
//         return <Text>Drawer content</Text>;
//       }}
//     >
//       <Button
//         onPress={() => setOpen((prevOpen) => !prevOpen)}
//         title={`${open ? "Close" : "Open"} drawer`}
//       />
//     </Drawer>
//   );
// };

import React from "react";
import { Text } from "react-native";
 const FilterDrawer = () => {
  return (
    <Text>Filter Drawer</Text>
  );
}
export default FilterDrawer;