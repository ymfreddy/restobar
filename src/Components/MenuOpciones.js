import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Container, List, ListItem, Content } from "native-base";
import { IMAGE } from "../Constants/Images";
const routes = ["Resumen", "Pedidos", "Menu", "Pedido"];
export default class MenuOpciones extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={IMAGE.IMAGE_PROFILE}
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          />
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={IMAGE.IMAGE_LOGO}
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
            keyExtractor={(data, index) => index.toString()}
          />
          <View style={{ width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <Image source={IMAGE.ICON_SALIR} style={styles.sideMenuIcon} />
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                {" "}
                Salir{" "}
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuIcon: {
    resizeMode: "center",
    width: 28,
    height: 28,
    marginRight: 10,
    marginLeft: 20
  },

  menuText: {
    fontSize: 15,
    color: "#222222"
  }
});
