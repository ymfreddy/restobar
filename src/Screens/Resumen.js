import React, { Component } from "react";
import { View } from "react-native";
import { Text, Button } from "native-base";
import CustomHeader from "../Components/CustomHeader";
import ActionButton from "react-native-action-button";
import { connect } from "react-redux";

class Resumen extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 25 }}>
        <CustomHeader
          isHome={true}
          title="Resumen"
          navigation={this.props.navigation}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>nombre: {this.props.usuario.nombre}</Text>
          <Text>paterno: {this.props.usuario.paterno}</Text>
          <Text>materno: {this.props.usuario.materno}</Text>
          <Text>login: {this.props.usuario.usuarioLogin}</Text>
          <Text>ci: {this.props.usuario.ci}</Text>
          <Text>celular: {this.props.usuario.celular}</Text>
        </View>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            console.log(this.props);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    usuario: state.usarioRedux.usuario
  };
};

export default connect(mapStateToProps)(Resumen);
