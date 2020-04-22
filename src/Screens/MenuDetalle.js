import React, { Component } from "react";
import { Spinner } from "native-base";

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  AsyncStorage,
  RefreshControl
} from "react-native";
import CustomHeader from "../Components/CustomHeader";
import { LINK } from "../Constants/Links";
import CardProduct from "../Components/CardProduct";
import { connect } from "react-redux";

class MenuDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: "",
      idCategoria: this.props.navigation.state.params.idCategoria,
      nombreCategoria: this.props.navigation.state.params.nombreCategoria
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    const rutaTemporal = await AsyncStorage.getItem("restobarRuta");
    this.setState({ ruta: rutaTemporal });
    return fetch(
      this.state.ruta +
        LINK.SERVICE_PRODUCTOS_POR_CATEGORIA +
        this.state.idCategoria
    )
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

  onRefresh() {
    //Clear old data of the list
    this.setState({ text: "", data: [] });
    //Call the Service to get the latest data
    this.GetData();
    // remove buscar
  }

  render() {
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
          title={this.state.nombreCategoria}
          navigation={this.props.navigation}
        />
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          items añadidos: {this.props.cantidadTotal}
        </Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <CardProduct ruta={this.state.ruta} item={item} />
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
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
    cantidadTotal: state.ventaRedux.cantidadTotal
  };
};

export default connect(mapStateToProps)(MenuDetalle);

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 25
  }
});
