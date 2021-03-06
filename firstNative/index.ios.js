/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text
} from 'react-native';
import { Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon } from 'native-base';


export default class firstNative extends Component {
  render() {
    return (
      <Container>
          <Header>
              <Left>
                  <Button transparent>
                      <Icon name='menu' />
                  </Button>
              </Left>
              <Body>
                  <Title>Header</Title>
              </Body>
              <Right />
          </Header>
          <Content>

          </Content>
          <Footer>
              <FooterTab>
                  <Button full>
                      <Text>Footer</Text>
                  </Button>
              </FooterTab>
          </Footer>
      </Container>
    );
  }
}



AppRegistry.registerComponent('firstNative', () => firstNative);
