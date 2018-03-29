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
    View
} from 'react-native';
import Nav from './global-widgets/nav'
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import firebase from '../config/firebase';


var image1 = require('../images/image1.jpeg')
var image2 = require('../images/image2.jpeg')
var image3 = require('../images/image3.jpeg')
var image4 = require('../images/image4.jpeg')
var image5 = require('../images/image5.jpeg')
var image6 = require('../images/image6.jpeg')

const Cards = [{
    "id": 1,
    "first_name": "Denise",
    "age": 21,
    "friends": 9,
    "interests": 38,
    "image": image1
}, {
    "id": 2,
    "first_name": "Cynthia",
    "age": 27,
    "friends": 16,
    "interests": 49,
    "image": image2
}, {
    "id": 3,
    "first_name": "Maria",
    "age": 29,
    "friends": 2,
    "interests": 39,
    "image": image3
}, {
    "id": 4,
    "first_name": "Jessica",
    "age": 20,
    "friends": 18,
    "interests": 50,
    "image": image4
}, {
    "id": 5,
    "first_name": "Julie",
    "age": 28,
    "friends": 2,
    "interests": 13,
    "image": image5
}, {
    "id": 6,
    "first_name": "Anna",
    "age": 24,
    "friends": 12,
    "interests": 44,
    "image": image6
}];

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.userData.userId,
            cards: [],
            swipedRight: [],
            swipedLeft: []
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleYup = this.handleYup.bind(this);
        this.handleNope = this.handleNope.bind(this);
    }

    componentWillMount(){
        let userCards = [];

        firebase.database().ref().child('users').child(this.state.userId).on('value', userInfo => {

            let dbUserInfo = userInfo.val();
            console.log(dbUserInfo);
            if(dbUserInfo.swipedRightUsers) this.state.swipedRight = dbUserInfo.swipedRightUsers;
            if(dbUserInfo.swipedLeftUsers) this.state.swipedLeft = dbUserInfo.swipedLeftUsers;
            //firebase.database().ref().child('users').child(this.state.userId).off();
            console.log(this.state);
        });

        firebase.database().ref().child('users').on('value', users => {
            let dbUserInfo = users.val();

            let loggedInUser = dbUserInfo[this.state.userId];
            console.log(dbUserInfo);
            console.log(loggedInUser);

            for (var userId in dbUserInfo){
                //only push cards which the user hasn't already swiped & it's not self
                if(!this.state.swipedRight.includes(userId) &&
                    !this.state.swipedLeft.includes(userId) &&
                    userId != this.state.userId){
                    let userObj = dbUserInfo[userId];
                    let userCard = {
                        "userId": userId,
                        "name": '',
                        "age": 0,
                        "profilePicUrl": '',
                        "bio": '',
                        "location": ''
                    };
                    for (var prop in userObj){
                        if(prop == 'name') userCard.name = userObj[prop];
                        if(prop == 'age') userCard.age = userObj[prop];
                        if(prop == 'profilePicUrl') userCard.profilePicUrl = userObj[prop];
                        if(prop == 'bio') userCard.bio = userObj[prop];
                        if(prop == 'location') userCard.location = userObj[prop];
                    }
                    //console.log(userCard);
                    userCards.push(userCard);
                }

            }
            this.state.cards = userCards;
            this.setState(this.state);
            firebase.database().ref().child('users').off();
            console.log(userCards);
        });
    }

    CardBackup(x){
        return (
            <View style={styles.card}>
                <Image source ={x.image} resizeMode="contain" style ={{width:350, height:350}} />
                <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', margin:15, marginTop:25,}} >
                        <Text style={{fontSize:20, fontWeight:'300', color:'#444'}}>{x.first_name}, </Text>
                        <Text style={{fontSize:21, fontWeight:'200', color:'#444'}}>{x.age}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{padding:13,  borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Icon name='people-outline' size={20} color="#777" style={{}} /><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{x.friends}</Text></View>
                        <View style={{padding:13, borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Icon name='import-contacts' size={20} color="#777" /><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{x.interests}</Text></View>
                    </View>
                </View>
            </View>
        )
    }

    Card(x){
        return (
            <View style={styles.card}>
                <Image source ={{uri: x.profilePicUrl}} resizeMode="contain" style ={{width:350, height:350}} />
                <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', margin:15, marginTop:25,}} >
                        <Text style={{fontSize:20, fontWeight:'300', color:'#444'}}>{x.name}, </Text>
                        <Text style={{fontSize:21, fontWeight:'200', color:'#444'}}>{x.age}</Text>
                    </View>
                </View>
                <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', margin:15, marginTop:25,}} >
                        <Text style={{fontSize:10, fontWeight:'300', color:'#444'}}>{x.bio}, </Text>
                    </View>
                </View>
            </View>
        )
    }
    handleYup (card) {
        //card.userId
        this.state.swipedRight.push(card.userId);
        console.log(this.state.swipedRight);

        var userRef = firebase.database().ref().child('users').child(this.state.userId);
        userRef.update({swipedRightUsers: this.state.swipedRight});

        console.log(`Yup for ${card.text}`)
    }

    handleNope (card) {
        console.log(`Nope for ${card.text}`)
    }
    noMore(){
        return (
            <View style={styles.card} >
                <Text>No More Cards</Text>
            </View>
        )
    }

    yup(){
        console.log(this.refs['swiper'])
        this.refs['swiper']._goToNextCard()  }

    nope(){
        console.log(this.refs['swiper'])
        this.refs['swiper']._goToNextCard()  }

    render() {
        return (
            <View style={styles.container}>
                <Nav chat = {() => this.props.navigator.replace({id: "messages", userData: this.props.userData})}
                     toProfile = {() => this.props.navigator.replace({id:'profile', userData: this.props.userData})} />
                <SwipeCards
                    nopeStyle={styles.nopeStyle}
                    yupStyle={styles.yupStyle}
                    ref = {'swiper'}
                    cards={this.state.cards}
                    containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center'}}
                    renderCard={(cardData) => this.Card(cardData)}
                    renderNoMoreCards={() => this.noMore()}
                    handleYup={this.handleYup}
                    handleNope={this.handleNope} />
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', margin: '-40%'}}>
                    <TouchableOpacity style = {styles.buttons} onPress = {() => this.nope()}>
                        <Iconz name='ios-close' size={45} color="#888" style={{}} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonSmall}>
                        <Iconz name='ios-information' size={25} color="#888" style={{}} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup()}>
                        <Iconz name='ios-heart-outline' size={36} color="#888" style={{marginTop:5}} />
                    </TouchableOpacity>
                </View>
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
    buttons:{
        width:80,
        height:80,
        borderWidth:10,
        borderColor:'#e7e7e7',
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
        height: 420
    },
    nopeStyle: {
        borderColor: 'red',
        borderWidth: 2,
        position: 'absolute',
        bottom: 200,
        padding: 20,
        borderRadius: 5,
        left: 20,
    },
    yupStyle: {
        borderColor: 'green',
        borderWidth: 2,
        position: 'absolute',
        padding: 20,
        bottom: 200,
        borderRadius: 5,
        right: 20,
    }
});
