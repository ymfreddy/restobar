import React, { Component } from "react";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import HomeStack from "./HomeStack";
import { createSwitchNavigator } from "react-navigation";

const LoginStack = createSwitchNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
    Home: { screen: HomeStack }
  },
  {
    initialRouteName: "Login"
  }
);
export default LoginStack;
