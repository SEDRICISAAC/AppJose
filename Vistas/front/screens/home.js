import React, { Component } from 'react';
import { Image, Modal, TouchableHighlight, View, Alert, TextInput, FlatList, StyleSheet, ImageBackground, AsyncStorage,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Footer, FooterTab, Button, Text, Icon, Badge,Thumbnail, Left, Body, Right } from 'native-base';

const API_URL = 'http://192.168.100.12:8001/server/menu/platos'
const API = 'http://192.168.100.12:8001/server/menu'
export default class Home extends Component{
    constructor(props) {
        super(props);
        this.getPlatos();
        this.state = {
            plato: this.plato,
            valor: this.valor,
            datos: []
        }
    }


    async componentDidMount() {
        await Font.loadAsync({
            'bin-font': require('../assets/fonts/ShadowsIntoLight-Regular.ttf'),
            'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        }).then(() => {
            this.setState({ fontLoaded: true })
            
          });

        
    }

    localStoragge = async () =>{
        try{
             this.state.usuario = await AsyncStorage.getItem('User');
        }
        catch(error){
            console.log(error)
        }
    }

    realizarPedido = () => {
      let tabla = "pedido";

        let data = {
            tabla: tabla, 
            datos:
              {
                platoId: 1,
                descripcion: this.state.plato,
                cantidad: 2,
              }
        };

        let header = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        return fetch(API,header)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.ok != false){
                alert('Pedido realizado')
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }

    getPlatos = () => {

        let header = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }

       return fetch(API_URL,header)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.ok != false){
                    this.state.datos = responseJson.datos
                }
            })
            .catch((error) => {
                console.error(error);
            })
    } 


    render() {


        return (  
            
        <Container>
          <Header hasTabs style={{backgroundColor: 'black'}}/>

          <Content>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: 'Image URL'}} />
                    <Body>
                      <Text>item</Text>
                      <Text note>De Queso</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={require('../assets/bolon.jpg')} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                        <Text style={{color: 'black'}}>{this.state.valor} $</Text>
                    </Button>
                  </Left>
                  <Right>
                  <Button style={{backgroundColor: 'green'}} onPress={this.realizarPedido}>
                    <Text>Pedir</Text>
                  </Button>
                  </Right>
                </CardItem>
              </Card>
              
          </Content>
          
        <Footer>
          <FooterTab style={{backgroundColor: 'black'}}>
            <Button badge vertical onPress={() => this.props.navigation.push('Inicio')}>
              <Badge><Text>5</Text></Badge>
              <Icon name="apps" />
              <Text>Menu</Text>
            </Button>
            <Button vertical onPress={()=>{alert(JSON.stringify(this.state.datos))}}>
              <Icon name="list" />
              <Text>Pedidos</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.push('Login')}>
              <Icon name="exit" />
              <Text>Salir</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
           
        )
    }
}

const styles = StyleSheet.create({
})