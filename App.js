import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import LoginStack from "./src/Navigations/LoginStack";
import { createAppContainer } from "react-navigation";

import { Provider } from "react-redux";
import configureStore from "./src/Redux/configureStore";
let store = configureStore();

const AppNavigator = createAppContainer(LoginStack);

export default class AwesomeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({
      isReady: true
    });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
