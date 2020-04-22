import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Thumbnail, Text } from "native-base";
import { adicionarProducto, disminuirProducto } from "../Redux/Actions";
import { connect } from "react-redux";

const { width: WIDTH } = Dimensions.get("window");

class CardProduct extends Component {
  render() {
    let { ruta, item } = this.props;
    return (
      <View style={styles.viewProducto}>
        <View style={styles.row}>
          <Thumbnail square source={{ uri: ruta + item.imagenRuta }} />

          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.productoNombre}>{item.nombre}</Text>
            </View>
            <Text style={styles.productoPrecio}>BS. {item.precio}</Text>
          </View>
          <View style={styles.end}>
            <TouchableOpacity
              style={styles.btnAdicionar}
              onPress={() => this.props.adicionarProducto(item)}
            >
              <Text>+</Text>
            </TouchableOpacity>
            <Text> </Text>
            <TouchableOpacity
              style={styles.btnDisminuir}
              onPress={() => this.props.disminuirProducto(item)}
            >
              <Text>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cantidadTotal: state.cantidadTotal,
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    adicionarProducto: item => dispatch(adicionarProducto(item)),
    disminuirProducto: item => dispatch(disminuirProducto(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);

const styles = StyleSheet.create({
  viewProducto: {
    flex: 1,
    width: WIDTH
  },
  viewProductoImage: {
    marginRight: 15
  },
  productoImagen: {
    height: 100,
    flex: 1,
    alignItems: "center"
  },
  productoNombre: {
    fontSize: 12
  },
  productoPrecio: {
    paddingTop: 2,
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 12
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
    borderRadius: 30,
    backgroundColor: "#00cc00",
    alignItems: "center"
  },
  btnDisminuir: {
    width: 30,
    height: 30,
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
    flexDirection: "row",
    alignItems: "center",
    width: 80
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 2,
    justifyContent: "space-between"
  }
});
