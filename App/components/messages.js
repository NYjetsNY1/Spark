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
  TextInput,
  TouchableOpacity,
  ScrollView,
  ListView,
  View
} from 'react-native';

import Nav from './global-widgets/nav'
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

var image1 = require('../images/image1.jpeg')
var image2 = require('../images/image2.jpeg')
var image3 = require('../images/image3.jpeg')
var image4 = require('../images/image4.jpeg')
var image5 = require('../images/image5.jpeg')
var image6 = require('../images/image6.jpeg')
var image7 = require('../images/image7.jpeg')
var image8 = require('../images/image8.jpeg')
var image9 = require('../images/image9.jpeg')
var image10 = require('../images/image10.jpeg')
var image11 = require('../images/image11.jpeg')

var convos = [{
  "id": 1,
  "name": "Diane",
  "message": "Wow you are cute!",
  "image" : image1
}, {
  "id": 2,
  "name": "Lois",
  "message": "Hi :)",
  "image" : image2
}, {
  "id": 3,
  "name": "Mary",
  "message": "Hello!!!",
  "image" : image3
}, {
  "id": 4,
  "name": "Susan",
  "message": "WHY WON't YOU ANSWER ME!",
  "image" : image4
}, {
  "id": 5,
  "name": "Betty",
  "message": "HIIIIIII",
  "image" : image5
}, {
  "id": 6,
  "name": "Deborah",
  "message": "Aliquam sit amet diam in magna bibendum imperdiet.",
  "image" : image6
}, {
  "id": 7,
  "name": "Frances",
  "message": "What's up",
  "image" : image7
}, {
  "id": 8,
  "name": "Joan",
  "message": "Wanna get dinner?",
  "image" : image8
}, {
  "id": 9,
  "name": "Denise",
  "message": "Let's go on a date.",
  "image" : image9
}, {
  "id": 10,
  "name": "Rachel",
  "message": "I like pasta.",
  "image" : image10
}]

var newMatches = [{
  "id": 1,
  "first_name": "Sarah",
  "image" : image7
}, {
  "id": 2,
  "first_name": "Pamela",
  "image" : image8
}, {
  "id": 3,
  "first_name": "Diana",
  "image" : image9
}, {
  "id": 4,
  "first_name": "Christina",
  "image" : image10
}, {
  "id": 5,
  "first_name": "Rebecca",
  "image" : image11
}, {
  "id": 6,
  "first_name": "Wanda",
  "image" : image5
}, {
  "id": 7,
  "first_name": "Sara",
  "image" : image6
}, {
  "id": 8,
  "first_name": "Judith",
  "image" : image7
}, {
  "id": 9,
  "first_name": "Ruby",
  "image" : image1
}, {
  "id": 10,
  "first_name": "Sandra",
  "image" : image11
}]

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Messages extends Component {
  constructor(props){
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows(newMatches),
      convoData: ds.cloneWithRows(convos),
    }

  }
  
  eachPic(x){
    return(
      <TouchableOpacity style={{alignItems:'center'}}>
      <Image source = {x.image} style={{width:70, height:70, borderRadius:35, margin:10}} />
      <Text style={{fontWeight:'600', color:'#444'}}>{x.first_name}</Text>
      </TouchableOpacity>
      )}

    convoRender(x){
      return(
              <TouchableOpacity style={{alignItems:'center', flexDirection:'row', marginTop:5, marginBottom:5, borderBottomWidth:1, borderColor:'#e3e3e3'}}>
              <Image source = {x.image} style={{width:70, height:70, borderRadius:35, margin:10}} />
              <View>
              <Text style={{fontWeight:'600', color:'#111'}}>{x.name}</Text>
              <Text 
              numberOfLines ={1}
              style={{fontWeight:'400', color:'#888', width:200}}>{x.message}</Text>
              </View>
              </TouchableOpacity>)}

   
  render() {
    return (
      <View style = {{flex:1}}>
      <Nav type = 'message' onPress = {() => this.props.navigator.replace({id:'home'})} />
      <ScrollView style={styles.container}>
      <TextInput 
      style = {{height:50, }}
      placeholder="Search"
      />
      <View style={styles.matches}>
      <Text style = {{color:'#da533c', fontWeight:'600', fontSize:12}}>Your Sparks</Text>
      <ListView 
      horizontal={true}
      showsHorizontalScrollIndicator = {false}
    dataSource={this.state.dataSource}
    pageSize = {5}
      renderRow={(rowData) =>this.eachPic(rowData)}
      />
      </View>
      <View style = {{margin:10}}>
      <Text style = {{color:'#da533c', fontWeight:'600', fontSize:12}}>MESSAGES</Text>
      <ListView 
      horizontal={false}
      scrollEnabled = {false}
      showsHorizontalScrollIndicator = {false}
    dataSource={this.state.convoData}
    pageSize = {5}
      renderRow={(rowData) =>this.convoRender(rowData)}
      />
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
    padding: 10

  },
  matches:{
  borderTopWidth:1,
  paddingTop:15, 
  borderTopColor:'#da533c',
  borderBottomWidth:1,
  paddingBottom:15, 
  borderBottomColor:'#e3e3e3'
  },
  buttons:{
    width:80, 
    height:80, 
    borderWidth:10, 
    borderColor:'#fff', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:40
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
