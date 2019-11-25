import React from "react";
import {StyleSheet, Alert} from 'react-native';
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

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'prueba@gmail.com',
      password:'abc'
    }
  }

  entrar = async () =>{
    //fetch('https://damp-dawn-18817.herokuapp.com/login/', {
    fetch('http://192.168.43.80:3000/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
      })
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.ok){
          this.props.navigation.navigate("Principal");
        }
        else{
          Alert.alert("usuario incorrecto!");
        }        
    })
    .catch((error) => {
      Alert.alert("Ocurrio un error: " + error);
      console.log(error);
    }).done();
  }

  render() {
    return (
      <Container>
      <Content padder contentContainerStyle={styles.content}>
        <Card>
          <CardItem header bordered>
            <Text style={styles.textCenter}>Inicie Sesion</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Item inlineLabel>
                <FontAwesome name="user" size={20}></FontAwesome>
                <Input placeholder="email" value={this.state.email}
                onChangeText={(email)=>this.setState({email})}/>
              </Item>
              <Item inlineLabel last>
                <Ionicons name="md-lock" size={20}></Ionicons>
                <Input placeholder="Contraseña" value={this.state.password}
                onChangeText={(password)=>this.setState({password})}/>
              </Item>

            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Button primary style={styles.boton} 
            onPress={() => this.entrar()}>
              <Text>Entrar</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>
    );
  }
}


const styles= StyleSheet.create({
  textCenter:{
    textAlign:'center',
    width:'100%'
  },
  content :{
    flex:1,
    justifyContent:'center'
  },
  boton:{
    marginLeft:'70%'
  },
  body:{
    paddingVertical:30
  }
})
