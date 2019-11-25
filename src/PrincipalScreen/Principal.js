import React from "react";
import {StyleSheet, StatusBar} from 'react-native';
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Item,
  Input,
  Title,
  Button
} from "native-base";
import {FontAwesome, Ionicons} from '@expo/vector-icons'

export default class Principal extends React.Component {
  render() {
    return (
      <Container>
        <Header style={{marginTop:25}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>RESTO BAR</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Pagina Pricipal</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}