import React from "react";
import Pedido from "../Screens/Pedido";
import MenuStack from "./MenuStack";
import { createBottomTabNavigator } from "react-navigation-tabs";
//import { Icon } from "native-base";
import { Image } from "react-native";
import { IMAGE } from "../Constants/Images";
import Pedidos from "../Screens/Pedidos";
import Screen1 from "../Screens/Screen1";

export default OrdenStack = createBottomTabNavigator(
  {
    Pedidos: {
      screen: Pedidos,
      navigationOptions: () => ({
        tabBarLabel: "Pedidos",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={IMAGE.ICON_MENU}
            resizeMode="contain"
            color={tintColor}
            style={{ width: 20, height: 20 }}
          />
        )
        //tabBarIcon: ({ tintColor }) => <Icon name="bowtie" color={tintColor} />
      })
    },
    Menu: {
      screen: MenuStack,
      navigationOptions: () => ({
        tabBarLabel: "Menu",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={IMAGE.ICON_MENU}
            resizeMode="contain"
            color={tintColor}
            style={{ width: 20, height: 20 }}
          />
        )
        //tabBarIcon: ({ tintColor }) => <Icon name="bowtie" color={tintColor} />
      })
    },
    Pedido: {
      screen: Pedido,
      navigationOptions: () => ({
        tabBarLabel: "Pedido Actual",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={IMAGE.ICON_MENU}
            resizeMode="contain"
            color={tintColor}
            style={{ width: 20, height: 20 }}
          />
        )
        //tabBarIcon: ({ tintColor }) => ( <Icon name="briefcase" color={tintColor} /> )
      })
    }
  },
  {
    initialRoutName: "Pedidos",
    order: ["Pedidos", "Menu", "Pedido"],
    tabBarOption: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);
