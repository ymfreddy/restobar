import React from "react";
import Resumen from "../Screens/Resumen";
import MenuOpciones from "../Components/MenuOpciones";
import OrdenStack from "./OrdenStack";
import { createDrawerNavigator } from "react-navigation-drawer";

const HomeStack = createDrawerNavigator(
  {
    Orden: { screen: OrdenStack },
    Resumen: { screen: Resumen }
  },
  {
    initialRouteName: "Orden",
    contentComponent: props => <MenuOpciones {...props} />
  }
);
export default HomeStack;
