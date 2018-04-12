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


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.userData.userId,
            swipedUsers: new Set([this.props.userData.userId]),
            cards: []
        };
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        console.log(this.state.userId);
        let userCards = [];
        let swipedRightUsers = [];
        let swipedLeftUsers = [];
        let usersCardsSet = new Set([]);

        // Find swiped right users
        firebase.database().ref('users').child(this.state.userId)
            .child('swipedRightUsers').on('value', swipedRight => {
            swipedRightUsers = swipedRight.val();
            console.log(swipedRightUsers);
            if (swipedRightUsers !== null) {
                for (let key_val in swipedRightUsers) {
                    this.state.swipedUsers.add(swipedRightUsers[key_val])
                }
                // this.state.swipedUsers = new Set([...this.state.swipedUsers, ...swipedRightUsers]);
                this.setState(this.state);
            }
        });

        // Find swiped left users
        firebase.database().ref('users').child(this.state.userId)
            .child('swipedLeftUsers').on('value', swipedLeft =>{
            swipedLeftUsers = swipedLeft.val();
            console.log(swipedLeftUsers);
            if (swipedLeftUsers !== null) {
                for (let key_val in swipedLeftUsers) {
                    this.state.swipedUsers.add(swipedLeftUsers[key_val])
                }
                // this.state.swipedUsers = new Set([...this.state.swipedUsers, ...swipedLeftUsers]);
                this.setState(this.state);
            }
        });

        firebase.database().ref().child('users').on('value', users => {
            let dbUserInfo = users.val();
            console.log(dbUserInfo);
            for (var userId in dbUserInfo){
                if (!usersCardsSet.has(userId)) {
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
                    userCards.push(userCard);
                    usersCardsSet.add(userId);
                }
            }
            this.state.cards = userCards;
            this.setState(this.state);
            console.log(userCards);
        });
    }

    filter_cards() {
        let filtered_users = [];
        for (let i in this.state.cards) {
            if (!this.state.swipedUsers.has(this.state.cards[i].userId)) {
                filtered_users.push(this.state.cards[i]);
            }
        }
        // If filtered_users is empty we need to show a default card to user
        // If we don't, react will just use first card from the initial call (react gets the actual data on second call)
        return filtered_users;
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

    handleYup (curUserId, card) {
        console.log(`Yup for ${card.name}`);
        let userRef = firebase.database().ref(`users/${curUserId}/swipedRightUsers`);
        userRef.push(card.userId);
    }

    handleNope (curUserId, card) {
        console.log(`Nope for ${card.name}`);
        let userRef = firebase.database().ref(`users/${curUserId}/swipedLeftUsers`);
        userRef.push(card.userId);
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
                    cards={this.filter_cards()}
                    containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center'}}
                    renderCard={(cardData) => this.Card(cardData)}
                    renderNoMoreCards={() => this.noMore()}
                    handleYup={(card) => this.handleYup(this.state.userId, card)}
                    handleNope={(card) => this.handleNope(this.state.userId, card)} />
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
