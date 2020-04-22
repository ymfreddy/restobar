import React, { Component } from "react";
import NumberFormat from "react-number-format";
import {
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
import {
  Card,
  CardItem,
  Text,
  Left,
  Body,
  Right,
  Thumbnail,
  Spinner,
  Picker,
  Toast,
  Container,
  Root
} from "native-base";
import CustomHeader from "../Components/CustomHeader";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import {
  adicionarProducto,
  disminuirProducto,
  actualizarMesa,
  actualizarIdVenta,
  cargarDatosVenta
} from "../Redux/Actions";
import { connect } from "react-redux";
const { width: WIDTH } = Dimensions.get("window");
import { LINK } from "../Constants/Links";
import { initialState } from "../Redux/Reducers/venta.reducer";

class Pedido extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, showToast: false };
    //console.log(props);
  }

  componentDidMount() {
    this.GetMesas();
  }

  GetMesas = async () => {
    const rutaTemporal = await AsyncStorage.getItem("restobarRuta");
    this.setState({ ruta: rutaTemporal });
    return fetch(this.state.ruta + LINK.SERVICE_MESAS)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.lista
          },
          function() {
            this.arrayholder = responseJson.lista;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  cambiarMesa(idMesaNueva) {
    console.log("mesa cambio:" + idMesaNueva);
    this.props.actualizarMesa(idMesaNueva);
  }

  nuevaVenta = () => {
    this.props.cargarDatosVenta(initialState);
  };

  validarVenta = () => {
    if (this.props.items.length == 0) {
      Toast.show({
        text: "La venta debe tener al menos un item.",
        type: "warning",
        position: "top"
      });
    } else if (this.props.idMesa == undefined) {
      Toast.show({
        text: "Debe elegir una mesa para la atención",
        type: "warning",
        position: "top"
      });
    } else {
      this.guardarVenta();
    }
  };

  guardarVenta = () => {
    fetch(this.state.ruta + LINK.SERVICE_VENTAS_GUARDAR, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        venta: this.props
      })
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.success) {
          this.props.actualizarIdVenta(responseData.idVenta);
          // mostrar id
          Toast.show({
            text: "N° de Venta " + responseData.idVenta,
            buttonText: "OK",
            type: "success",
            position: "top"
          });
          // se reinicia la venta
          this.nuevaVenta();
          // se redirecciona a la lista de pedidos
          this.props.navigation.navigate("Pedidos", {
            recargar: true
          });
        } else {
          Toast.show({
            text: "Ocurrio un error: " + responseData.statusMsg,
            buttonText: "OK",
            type: "danger",
            position: "top"
          });
        }
      })
      .catch(error => {
        console.error(error);
        Toast.show({
          text: "Ocurrio un error",
          buttonText: "OK",
          type: "danger",
          position: "top"
        });
      });
  };

  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ justifyContent: "center", flex: 1, paddingTop: 25 }}>
          <Spinner />
        </View>
      );
    }

    const fechaVentaFormateada = moment(this.props.fechaVenta).format(
      "DD/MM/YYYY"
    );

    return (
      <Root>
        <Container>
          <View style={{ flex: 1, paddingTop: 25 }}>
            <CustomHeader
              isHome={true}
              title="Pedido"
              navigation={this.props.navigation}
            />
            <View style={styles.viewProducto}>
              <Text style={{ fontSize: 18, textAlign: "center" }}>VENTA</Text>

              <View style={styles.row}>
                <View style={styles.nameContainerResumen}>
                  <Text style={styles.productoNombre}>ID VENTA:</Text>
                </View>
                <View style={styles.endResumen}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "right"
                    }}
                  >
                    {this.props.idVenta}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.nameContainerResumen}>
                  <Text style={{ fontWeight: "bold" }}>Fecha:</Text>
                </View>
                <View style={styles.end}>
                  <Text style={{ textAlign: "right" }}>
                    {fechaVentaFormateada}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.nameContainerResumen}>
                  <Text style={styles.productoNombre}>Descuento Bs.:</Text>
                </View>
                <View style={styles.endResumen}>
                  <NumberFormat
                    value={this.props.descuentos}
                    displayType={"text"}
                    decimalSeparator={"."}
                    decimalScale={2}
                    thousandSeparator={true}
                    fixedDecimalScale={true}
                    renderText={value => (
                      <Text style={{ textAlign: "right" }}>{value}</Text>
                    )}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.nameContainerResumen}>
                  <Text style={styles.productoNombre}>Monto Venta Bs.:</Text>
                </View>
                <View style={styles.endResumen}>
                  <NumberFormat
                    value={this.props.importeTotalVenta}
                    displayType={"text"}
                    decimalSeparator={"."}
                    decimalScale={2}
                    thousandSeparator={true}
                    fixedDecimalScale={true}
                    renderText={value => (
                      <Text style={{ textAlign: "right" }}>{value}</Text>
                    )}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.nameContainerResumen}>
                  <Text style={styles.productoNombre}>Mesa:</Text>
                </View>
                <View style={styles.endResumen}>
                  <Picker
                    style={{
                      width: "100%",
                      paddingBottom: 0,
                      backgroundColor: "transparent",
                      paddingLeft: 0,
                      left: -5,
                      borderColor: "red"
                    }}
                    mode="dropdown"
                    placeholder="Seleccione una mesa"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    note={false}
                    selectedValue={this.props.idMesa}
                    onValueChange={value => this.cambiarMesa(value)}
                  >
                    <Picker.Item
                      key={-1}
                      label={"Seleccione una mesa"}
                      value={undefined}
                    />

                    {this.state.dataSource.map(itemMesa => (
                      <Picker.Item
                        key={itemMesa.idMesa}
                        label={itemMesa.descripcionMesa}
                        value={itemMesa.idMesa}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <Text style={{ fontSize: 18, textAlign: "center" }}>ITEMS</Text>

              <DetallePedido propiedades={this.props}></DetallePedido>
            </View>

            <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item
                buttonColor="#9b59b6"
                title="Guardar"
                onPress={this.validarVenta.bind(this)}
              >
                <Icon name="md-create" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor="#3498db"
                title="Limpiar"
                onPress={this.nuevaVenta.bind(this)}
              >
                <Icon
                  name="md-notifications-off"
                  style={styles.actionButtonIcon}
                />
              </ActionButton.Item>
            </ActionButton>
          </View>
        </Container>
      </Root>
    );
  }
}

function DetallePedido(propiedades) {
  //console.log(propiedades.propiedades);
  if (propiedades.propiedades.cantidadTotal == 0) {
    return <Text>No existen items</Text>;
  } else {
    return (
      <View style={styles.viewProducto}>
        <FlatList
          data={propiedades.propiedades.items}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.btnAdicionar}
                onPress={() => propiedades.propiedades.adicionarProducto(item)}
              >
                <Text>+</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  alignContent: "center"
                }}
              >
                {" " + item.cantidad + " "}
              </Text>
              <TouchableOpacity
                style={styles.btnDisminuir}
                onPress={() => propiedades.propiedades.disminuirProducto(item)}
              >
                <Text>-</Text>
              </TouchableOpacity>

              <View>
                <View style={styles.nameContainer}>
                  <Text style={styles.productoNombre}>{item.nombre}</Text>
                </View>
              </View>
              <View style={styles.end}>
                <NumberFormat
                  value={item.montoVenta}
                  displayType={"text"}
                  decimalSeparator={"."}
                  decimalScale={2}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  prefix={"bs. "}
                  renderText={value => (
                    <Text style={styles.productoPrecio}>{value}</Text>
                  )}
                />
              </View>
            </View>
          )}
          enableEmptySections={true}
          style={{ marginTop: 2 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cantidadTotal: state.ventaRedux.cantidadTotal,
    items: state.ventaRedux.items,
    fechaVenta: state.ventaRedux.fechaVenta,
    importeTotalVenta: state.ventaRedux.importeTotalVenta,
    descuentos: state.ventaRedux.descuentos,
    idVenta: state.ventaRedux.idVenta,
    idMesa: state.ventaRedux.idMesa,
    idSucursal: state.ventaRedux.idSucursal,
    idCliente: state.ventaRedux.idCliente,
    importeIce: state.ventaRedux.importeIce,
    importeExento: state.ventaRedux.importeExento,
    ventasTasaCero: state.ventaRedux.ventasTasaCero,
    subTotal: state.ventaRedux.subTotal,
    importeBaseCF: state.ventaRedux.importeBaseCF,
    idUsuarioMesero: state.ventaRedux.idUsuarioMesero,
    idParEstadoVenta: state.ventaRedux.idParEstadoVenta
  };
};

const mapDispatchToProps = dispatch => {
  return {
    adicionarProducto: item => dispatch(adicionarProducto(item)),
    disminuirProducto: item => dispatch(disminuirProducto(item)),
    actualizarMesa: idMesa => dispatch(actualizarMesa(idMesa)),
    actualizarIdVenta: idVenta => dispatch(actualizarIdVenta(idVenta)),
    cargarDatosVenta: venta => dispatch(cargarDatosVenta(venta))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pedido);

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  },
  viewProducto: {
    flex: 1,
    width: WIDTH
  },
  productoImagen: {
    height: 30,
    width: 30,
    flex: 1,
    alignItems: "center"
  },
  productoNombre: {
    fontWeight: "bold",
    fontSize: 11
  },
  productoPrecio: {
    paddingTop: 2,
    textAlign: "right",
    color: "grey",
    alignSelf: "flex-end",
    fontSize: 10
  },
  productoDescripcion: {
    paddingTop: 2,
    color: "grey",
    fontSize: 8
  },
  loaderProductos: {
    marginTop: 10,
    marginBottom: 10
  },
  notFoundProductos: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center"
  },
  btnAdicionar: {
    width: 30,
    height: 30,
    fontSize: 7,
    borderRadius: 30,
    backgroundColor: "#00cc00",
    alignItems: "center"
  },
  btnDisminuir: {
    width: 30,
    height: 30,
    fontSize: 7,
    borderRadius: 30,
    backgroundColor: "#ff8000",
    alignItems: "center"
  },
  nameContainer: {
    flexDirection: "row",
    paddingLeft: 5,
    justifyContent: "space-between",
    width: WIDTH - 150
  },
  end: {
    flex: 1,
    flexDirection: "row",
    paddingRight: 3,
    width: 120
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    textAlign: "right",
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 2,
    justifyContent: "flex-end"
  },
  endResumen: {
    flex: 1,
    flexDirection: "row",
    width: 260
  },
  nameContainerResumen: {
    flexDirection: "row",
    paddingLeft: 5,
    justifyContent: "space-between",
    width: WIDTH - 270
  }
});
