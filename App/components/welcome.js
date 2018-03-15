//a welcome screen
import FBSDK, { LoginManager } from 'react-native-fbsdk'
import firebase from '../config/firebase';
const storage = firebase.storage().ref();
const db = firebase.database().ref();

import { LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import React, { Component } from 'react';
import {

    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    ScrollView,
    TouchableHighlight
} from 'react-native';


import Home from './home';

//var {height, width} = Dimensions.get('window');


export default class Welcome extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }

    _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function(result) {
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } else {
                    alert('Login was successful with permissions: '
                        + result.grantedPermissions.toString());
                }
            },
            function(error) {
                alert('Login failed with error: ' + error);
            }
        );
    }

    login(){
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function(result) {
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } 
                else {
                    alert('Login was successful with permissions: '
                        + result.grantedPermissions.toString());
                        console.log(result);
                        AccessToken.getCurrentAccessToken().then(
                            (data) => {
                              let accessToken = data.accessToken;
                              alert(accessToken.toString());
                  
                              const responseInfoCallback = (error, result) => {
                                if (error) {
                                  console.log(error)
                                  alert('Error fetching data: ' + error.toString());
                                } else {
                                  console.log(result)
                                  let downloadURL = result.picture.data.url;
                                  alert('Success fetching data: ' + result.toString());
                                }
                              }
                  
                              const infoRequest = new GraphRequest(
                                '/me',
                                {
                                  accessToken: accessToken,
                                  parameters: {
                                    fields: {
                                      string: 'email,name,first_name,middle_name,last_name,picture.height(10000)'
                                    }
                                  }
                                },
                                responseInfoCallback
                              );
                  
                              // Start the graph request.
                              new GraphRequestManager().addRequest(infoRequest).start();
                  
                            })
                }
            },
            function(error) {
                alert('Login failed with error: ' + error);
            }
        );
        //put login functionality here
        //leaving userData as an object in case we want other things
        let userData = {
            userId: 1
        };
        this.props.navigator.replace({id: "home", userData: userData});
    }

    render(){
        return(
            <View style={styles.wel}>
                <Image source = {require('../images/logo.png')}
                       style = {styles.welImage}>
                </Image>
                <TouchableHighlight style = {styles.welButton} underlayColor='#15d5ec'
                                    onPress = {this.login}>
                    <Text style = {styles.welButtonText}>
                        LOG IN
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.welButton} underlayColor='#15d5ec'
                                    onPress = {() => this.props.navigator.replace({id: "home"})}>
                    <Text style = {styles.welButtonText}>
                        SIGN UP
                    </Text>
                </TouchableHighlight>
            </View>
            

        )
    }
}

const styles = StyleSheet.create({
    wel: {backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'},
    welText: {
        color: '#15d5ec',
        fontSize: 35,
        fontWeight: '600',
        marginBottom: 60
    },
    welImage: {
        width: 239,
        height: 84,
        marginBottom: 200
    },
    welButton: {
        backgroundColor: '#15d5ec',
        width: 220,
        height: 60,
        marginBottom: 20
    },
    welButtonText: {
        color: 'white',
        fontSize: 27,
        textAlign: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: 13,
        fontFamily: 'Avenir-Heavy'
    }
});