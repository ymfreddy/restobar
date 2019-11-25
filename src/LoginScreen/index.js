import React, { Component } from "react";
import Login from "./Login.js";
import Principal from "./../PrincipalScreen/index.js";
import { DrawerNavigator } from "react-navigation";

const LoginScreenRouter = DrawerNavigator(
    {
        Login: { screen: Login },
        Principal: { screen: Principal }
    },
    {
        initialRouteName: "Login"
    }
  );
  export default LoginScreenRouter;
