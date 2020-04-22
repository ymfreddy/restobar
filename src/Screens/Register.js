import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  ImageBackground,
  View,
  Dimensions,
  TextInput,
  TouchableHighlight
} from "react-native";
import { Text, Button } from "native-base";
import { IMAGE } from "../Constants/Images";
const { width: WIDTH } = Dimensions.get("window");

export default class Register extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params);
    this.state = {
      ruta: this.props.navigation.state.params.rutaParametro
    };
  }

  SaveRoute = () => {
    AsyncStorage.setItem("restobarRuta", this.state.ruta);
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <ImageBackground
        source={IMAGE.IMAGE_BACKGROUND}
        style={styles.backgroundContainer}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputRuta}
            placeholder="ruta"
            value={this.state.ruta}
            onChangeText={ruta => this.setState({ ruta })}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            underLineColorAndroid="transparent"
          />
        </View>

        <TouchableHighlight
          style={styles.btnLogin}
          onPress={this.SaveRoute.bind(this)}
        >
          <Text style={styles.text}>Guardar y Salir</Text>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: null,
    height: null,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    marginTop: 10
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 20
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center"
  },
  inputRuta: {
    color: "#fff",
    width: WIDTH - 40,
    height: 45,
    borderRadius: 25,
    paddingLeft: 15,
    fontSize: 15,
    backgroundColor: "rgba(0,0,0,0.35)",
    marginHorizontal: 25
  }
});
