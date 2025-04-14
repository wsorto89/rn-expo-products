declare module "react-native-drawer-layout" {
  import { ComponentType } from "react";
  import { ViewProps } from "react-native";

  export interface DrawerProps extends ViewProps {
    open: boolean;
    drawerPosition?: "left" | "right";
    drawerWidth?: number;
    onClose?: () => void;
    onOpen?: () => void;
    renderDrawerContent: () => React.ReactNode;
  }

  export const Drawer: ComponentType<DrawerProps>;
}
