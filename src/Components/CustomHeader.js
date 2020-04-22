import React from "react";
import { Header, Left, Right, Button, Icon, Title, Body } from "native-base";

export default class CustomHeader extends React.Component {
  render() {
    let { title, isHome } = this.props;
    return (
      <Header>
        <Left style={{ flex: 1 }}>
          {isHome ? (
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          ) : (
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          )}
        </Left>
        <Body
          style={{ flex: 3, flexDirection: "row", justifyContent: "center" }}
        >
          <Title style={{ marginTop: 8 }}>{title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
