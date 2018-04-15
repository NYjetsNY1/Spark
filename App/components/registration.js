import React, { Component } from 'react';
import {
    Navigator,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    TouchableHighlight,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Home from './home';
import Nav from './global-widgets/nav'
import firebase from '../config/firebase';
const storage = firebase.storage().ref();
const db = firebase.database().ref();
var {height, width} = Dimensions.get('window');

export default class Registration extends Component {
    constructor(props){
        super(props);
        this.state = {
            friends: 1098,
            profilePic: ' ',
            tmpJob: "",
            tmpBio: "",
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
            //this.state.userData.profileBio = dbUserInfo.profileBio;
            //this.state.userData.job = dbUserInfo.job;
            this.state.profilePic = dbUserInfo.profilePicUrl;
            this.setState(this.state);
        });

        /*
        storage.child(`${this.props.userData.userId}.jpg`).getDownloadURL().then((url) => {
            this.state.profilePic = url;
            this.setState(this.state);
        });
        this.updateDB();
        */

    }

    getImage (image) {
        storage.child(`${image}.jpeg`).getDownloadURL().then((url) => {
            this.state[image] = url;
            this.setState(this.state);
        })
    }

    goHome() {
        this.props.navigator.replace({id: "home"});
    }


render() {
    return(
     <View style={{flex: 1}}>
        <View style={styles.topBar}>
            <Text style={{textAlign: 'center'}}>
                Edit your profile!
            </Text>
        </View>
         <ScrollView style = {{flex: 1}}>
         <Image
             style={{width: width, height: 350}}
             resizeMode="stretch"
             source={{uri: this.state.profilePic}}
         />
         <View style={[styles.row, {marginTop: 15, borderWidth: 2}]}>
             <Text style={{fontSize: 19, fontWeight: '400'}}>{this.state.userData.name}, </Text>
                <Text style={{
                    fontSize: 21,
                    fontWeight: '300',
                    marginBottom: -2
                }}>{this.state.userData.age}</Text>
         </View>
             <KeyboardAvoidingView behavior={"padding"}>
         <TextInput style = {{height: 30, width: width, borderColor: 'gray', borderWidth: 1}}
                    multiLine= {true}
                    numberOfLines={4}
                    placeholder= {"What's your job?"}
                    onChangeText={(text) => this.setState({tmpJob: text})}
                    value={this.state.tmpJob}
         />
         <TextInput  style = {{height: 70, width: width, borderColor: 'gray', borderWidth: 1}}
                     multiLine= {true}
                     numberOfLines={4}
                     placeholder= {"Enter a bio"}
                     onChangeText={(text) => this.setState({tmpBio: text})}
                     value={this.state.tmpBio}
         />
             </KeyboardAvoidingView>
         </ScrollView>
    </View>
    )
}
}


const styles = StyleSheet.create({
    topBar: {
        height:60,
        width: width,
        paddingTop:10,
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth:1,
        borderColor:'black'
    },
    page: {backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'},
    qText: {
        color: 'black',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 15,
        marginTop: 50,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#15d5ec',
        width: 200,
        height: 40,
        marginBottom: 15,
        marginLeft: 86,
        justifyContent: 'center',
        alignItems: 'center'
    },
    test: {
        backgroundColor: '#0a6b76',
        width: 200,
        height: 40,
        marginBottom: 15,
        marginLeft: 86,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: 4,
        fontFamily: 'Avenir-Heavy'
    },
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    row: {
        flexDirection:'row',
        width: width,
        height: 60,
        margin:15,
        marginBottom:0,
        marginTop:5,
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