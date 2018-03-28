//a welcome screen
import FBSDK, { LoginManager } from 'react-native-fbsdk'
import firebase from '../config/firebase';
const storage = firebase.storage().ref();
const db = firebase.database().ref();
import Nav from './global-widgets/nav';
import { LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import React, { Component } from 'react';
import {

    StyleSheet,
    Image,
    View
} from 'react-native';

//var {height, width} = Dimensions.get('window');

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


export default class Welcome extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.goHome = this.goHome.bind(this);
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

    checkIfUserExists(userId) {
        let usersRef = db.child('users');
        usersRef.child(userId).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            if (exists) {
                alert("User already exists");
            } else {
                alert("First time user")
            }
            // userExistsCallback(userId, exists);
        });
    }

    goHome(userData){
        this.props.navigator.replace({id: "home", userData: userData});
    }

    login(){
        let userData = {
            userId: ''
        };

        let promiseToBeResolved = LoginManager.logInWithReadPermissions(['public_profile', 'user_birthday']).then(result => {
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } 
                else {
                        console.log(result);
                        AccessToken.getCurrentAccessToken().then(
                            (data) => {
                              let accessToken = data.accessToken;
                  
                              const responseInfoCallback = (error, result) => {
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log(result);
                                  let downloadUrl = result.picture.data.url;

                                  let birthday = new Date(result.birthday);
                                  let age = _calculateAge(birthday);

                                  userData.userId = result.id;
                                  this.goHome(userData);

                                    // Add user info to db if it does not exist
                                  let userRef = db.child('users').child(result.id);
                                  userRef.transaction(function(currentValue) {
                                      if (currentValue === null) {
                                          return {
                                              id: result.id,
                                              name: result.first_name,
                                              age: age,
                                              gender: result.gender,
                                              profilePicUrl: downloadUrl,
                                              bio: 'Sample bio',
                                              location: 'n/a',
                                              job: 'Student',
                                              userConvos: [],
                                              newMatches: [],
                                              swipedRightUsers: [],
                                              swipedLeftUsers: [],
                                              surveyResults: {}
                                          };
                                      } else {
                                          console.log("User data already exists.");
                                          return;
                                      }
                                  }, function(error, committed, snapshot) {
                                      if (error) {
                                          console.log('Transaction failed abnormally!', error);
                                      } else if (!committed) {
                                          console.log('Aborted the transaction (because ada already exists).');
                                      } else {
                                          console.log('User ada added')
                                      }
                                  });
                                }
                              };
                  
                              const infoRequest = new GraphRequest(
                                '/me',
                                {
                                  accessToken: accessToken,
                                  parameters: {
                                    fields: {
                                      string: 'gender,email,name,birthday,first_name,middle_name,last_name,picture.height(10000)'
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
        console.log(userData);
        // Promise.resolve(promiseToBeResolved).then(function(values) {
        //     console.log(values);
        // });
    }

    render(){
        return(
            <View style={styles.wel}>
                <Image source = {require('../images/logo.png')}
                       style = {styles.welImage}>
                </Image>
                <Nav type = 'welcome'
                     onLogin = {this.login}
                     onRegister = {() => this.props.navigator.replace({id: "q1"})}/>
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