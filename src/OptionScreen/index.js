  
import React, { Component } from "react";
import Mesas from "./Mesas.js";
import Pedidos from "./Pedidos.js";
import { TabNavigator } from "react-navigation";
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  FooterTab,
  Label
} from "native-base";
export default (MainOptionScreenNavigator = TabNavigator(
  {
    Mesas: { screen: props => <Mesas {...props} /> },
    Pedidos: { screen: props => <Pedidos {...props} /> }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Mesas")}
            >
              <Icon name="bowtie" />
              <Text>Mesas 1</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Pedidos")}
            >
              <Icon name="briefcase" />
              <Text>Pedidos 2</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
));