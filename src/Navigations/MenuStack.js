import {
  createStackNavigator,
  NavigationStackOptions
} from "react-navigation-stack";
import Menu from "../Screens/Menu";
import MenuDetalle from "../Screens/MenuDetalle";
import Screen1 from "../Screens/Screen1";
import Screen2 from "../Screens/Screen2";

const MenuStack = createStackNavigator(
  {
    Menu: {
      screen: Menu
    },
    MenuDetalle: { screen: MenuDetalle }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default MenuStack;
