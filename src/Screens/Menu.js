import React, { Component } from "react";
import { ListItem } from "react-native-elements";
import { Spinner } from "native-base";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  AsyncStorage,
  RefreshControl
} from "react-native";
import { LINK } from "../Constants/Links";
import CustomHeader from "../Components/CustomHeader";
import { connect } from "react-redux";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, text: "" };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    const rutaTemporal = await AsyncStorage.getItem("restobarRuta");
    this.setState({ ruta: rutaTemporal });
    return fetch(this.state.ruta + LINK.SERVICE_CATEGORIAS)
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
    this.setState({ text: "", dataSource: [] });
    //Call the Service to get the latest data
    this.GetData();
    // remove buscar
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.nombre
        ? item.nombre.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text
    });
  }

  onRefresh() {
    //Clear old data of the list
    this.arrayholder = [];
    this.setState({ text: "", isLoading: true });
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
      //ListView to show with textinput used as search bar
      <View style={styles.MainContainer}>
        <CustomHeader
          isHome={true}
          title="Categorias"
          navigation={this.props.navigation}
        />
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          items añadidos: {this.props.cantidadTotal}
        </Text>

        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Buscar aqui..."
        />

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <ListItem
              containerStyle={{ paddingVertical: 8 }}
              titleStyle={{ fontSize: 12 }}
              title={item.nombre}
              leftAvatar={{
                source: {
                  uri: this.state.ruta + item.imagenRuta
                }
              }}
              bottomDivider
              chevron
              onPress={() =>
                this.props.navigation.navigate("MenuDetalle", {
                  idCategoria: item.idCategoria,
                  nombreCategoria: item.nombre
                })
              }
            />
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
    cantidadTotal: state.ventaRedux.cantidadTotal
  };
};

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 25
  },
  textStyle: {
    padding: 10
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: "#0044cc",
    backgroundColor: "#FFFFFF"
  }
});
