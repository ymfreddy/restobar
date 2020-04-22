import React, { Component } from "react";
import { List, ListItem, ThemeConsumer } from "react-native-elements";
import moment from "moment";
import { Spinner, Card, CardItem, Body, Left, Right } from "native-base";

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { LINK } from "../Constants/Links";
import CustomHeader from "../Components/CustomHeader";
import ActionButton from "react-native-action-button";
import { cargarDatosVenta } from "../Redux/Actions";

import { connect } from "react-redux";

class Pedidos extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: "", recargarPedidos: false };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    const rutaTemporal = await AsyncStorage.getItem("restobarRuta");
    this.setState({ ruta: rutaTemporal });
    return fetch(this.state.ruta + LINK.SERVICE_VENTAS_POR_COBRAR)
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        if (responseJson.success) {
          this.setState({
            isLoading: false,
            dataSource: responseJson.lista
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  GetDataVenta = async idVenta => {
    return fetch(this.state.ruta + LINK.SERVICE_VENTAS_CARGAR + idVenta)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          //console.log(responseJson);
          this.props.cargarDatosVenta(responseJson.venta);
          this.props.navigation.navigate("Pedido");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  onRefresh() {
    //Clear old data of the list
    this.setState({ text: "", isLoading: true });
    //Call the Service to get the latest data
    this.GetData();
    // remove buscar
  }

  cargarVenta = idVenta => {
    console.log(idVenta);
    this.GetDataVenta(idVenta);
  };

  render() {
    // verificar los parametros de la navegacion
    //console.log(this.props.navigation.state.params);
    /*if (
      this.props.navigation.state.params != null &&
      this.props.navigation.state.params.recargar
    ) {
      //this.GetData();
      console.log("RECARGAR");
    }*/

    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={styles.MainContainer}>
          <Spinner />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <CustomHeader
          isHome={true}
          title="Lista de Pedidos"
          navigation={this.props.navigation}
        />
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <Card>
              <TouchableOpacity onPress={() => this.cargarVenta(item.idVenta)}>
                <CardItem>
                  <Left>
                    <Text style={styles.textoId}>{item.idVenta}</Text>
                    <Body>
                      <Text style={styles.textoDescripcion}>
                        {item.estadoVenta}
                      </Text>
                      <Text style={styles.textoDescripcion}>
                        {moment(item.fechaVenta).format("DD/MM/YYYY")}
                      </Text>
                      <Text style={styles.textoDescripcion}>
                        {item.horaRegistro}
                      </Text>
                    </Body>
                  </Left>
                  <Right>
                    <Text style={styles.textoDescripcion}>
                      {item.descripcionMesa}
                    </Text>
                    <Text style={styles.textoPrecio}>
                      BS.
                      {" " + item.importeTotalVenta}
                    </Text>
                  </Right>
                </CardItem>
              </TouchableOpacity>
            </Card>
          )}
          enableEmptySections={true}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.isLoading}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cantidadTotal: state.cantidadTotal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cargarDatosVenta: venta => dispatch(cargarDatosVenta(venta))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pedidos);

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 25
  },
  textoPrecio: {
    color: "grey",
    fontSize: 10
  },
  textoDescripcion: {
    fontSize: 10
  },
  textoId: {
    fontWeight: "bold",
    fontSize: 12
  }
});
