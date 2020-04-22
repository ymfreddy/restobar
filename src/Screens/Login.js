import React from "react";
import {
  StyleSheet,
  Alert,
  AsyncStorage,
  ImageBackground,
  Image,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { LINK } from "../Constants/Links";
import { IMAGE } from "../Constants/Images";
import { establecerUsuario } from "../Redux/Actions";
const { width: WIDTH } = Dimensions.get("window");
import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      user: "jose",
      password: "admin"
    };
    this.obtenerRestobarRuta();
  }

  obtenerRestobarRuta = async () => {
    const rutaTemporal = await AsyncStorage.getItem("restobarRuta");
    if (rutaTemporal != null && rutaTemporal != "")
      this.setState({ ruta: rutaTemporal });
    else {
      this.setState({ ruta: LINK.SERVICE_DEFAULT });
      AsyncStorage.setItem("restobarRuta", this.state.ruta);
    }
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  entrar = async () => {
    console.log(
      this.state.ruta +
        LINK.SERVICE_LOGIN_USER +
        this.state.user +
        "/" +
        this.state.password
    );
    fetch(
      this.state.ruta +
        LINK.SERVICE_LOGIN_USER +
        this.state.user +
        "/" +
        this.state.password,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.success) {
          AsyncStorage.setItem("restobarUsuario", this.state.user);
          // se establece el usaurio en redux
          this.props.establecerUsuario(responseJson.usuario);
          this.props.navigation.navigate("Home");
        } else {
          Alert.alert("usuario incorrecto!");
        }
      })
      .catch(error => {
        Alert.alert("Ocurrio un error: " + error);
        //console.log(error);
      })
      .done();
  };

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  render() {
    return (
      <ImageBackground
        source={IMAGE.IMAGE_BACKGROUND}
        style={styles.backgroundContainer}
      >
        <View style={styles.logoContainer}>
          <Image source={IMAGE.IMAGE_LOGO} style={styles.logo} />
          <Text style={styles.logoText}>RESTO APP!</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name={"ios-person"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="login"
            value={this.state.user}
            onChangeText={user => this.setState({ user })}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            underLineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name={"ios-lock"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="contraseña"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            underLineColorAndroid="transparent"
          />
          <TouchableOpacity
            style={styles.btnEye}
            onPress={this.showPass.bind(this)}
          >
            <Icon
              name={this.state.press == false ? "ios-eye" : "ios-eye-off"}
              size={26}
              color={"rgba(255,255,255,0.7)"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={() => this.entrar()}>
          <Text style={styles.text}>Entrar</Text>
        </TouchableOpacity>

        <TouchableHighlight
          style={styles.btnLogin}
          onPress={() =>
            this.props.navigation.navigate("Register", {
              rutaParametro: this.state.ruta
            })
          }
        >
          <Text style={styles.text}>Cambiar Ruta</Text>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    usuario: state.usuario
  };
};

const mapDispatchToProps = dispatch => {
  return {
    establecerUsuario: user => dispatch(establecerUsuario(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  backgroundContainer: {
    width: null,
    height: null,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 120,
    height: 120
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50
  },
  logoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    opacity: 0.5
  },
  input: {
    color: "#fff",
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(0,0,0,0.35)",
    marginHorizontal: 25
  },
  inputIcon: {
    position: "absolute",
    top: 10,
    left: 37
  },
  inputContainer: {
    marginTop: 10
  },
  btnEye: {
    position: "absolute",
    top: 10,
    right: 37
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
