/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import FBSDK, { LoginManager } from 'react-native-fbsdk'

import React, { Component } from 'react';
import {

  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView
} from 'react-native';

var {height, width} = Dimensions.get('window');
import Nav from './global-widgets/nav';

import firebase from '../config/firebase';
const storage = firebase.storage().ref();



export default class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      friends: 1098,
        image10: ' ',
        image11: ' '
    };

      this.getImage('image10');
      this.getImage('image11');
    
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

    getImage (image) {
        storage.child(`${image}.jpeg`).getDownloadURL().then((url) => {
            this.state[image] = url;
            this.setState(this.state);
        })
    }


// <Image source ={require('../images/image11.jpeg')} resizeMode="stretch" style={{height:350, width:width}} />
    // <ProfilePicture  style={{height:350, width:width}} />

// <Image
// style={{width: 66, height: 58}}
// resizeMode="stretch"
// source={{uri: 'https://firebasestorage.googleapis.com/v0/b/spark-3f414.appspot.com/o/images%2Fimage111.jpeg?alt=media&token=53b97713-f961-4970-8879-f914e5f61205'}}
// />


  render() {
    return (
      <View style={{flex:1}}>
      <Nav  type = "profile" onPress = {() => this.props.navigator.replace({id:'home'})} />
      <ScrollView style={styles.container}>
        <Image
            style={{width: width, height: 350}}
            resizeMode="stretch"
            source={{uri: this.state.image10}}
        />
       <View style={[styles.row, {marginTop:15}]}>
       <View style={styles.container}>
            <TouchableOpacity onPress={this._fbAuth}>
               <Text>Login with Facebook</Text>
            </TouchableOpacity>
         </View>
       <Text style = {{fontSize:19, fontWeight:'400'}}>Samuel, </Text><Text style={{fontSize:21, fontWeight:'300', marginBottom:-2}}>23</Text>
       </View>
       <View style={styles.row}>
       <Text style={{color:'#444', fontSize:15}}>Unappers Creative</Text>
       </View>
       <View style={styles.row}>
       <Text style={{color:'#777', fontSize:11}}>less than a mile away</Text>
       </View>
       <View style={styles.description}>
       <Text style={{color:'#555'}}>We hook up, you do my laundry, I promise to call you but never really.</Text>
       </View>
       <View style ={styles.commons}>
       <Text style = {styles.title}>
      {this.state.friends} for Common Connections
       </Text>
       <Text style={{marginTop:10, fontSize:14, color:'#666', fontWeight:"400"}}>We compare your Facebook friends with those of your matches to display any common connections</Text>
       </View>
       <View style ={styles.commons}>
       <Text style = {styles.title}>
      Instagram Photos
       </Text>
       <ScrollView
       horizontal = {true}
       >
       <View style ={{}}>
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       <View style ={{}}>
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       <View style ={{}}>
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       <View style ={{}}>
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       <View style ={{}}>
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       <View style ={{}}>
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../images/profile.jpg')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       </ScrollView>
       </View>
        </ScrollView>
        </View>
    )
}
}
//onPress = {() => this.renderNope()} 

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f7f7f7',
  },
  row: {
    flexDirection:'row',
    margin:15,
    marginBottom:0,
    marginTop:5,
    alignItems:'flex-end'
  },
  title:{
    fontSize:14,
    fontWeight:'600',
    color:'#333'
  },
  commons:{
    padding:15
  },
  buttons:{
    width:80, 
    height:80, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:40
  },
  description:{
    padding:15,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#e3e3e3',
    marginTop:10,
    marginBottom:10
  },
  buttonSmall:{
    width:50, 
    height:50, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:25
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
  }
 
});
