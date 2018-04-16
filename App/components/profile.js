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
    Dimensions,
    View,
    ScrollView,
    TextInput
} from 'react-native';

var {height, width} = Dimensions.get('window');
import Nav from './global-widgets/nav';

import firebase from '../config/firebase';
const storage = firebase.storage().ref();
const db = firebase.database().ref();


export default class Profile extends Component {
    constructor(props){
        super(props);

        //TODO: replace profilePic with some sort of blank profile pic

        this.state = {
            friends: 1098,
            profilePic: ' ',
            userData: {
                userId: this.props.userData.userId,
                name: "",
                age: 0,
                job: "",
                profileBio: "",
                tmp_var: ""
            }
        };

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        //query for user profile info using this.state.userData.userId

        db.child('users').child(this.props.userData.userId).on('value', userInfo => {
            let dbUserInfo = userInfo.val();
            this.state.userData.name = dbUserInfo.name;
            this.state.userData.age = dbUserInfo.age;
            this.state.userData.profileBio = dbUserInfo.bio;
            this.state.userData.job = dbUserInfo.job;
            this.state.profilePic = dbUserInfo.profilePicUrl;
            this.setState(this.state);
        });

    }

    updateDBjob(job) {
        this.setState({
            tmpJob: job
        }, () => {
            console.log("New state in ASYNC callback:", this.state.tmpJob);
            let userRef = firebase.database().ref(`users/${this.state.userData.userId}`);
            userRef.update({
                job: this.state.tmpJob,
            });
        });
        console.log("New state DIRECTLY after setState:", this.state.tmpJob);
    }


    updateDBbio(bio) {
        this.setState({
            tmpBio: bio
        }, () => {
            console.log("New state in ASYNC callback:", this.state.tmpBio);
            let userRef = firebase.database().ref(`users/${this.state.userData.userId}`);
            userRef.update({
                bio: this.state.tmpBio,
            });
        });
        console.log("New state DIRECTLY after setState:", this.state.tmpBio);
    }


    render() {
        return (
            <View style={{flex:1}}>
                <Nav  type = "profile" onPress = {() => this.props.navigator.replace({id:'home', userData: this.props.userData})} />
                <ScrollView style={styles.container}>
                    <Image
                        style={{width: width, height: 350}}
                        resizeMode="stretch"
                        source={{uri: this.state.profilePic}}
                    />
                    <View style={[styles.row, {marginTop:15}]}>
                        <Text style = {{fontSize:19, fontWeight:'400'}}>{this.state.userData.name}, </Text>
                        <Text style={{fontSize:21, fontWeight:'300', marginBottom:-2}}>{this.state.userData.age}</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput style={{height: 30, width: width, fontColor: '#777', fontSize: 14}}
                                   multiLine={true}
                                   numberOfLines={1}
                                   defaultValue={this.state.userData.job}
                                   onChangeText={(text) => this.updateDBjob(text)}
                                   value={this.state.userData.job}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={{color:'#777', fontSize:11}}>less than a mile away</Text>
                    </View>
                    <View style={styles.description}>
                        <TextInput style={{height: 30, width: width, fontColor: '#777', fontSize: 14}}
                                   multiLine={true}
                                   numberOfLines={2}
                                   defaultValue={this.state.userData.profileBio}
                                   onChangeText={(text) => this.updateDBbio(text)}
                                   value={this.state.userData.profileBio}
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
        marginTop:5,
        marginBottom:5,
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
