import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from "react-native";
import { Image } from "react-native-elements";
const { width: WIDTH } = Dimensions.get("window");

export default class ViewProduct extends Component {
  render() {
    console.log(this.props);
    let { nombre, descripcion, precio, imagen } = this.props;
    return (
      <TouchableOpacity onPress={() => console.log("añadir a la cesta")}>
        <View style={styles.viewProducto}>
          <View style={styles.viewProductoImage}>
            <Image
              resizeMode="cover"
              source={{ uri: imagen }}
              style={styles.imageProducto}
              onPress={() => console.log("ir a ", name)}
              PlaceholderContent={<ActivityIndicator color="fff" />}
            />
          </View>
          <View>
            <Text style={styles.productoNombre}>{nombre}</Text>
            <Text style={styles.productoPrecio}>{precio}</Text>
            <Text style={styles.productoDescripcion}>
              {descripcion.substr(0, 60)}...
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  viewProducto: {
    flex: 1,
    flexDirection: "column",
    margin: 2,
    width: (WIDTH * 1) / 2
  },
  viewProductoImage: {
    marginRight: 15
  },
  imageProducto: {
    width: 80,
    height: 80,
    alignItems: "center"
  },
  productoNombre: {
    fontWeight: "bold",
    fontSize: 12
  },
  productoPrecio: {
    paddingTop: 2,
    color: "grey",
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
  }
});
