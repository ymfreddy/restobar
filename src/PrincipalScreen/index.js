import React, { Component } from "react";
import Principal from "./Principal.js";
import MainOptionScreenNavigator from "../OptionScreen/index.js";
import MenuDerecho from "../MenuDerechoScreen/MenuDerecho.js";
import Login from "../LoginScreen/Login.js"
import { DrawerNavigator } from "react-navigation";

const PrincipalScreenRouter = DrawerNavigator(
  {
    Principal: { screen: Principal },
    Opciones: { screen: MainOptionScreenNavigator },
    Login: { screen: Login }
  },
  {
    contentComponent: props => <MenuDerecho {...props} />
  }
);
export default PrincipalScreenRouter;