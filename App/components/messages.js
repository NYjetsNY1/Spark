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

import Nav from './global-widgets/nav';

import firebase from '../config/firebase';


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
    "recipientId": 11,
    "message": "Me too!",
    "image" : image1
}, {
    "id": 2,
    "name": "Lois",
    "recipientId": 12,
    "message": "Hi :)",
    "image" : image2
}, {
    "id": 3,
    "name": "Mary",
    "recipientId": 13,
    "message": "Hello!!!",
    "image" : image3
}, {
    "id": 4,
    "name": "Susan",
    "recipientId": 14,
    "message": "WHY WON't YOU ANSWER ME!",
    "image" : image4
}, {
    "id": 5,
    "name": "Betty",
    "recipientId": 15,
    "message": "HIIIIIII",
    "image" : image5
}, {
    "id": 6,
    "name": "Deborah",
    "recipientId": 16,
    "message": "Aliquam sit amet diam in magna bibendum imperdiet.",
    "image" : image6
}, {
    "id": 7,
    "name": "Frances",
    "recipientId": 17,
    "message": "What's up",
    "image" : image7
}, {
    "id": 8,
    "name": "Joan",
    "recipientId": 18,
    "message": "Wanna get dinner?",
    "image" : image8
}, {
    "id": 9,
    "name": "Denise",
    "recipientId": 19,
    "message": "Let's go on a date.",
    "image" : image9
}, {
    "id": 10,
    "name": "Rachel",
    "recipientId": 20,
    "message": "I like pasta.",
    "image" : image10
}];

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Messages extends Component {
    constructor(props){
        super(props);

        this.state = {
            userId: this.props.userData.userId,
            newMatches: [],
            convoData: ds.cloneWithRows(convos),
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.getNewMatches = this.getNewMatches.bind(this);
    }

    componentWillMount(){
        //query user's convos
        /*
            ex query return value:

            [{
                "convoId": 1,
                "name": "Diane",
                "recipientId": 11,
                "message": "Me too!"
            }, {
                "convoId": 2,
                "name": "Lois",
                "recipientId": 12,
                "message": "Hi :)"
            }]
         */

        this.getNewMatches();

    }

    getNewMatches(){
        let newMatches = [];
        firebase.database().ref().child('users').on('value', users => {
            let allUserInfo = users.val();
            let loggedInUser = allUserInfo[this.state.userId];
            let userMatches = loggedInUser.newMatches;
            if(userMatches){
                userMatches.forEach(matchId => {
                    let matchUser = allUserInfo[matchId];
                    let matchObj = {
                        name: matchUser.name,
                        userId: matchUser.id,
                        image: matchUser.profilePicUrl
                    };
                    newMatches.push(matchObj);
                });
                this.state.newMatches = newMatches;
                this.setState(this.state);
            }
            firebase.database().ref().child('users').off();
        });
    }

    eachPic(x){
        return(
            <TouchableOpacity
                onPress ={() => this.props.navigator.replace({id:'directMessage',
                userData: this.props.userData,
                recipientId: x.userId})}
                style={{alignItems:'center'}}>
                <Image source = {{uri:x.image}} style={{width:70, height:70, borderRadius:35, margin:10}} />
                <Text style={{fontWeight:'600', color:'#444'}}>{x.name}</Text>
            </TouchableOpacity>
        )}

    convoRender(x){
        return(
            <Nav type = 'individualMessage'
                 onPress = {() => this.props.navigator.replace({id:'directMessage',
                                                                userData: this.props.userData,
                                                                recipientId: x.recipientId})}
                 image={x.image} name={x.name} message={x.message} />
        )
    }

    render() {
        return (
            <View style = {{flex:1}}>
                <Nav type = 'message'
                     onPress = {() => this.props.navigator.replace({id:'home', userData: this.props.userData})} />
                <ScrollView style={styles.container}>
                    <TextInput
                        style = {{height:50, }}
                        placeholder="Search"
                    />
                    <View style={styles.matches}>
                        <Text style = {{color:'#15d5ec', fontWeight:'600', fontSize:12}}>Your Sparks</Text>
                        <ListView
                            horizontal={true}
                            showsHorizontalScrollIndicator = {false}
                            dataSource={ds.cloneWithRows(this.state.newMatches)}
                            pageSize = {5}
                            renderRow={(rowData) =>this.eachPic(rowData)}
                        />
                    </View>
                    <View style = {{margin:10}}>
                        <Text style = {{color:'#15d5ec', fontWeight:'600', fontSize:12}}>MESSAGES</Text>
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
        borderTopColor:'#15d5ec',
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
