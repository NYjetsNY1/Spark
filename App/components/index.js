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



export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
        userData: null
    };

    //THOUGHTS
      /*
      can either get all basic user info from initial login and store (name, age, bio, etc)
      OR
      could just get user ID from initial login and call to firebase on each page to get relevant info
      OR
      mix of both - keep frequent info from initial login (name, age, prof pic), request from firebase for
      additional info like bio

      JK
      user data will need to be queried on profile load bc the component is used for all users (not just logged in user)
       */

    this.renderScene = this.renderScene.bind(this);
  }
 
  renderScene(route, navigator) {
    var {state,actions} = this.props;
    var routeId = route.id;
    this.state.userData = route.userData;

    if (this.state.userData == null){
        //redirects to welcome page if no userData
        return (
            <Welcome
                {...this.props}
                userData={route.userData}
                navigator={navigator} />
        );
    } else {
        if (routeId === 'home') {
            return (
                <Home
                    {...this.props}
                    userData={route.userData}
                    navigator={navigator}/>
            );
        }
        if (routeId === 'messages') {
            return (
                <Messages
                    {...this.props}
                    userData={route.userData}
                    navigator={navigator}/>
            );
        }
        if (routeId === 'profile') {
            return (
                <Profile
                    {...this.props}
                    userData={route.userData}
                    navigator={navigator}/>
            );
        }
        if (routeId === 'directMessage') {
            return (
                <DirectMessage
                    {...this.props}
                    userData={route.userData}
                    navigator={navigator}
                    recipientId={route.recipientId}/>
            );
        }
        if (routeId === 'welcome') {
            return (
                <Welcome
                    {...this.props}
                    userData={route.userData}
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

