//This is an example code for NavigationDrawer//
import React, { Component } from "react";
//import react in our code.
import { StyleSheet, View, Text } from "react-native";
// import all basic components

export default class Screen1 extends Component {
  //Screen1 Component
  render() {
    return (
      <View style={styles.containerColum}>
        <View style={styles.containerRow}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.welcome}>Native</Text>
        </View>
        <View style={styles.containerRow}>
          <Text style={styles.welcome}>Welcome to React Native</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerRow: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#F5FCFF"
  },
  containerColum: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    flex: 1,
    margin: 20,
    backgroundColor: "orange",
    margin: 10,
    textAlign: "center"
  }
});
