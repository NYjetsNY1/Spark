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
            cards: [],
            swipedRightUsers: new Set([]),
            swipedLeftUsers: new Set([]),
            userSurveyResults: []
        };
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        let userCards = [];
        let usersCardsSet = new Set([]);

        // Find swiped right users
        firebase.database().ref('users').child(this.state.userId)
            .child('swipedRightUsers').on('value', swipedRight => {
            let swipedRightUsers = swipedRight.val();
            if (swipedRightUsers !== null) {
                this.state.swipedRightUsers = new Set([...swipedRightUsers]);
                this.setState(this.state);
            }
        });


        // Find swiped left users
        firebase.database().ref('users').child(this.state.userId)
            .child('swipedLeftUsers').on('value', swipedLeft =>{
            let swipedLeftUsers = swipedLeft.val();
            if (swipedLeftUsers !== null) {
                this.state.swipedLeftUsers = new Set([...swipedLeftUsers]);
                this.setState(this.state);
            }
        });

        // Find all users
        firebase.database().ref().child('users').on('value', users => {
            let dbUserInfo = users.val();
            if(dbUserInfo[this.state.userId].surveyResults) this.state.userSurveyResults = dbUserInfo[this.state.userId].surveyResults;
            for (let userId in dbUserInfo){
                if (!usersCardsSet.has(userId)) {
                    let userObj = dbUserInfo[userId];
                    let userCard = {
                        "userId": userId,
                        "name": '',
                        "age": 0,
                        "profilePicUrl": '',
                        "bio": '',
                        "location": '',
                        "surveyResults": []
                    };
                    for (var prop in userObj){
                        if(prop === 'name') userCard.name = userObj[prop];
                        if(prop === 'age') userCard.age = userObj[prop];
                        if(prop === 'profilePicUrl') userCard.profilePicUrl = userObj[prop];
                        if(prop === 'bio') userCard.bio = userObj[prop];
                        if(prop === 'location') userCard.location = userObj[prop];
                        if(prop === 'surveyResults') userCard.surveyResults = userObj[prop];
                    }
                    userCards.push(userCard);
                    usersCardsSet.add(userId);
                }
            }
            this.state.cards = userCards;
            this.setState(this.state);
        });
    }

    filter_cards() {
        //console.log(this.state.cards);
        //console.log(this.state.userSurveyResults);
        let filtered_users = [];
        if (this.state.swipedLeftUsers.size !== 0 && this.state.swipedRightUsers.size !== 0) {
            for (let i in this.state.cards) {
                if (!this.state.swipedLeftUsers.has(this.state.cards[i].userId) &&
                    !this.state.swipedRightUsers.has(this.state.cards[i].userId)) {

                    this.state.cards[i].compatability = this.calculateCompatability(this.state.userSurveyResults, this.state.cards[i].surveyResults);
                    filtered_users.push(this.state.cards[i]);
                }
            }
        }
        filtered_users.sort(this.compareFunction);

        return filtered_users;
    }

    compareFunction (a, b){
        return b.compatability-a.compatability;
    }

    calculateCompatability(userAnswers, matchAnswers) {
        console.log(userAnswers);
        console.log(matchAnswers);
        let sameAnsCount = 0;
        for(let i = 0; i < userAnswers.length; i++){
            if(userAnswers[i].answer === matchAnswers[i].answer) sameAnsCount++;
        }
        let compatability = (sameAnsCount/userAnswers.length) * 100;
        console.log(compatability);
        return Math.round(compatability);
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
                    <View style={{flexDirection:'row'}}>
                        <View style={{padding:13,borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}>
                            <Icon name='flash-on' size={20} color="#777" style={{}} />
                            <Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{x.compatability}%</Text>
                        </View>
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
        let userRef = firebase.database().ref(`users/${curUserId}`);
        let tmp = Array.from(this.state.swipedRightUsers);
        tmp.push(card.userId);
        userRef.update({swipedRightUsers: tmp});

        // Check the other persons's swiped
        firebase.database().ref('users').child(card.userId)
            .child('swipedRightUsers').on('value', swipedRight => {
            let swipedRightUsers = swipedRight.val();
            // if a match!
            if (swipedRightUsers !== null && swipedRightUsers.includes(curUserId)) {
                // push to both db
                userRef.child('matches').push(card.userId);
                let anotherRef = firebase.database().ref(`users/${card.userId}`);
                anotherRef.child('matches').push(curUserId);
                alert(`You have a match with ${card.name}`);
            }
        });
    }

    handleNope (curUserId, card) {
        console.log(`Nope for ${card.name}`);
        let userRef = firebase.database().ref(`users/${curUserId}`);
        let tmp = Array.from(this.state.swipedLeftUsers);
        tmp.push(card.userId);
        userRef.update({swipedLeftUsers: tmp});
    }

    noMore(){
        return (
            <View style={styles.card} >
                <Text>No More Cards</Text>
            </View>
        )
    }

    yup(curUserId){
        let curCard = this.refs['swiper'].state.card;
        console.log(`Yup for ${curCard.name}`);
        let userRef = firebase.database().ref(`users/${curUserId}`);
        let tmp = Array.from(this.state.swipedRightUsers);
        tmp.push(curCard.userId);
        userRef.update({swipedRightUsers: tmp});

        // Check the other persons's swiped
        firebase.database().ref('users').child(curCard.userId)
            .child('swipedRightUsers').on('value', swipedRight => {
            let swipedRightUsers = swipedRight.val();
            // if a match!
            if (swipedRightUsers !== null && swipedRightUsers.includes(curUserId)) {
                // push to both db
                userRef.child('matches').push(curCard.userId);
                let anotherRef = firebase.database().ref(`users/${curCard.userId}`);
                anotherRef.child('matches').push(curUserId);
                alert(`You have a match with ${curCard.name}`);
            }
        });

        this.refs['swiper']._goToNextCard()
    }

    nope(curUserId){
        let curCard = this.refs['swiper'].state.card;
        console.log(`Nope for ${curCard.name}`);
        let userRef = firebase.database().ref(`users/${curUserId}`);
        let tmp = Array.from(this.state.swipedLeftUsers);
        tmp.push(curCard.userId);
        userRef.update({swipedLeftUsers: tmp});

        this.refs['swiper']._goToNextCard()
    }

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
                    <TouchableOpacity style = {styles.buttons} onPress = {(tmp) => this.nope(this.state.userId)}>
                        <Iconz name='ios-close' size={45} color="#888" style={{}} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonSmall}>
                        <Iconz name='ios-information' size={25} color="#888" style={{}} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup(this.state.userId)}>
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