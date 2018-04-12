/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {

  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Navigator,
  View
} from 'react-native';

import Home from './home';
import Messages from './messages';
import Profile from './profile';
import DirectMessage from './directMessage';
import Welcome from './welcome';
import Questionnaire1 from './questionnaire1';



export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
        userData: null
    };

    this.renderScene = this.renderScene.bind(this);
  }
 
  renderScene(route, navigator) {
      var {state, actions} = this.props;
      var routeId = route.id;

      if (this.state.userData == null && route.userData != null) {
          //save user data on login
          this.state.userData = route.userData;
      }

      if (this.state.userData == null) {
          //redirects to welcome page or questionnaire if no userData
          return (
              <Welcome
                  {...this.props}
                  userData={this.state.userData}
                  navigator={navigator}/>
          );
      } else {
          if (routeId === 'questionnaire') {
              return (
                  <Questionnaire1
                      {...this.props}
                      userData={this.state.userData}
                      navigator={navigator}/>
              );
          }if (routeId === 'home') {
              return (
                  <Home
                      {...this.props}
                      userData={this.state.userData}
                      navigator={navigator}/>
              );
          }if (routeId === 'messages') {
              return (
                  <Messages
                      {...this.props}
                      userData={this.state.userData}
                      navigator={navigator}/>
              );
          }if (routeId === 'profile') {
              return (
                  <Profile
                      {...this.props}
                      userData={route.userData}
                      navigator={navigator}/>
              );
          }if (routeId === 'directMessage') {
              return (
                  <DirectMessage
                      {...this.props}
                      userData={this.state.userData}
                      navigator={navigator}
                      recipientId={route.recipientId}
                      convoId={route.convoId}/>
              );
          }if (routeId === 'welcome') {
              return (
                  <Welcome
                      {...this.props}
                      userData={this.state.userData}
                      navigator={navigator}/>
              );
          }
      }
  }


  render() {
    return (
      <View style={{flex:1}}>
     <Navigator
     style={{flex: 1}}
     ref={'NAV'}
     initialRoute={{id: 'welcome', name: 'welcome', userData: null}}
     renderScene={this.renderScene.bind(this)}/>
        </View>
    )
}
}

