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


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Messages extends Component {
    constructor(props){
        super(props);

        this.state = {
            userId: this.props.userData.userId,
            newMatches: [],
            convoData: ds.cloneWithRows([]),
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.getNewMatchesAndConvos = this.getNewMatchesAndConvos.bind(this);
    }

    componentWillMount(){
        //query user's convos
        this.getNewMatchesAndConvos();

    }

    getNewMatchesAndConvos(){
        let newMatches = [];
        firebase.database().ref().child('users').on('value', users => {
            let allUserInfo = users.val();
            let loggedInUser = allUserInfo[this.state.userId];
            console.log(loggedInUser);
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
            }
            if(loggedInUser.userConvos) this.state.convoData = ds.cloneWithRows(loggedInUser.userConvos);
            this.setState(this.state);
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
            <TouchableOpacity onPress ={() => this.props.navigator.replace({id:'directMessage', userData: this.props.userData, recipientId: x.matchId, convoId: x.convoId})}
                              style={{alignItems:'center', flexDirection:'row', marginTop:5, marginBottom:5, borderBottomWidth:1, borderColor:'#e3e3e3'}}>
                <Image source = {{uri: x.matchImage}} style={{width:70, height:70, borderRadius:35, margin:10}} />
                <View>
                    <Text style={{fontWeight:'600', color:'#111'}}>{x.matchName}</Text>
                    <Text
                        numberOfLines ={1}
                        style={{fontWeight:'400', color:'#888', width:200}}>{x.lastMessage}</Text>
                </View>
            </TouchableOpacity>
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
